
/* ── PROGRESS BAR ── */
window.addEventListener('scroll',()=>{
  const d=document.documentElement;
  const pct=(d.scrollTop/(d.scrollHeight-d.clientHeight))*100;
  document.getElementById('progress').style.width=pct+'%';
  document.getElementById('btt').classList.toggle('show',d.scrollTop>300);
  document.getElementById('navbar').classList.toggle('scrolled',d.scrollTop>30);
});

/* ── CUSTOM CURSOR (desktop) ── */
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
if(window.innerWidth>900){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';
  });
  function animRing(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a,button,.sc,.sol,.atout,.fi,.hps,.step,.soc').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      cur.style.transform='translate(-50%,-50%) scale(2.5)';
      ring.style.width='56px';ring.style.height='56px';
      ring.style.borderColor='rgba(126,211,72,.7)';
    });
    el.addEventListener('mouseleave',()=>{
      cur.style.transform='translate(-50%,-50%) scale(1)';
      ring.style.width='36px';ring.style.height='36px';
      ring.style.borderColor='rgba(126,211,72,.5)';
    });
  });
} else {
  cur.style.display='none';
  ring.style.display='none';
}

/* ── ACTIVE NAV ── */
const secs=document.querySelectorAll('section[id]');
const lks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur2='';
  secs.forEach(s=>{ if(window.scrollY>=s.offsetTop-80) cur2=s.id; });
  lks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur2));
});

/* ── BURGER ── */
function toggleMenu(){
  document.getElementById('burger').classList.toggle('open');
  const m=document.getElementById('mobMenu');
  m.classList.toggle('open');
  document.body.style.overflow=m.classList.contains('open')?'hidden':'';
}
function closeMenu(){
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobMenu').classList.remove('open');
  document.body.style.overflow='';
}

/* ── PARTICLES ── */
const pContainer=document.getElementById('particles');
for(let i=0;i<22;i++){
  const p=document.createElement('div');
  p.className='particle';
  const sz=Math.random()*4+2;
  p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;
    animation-duration:${Math.random()*12+8}s;
    animation-delay:${Math.random()*10}s;`;
  pContainer.appendChild(p);
}

/* ── TYPEWRITER ── */
const words=['Transformation Digitale','Innovation Numérique','Modernisation','Performance'];
let wi=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
function typeLoop(){
  const w=words[wi];
  tw.textContent=del?w.slice(0,ci--):(w.slice(0,ci++));
  if(!del&&ci>w.length){setTimeout(()=>{del=true;typeLoop();},1800);return;}
  if(del&&ci<0){del=false;wi=(wi+1)%words.length;ci=0;}
  setTimeout(typeLoop,del?55:90);
}
setTimeout(typeLoop,1200);

/* ── COUNTERS ── */
function animCount(el){
  const target=parseInt(el.dataset.count);
  const suf=el.dataset.suffix||'';
  const dur=1800;const step=dur/60;
  let cur=0;
  const inc=target/60;
  const t=setInterval(()=>{
    cur=Math.min(cur+inc,target);
    el.textContent=Math.floor(cur)+suf;
    if(cur>=target)clearInterval(t);
  },step);
}
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(animCount);
      cObs.unobserve(e.target);
    }
  });
},{threshold:.4});
document.querySelectorAll('#counters,#accueil .hero-right').forEach(el=>cObs.observe(el));

/* ── REVEAL ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible');});
},{threshold:.08});
document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-sc').forEach(el=>obs.observe(el));

/* Stagger */
['.srv-grid .sc','.sol-grid .sol','.at-grid .atout','.steps .step','.faq-grid .fi','.ctr-grid .ctr-item'].forEach(sel=>{
  document.querySelectorAll(sel).forEach((el,i)=>{el.style.transitionDelay=(i*0.09)+'s';});
});

/* ── FAQ ── */
function toggleFaq(el){
  const isOpen=el.classList.contains('open');
  document.querySelectorAll('.fi').forEach(i=>i.classList.remove('open'));
  if(!isOpen)el.classList.add('open');
}

/* ── FORM ── */
function sendForm(){
  const fn=document.getElementById('fn').value.trim();
  const em=document.getElementById('em').value.trim();
  const dom=document.getElementById('dom').value;
  const msg=document.getElementById('msg').value.trim();
  if(!fn||!em||!dom||!msg){alert('Veuillez remplir tous les champs obligatoires (*).');return;}
  const btn=document.querySelector('.f-sub');
  btn.textContent='✅ Message envoyé !';
  btn.style.background='linear-gradient(135deg,var(--lime),#48a020)';
  btn.disabled=true;
  document.getElementById('ok').style.display='block';
  document.getElementById('ok').scrollIntoView({behavior:'smooth',block:'nearest'});
}

/* ── RIPPLE on buttons ── */
document.querySelectorAll('.btn-p,.btn-o,.nav-cta,.f-sub').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const r=document.createElement('span');
    const rect=this.getBoundingClientRect();
    r.style.cssText=`position:absolute;border-radius:50%;background:rgba(255,255,255,.25);
      width:0;height:0;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;
      transform:translate(-50%,-50%);animation:ripple .6s ease-out forwards;pointer-events:none;`;
    this.style.position='relative';this.style.overflow='hidden';
    this.appendChild(r);setTimeout(()=>r.remove(),700);
  });
});
const rs=document.createElement('style');
rs.textContent='@keyframes ripple{to{width:300px;height:300px;opacity:0}}';
document.head.appendChild(rs);


document.addEventListener('DOMContentLoaded', function(){
  const toggleBtn = document.getElementById('waToggle');
  const chatbox = document.getElementById('waChatbox');
  const minimizeBtn = document.getElementById('waMinimize');
  const closeBtn = document.getElementById('waClose');
  const sendBtn = document.getElementById('waSend');
  const input = document.getElementById('waInput');
  const badge = document.querySelector('.wa-badge');

  const emojiBtn = document.getElementById('waEmojiBtn');
  const emojiPicker = document.getElementById('emojiPicker');

  emojiBtn.onclick = () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
  };

  emojiPicker.addEventListener('emoji-click', event => {
    input.value += event.detail.unicode;
    input.focus();
  });

  document.addEventListener('click', e => {
    if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
      emojiPicker.style.display = 'none';
    }
  });


  if(!toggleBtn) return;

  toggleBtn.onclick = () => {
    chatbox.classList.toggle('show');
    if(badge) badge.style.display = 'none';
  };
  
  minimizeBtn.onclick = () => chatbox.classList.remove('show');
  closeBtn.onclick = () => chatbox.classList.remove('show');

  sendBtn.onclick = () => {
    const msg = input.value.trim();
    if(!msg) return;
    const phone = "2290159051823"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    input.value = '';
    chatbox.classList.remove('show');
  }
});