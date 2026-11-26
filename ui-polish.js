(()=>{'use strict';
const $=id=>document.getElementById(id);
const app=document.querySelector('.app');
if(!app)return;
const style=document.createElement('style');
style.textContent=`
:root{--ay-accent:#62e6c2;--ay-glow:rgba(98,230,194,.14)}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{background:radial-gradient(ellipse at 12% 0%,rgba(30,95,103,.24),transparent 38%),var(--bg)}
button,a,input,select,textarea{transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}
button:hover{transform:translateY(-1px);box-shadow:0 7px 22px rgba(0,0,0,.16)}
button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid var(--ay-accent);outline-offset:2px}
.app{max-width:1580px}
.top{position:relative;padding:14px 16px;border:1px solid var(--line);border-radius:20px;background:linear-gradient(120deg,rgba(22,49,58,.96),rgba(10,27,32,.92));box-shadow:0 16px 45px rgba(0,0,0,.16)}
.logo{box-shadow:0 0 0 7px var(--ay-glow),0 8px 25px rgba(98,230,194,.18)}
.panel,.research,.feature-wrap{box-shadow:0 12px 34px rgba(0,0,0,.12);backdrop-filter:blur(10px)}
.panel{transition:transform .2s ease,border-color .2s ease}
.panel:hover{border-color:#3d6570}
.notice{line-height:1.65}
#map{border:1px solid var(--line);box-shadow:0 14px 36px rgba(0,0,0,.2)}
.research,.feature-wrap{margin-top:18px;padding:clamp(14px,2vw,22px);border-radius:20px}
.research h2,.feature-wrap h2{font-size:clamp(18px,2vw,23px);letter-spacing:-.025em}
.rcard,.feature-card{border-radius:15px;transition:transform .18s ease,border-color .18s ease}
.rcard:hover,.feature-card:hover{border-color:#3b6c70;transform:translateY(-2px)}
.rcard button,.feature-card button{min-height:40px}
.rcard input[type=checkbox]{width:auto;accent-color:var(--ay-accent)}
.research-nav{position:sticky;top:8px;z-index:20;display:flex;gap:7px;overflow-x:auto;padding:8px;margin:12px 0;border:1px solid var(--line);border-radius:14px;background:color-mix(in srgb,var(--panel) 92%,transparent);backdrop-filter:blur(14px)}
.research-nav button{white-space:nowrap;font-size:12px;padding:8px 11px}
.research-nav button[aria-current=true]{border-color:var(--ay-accent);color:var(--ay-accent);background:var(--ay-glow)}
.ay-dash{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:14px 0}
.ay-stat{padding:13px;border:1px solid var(--line);border-radius:15px;background:linear-gradient(145deg,var(--panel2),var(--panel));min-width:0}
.ay-stat b{display:block;font-size:clamp(20px,3vw,28px);letter-spacing:-.04em}
.ay-stat span{font-size:11px;color:var(--muted)}
.ay-tools{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 14px}
.ay-tools button{font-size:12px}
.ay-toast{position:fixed;z-index:6000;left:50%;bottom:22px;transform:translateX(-50%);max-width:min(92vw,600px);padding:11px 16px;border:1px solid var(--ay-accent);border-radius:12px;background:var(--panel);color:var(--text);box-shadow:0 12px 40px #0008}
.ay-overlay{position:fixed;inset:0;z-index:5500;background:#0009;display:none;align-items:flex-start;justify-content:center;padding:12vh 14px}
.ay-dialog{width:min(650px,100%);padding:15px;border:1px solid var(--line);border-radius:17px;background:var(--panel);box-shadow:0 22px 80px #0009}
.ay-dialog input{width:100%;padding:13px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--text)}
.ay-command-list{display:grid;gap:6px;margin-top:10px;max-height:48vh;overflow:auto}
.ay-command-list button{text-align:left;display:flex;justify-content:space-between;gap:10px}
.ay-command-list small{color:var(--muted)}
.ay-progress{height:5px;background:var(--panel2);border-radius:99px;overflow:hidden;margin:10px 0}
.ay-progress>i{display:block;height:100%;width:0;background:var(--ay-accent);transition:width .25s}
.ay-skip{position:absolute;left:-9999px;top:8px;background:var(--panel);padding:10px;border-radius:8px;z-index:7000}
.ay-skip:focus{left:10px}
@media(max-width:760px){.ay-dash{grid-template-columns:repeat(2,minmax(0,1fr))}.top{padding:12px}.status{max-width:110px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
@media print{body{background:white!important;color:#111!important}.ay-tools,.research-nav,.status,button{display:none!important}.panel,.research,.feature-wrap{box-shadow:none!important;break-inside:avoid;background:white!important;color:#111!important;border:1px solid #bbb!important}.muted,.small,.rmuted,.feature-muted{color:#444!important}}
`;
document.head.append(style);
const skip=document.createElement('a');skip.className='ay-skip';skip.href='#researchLab';skip.textContent='Araştırma modülüne geç';app.prepend(skip);
const research=$('researchLab')||document.querySelector('.research');
if(research){
 const dash=document.createElement('div');dash.className='ay-dash';dash.innerHTML='<div class="ay-stat"><b id="ayStatExperiments">0</b><span>Kaydedilen deney</span></div><div class="ay-stat"><b id="ayStatDecisions">0</b><span>Proje kararı</span></div><div class="ay-stat"><b id="ayStatSources">0</b><span>Kaynak kaydı</span></div><div class="ay-stat"><b id="ayStatStatus">Taslak</b><span>Proje aşaması</span></div>';
 research.insertBefore(dash,research.children[2]||null);
 const nav=document.createElement('nav');nav.className='research-nav';nav.setAttribute('aria-label','Araştırma laboratuvarı bölümleri');
 const sections=[['overview','Genel bakış'],['stress','Senaryo testi'],['allocation','Kaynak planı'],['checklist','Hazırlık'],['sources','Kaynak sicili'],['decisions','Karar günlüğü'],['experiments','Deney defteri']];
 const grid=research.querySelector('.rgrid');
 const cards=grid?Array.from(grid.children):[];
 const cardMap=[null,cards[0],cards[1],cards[2],cards[3],cards[4],cards[5]];
 sections.forEach(([id,label],i)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-current',i===0?'true':'false');b.onclick=()=>{if(i===0){research.scrollIntoView({behavior:'smooth'});return}const card=cardMap[i];card?.scrollIntoView({behavior:'smooth',block:'center'});nav.querySelectorAll('button').forEach(x=>x.setAttribute('aria-current',String(x===b)))};nav.append(b)});
 research.insertBefore(nav,grid);
 const tools=document.createElement('div');tools.className='ay-tools';tools.innerHTML='<button type="button" id="ayCmd">⌘ Komut ara</button><button type="button" id="ayPrint">⎙ Rapor / yazdır</button><button type="button" id="ayTop">↑ Başa dön</button><button type="button" id="ayRefresh">↻ Göstergeleri yenile</button>';research.insertBefore(tools,grid);
 const refresh=()=>{let d={};try{d=JSON.parse(localStorage.getItem('afetYol:research')||'{}')}catch{};$('ayStatExperiments').textContent=(d.experiments||[]).length;$('ayStatDecisions').textContent=(d.decisions||[]).length;$('ayStatSources').textContent=(d.sources||[]).length;$('ayStatStatus').textContent=(d.sources||[]).length?'Araştırılıyor':'Taslak'};
 refresh();
 $('ayRefresh').onclick=()=>{refresh();toast('Göstergeler güncellendi')};
 $('ayPrint').onclick=()=>window.print();
 $('ayTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
 const overlay=document.createElement('div');overlay.className='ay-overlay';overlay.id='ayCommandOverlay';overlay.innerHTML='<div class="ay-dialog" role="dialog" aria-modal="true" aria-label="Komut ara"><input id="ayCommandInput" placeholder="Bir modül ara… (ör. harita, deney, kaynak)"><div class="ay-command-list" id="ayCommandList"></div><p class="rmuted">Kısayol: Ctrl/⌘ + K · Esc ile kapat</p></div>';document.body.append(overlay);
 const cmds=[['Ana harita','map'],['Graf ve algoritma laboratuvarı','featureHub'],['Araştırma laboratuvarı','researchLab'],['Senaryo stres testi','rStress'],['Kaynak dağıtım planı','rAllocate'],['Hazırlık kontrol listesi','rChecks'],['Veri kaynağı sicili','rSources'],['Karar günlüğü','rDecisions'],['Deney defteri','rExperiments'],['Raporu yazdır','ayPrint']];
 const open=()=>{overlay.style.display='flex';$('ayCommandInput').value='';filter('');$('ayCommandInput').focus()};
 function filter(q){$('ayCommandList').innerHTML='';cmds.filter(x=>x[0].toLocaleLowerCase('tr').includes(q.toLocaleLowerCase('tr'))).forEach(([label,id])=>{const b=document.createElement('button');b.type='button';b.innerHTML='<span>'+label+'</span><small>Git ↗</small>';b.onclick=()=>{overlay.style.display='none';if(id==='ayPrint'){window.print();return}const el=$(id);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.focus?.({preventScroll:true})}};$('ayCommandList').append(b)})}
 $('ayCmd').onclick=open;$('ayCommandInput').oninput=e=>filter(e.target.value);overlay.onclick=e=>{if(e.target===overlay)overlay.style.display='none'};
 document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open()}if(e.key==='Escape')overlay.style.display='none'});
}
function toast(message){const t=document.createElement('div');t.className='ay-toast';t.textContent=message;document.body.append(t);setTimeout(()=>t.remove(),2200)}
})();