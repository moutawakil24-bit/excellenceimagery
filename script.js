// year
document.getElementById("year").textContent = new Date().getFullYear();

// mobile menu
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
  menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// reveal animation
const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
  });
},{threshold:0.2});
reveals.forEach(r=>obs.observe(r));

// image modal
const imgs=document.querySelectorAll('.gallery-grid img');
const modal=document.getElementById('imgModal');
const modalImg=document.getElementById('modalImg');
const closeBtn=document.querySelector('.close');

imgs.forEach(img=>{
  img.addEventListener('click',()=>{
    modal.classList.add('show');
    modalImg.src=img.src;
  });
});
closeBtn.addEventListener('click',()=>modal.classList.remove('show'));
modal.addEventListener('click',e=>{
  if(e.target===modal)modal.classList.remove('show');
});
