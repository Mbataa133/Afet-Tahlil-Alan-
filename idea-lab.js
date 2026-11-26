(() => {
'use strict';
if (document.getElementById('ideaLab')) return;
const $ = id => document.getElementById(id);
const safe = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load = (k,d) => { try { return JSON.parse(localStorage.getItem('afetYol:'+k)) ?? d; } catch { return d; } };
const save = (k,v) => { try { localStorage.setItem('afetYol:'+k, JSON.stringify(v)); return true; } catch { return false; } };
const stamp = () => new Date().toLocaleString('tr-TR');
const css = document.createElement('style');
css.textContent = `
.idea-lab{margin:14px 0;padding:16px;border:1px solid var(--line);border-radius:16px;background:var(--panel)}
.idea-lab h2{font-size:19px;margin:0 0 7px}.idea-muted{color:var(--muted);font-size:12px}
.idea-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}
.idea-tabs button[aria-pressed=true]{border-color:var(--mint);color:var(--mint)}
.idea-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.idea-card{min-width:0;border:1px solid var(--line);border-radius:12px;padding:12px;background:var(--panel2)}
.idea-card h3{font-size:14px;margin:0 0 8px}.idea-card label{display:block;font-size:12px;color:var(--muted);margin:8px 0 4px}
.idea-card input,.idea-card select,.idea-card textarea{width:100%;padding:9px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--text)}
.idea-card textarea{min-height:70px}.idea-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}
.idea-result{padding:10px;background:var(--bg);border:1px solid var(--line);border-radius:9px;margin-top:9px;font-size:13px;overflow-wrap:anywhere}
.idea-table{width:100%;border-collapse:collapse;font-size:12px}.idea-table td,.idea-table th{padding:7px;border-bottom:1px solid var(--line);text-align:left}
.idea-badge{display:inline-block;border:1px solid var(--line);border-radius:20px;padding:3px 7px;font-size:11px;margin:2px}
`;
document.head.append(css);
const root = document.createElement('section');
root.id = 'ideaLab'; root.className = 'idea-lab';
root.innerHTML = '<h2>💡 AfetYol AI — Araştırma ve karar destek laboratuvarı</h2><p class="idea-muted">Yeni modüller: rota dayanıklılığı, veri kalite kontrolü, hazırlık kontrol listesi, kaynak kapsama simülasyonu ve karar günlüğü. Simülasyonlar örnek verilerle çalışır; gerçek afet güvenliği veya resmî kurum değerlendirmesi değildir.</p><div class="idea-tabs" id="ideaTabs"></div><div id="ideaContent"></div>';
const layout = document.querySelector('.layout');
if (layout) layout.after(root); else document.querySelector('.app')?.append(root);
const tabs = [['resilience','Rota dayanıklılığı'],['quality','Veri kalite kontrolü'],['coverage','Kaynak kapsaması'],['readiness','Hazırlık kontrolü'],['decisions','Karar günlüğü'],['roadmap','Yeni fikir havuzu']];
const tabRoot = $('ideaTabs'), content = $('ideaContent');
let current = 'resilience';
tabs.forEach(([id,label]) => { const b=document.createElement('button'); b.textContent=label; b.setAttribute('aria-pressed',String(id===current)); b.onclick=()=>render(id); b.dataset.id=id; tabRoot.append(b); });
function panel(html){content.innerHTML=html;}
function render(id){
 current=id; tabRoot.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===id)));
 if(id==='resilience'){
  panel('<div class="idea-grid"><div class="idea-card"><h3>Bağlantı kesintisi simülatörü</h3><p class="idea-muted">Örnek ağda seçilen kenarları devre dışı bırakıp başlangıç-hedef bağlantısını kontrol eder.</p><label>Kapatılacak yol 1</label><select id="cutA"><option value="-1">Yok</option>'+edgeOptions()+'</select><label>Kapatılacak yol 2</label><select id="cutB"><option value="-1">Yok</option>'+edgeOptions()+'</select><div class="idea-actions"><button id="resRun">Dayanıklılığı test et</button></div><div id="resResult" class="idea-result">Örnek A–L bağlantısı bekliyor.</div></div><div class="idea-card"><h3>Bu test neyi gösterir?</h3><p>Tek veya iki yol bağlantısı kesildiğinde örnek graf üzerinde alternatif bağlantı kalıp kalmadığını gösterir.</p><p class="idea-muted">Gerçek yol kapanması, bina hasarı, köprü güvenliği veya tahliye emniyeti verisi kullanmaz.</p><span class="idea-badge">Graf teorisi</span><span class="idea-badge">Dayanıklılık</span><span class="idea-badge">Senaryo testi</span></div></div>');
  $('resRun').onclick=()=>{const removed=[Number($('cutA').value),Number($('cutB').value)].filter(x=>x>=0);const r=shortest('A','L',removed);$('resResult').innerHTML=r.path.length?'<b>Bağlantı mevcut.</b><br>Alternatif yol: '+r.path.join(' → ')+'<br>Toplam temsili maliyet: '+r.cost:'<b>Bağlantı bulunamadı.</b><br>Seçilen kesintiler örnek ağı A–L arasında ayırdı.';};
 }
 if(id==='quality'){
  panel('<div class="idea-grid"><div class="idea-card"><h3>Veri kalite kontrolü</h3><p class="idea-muted">Bir veri kaynağını güncellik, doğrulama ve konum hassasiyeti bakımından puanla.</p><label>Kaynak adı</label><input id="dqName" placeholder="Örn. Belediye toplanma alanı listesi"><label>Güncellik</label><select id="dqFresh"><option value="3">Son 30 gün</option><option value="2">Son 1 yıl</option><option value="1">Tarihi bilinmiyor</option><option value="0">Eski olduğu biliniyor</option></select><label>Doğrulama düzeyi</label><select id="dqVerify"><option value="3">Resmî ve doğrulanmış</option><option value="2">İki bağımsız kaynak</option><option value="1">Tek topluluk kaydı</option><option value="0">Doğrulanmamış bildirim</option></select><label>Konum hassasiyeti</label><select id="dqPrecision"><option value="3">Adres / koordinat doğrulandı</option><option value="2">Yaklaşık konum</option><option value="1">Mahalle düzeyi</option><option value="0">Konum bilinmiyor</option></select><button id="dqSave">Kalite kaydını ekle</button><div id="dqResult" class="idea-result"></div></div><div class="idea-card"><h3>Kaynak kalite kayıtları</h3><div id="dqList"></div><p class="idea-muted">Puan, girilen alanların basit toplamıdır; resmî güvenilirlik sertifikası değildir.</p></div></div>');
  const rows=load('qualityRecords',[]); showQuality(rows);
  $('dqSave').onclick=()=>{const name=$('dqName').value.trim();if(!name){$('dqResult').textContent='Kaynak adı gerekli.';return;}const score=Number($('dqFresh').value)+Number($('dqVerify').value)+Number($('dqPrecision').value);rows.unshift({name,score,max:9,date:stamp(),fresh:$('dqFresh').selectedOptions[0].text,verify:$('dqVerify').selectedOptions[0].text,precision:$('dqPrecision').selectedOptions[0].text});save('qualityRecords',rows);$('dqResult').textContent='Kaydedildi: '+score+'/9. Bu puan yalnızca girilen bilgilere dayanır.';showQuality(rows);};
 }
 if(id==='coverage'){
  panel('<div class="idea-grid"><div class="idea-card"><h3>Kaynak kapsama simülatörü</h3><p class="idea-muted">Tamamen varsayımsal mahalle ve kaynak sayılarıyla kapasite/erişim açığını gör.</p><label>Mahalle sayısı</label><input id="cvAreas" type="number" min="1" max="100" value="12"><label>Kaynak noktası sayısı</label><input id="cvPoints" type="number" min="0" max="100" value="4"><label>Bir noktanın hizmet verebildiği mahalle</label><input id="cvReach" type="number" min="1" max="20" value="3"><button id="cvRun">Kapsamayı hesapla</button><div id="cvResult" class="idea-result"></div></div><div class="idea-card"><h3>Geliştirme fikri</h3><p>İleride Melikgazi mahalle sınırları ve resmî hizmet noktaları doğrulanırsa bu modül, hizmet açığı olan bölgeleri haritada gösterebilir.</p><p class="idea-muted">Mevcut hesap yalnızca basit kapasite tahminidir; gerçek yürüme mesafesi veya nüfus dağılımı içermez.</p></div></div>');
  $('cvRun').onclick=()=>{const a=Math.max(1,Math.min(100,Number($('cvAreas').value)||1)),p=Math.max(0,Math.min(100,Number($('cvPoints').value)||0)),r=Math.max(1,Math.min(20,Number($('cvReach').value)||1)),served=Math.min(a,p*r);$('cvResult').innerHTML='Varsayımsal kapsanan mahalle: <b>'+served+'/'+a+'</b><br>Varsayımsal açık: <b>'+(a-served)+'</b><br>Kapsama oranı: <b>'+(100*served/a).toFixed(1)+'%</b>';};
 }
 if(id==='readiness'){
  const items=['Aile iletişim kişileri belirlendi','Acil durum çantası ve temel ihtiyaçlar kontrol edildi','Evde güvenli alanlar ve çıkışlar konuşuldu','Buluşma noktası aileyle paylaşıldı','Önemli belgelerin güvenli kopyası hazır','Engelli/yaşlı bireylerin destek ihtiyacı planlandı','Evcil hayvanlar için temel plan yapıldı','Resmî AFAD bilgilendirmeleri incelendi'];
  const checks=load('readinessChecks',[]);
  panel('<div class="idea-grid"><div class="idea-card"><h3>Afet hazırlık kontrol listesi</h3><p class="idea-muted">Bu liste kişisel hazırlık farkındalığı içindir; resmî talimatların yerine geçmez.</p>'+items.map((x,i)=>'<label style="display:flex;gap:8px;align-items:flex-start"><input type="checkbox" data-check="'+i+'" '+(checks.includes(i)?'checked':'')+' style="width:auto;margin-top:3px">'+safe(x)+'</label>').join('')+'<div class="idea-result" id="readyResult"></div></div><div class="idea-card"><h3>İleride eklenebilecek modül</h3><p>AFAD'ın yayımladığı güncel, kamuya açık hazırlık içeriklerine kaynak bağlantısı ve içerik güncelleme tarihi eklenebilir. Bu sürüm herhangi bir resmî kontrol listesiyle otomatik eşleşmiyor.</p></div></div>');
  function update(){const selected=[...content.querySelectorAll('[data-check]:checked')].map(x=>Number(x.dataset.check));save('readinessChecks',selected);$('readyResult').textContent=selected.length+'/'+items.length+' madde işaretlendi ('+(100*selected.length/items.length).toFixed(0)+'%).';}
  content.querySelectorAll('[data-check]').forEach(x=>x.onchange=update);update();
 }
 if(id==='decisions'){
  panel('<div class="idea-grid"><div class="idea-card"><h3>Proje karar günlüğü</h3><label>Karar / varsayım</label><textarea id="decText" placeholder="Örn. Resmî kaynak doğrulanana kadar toplanma alanları doğrulanmış gibi gösterilmeyecek."></textarea><label>Durum</label><select id="decStatus"><option>Öneri</option><option>Test edilecek</option><option>Kabul edildi</option><option>Reddedildi</option></select><label>Gerekçe</label><textarea id="decWhy" placeholder="Neden bu karar alındı?"></textarea><button id="decAdd">Kararı kaydet</button></div><div class="idea-card"><h3>Geçmiş kararlar</h3><div id="decList"></div><button id="decExport">Kararları CSV indir</button></div></div>');
  const decisions=load('decisionLog',[]); showDecisions(decisions);
  $('decAdd').onclick=()=>{const text=$('decText').value.trim();if(!text)return;decisions.unshift({text,status:$('decStatus').value,why:$('decWhy').value.trim(),date:stamp()});save('decisionLog',decisions);showDecisions(decisions);$('decText').value='';$('decWhy').value='';};
  $('decExport').onclick=()=>download('afetyol-karar-gunlugu.csv','Tarih,Karar,Durum,Gerekçe\n'+decisions.map(x=>[x.date,x.text,x.status,x.why].map(csv).join(',')).join('\n'),'text/csv;charset=utf-8');
 }
 if(id==='roadmap'){
  const ideas=[
  ['Mahalle bazlı erişilebilirlik haritası','Kaldırım, rampa, eğim ve geçiş verisi bulunursa erişilebilir güzergâhları kıyasla.','Orta','OSM + saha doğrulaması'],
  ['Veri soy ağacı','Her harita kaydının kaynağını, son kontrol tarihini ve değişiklik geçmişini göster.','Yüksek','Veri modeli'],
  ['Belirsizlik haritası','Eksik/eskimiş veri olan bölgeleri riskli değil, “veri yetersiz” olarak işaretle.','Yüksek','Kaynak kalite sistemi'],
  ['Afet lojistiği mini optimizasyonu','Talep noktaları, depo kapasitesi ve araç kapasitesi ile örnek dağıtım planı üret.','Yüksek','Doğrulanmış talep ve kapasite verisi'],
  ['Tahmin yerine senaryo karşılaştırma','Deprem/sel/yangın için varsayımları açık senaryoları yan yana kıyasla.','Yüksek','Bilimsel varsayım kaydı'],
  ['Saha doğrulama QR kartı','Yetkili saha ekibi bir noktanın kontrol tarihini ve durumunu QR üzerinden güncelleyebilsin.','Orta','Kimlik doğrulama + backend'],
  ['Mahalle dayanıklılık göstergesi','Erişim, kaynak çeşitliliği ve veri tamlığını ayrı ayrı göster; tek bir yanıltıcı puana indirme.','Orta','Mahalle sınırı + güvenilir veri'],
  ['Algoritma açıklanabilirliği','Seçilen rotanın neden seçildiğini kenar maliyeti ve kısıtlarla adım adım açıkla.','Yüksek','Graf ağırlıkları'],
  ['Dijital ikiz — sınırlı prototip','Önce tek bir mahallede binalar yerine yol bağlantıları ve kaynakları modelle.','Düşük','3B/vektör veri + performans'],
  ['Veri değişim alarmı','Aynı kaydın koordinatı veya etiketi değiştiğinde farkı göster ve tekrar incelemeye al.','Orta','Sürümleme ve veri deposu']
  ];
  panel('<div class="idea-card"><h3>Yeni ürün fikirleri</h3><p class="idea-muted">Öncelik, proje kapsamına katkı ve uygulanabilirliğe göre verilmiştir.</p><table class="idea-table"><tr><th>Fikir</th><th>Öncelik</th><th>Gereksinim</th></tr>'+ideas.map(x=>'<tr><td><b>'+safe(x[0])+'</b><br><span class="idea-muted">'+safe(x[1])+'</span></td><td>'+safe(x[2])+'</td><td>'+safe(x[3])+'</td></tr>').join('')+'</table><div class="idea-actions"><button id="ideasExport">Fikir havuzunu indir</button></div></div>');
  $('ideasExport').onclick=()=>download('afetyol-fikir-havuzu.csv','Fikir,Aciklama,Oncelik,Gereksinim\n'+ideas.map(x=>x.map(csv).join(',')).join('\n'),'text/csv;charset=utf-8');
 }
}
function edgeOptions(){return [['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','D',8],['C','E',10],['D','E',2],['D','F',6],['E','F',3],['E','G',7],['F','H',4],['G','H',1],['G','I',5],['H','I',2],['I','J',3],['J','K',4],['K','L',2],['H','L',9],['B','G',12],['C','F',11]].map((e,i)=>'<option value="'+i+'">'+e[0]+'–'+e[1]+' (maliyet '+e[2]+')</option>').join('');}
function shortest(start,end,removed=[]){const edges=[['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','D',8],['C','E',10],['D','E',2],['D','F',6],['E','F',3],['E','G',7],['F','H',4],['G','H',1],['G','I',5],['H','I',2],['I','J',3],['J','K',4],['K','L',2],['H','L',9],['B','G',12],['C','F',11]];const g={};'ABCDEFGHIJKL'.split('').forEach(n=>g[n]=[]);edges.forEach(([a,b,w],i)=>{if(!removed.includes(i)){g[a].push([b,w]);g[b].push([a,w]);}});const d={},prev={},q=new Set(Object.keys(g));q.forEach(n=>d[n]=Infinity);d[start]=0;while(q.size){let u=[...q].sort((a,b)=>d[a]-d[b])[0];q.delete(u);if(u===end||d[u]===Infinity)break;g[u].forEach(([v,w])=>{if(q.has(v)&&d[u]+w<d[v]){d[v]=d[u]+w;prev[v]=u;}})}const path=[];if(d[end]<Infinity){let n=end;while(n){path.unshift(n);n=prev[n];}}return {path,cost:d[end]};}
function showQuality(rows){const el=$('dqList');if(el)el.innerHTML=rows.map(x=>'<p class="idea-muted"><b>'+safe(x.name)+'</b> — '+x.score+'/'+x.max+' · '+safe(x.date)+'</p>').join('')||'Henüz kayıt yok.';}
function showDecisions(rows){const el=$('decList');if(el)el.innerHTML=rows.map(x=>'<div class="idea-result"><b>'+safe(x.status)+'</b> · '+safe(x.date)+'<br>'+safe(x.text)+'<br><span class="idea-muted">'+safe(x.why)+'</span></div>').join('')||'Henüz karar yok.';}
function csv(x){return '"'+String(x??'').replace(/"/g,'""')+'"';}
function download(name,data,type){const u=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
render('resilience');
})();