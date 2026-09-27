const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=document.querySelectorAll('.reveal');
if(reduced){reveals.forEach(el=>el.classList.add('show'));}else{const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}}),{threshold:.1});reveals.forEach(el=>io.observe(el));}

const nav=document.querySelector('#nav');
const menu=document.querySelector('#mainNav');
const toggle=document.querySelector('#menuToggle');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>30),{passive:true});
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Ouvrir le menu');}));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...menu.querySelectorAll('a')];
const spy=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>spy.observe(s));

const questions=[
"Aimes-tu organiser des informations et rendre les choses plus claires ?",
"Te sens-tu à l'aise avec les outils numériques et bureautiques ?",
"Aimes-tu alterner entre plusieurs types de tâches ?",
"Le fonctionnement d'une entreprise, d'une association ou d'une administration t'intéresse-t-il ?",
"Aimes-tu communiquer et travailler avec différents interlocuteurs ?"
];
let index=0,score=0;
const q=document.querySelector('#question'),progress=document.querySelector('#progress'),fill=document.querySelector('#progressFill'),area=document.querySelector('#qarea'),result=document.querySelector('#result'),resultTitle=document.querySelector('#resultTitle'),resultText=document.querySelector('#resultText'),restart=document.querySelector('#restart');
function updateQuiz(){q.textContent=questions[index];progress.textContent='QUESTION '+String(index+1).padStart(2,'0')+' / '+String(questions.length).padStart(2,'0');fill.style.width=((index+1)/questions.length*100)+'%';}
function finish(){area.hidden=true;result.hidden=false;fill.style.width='100%';progress.textContent='TERMINÉ';if(score>=4){resultTitle.textContent='Un profil à explorer';resultText.textContent="Plusieurs dimensions d’AGOrA semblent rejoindre tes préférences. Découvre maintenant les activités réelles de la formation et échange avec l’équipe éducative.";}else if(score>=2){resultTitle.textContent='Des points communs';resultText.textContent="Certains aspects d’AGOrA pourraient t’intéresser. Compare les activités concrètes avec d’autres formations pour préciser ton projet.";}else{resultTitle.textContent='À découvrir sans conclusion hâtive';resultText.textContent="Tes réponses correspondent moins aux exemples proposés ici, mais ce mini-quiz ne décide pas d’une orientation. Une visite et un échange restent les meilleurs moyens de te faire une idée.";}}
document.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{score+=Number(btn.dataset.v);index++;index<questions.length?updateQuiz():finish();}));
restart.addEventListener('click',()=>{index=0;score=0;area.hidden=false;result.hidden=true;updateQuiz();q.focus?.();});
updateQuiz();