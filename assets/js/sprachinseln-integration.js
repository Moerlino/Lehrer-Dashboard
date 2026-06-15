(function(){
"use strict";
const DATA=window.SPRACHINSELN;
const states=new WeakMap();
let activeMount=null;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const viewLabels={board:'Dashboard',dialog:'Sprechsituation',builder:'Satzbaukasten',register:'Angemessenheit',cards:'Karteikarten',worksheet:'Arbeitsblatt'};

function fallback(t){
 const w=t.worksheet||{};
 return{
  context:w.situation||t.situation||'',
  partnerA:{title:'Partner A',task:w.roleA||'Du beginnst das Gespräch.',support:['Sage, was dein Anliegen ist.','Frage höflich nach.','Nutze passende Sätze.'],phrases:(t.board?.chunks||[]).slice(0,4)},
  partnerB:{title:'Partner B',task:w.roleB||'Du reagierst und hilfst weiter.',support:['Höre genau zu.','Stelle eine Rückfrage.','Gib eine klare Antwort.'],phrases:(t.dialog||[]).filter(d=>String(d.role||'').includes('B')).map(d=>d.text).slice(0,4)},
  flow:['Begrüßen','Anliegen klären','Nachfragen','Lösung geben']
 };
}
function stateFor(root,theme){
 let s=states.get(root);
 if(!s){s={theme,view:'board',cardIndex:0,cardBack:false,builderPattern:null,builderMiddle:null,worksheetTab:'sheet',open:{}};states.set(root,s)}
 if(theme&&s.theme!==theme){s.theme=theme;s.view='board';s.cardIndex=0;s.cardBack=false;s.builderPattern=null;s.builderMiddle=null;s.worksheetTab='sheet';s.open={}}
 return s;
}
function theme(s){return DATA?.themes?.[s.theme]}
function railButton(view,label,icon,s){return `<button class="si-rail-btn ${s.view===view?'active':''}" data-si-view="${view}" aria-label="${esc(label)}" title="${esc(label)}"><span aria-hidden="true">${icon}</span><small>${esc(label)}</small></button>`}
function viewRoot(root){return root.querySelector('[data-si-workspace]')}

function shell(root,s){
 if(s.previewObserver){s.previewObserver.disconnect();s.previewObserver=null}
 const t=theme(s);
 if(!t){root.innerHTML='<div class="error-boundary"><strong>Sprachinsel nicht verfügbar.</strong></div>';return}
 activeMount={root,s};
 root.innerHTML=`<section class="si-module si-native"><div class="si-native-layout"><nav class="si-toolrail" aria-label="Funktionen der Sprachinsel">${railButton('board','Dashboard','▦',s)}${railButton('dialog','Sprechsituation','↔',s)}${railButton('builder','Satzbaukasten','✎',s)}${railButton('register','Angemessenheit','✓',s)}${railButton('cards','Karteikarten','▣',s)}${railButton('worksheet','Arbeitsblatt','A4',s)}</nav><div class="si-native-main"><header class="si-native-topbar"><strong>${esc(viewLabels[s.view]||'Sprachinseln')}</strong><label class="si-native-select"><span>Situation</span><select data-si-theme>${Object.entries(DATA.themes).map(([k,v])=>`<option value="${k}" ${k===s.theme?'selected':''}>${esc(v.label)}</option>`).join('')}</select></label></header><div class="si-workspace" data-si-workspace></div></div></div></section>`;
 bindShell(root,s);
 renderView(root,s);
}
function bindShell(root,s){
 root.querySelectorAll('[data-si-view]').forEach(b=>b.onclick=()=>{s.view=b.dataset.siView;s.cardBack=false;shell(root,s)});
 const sel=root.querySelector('[data-si-theme]');
 if(sel)sel.onchange=()=>{s.theme=sel.value;s.view='board';s.cardIndex=0;s.cardBack=false;s.builderPattern=null;s.builderMiddle=null;s.open={};shell(root,s)};
}
function renderView(root,s){
 const f={board:renderBoard,dialog:renderDialog,builder:renderBuilder,register:renderRegister,cards:renderCards,worksheet:renderWorksheet}[s.view]||renderBoard;
 try{f(root,s)}catch(e){console.error('Sprachinseln-Modul',e);viewRoot(root).innerHTML='<div class="error-boundary"><strong>Dieser Teil der Sprachinsel konnte nicht geladen werden.</strong><p>Die übrige App bleibt funktionsfähig.</p></div>'}
}
function renderBoard(root,s){
 const t=theme(s);
 viewRoot(root).innerHTML=`<div class="si-native-board"><article class="si-native-situation"><header><span>Situation</span><strong>${esc(t.label)}</strong></header><div><p class="si-native-lead">${esc(t.board.impulse)}</p><p class="si-native-goal"><strong>Ziel:</strong> ${esc(t.goal)}</p></div></article><article class="si-native-verbs"><h2>Verben &amp; Sätze</h2><div class="si-native-verb-list" style="--si-count:${Math.max(1,t.sentences.length)}">${t.sentences.map(x=>`<div class="si-native-verb"><strong>${esc(x.verb)}</strong><span>${esc(x.de)}</span></div>`).join('')}</div></article><div class="si-native-actions"><button data-si-open="dialog"><b>↔</b><span><strong>Sprechsituation öffnen</strong><small>Partnerrollen und Gesprächsablauf</small></span></button><button data-si-open="cards"><b>▣</b><span><strong>Karteikarten öffnen</strong><small>Sprechanlässe aufdecken</small></span></button><button data-si-open="worksheet"><b>A4</b><span><strong>Arbeitsblatt öffnen</strong><small>Druckansicht und Sicherung</small></span></button></div></div>`;
 viewRoot(root).querySelectorAll('[data-si-open]').forEach(b=>b.onclick=()=>{s.view=b.dataset.siOpen;shell(root,s)});
}
function renderDialog(root,s){
 const t=theme(s),sp=t.speechSituation||fallback(t);
 const role=(p,c)=>`<article class="si-role ${c}"><header>${esc(p.title)}</header><div class="si-role-task">${esc(p.task)}</div><div class="si-role-grid"><div><h4>So gehst du vor</h4><ul>${(p.support||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div><h4>Hilfssätze</h4>${(p.phrases||[]).map(x=>`<p>${esc(x)}</p>`).join('')}</div></div></article>`;
 viewRoot(root).innerHTML=`<div class="si-dialog-fit"><article class="si-context"><span>Sprechsituation</span><h3>${esc(t.label)}</h3><p>${esc(sp.context)}</p></article><div class="si-role-pair">${role(sp.partnerA,'a')}${role(sp.partnerB,'b')}</div><div class="si-flow"><strong>Ablauf</strong>${(sp.flow||[]).map(x=>`<span>${esc(x)}</span>`).join('<i>→</i>')}</div></div>`;
}
function renderBuilder(root,s){
 const t=theme(s),pattern=t.builder.find(b=>b.pattern===s.builderPattern);
 const result=!s.builderPattern?'Wähle ein Satzmuster aus.':!s.builderMiddle?s.builderPattern:s.builderPattern.replace('…',s.builderMiddle).replace('..','.');
 viewRoot(root).innerHTML=`<div class="si-builder-fit"><div class="si-builder"><article><h3>1 · Satzmuster</h3>${t.builder.map(b=>`<button class="si-choice ${b.pattern===s.builderPattern?'active':''}" data-pattern="${esc(b.pattern)}">${esc(b.pattern)}</button>`).join('')}</article><article><h3>2 · Passender Baustein</h3>${pattern?pattern.middle.map(m=>`<button class="si-choice ${m===s.builderMiddle?'active':''}" data-middle="${esc(m)}">${esc(m)}</button>`).join(''):'<p>Wähle zuerst links ein Satzmuster.</p>'}</article><article><h3>3 · Sprechen</h3><p>Sprich den Satz laut. Variiere ihn anschließend höflicher, langsamer oder mit einem anderen Wort.</p></article></div><div class="si-result"><span>${esc(result)}</span><button data-builder-reset>Zurücksetzen</button></div></div>`;
 const w=viewRoot(root);
 w.querySelectorAll('[data-pattern]').forEach(b=>b.onclick=()=>{s.builderPattern=b.dataset.pattern;s.builderMiddle=null;renderBuilder(root,s)});
 w.querySelectorAll('[data-middle]').forEach(b=>b.onclick=()=>{s.builderMiddle=b.dataset.middle;renderBuilder(root,s)});
 w.querySelector('[data-builder-reset]').onclick=()=>{s.builderPattern=null;s.builderMiddle=null;renderBuilder(root,s)};
}
function renderRegister(root,s){
 const t=theme(s);
 viewRoot(root).innerHTML=`<div class="si-register si-register-fit">${t.register.map(r=>`<article><p>${esc(r.phrase)}</p><span>${esc(r.judgement)}</span><small>${esc(r.reason)}</small></article>`).join('')}</div>`;
}
function setCardFace(root,s,back){
 s.cardBack=back;
 const card=viewRoot(root)?.querySelector('.si-flip-card');
 const button=viewRoot(root)?.querySelector('[data-flip]');
 if(card)card.classList.toggle('is-flipped',back);
 if(button)button.textContent=back?'Verdecken':'Aufdecken';
}
function moveCard(root,s,direction){
 const t=theme(s);
 s.cardIndex=(s.cardIndex+direction+t.recall.length)%t.recall.length;
 s.cardBack=false;
 renderCards(root,s);
}
function renderCards(root,s){
 const t=theme(s),card=t.recall[s.cardIndex]||t.recall[0];
 viewRoot(root).innerHTML=`<div class="si-cards-fit"><div class="si-card-controls"><button data-prev>← Zurück</button><strong>Karte ${s.cardIndex+1} von ${t.recall.length}</strong><button class="primary" data-flip>${s.cardBack?'Verdecken':'Aufdecken'}</button><button data-next>Weiter →</button></div><div class="si-flash-stage"><div class="si-flip-card ${s.cardBack?'is-flipped':''}" data-card-flip role="button" tabindex="0" aria-label="Karte umdrehen"><div class="si-flip-inner"><section class="si-flip-face si-flip-front"><header><span>Karte ${s.cardIndex+1} von ${t.recall.length}</span><strong>${esc(t.label)}</strong></header><div class="si-flip-body"><div class="si-prompt"><small>Sprechanlass</small><h3>${esc(card.front)}</h3></div></div></section><section class="si-flip-face si-flip-back"><header><span>Karte ${s.cardIndex+1} von ${t.recall.length}</span><strong>${esc(t.label)}</strong></header><div class="si-flip-body"><div class="si-answers">${card.back.map(x=>`<p>${esc(x)}</p>`).join('')}</div></div></section></div></div></div><p class="si-key-hint"><kbd>Leertaste</kbd> Karte drehen · <kbd>←</kbd> <kbd>→</kbd> Karten wechseln</p></div>`;
 const w=viewRoot(root);
 w.querySelector('[data-prev]').onclick=()=>moveCard(root,s,-1);
 w.querySelector('[data-next]').onclick=()=>moveCard(root,s,1);
 w.querySelector('[data-flip]').onclick=()=>setCardFace(root,s,!s.cardBack);
 const flip=w.querySelector('[data-card-flip]');
 flip.onclick=()=>setCardFace(root,s,!s.cardBack);
 flip.onkeydown=e=>{if(e.key==='Enter'||e.code==='Space'){e.preventDefault();e.stopPropagation();setCardFace(root,s,!s.cardBack)}};
}
function secure(s,key,text){return `<button class="si-secure ${s.open[key]?'revealed':''}" data-key="${esc(key)}"><span class="mask">Lösung aufdecken</span><span class="answer">${esc(text)}</span></button>`}
function worksheetHTML(s,mode){
 const t=theme(s),w=t.worksheet,solution=mode==='solution',secureMode=mode==='secure',title=solution?`${w.title} – Musterlösung`:secureMode?`${w.title} – Sicherung`:w.title;
 return `<article class="si-sheet"><header><h1>${esc(title)}</h1><div>Name: ____________________<br>Datum: ____________________</div></header><section><h2><b>1</b> Situation</h2><div class="si-sheet-box"><p>${esc(w.situation)}</p><strong>Ziel: ${esc(w.goal)}</strong></div></section><section><h2><b>2</b> Meine Sätze</h2><table><thead><tr><th>Verb</th><th>Satz auf Deutsch</th><th>Meine Muttersprache</th></tr></thead><tbody>${t.sentences.map((x,i)=>`<tr><td>${esc(x.verb)}</td><td>${esc(x.de)}</td><td>${solution?'<span class="si-sol">individuelle Übersetzung</span>':secureMode?secure(s,`trans-${i}`,'individuelle Übersetzung'):''}</td></tr>`).join('')}</tbody></table></section><section><h2><b>3</b> Satzbaukasten</h2><div class="si-sheet-grid">${t.boxes.map(b=>`<div><h3>${esc(b.title)}</h3><ul>${b.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div></section><section><h2><b>4</b> Sprechen üben</h2><div class="si-sheet-box">1. Hören · 2. Nachsprechen · 3. Ohne Lesen sprechen · 4. Aufnehmen<br><br>Schwieriges Wort: ______________________________</div></section><section><h2><b>5</b> Aus dem Kopf sprechen</h2><p>${esc(w.recallInstruction||'Decke die Sätze oben ab. Antworte auf Deutsch ohne Hilfe.')}</p><table><thead><tr><th>Situation</th><th>Mein Satz</th></tr></thead><tbody>${w.recallSituations.map((x,i)=>`<tr><td>${esc(x)}</td><td>${solution?`<span class="si-sol">${esc(w.solutionRecall[i]||'')}</span>`:secureMode?secure(s,`recall-${i}`,w.solutionRecall[i]||''):''}</td></tr>`).join('')}</tbody></table></section><section><h2><b>6</b> Rollenspiel</h2><div class="si-sheet-grid two"><div><h3>Person A</h3><p>${esc(w.roleA||'')}</p></div><div><h3>Person B</h3><p>${esc(w.roleB||'')}</p></div></div></section></article>`;
}
function fitWorksheetPreview(host,s){
 const stage=host.querySelector('.si-sheet-stage'),sheet=stage?.querySelector('.si-sheet');
 if(!stage||!sheet)return;
 s.previewObserver?.disconnect();s.previewObserver=null;
 sheet.style.zoom='1';
 sheet.style.transform='none';
 stage.style.overflow='auto';
 stage.scrollTop=0;
 stage.scrollLeft=0;
}
function renderWorksheet(root,s){
 const w=viewRoot(root),printLabel=s.worksheetTab==='solution'?'Musterlösung drucken':s.worksheetTab==='secure'?'Sicherung drucken':'Arbeitsblatt drucken';
 w.innerHTML=`<div class="si-worksheet-fit"><div class="si-ws-controls"><div><button class="${s.worksheetTab==='sheet'?'active':''}" data-wstab="sheet">Arbeitsblatt</button><button class="${s.worksheetTab==='solution'?'active':''}" data-wstab="solution">Musterlösung</button><button class="${s.worksheetTab==='secure'?'active':''}" data-wstab="secure">Sicherung</button></div><div>${s.worksheetTab==='secure'?'<button data-hide-all>Alle zudecken</button>':''}<button class="primary" data-print>${printLabel}</button></div></div>${s.worksheetTab==='secure'?'<p class="si-secure-hint">Klicke jede Lösungsfläche einzeln an.</p>':''}<div class="si-sheet-stage">${worksheetHTML(s,s.worksheetTab)}</div></div>`;
 w.querySelectorAll('[data-wstab]').forEach(b=>b.onclick=()=>{s.worksheetTab=b.dataset.wstab;renderWorksheet(root,s)});
 w.querySelectorAll('.si-secure').forEach(b=>b.onclick=()=>{s.open[b.dataset.key]=!s.open[b.dataset.key];b.classList.toggle('revealed',!!s.open[b.dataset.key])});
 w.querySelector('[data-hide-all]')?.addEventListener('click',()=>{s.open={};renderWorksheet(root,s)});
 w.querySelector('[data-print]').onclick=()=>printSheet(s,s.worksheetTab);
 fitWorksheetPreview(w,s);
}
function printSheet(s,mode){
 const frame=document.createElement('iframe');
 frame.setAttribute('aria-hidden','true');
 frame.tabIndex=-1;
 frame.style.cssText='position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none';
 const title=mode==='solution'?'Musterlösung':mode==='secure'?'Sicherung':'Arbeitsblatt';
 const content=worksheetHTML(s,mode);
 const printCSS=`@page{size:A4;margin:14mm 13mm 16mm}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif}body{width:auto}.si-sheet{width:auto;min-height:0;margin:0;padding:0;background:#fff;color:#111;box-shadow:none;font-family:Arial,Helvetica,sans-serif}.si-sheet>header{display:flex;justify-content:space-between;border-bottom:2px solid #174a7b;padding-bottom:4mm;break-after:avoid-page;page-break-after:avoid}.si-sheet h1{font-size:24px;color:#174a7b;margin:0}.si-sheet section{margin-top:16px;break-inside:avoid-page;page-break-inside:avoid}.si-sheet h2{font-size:18px;color:#174a7b;display:flex;align-items:center;gap:8px;margin-top:0;break-after:avoid-page;page-break-after:avoid}.si-sheet h2 b{width:25px;height:25px;border-radius:50%;background:#174a7b;color:#fff;display:grid;place-items:center;font-size:13px;flex:0 0 25px}.si-sheet-box,.si-sheet-grid>div{border:1px solid #cfdbe7;border-radius:10px;padding:10px}.si-sheet table{width:100%;border-collapse:collapse;font-size:13px;break-inside:auto;page-break-inside:auto}.si-sheet thead{display:table-header-group}.si-sheet tr{break-inside:avoid-page;page-break-inside:avoid}.si-sheet th,.si-sheet td{border:1px solid #cfdbe7;text-align:left;padding:8px;min-height:32px}.si-sheet th{background:#edf5fd;color:#174a7b}.si-sheet-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.si-sheet-grid.two{grid-template-columns:1fr 1fr}.si-sheet-grid h3{font-size:14px;color:#174a7b}.si-sol,.si-secure .answer{color:#173f67;font-weight:700}.si-secure{width:100%;min-height:34px;border:0;background:transparent;padding:0;text-align:left}.si-secure .mask{display:none}.si-secure .answer{display:inline}`;
 frame.onload=()=>{
  const win=frame.contentWindow;
  if(!win)return;
  let done=false;
  const cleanup=()=>{if(done)return;done=true;setTimeout(()=>frame.remove(),50);win.removeEventListener?.('afterprint',cleanup)};
  win.addEventListener?.('afterprint',cleanup,{once:true});
  setTimeout(cleanup,60000);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{try{win.focus();win.print()}catch(e){cleanup();console.error('Druckdialog konnte nicht geöffnet werden',e)}}));
 };
 frame.srcdoc=`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${title}</title><style>${printCSS}</style></head><body>${content}</body></html>`;
 document.body.appendChild(frame);
}

document.addEventListener('keydown',e=>{
 if(!activeMount||!document.body.classList.contains('sprachinseln-mode'))return;
 const target=e.target;
 const editing=target instanceof HTMLElement&&(target.isContentEditable||/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName));
 if(editing||e.ctrlKey||e.metaKey||e.altKey)return;
 const {root,s}=activeMount;
 if(s.view==='cards'){
  if(e.code==='Space'){e.preventDefault();setCardFace(root,s,!s.cardBack)}
  else if(e.key==='ArrowRight'){e.preventDefault();moveCard(root,s,1)}
  else if(e.key==='ArrowLeft'){e.preventDefault();moveCard(root,s,-1)}
 }
});
window.UDSprachinseln={mount(root,themeId){if(!DATA||!root)return;const map={'betrieb-maler':'betrieb_maler','betrieb-maurer':'betrieb_maurer'};const t=DATA.themes[themeId]?themeId:(map[themeId]||themeId);shell(root,stateFor(root,t))}};
})();
