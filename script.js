// year
document.getElementById("year").textContent = new Date().getFullYear();

// shrink nav on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('shrink',window.scrollY>50));

// mobile menu
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
  menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// reveal on scroll
const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
  });
},{threshold:0.2});
reveals.forEach(r=>obs.observe(r));

// counter
const counters=document.querySelectorAll('.stat-value');
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;
      const target=+el.dataset.target;
      let c=0;
      const step=()=>{
        c+=Math.ceil(target/60);
        if(c<target){el.textContent=c;requestAnimationFrame(step);}
        else el.textContent=target;
      };
      step();
      cObs.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>cObs.observe(c));

// lightbox
const lb=document.getElementById('lightbox');
const lbImg=document.getElementById('lightboxImage');
const lbCap=document.getElementById('lightboxCaption');
const imgs=document.querySelectorAll('#galleryGrid img');
let idx=0;
function openLB(i){
  const img=imgs[i];
  lbImg.src=img.dataset.full;
  lbCap.textContent=img.alt;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
  idx=i;
}
function closeLB(){lb.classList.remove('open');document.body.style.overflow='';}
function nextLB(){openLB((idx+1)%imgs.length);}
function prevLB(){openLB((idx-1+imgs.length)%imgs.length);}
imgs.forEach((img,i)=>img.addEventListener('click',()=>openLB(i)));
document.querySelector('.lightbox-close').onclick=closeLB;
document.querySelector('.lightbox-next').onclick=nextLB;
document.querySelector('.lightbox-prev').onclick=prevLB;
lb.addEventListener('click',e=>{if(e.target===lb)closeLB();});
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')closeLB();
  if(e.key==='ArrowRight')nextLB();
  if(e.key==='ArrowLeft')prevLB();
});
