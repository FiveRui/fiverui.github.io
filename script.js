const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav.classList.contains('open')){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width: 761px)').addEventListener('change',closeMenu);
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('wuruifive1112@163.com');status.textContent='邮箱已复制，可以粘贴到邮件应用。';}catch{status.textContent='未能自动复制，请长按或选中邮箱地址复制：wuruifive1112@163.com';}});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));
const research=[{title:'情感计算',description:'从表情识别出发，探索机器对情感的理解。'},{title:'多模态理解与生成',description:'连接不同模态的信息，探索更完整的语义表达。'},{title:'具身智能',description:'关注感知、理解与行动之间的联系。'}];
let selected=0;
document.querySelectorAll('[data-research]').forEach(button=>button.addEventListener('click',()=>{selected=Number(button.dataset.research);document.querySelectorAll('[data-research]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelector('#research-title').textContent=research[selected].title;document.querySelector('#research-description').textContent=research[selected].description;render();}));
const canvas=document.querySelector('#intelligence-field');
const context=canvas.getContext('2d');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let width=0,height=0,angle=.25,visible=true,frame=0,last=0;
const points=Array.from({length:380},(_,i)=>{const y=1-i/379*2,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));return {x:Math.cos(a)*r,y,z:Math.sin(a)*r};});
function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;if(context){context.setTransform(dpr,0,0,dpr,0,0);render();}}
function render(){if(!context)return;context.clearRect(0,0,width,height);const radius=Math.min(width*.32,height*.29),cx=width*.5,cy=height*.39;const projected=points.map((p,i)=>{let x=p.x,y=p.y,z=p.z;if(selected===1){x*=1.13;y*=.7;z+=Math.sin(i*.18)*.16;}if(selected===2){const a=i*.17;x=Math.cos(a)*(0.55+.25*Math.cos(i*.04));z=Math.sin(a)*(0.55+.25*Math.cos(i*.04));y=p.y;}const rx=x*Math.cos(angle)+z*Math.sin(angle),rz=-x*Math.sin(angle)+z*Math.cos(angle);const yy=y*Math.cos(.25)-rz*Math.sin(.25),zz=y*Math.sin(.25)+rz*Math.cos(.25);return{x:cx+rx*radius,y:cy+yy*radius,z:zz};});projected.forEach((p,i)=>{if(i%3===0){for(let j=i+1;j<Math.min(i+15,projected.length);j++){const q=projected[j],distance=Math.hypot(p.x-q.x,p.y-q.y);if(distance<radius*.27 && distance>radius*.09){context.strokeStyle=`rgba(165,205,222,${.065+(p.z+1)*.035})`;context.lineWidth=.6;context.beginPath();context.moveTo(p.x,p.y);context.lineTo(q.x,q.y);context.stroke();}}}context.fillStyle=`rgba(197,227,238,${.25+(p.z+1)*.32})`;context.beginPath();context.arc(p.x,p.y,.65+(p.z+1)*.6,0,Math.PI*2);context.fill();});context.strokeStyle='rgba(171,209,226,.22)';context.lineWidth=.7;context.beginPath();context.ellipse(cx,cy,radius*1.28,radius*.31,-.34,0,Math.PI*2);context.stroke();}
function animate(time){frame=0;if(!visible||document.hidden||motionPreference.matches)return;if(time-last>32){angle+=.0035;render();last=time;}frame=requestAnimationFrame(animate);}
function start(){if(frame)cancelAnimationFrame(frame);frame=0;if(visible&&!document.hidden&&!motionPreference.matches)frame=requestAnimationFrame(animate);else render();}
new ResizeObserver(resize).observe(canvas);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start();}).observe(canvas);
document.addEventListener('visibilitychange',start);motionPreference.addEventListener('change',start);resize();
