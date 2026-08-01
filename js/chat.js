/* ========================================
   唐姝 · Chat — Logic
   ======================================== */

// ============================================================
//  API Configuration — edit these values as needed
//  Models URL is auto-derived from chatUrl
// ============================================================
const API_CONFIG = {
  chatUrl: 'https://api.deepseek.com/chat/completions',
  apiKey: 'sk-de8b5cb5b1334aa1be3e957f03f88aa9'
};

// ============================================================
//  System Prompt — see js/prompt.js to edit
// ============================================================

// ============================================================
//  Default fallback models (used when /models endpoint is unavailable)
// ============================================================
const FALLBACK_MODELS = [
  { id: 'deepseek-v4-pro' },
  { id: 'deepseek-v4-flash' },
  { id: 'gpt-4o' },
  { id: 'gpt-4o-mini' },
  { id: 'gpt-4-turbo' },
  { id: 'gpt-3.5-turbo' }
];

// Auto-derive models URL from chat URL
function getModelsUrl() {
  const url = API_CONFIG.chatUrl;
  // Try standard patterns: /v1/models or /models
  if (url.includes('/chat/completions')) {
    return url.replace('/chat/completions', '/models');
  }
  if (url.includes('/v1/')) {
    return url.replace(/\/v1\/.*$/, '/v1/models');
  }
  // Fallback: append /v1/models
  return url.replace(/\/$/, '') + '/v1/models';
}

document.addEventListener('DOMContentLoaded', () => {

  // ---- Elements ----
  const messagesContainer = document.getElementById('messages-container');
  const welcomeMessage = document.getElementById('welcome-message');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const btnNewChat = document.getElementById('btn-new-chat');
  const historyList = document.getElementById('history-list');
  const modelSelect = document.getElementById('model-select');
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const btnExport = document.getElementById('btn-export');
  const sidebar = document.getElementById('sidebar');

  // ---- State ----
  const STORAGE_KEY_CHATS = 'tangshu_chats';
  const STORAGE_KEY_MODEL = 'tangshu_model';
  const STORAGE_KEY_ACTIVE = 'tangshu_active_chat';

  let chats = [];
  let activeChatId = null;
  let isLoading = false;
  let abortController = null;

  // ---- Model Management ----
  function getSelectedModel() {
    // Always fall back to the dropdown value or first fallback model
    const saved = localStorage.getItem(STORAGE_KEY_MODEL);
    if (saved) return saved;
    if (modelSelect && modelSelect.value) return modelSelect.value;
    return FALLBACK_MODELS[0].id;
  }

  function saveSelectedModel(model) {
    localStorage.setItem(STORAGE_KEY_MODEL, model);
  }

  function populateModelSelect(models) {
    const current = getSelectedModel();
    modelSelect.innerHTML = '';

    if (models.length === 0) {
      modelSelect.innerHTML = '<option value="">--</option>';
      return;
    }

    models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.id;
      if (m.id === current) opt.selected = true;
      modelSelect.appendChild(opt);
    });

    // If current model not in list, add it
    if (current && !models.find(m => m.id === current)) {
      const opt = document.createElement('option');
      opt.value = current;
      opt.textContent = current;
      opt.selected = true;
      modelSelect.appendChild(opt);
    }

    // If nothing selected, pick first
    if (!modelSelect.value && models.length > 0) {
      modelSelect.value = models[0].id;
      saveSelectedModel(models[0].id);
    }
  }

  async function fetchModels() {
    const modelsUrl = getModelsUrl();

    try {
      const resp = await fetch(modelsUrl, {
        headers: { 'Authorization': `Bearer ${API_CONFIG.apiKey}` }
      });

      if (!resp.ok) throw new Error('HTTP ' + resp.status);

      const data = await resp.json();

      if (data.data && Array.isArray(data.data)) {
        const chatModels = data.data
          .filter(m => m.id)
          .sort((a, b) => a.id.localeCompare(b.id));

        if (chatModels.length > 0) {
          populateModelSelect(chatModels);
          return;
        }
      }
      throw new Error('Unexpected format');
    } catch (err) {
      console.warn('Could not fetch models from ' + modelsUrl + ':', err.message);
      // Fallback: use default model list
      populateModelSelect(FALLBACK_MODELS);
    }
  }

  modelSelect.addEventListener('change', () => {
    saveSelectedModel(modelSelect.value);
  });

  // ---- Chat Management ----
  function loadChats() {
    try { chats = JSON.parse(localStorage.getItem(STORAGE_KEY_CHATS)) || []; }
    catch (e) { chats = []; }
  }

  function saveChats() {
    localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(chats));
  }

  function loadActiveChatId() {
    activeChatId = localStorage.getItem(STORAGE_KEY_ACTIVE) || null;
    if (activeChatId && !chats.find(c => c.id === activeChatId)) {
      activeChatId = null;
    }
  }

  function saveActiveChatId() {
    if (activeChatId) localStorage.setItem(STORAGE_KEY_ACTIVE, activeChatId);
    else localStorage.removeItem(STORAGE_KEY_ACTIVE);
  }

  function createNewChat() {
    // Abort any in-progress streaming request
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    // Remove any leftover streaming bubble
    const el = document.getElementById('streaming-bubble');
    if (el) el.remove();
    isLoading = false;
    btnSend.classList.remove('stopping');
    btnSend.title = '发送 (Enter)';

    const id = 'chat_' + Date.now();
    chats.unshift({ id, title: 'New Conversation', messages: [] });
    activeChatId = id;
    saveChats();
    saveActiveChatId();
    renderHistory();
    renderMessages();
    chatInput.focus();
  }

  function deleteChat(id) {
    chats = chats.filter(c => c.id !== id);
    if (activeChatId === id) {
      activeChatId = chats.length > 0 ? chats[0].id : null;
    }
    saveChats();
    saveActiveChatId();
    renderHistory();
    renderMessages();
  }

  function getActiveChat() {
    return chats.find(c => c.id === activeChatId) || null;
  }

  function addMessage(role, content) {
    const chat = getActiveChat();
    if (!chat) return;
    chat.messages.push({ role, content });
    if (role === 'user' && chat.title === 'New Conversation') {
      chat.title = content.slice(0, 40) + (content.length > 40 ? '…' : '');
    }
    saveChats();
  }

  // ---- Rendering ----
  function renderHistory() {
    historyList.innerHTML = '';
    if (chats.length === 0) {
      historyList.innerHTML = '<div style="padding:1.2rem;color:rgba(255,255,255,0.25);font-size:0.75rem;text-align:center;">No conversations yet</div>';
      return;
    }
    chats.forEach(chat => {
      const el = document.createElement('div');
      el.className = 'history-item' + (chat.id === activeChatId ? ' active' : '');
      el.innerHTML = `
        <span class="history-item-title">${escapeHtml(chat.title)}</span>
        <button class="history-item-del" data-id="${chat.id}" title="删除">×</button>
      `;
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('history-item-del')) return;
        activeChatId = chat.id;
        saveActiveChatId();
        renderHistory();
        renderMessages();
      });
      historyList.appendChild(el);
    });
    historyList.querySelectorAll('.history-item-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteChat(btn.dataset.id);
      });
    });
  }

  function renderMessages() {
    messagesContainer.innerHTML = '';
    const chat = getActiveChat();
    if (!chat || chat.messages.length === 0) {
      welcomeMessage.style.display = 'block';
      messagesContainer.appendChild(welcomeMessage);
      return;
    }
    welcomeMessage.style.display = 'none';
    chat.messages.forEach(msg => appendMessageBubble(msg.role, msg.content));
    scrollToBottom();
  }

  function appendMessageBubble(role, content) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.style.position = 'relative';
    bubble.innerHTML = formatContent(content);

    // Copy button on assistant messages
    if (role === 'assistant') {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'btn-copy';
      copyBtn.title = 'Copy';
      copyBtn.textContent = '📋';
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(content).then(() => {
          copyBtn.textContent = '✓';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = '📋';
            copyBtn.classList.remove('copied');
          }, 1500);
        }).catch(() => {});
      });
      bubble.appendChild(copyBtn);
    }

    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  function appendLoadingBubble() {
    const wrapper = document.createElement('div');
    wrapper.className = 'message assistant';
    wrapper.id = 'loading-bubble';
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  function removeLoadingBubble() {
    const el = document.getElementById('loading-bubble');
    if (el) el.remove();
  }

  function appendErrorBubble(errorText) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message error';
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = 'Error: ' + errorText;
    wrapper.appendChild(bubble);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  // ============================================================
  //  Markdown Renderer
  // ============================================================

  function formatContent(text) {
    // Phase 0: extract and protect code blocks + inline code
    const blocks = [];
    let html = text;

    // Fenced code blocks ```lang\ncode\n```
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      blocks.push('<pre><code>' + escapeHtml(code) + '</code></pre>');
      return `\x00B${blocks.length - 1}\x00`;
    });

    // Inline code `code` (protect from formatting)
    html = html.replace(/`([^`]+)`/g, (_, code) => {
      blocks.push('<code>' + escapeHtml(code) + '</code>');
      return `\x00B${blocks.length - 1}\x00`;
    });

    // Phase 1: escape HTML (except our markers)
    html = escapeHtml(html);

    // Phase 2: colored text [c:color]text[/c:color]
    html = html.replace(/\[c:(\w+)\]([\s\S]*?)\[\/c:\1\]/g, '<span class="c-$1">$2</span>');

    // Phase 3: block-level parsing
    const lines = html.split('\n');
    const out = [];
    let inUl = false, inOl = false, inTable = false, inDl = false, inBlockquote = false;

    function closeUl() { if (inUl) { out.push('</ul>'); inUl = false; } }
    function closeOl() { if (inOl) { out.push('</ol>'); inOl = false; } }
    function closeLists() {
      closeUl(); closeOl();
      if (inTable) { out.push('</table>'); inTable = false; }
      if (inDl) { out.push('</dl>'); inDl = false; }
      if (inBlockquote) { out.push('</blockquote>'); inBlockquote = false; }
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      let trimmed = line.trim();

      // Empty line — close all open blocks
      if (trimmed === '') {
        closeLists();
        out.push('');
        continue;
      }

      // Headings
      let hm;
      if ((hm = trimmed.match(/^#### (.*)/)))  { closeLists(); out.push('<h4>' + hm[1] + '</h4>'); continue; }
      if ((hm = trimmed.match(/^### (.*)/)))   { closeLists(); out.push('<h3>' + hm[1] + '</h3>'); continue; }
      if ((hm = trimmed.match(/^## (.*)/)))    { closeLists(); out.push('<h2>' + hm[1] + '</h2>'); continue; }
      if ((hm = trimmed.match(/^# (.*)/)))     { closeLists(); out.push('<h1>' + hm[1] + '</h1>'); continue; }

      // Horizontal rule
      if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(trimmed)) {
        closeLists(); out.push('<hr>'); continue;
      }

      // Blockquote (handles nested >)
      if (trimmed.startsWith('&gt;')) {
        if (!inBlockquote) { closeLists(); out.push('<blockquote>'); inBlockquote = true; }
        const qc = trimmed.replace(/^&gt;\s?/, '');
        out.push('<p>' + qc + '</p>');
        continue;
      } else if (inBlockquote) {
        out.push('</blockquote>'); inBlockquote = false;
      }

      // Task list
      let tlm = trimmed.match(/^[\-\*] \[( |x|X)\]\s?(.+)/);
      if (tlm) {
        closeOl();
        if (!inUl) { out.push('<ul class="task-list">'); inUl = true; }
        const checked = tlm[1] !== ' ' ? ' checked' : '';
        out.push('<li><input type="checkbox" disabled' + checked + '>' + tlm[2] + '</li>');
        continue;
      }

      // Unordered list
      let ulm = trimmed.match(/^[\-\*]\s(?!\[.\]\s?)(.+)/);
      if (ulm) {
        closeOl();
        if (!inUl) { out.push('<ul>'); inUl = true; }
        out.push('<li>' + ulm[1] + '</li>');
        continue;
      }

      // Ordered list
      let olm = trimmed.match(/^\d+\.\s(.+)/);
      if (olm) {
        closeUl();
        if (!inOl) { out.push('<ol>'); inOl = true; }
        out.push('<li>' + olm[1] + '</li>');
        continue;
      }

      // Definition list
      let dlm = trimmed.match(/^:\s(.+)/);
      if (dlm) {
        closeUl(); closeOl();
        if (!inDl) { out.push('<dl>'); inDl = true; }
        out.push('<dd>' + dlm[1] + '</dd>');
        continue;
      }
      // Check if previous line could be a dt (plain text followed by : definition)
      if (i + 1 < lines.length && lines[i + 1].trim().match(/^:\s/)) {
        closeUl(); closeOl();
        if (!inDl) { out.push('<dl>'); inDl = true; }
        out.push('<dt>' + trimmed + '</dt>');
        continue;
      }

      // Table
      if (trimmed.includes('|') && trimmed.startsWith('|')) {
        closeUl(); closeOl();
        const cells = trimmed.split('|').filter(c => c.trim() !== '');
        // Skip separator rows
        if (cells.every(c => /^[\-\:]+$/.test(c.trim()))) continue;

        const nextLineIsSep = (i + 1 < lines.length &&
          lines[i + 1].trim().startsWith('|') &&
          lines[i + 1].trim().split('|').filter(c => c.trim() !== '').every(c => /^[\-\:]+$/.test(c.trim())));

        const tag = (nextLineIsSep || (!inTable && cells.length > 0)) ? 'th' : 'td';

        if (!inTable) { out.push('<table>'); inTable = true; }
        out.push('<tr>' + cells.map(c => '<' + tag + '>' + c.trim() + '</' + tag + '>').join('') + '</tr>');
        continue;
      } else if (inTable) {
        out.push('</table>'); inTable = false;
      }

      // Normal paragraph
      closeLists();
      out.push('<p>' + trimmed + '</p>');
    }
    closeLists();

    html = out.join('\n');

    // Phase 4: inline formatting (after blocks)
    // Images ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // Bold **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic *text* (but not **)
    html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
    // Strikethrough ~~text~~
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

    // Phase 5: restore protected blocks
    html = html.replace(/\x00B(\d+)\x00/g, (_, idx) => blocks[parseInt(idx)] || '');

    return html;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }

  // ============================================================
  //  Streaming API Call
  // ============================================================

  async function callAPIStream(messages, onChunk) {
    // Create new AbortController and store for potential cancellation
    abortController = new AbortController();

    const payload = {
      model: getSelectedModel(),
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 16384,
      stream: true
    };

    const response = await fetch(API_CONFIG.chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`
      },
      body: JSON.stringify(payload),
      signal: abortController.signal
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error ${response.status}: ${errBody.slice(0, 200)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // Flush any remaining data in the decoder
        buffer += decoder.decode();
        const lines = buffer.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              onChunk(fullContent);
            }
          } catch (e) { /* skip malformed chunks */ }
        }
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const json = JSON.parse(data);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            fullContent += delta;
            onChunk(fullContent);
          }
        } catch (e) { /* skip malformed chunks */ }
      }
    }

    return fullContent;
  }

  // ---- Send Message ----
  async function sendMessage() {
    // If loading, stop instead
    if (isLoading) {
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
      const el = document.getElementById('streaming-bubble');
      if (el) {
        el.removeAttribute('id');
        const cursor = el.querySelector('.stream-cursor');
        if (cursor) cursor.remove();
      }
      return;
    }
    const content = chatInput.value.trim();
    if (!content) return;

    if (!getActiveChat()) createNewChat();
    welcomeMessage.style.display = 'none';

    addMessage('user', content);
    appendMessageBubble('user', content);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    renderHistory();

    // Create streaming bubble
    const streamWrapper = document.createElement('div');
    streamWrapper.className = 'message assistant';
    streamWrapper.id = 'streaming-bubble';
    const streamBubble = document.createElement('div');
    streamBubble.className = 'message-bubble';
    streamBubble.innerHTML = '<span class="stream-cursor">▌</span>';
    streamWrapper.appendChild(streamBubble);
    messagesContainer.appendChild(streamWrapper);
    scrollToBottom();

    isLoading = true;
    btnSend.classList.add('stopping');
    btnSend.title = '停止生成';

    try {
      const chat = getActiveChat();
      const conversationMessages = chat.messages.filter(m => m.role !== 'system');

      const fullReply = await callAPIStream(conversationMessages, (partial) => {
        streamBubble.innerHTML = formatContent(partial) + '<span class="stream-cursor">▌</span>';
        scrollToBottom();
      });

      // Remove cursor, final render
      streamBubble.innerHTML = formatContent(fullReply);
      streamWrapper.removeAttribute('id');
      addMessage('assistant', fullReply);
      renderHistory();
    } catch (err) {
      const el = document.getElementById('streaming-bubble');
      if (el) el.remove();
      // Don't show error for intentional aborts
      if (err.name !== 'AbortError') {
        appendErrorBubble(err.message);
      }
    } finally {
      abortController = null;
      isLoading = false;
      btnSend.classList.remove('stopping');
      btnSend.title = '发送 (Enter)';
      chatInput.focus();
    }
  }

  // ---- Event Listeners ----
  btnSend.addEventListener('click', sendMessage);

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
  });

  btnNewChat.addEventListener('click', createNewChat);

  // ---- Sidebar Toggle ----
  if (btnToggleSidebar && sidebar) {
    btnToggleSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      btnToggleSidebar.textContent = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    });
  }

  // ---- Export Chat ----
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const chat = getActiveChat();
      if (!chat || chat.messages.length === 0) return;

      let md = '# ' + (chat.title || 'Tang Shu Chat') + '\n\n';
      md += '*Exported from 唐姝 · Chat*\n\n---\n\n';

      chat.messages.forEach(msg => {
        const role = msg.role === 'user' ? '**You**' : '**Tang Shu**';
        md += '### ' + role + '\n\n';
        md += msg.content + '\n\n---\n\n';
      });

      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (chat.title || 'tangshu-chat').replace(/[^a-zA-Z0-9一-鿿]/g, '_') + '.md';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // ---- Init ----
  loadChats();
  loadActiveChatId();
  renderHistory();
  renderMessages();
  fetchModels();
  chatInput.focus();
});
