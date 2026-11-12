(() => {
'use strict';
const $=id=>document.getElementById(id);
const saved=(k,d)=>{try{return JSON.parse(localStorage.getItem('afetYol:'+k))??d}catch{return d}};
let prefs=saved('prefs',{theme:'dark',sound:true});
let notices=saved('notices',[]);
const css=document.createElement('style');
css.textContent=`
body.light-mode{--bg:#f1f6f7;--panel:#fff;--panel2:#e7eff0;--line:#cbd9dc;--text:#142b31;--muted:#536b71;color-scheme:light}
body.light-mode .field input,body.light-mode .field select,body.light-mode .metric,body.light-mode .place{background:#f5f8f9;color:#142b31}
.extra-tools{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}
.extra-tools button{font-size:12px}
.extra-section{background:var(--panel);border:1px solid var(--line);border-radius:15px;padding:14px;margin:12px 0}
.extra-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}
.extra-stat{background:var(--panel2);border:1px solid var(--line);border-radius:11px;padding:12px}
.extra-stat b{display:block;font-size:20px}
.extra-stat small,.extra-note{color:var(--muted);font-size:12px}
.extra-nav{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}
.extra-nav button[aria-current=page]{border-color:var(--mint);color:var(--mint)}
@media(max-width:650px){.extra-nav{position:sticky;bottom:4px;z-index:800;background:var(--panel);padding:7px;border-radius:12px;justify-content:space-around}.extra-nav button{font-size:11px;padding:7px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
`;
document.head.append(css);
const top=document.querySelector('.top');
const tools=document.createElement('div');tools.className='extra-tools';
tools.innerHTML='<button id="xTheme">🌗 Tema</button><button id="xSound">🔊 Ses</button><button id="xVoice">🎙️ Sesli komut</button><button id="xRead">🔈 Ekranı oku</button><button id="xNotice">🔔 Bildirimler</button><button id="xSettings">⚙️ Ayarlar</button>';
top.after(tools);
const nav=document.createElement('nav');nav.className='extra-nav';nav.setAttribute('aria-label','Ana menü');
nav.innerHTML='<button data-view="home" aria-current="page">⌂ Ana sayfa</button><button data-view="map">🗺️ Harita</button><button data-view="lab">🧪 Simülasyon</button><button data-view="data">📊 Veri kaynakları</button>';
tools.after(nav);
const dashboard=document.createElement('section');dashboard.className='extra-section';dashboard.id='xDashboard';
dashboard.innerHTML='<h2>AfetYol AI · Kontrol Merkezi</h2><div class="extra-grid"><div class="extra-stat"><b id="xPlaces">—</b><small>Bulunan nokta</small></div><div class="extra-stat"><b id="xDistance">—</b><small>Son rota mesafesi</small></div><div class="extra-stat"><b id="xAlerts">'+notices.length+'</b><small>Yerel bildirim</small></div></div><p class="extra-note">Bu panel mevcut prototipteki verileri gösterir; doğrulanmış afet riski veya resmî uyarı kaynağı değildir.</p>';
document.querySelector('.layout').before(dashboard);
const lab=document.createElement('section');lab.className='extra-section';lab.id='xLab';
lab.innerHTML='<h2>Simülasyon laboratuvarı</h2><p class="extra-note">Sentetik örnek ağ üzerinde Dijkstra ve A* algoritmaları karşılaştırılır. Bu ağ gerçek Melikgazi yol verisi değildir.</p><button id="xRunLab">Algoritmaları çalıştır</button><div id="xLabResult" class="extra-note">Henüz test yapılmadı.</div>';
dashboard.after(lab);
const data=document.createElement('section');data.className='extra-section';data.id='xData';
data.innerHTML='<h2>Veri kaynakları ve güncellik</h2><ul class="extra-note"><li>Harita: OpenStreetMap.</li><li>POI: Overpass API; eksik veya eski kayıtlar olabilir.</li><li>Adres: Nominatim.</li><li>Rota: OSM tabanlı harici rota servisleri.</li><li>AFAD/belediye doğrulanmış toplanma alanı, canlı yol kapanması, bina hasarı ve mahalle nüfusu henüz bağlı değil.</li></ul><p class="extra-note">Konum tarayıcı iznine bağlıdır. Bu prototipte hesap/sunucu tabanlı kullanıcı kaydı yoktur.</p>';
lab.after(data);
function save(){try{localStorage.setItem('afetYol:prefs',JSON.stringify(prefs))}catch{}}
function tone(freq=520){if(!prefs.sound)return;try{const C=AudioContext||webkitAudioContext,c=new C(),o=c.createOscillator(),g=c.createGain();o.frequency.value=freq;g.gain.value=.035;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.055);o.onended=()=>c.close()}catch{}}
function apply(){document.body.classList.toggle('light-mode',prefs.theme==='light');$('xTheme').textContent=prefs.theme==='light'?'🌙 Açık tema':'☀️ Koyu tema';$('xSound').textContent=prefs.sound?'🔊 Ses açık':'🔇 Ses kapalı'}
apply();
$('xTheme').onclick=()=>{prefs.theme=prefs.theme==='dark'?'light':'dark';save();apply();tone()};
$('xSound').onclick=()=>{prefs.sound=!prefs.sound;save();apply();tone()};
$('xSettings').onclick=()=>{const lang=prompt('Dil seçimi: tr veya en','tr');if(lang==='tr'||lang==='en'){prefs.lang=lang;save();alert('Dil tercihi kaydedildi. Metinlerin tamamı henüz çevrilmedi.')}};
$('xNotice').onclick=()=>{const msg=notices.map(n=>n.title+': '+n.body).join('\n')||'Henüz bildirim yok.';alert(msg)};
$('xRead').onclick=()=>{if(!('speechSynthesis'in window)){alert('Bu tarayıcı sesli okumayı desteklemiyor.');return}if(speechSynthesis.speaking){speechSynthesis.cancel();return}const u=new SpeechSynthesisUtterance(document.querySelector('.sidebar').innerText);u.lang='tr-TR';speechSynthesis.speak(u)};
$('xVoice').onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert('Sesli komut bu tarayıcıda desteklenmiyor.');return}const r=new SR();r.lang='tr-TR';r.onresult=e=>{const s=e.results[0][0].transcript.toLocaleLowerCase('tr-TR');if(s.includes('konum'))$('locateBtn').click();else if(s.includes('nokta'))$('nearbyBtn').click();else if(s.includes('rota'))$('routeBtn').click();else alert('Komut: konumumu bul, noktaları getir veya rota oluştur.')};r.start()};
function show(view){dashboard.hidden=view!=='home';lab.hidden=view!=='lab';data.hidden=view!=='data';document.querySelector('.layout').hidden=view==='lab'||view==='data';if(view==='map')document.querySelector('.layout').hidden=false;nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-current',b.dataset.view===view?'page':'false'));if(view==='map')setTimeout(()=>dispatchEvent(new Event('resize')),80)}
nav.querySelectorAll('button').forEach(b=>b.onclick=()=>{tone();show(b.dataset.view)});
function dijkstra(g,s,t){const d={},prev={},q=new Set(Object.keys(g));q.forEach(n=>d[n]=Infinity);d[s]=0;while(q.size){let u=[...q].sort((a,b)=>d[a]-d[b])[0];q.delete(u);if(u===t||d[u]===Infinity)break;for(const [v,w] of g[u])if(q.has(v)&&d[u]+w<d[v]){d[v]=d[u]+w;prev[v]=u}}const path=[];if(d[t]<Infinity){let n=t;while(n){path.unshift(n);n=prev[n]}}return {distance:d[t],path}}
function astar(g,xy,s,t){const h=n=>Math.hypot(xy[n][0]-xy[t][0],xy[n][1]-xy[t][1]),open=new Set([s]),came={},cost={[s]:0},f={[s]:h(s)};while(open.size){let u=[...open].sort((a,b)=>(f[a]??Infinity)-(f[b]??Infinity))[0];if(u===t){let p=[u];while(came[u]){u=came[u];p.unshift(u)}return {distance:cost[t],path:p}}open.delete(u);for(const [v,w] of g[u]){const n=cost[u]+w;if(n<(cost[v]??Infinity)){came[v]=u;cost[v]=n;f[v]=n+h(v);open.add(v)}}}return {distance:Infinity,path:[]}}
$('xRunLab').onclick=()=>{const xy={A:[0,0],B:[1,1],C:[2,0],D:[3,1],E:[4,0],F:[2,2]},g={A:[['B',1.4],['C',2]],B:[['A',1.4],['C',1.4],['F',1.2]],C:[['A',2],['B',1.4],['D',1.4]],D:[['C',1.4],['E',1.4],['F',1.2]],E:[['D',1.4]],F:[['B',1.2],['D',1.2]]};const a=performance.now(),d=dijkstra(g,'A','E'),b=performance.now(),z=astar(g,xy,'A','E'),c=performance.now();$('xLabResult').innerHTML='<p>Dijkstra: '+d.path.join(' → ')+' · maliyet '+d.distance.toFixed(2)+' · '+(b-a).toFixed(3)+' ms</p><p>A*: '+z.path.join(' → ')+' · maliyet '+z.distance.toFixed(2)+' · '+(c-b).toFixed(3)+' ms</p><p>Tek ve küçük sentetik test performans kanıtı değildir.</p>';tone(760)};
const observer=new MutationObserver(()=>{$('xPlaces').textContent=$('placeCount')?.textContent||'—';$('xDistance').textContent=$('distanceValue')?.textContent||'—'});['placeCount','distanceValue'].forEach(id=>{if($(id))observer.observe($(id),{childList:true,subtree:true,characterData:true})});
$('xPlaces').textContent=$('placeCount')?.textContent||'—';$('xDistance').textContent=$('distanceValue')?.textContent||'—';
window.addEventListener('online',()=>alert('İnternet bağlantısı yeniden geldi.'));
window.addEventListener('offline',()=>alert('Bağlantı kesildi. Harita, arama ve rota servisleri çalışmayabilir.'));
show('home');
})();