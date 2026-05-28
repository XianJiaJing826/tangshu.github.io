
const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('show');
}
});
},{threshold:.15});

document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

const parallaxNodes = document.querySelectorAll('[data-parallax]');

if(parallaxNodes.length){
const updateParallax = ()=>{
const offset = window.scrollY || window.pageYOffset;
parallaxNodes.forEach(node=>{
const speed = Number(node.dataset.parallax || 0);
node.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
});
};

updateParallax();
window.addEventListener('scroll', updateParallax, { passive:true });
}
