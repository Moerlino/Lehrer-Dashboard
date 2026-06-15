(function(){
  const data = window.SPRACHINSELN;
  const state = { theme:'behoerdengang', view:'board', cardIndex:0, cardBack:false, dialogStep:1, builderPattern:null, builderMiddle:null, builderEnd:null, worksheetTab:'sheet', sicherungOpen:{}, timerSeconds:300, timerRemaining:300, timerRunning:false, timerEndAt:null };
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const theme = () => data.themes[state.theme];
  const esc = v => String(v ?? '').replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

  function init(){
    renderThemeNav();
    initAccordions();
    bindNavigation();
    bindHotkeys();
    $('#fullscreenBtn').addEventListener('click', toggleFullscreen);
    $('#randomSpeechBtn')?.addEventListener('click', randomSpeechSituation);
    $('#backToDashboardBtn')?.addEventListener('click', () => setView('board'));
    $('#themeSelectTop')?.addEventListener('change', e => setTheme(e.target.value));
    const sidebarToggle = $('#sidebarToggle');
    if(sidebarToggle){
      sidebarToggle.addEventListener('click', () => {
        const willMinimize = !document.body.classList.contains('sidebarMinimized');
        if(willMinimize){
          $$('.navGroup').forEach(g => {
            g.dataset.wasOpen = g.hasAttribute('open') ? '1' : '0';
            const list = g.querySelector('.navList');
            if(list){ list.style.maxHeight='0px'; list.style.opacity='0'; }
          });
          document.body.classList.add('sidebarMinimized');
        } else {
          document.body.classList.remove('sidebarMinimized');
          $$('.navGroup').forEach(g => {
            if(g.dataset.wasOpen === '1') g.setAttribute('open','');
            else g.removeAttribute('open');
          });
          refreshAccordionHeights();
        }
        const minimized = document.body.classList.contains('sidebarMinimized');
        sidebarToggle.setAttribute('aria-expanded', String(!minimized));
      });
    }
    renderAll();
  }


  function initAccordions(){
    $$('.navGroup').forEach(group => {
      const summary = group.querySelector('summary');
      const list = group.querySelector('.navList');
      if(!summary || !list || group.dataset.accordionBound === 'true') return;
      group.dataset.accordionBound = 'true';

      const setClosed = () => {
        list.style.maxHeight = '0px';
        list.style.opacity = '0';
      };
      const setOpenAuto = () => {
        list.style.maxHeight = 'none';
        list.style.opacity = '1';
      };

      if(group.hasAttribute('open')) setOpenAuto(); else setClosed();

      summary.addEventListener('click', (e) => {
        e.preventDefault();
        if(document.body.classList.contains('sidebarMinimized')){
          document.body.classList.remove('sidebarMinimized');
          const toggle = document.querySelector('#sidebarToggle');
          if(toggle) toggle.setAttribute('aria-expanded','true');
          $$('.navGroup').forEach(g => g.removeAttribute('open'));
          group.setAttribute('open','');
          refreshAccordionHeights();
          return;
        }

        const isOpen = group.hasAttribute('open');
        group.classList.add('animating');

        if(isOpen){
          list.style.maxHeight = `${list.scrollHeight}px`;
          list.style.opacity = '1';
          requestAnimationFrame(() => {
            list.style.maxHeight = '0px';
            list.style.opacity = '0';
          });
          const onEnd = (ev) => {
            if(ev.propertyName !== 'max-height') return;
            group.removeAttribute('open');
            group.classList.remove('animating');
            list.removeEventListener('transitionend', onEnd);
          };
          list.addEventListener('transitionend', onEnd);
        } else {
          group.setAttribute('open','');
          list.style.maxHeight = '0px';
          list.style.opacity = '0';
          requestAnimationFrame(() => {
            list.style.maxHeight = `${list.scrollHeight}px`;
            list.style.opacity = '1';
          });
          const onEnd = (ev) => {
            if(ev.propertyName !== 'max-height') return;
            group.classList.remove('animating');
            setOpenAuto();
            list.removeEventListener('transitionend', onEnd);
          };
          list.addEventListener('transitionend', onEnd);
        }
      });
    });
  }


  function refreshAccordionHeights(){
    $$('.navGroup').forEach(group => {
      const list = group.querySelector('.navList');
      if(!list) return;
      if(group.hasAttribute('open')){
        list.style.maxHeight = 'none';
        list.style.opacity = '1';
      } else {
        list.style.maxHeight = '0px';
        list.style.opacity = '0';
      }
    });
  }

  function renderThemeNav(){
    $('#themeNav').innerHTML = Object.entries(data.themes).map(([key,t]) => `
      <button class="themeBtn ${key===state.theme?'active':''}" data-theme="${key}" title="${esc(t.label)}"><span class="icon">${esc(t.icon)}</span><span class="navText">${esc(t.label)}</span></button>`).join('');
    $$('.themeBtn').forEach(b => b.addEventListener('click', () => { setTheme(b.dataset.theme); }));
    refreshAccordionHeights();
  }

  function bindNavigation(){
    $$('.navItem').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  }

  function bindHotkeys(){
    document.addEventListener('keydown', e => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if(['input','textarea','select'].includes(tag)) return;
      if(e.key.toLowerCase()==='f'){ e.preventDefault(); toggleFullscreen(); }
      if(e.key.toLowerCase()==='d'){ e.preventDefault(); if(state.view==='worksheet') printWorksheet(); else { setView('worksheet'); setTimeout(printWorksheet, 60); } }
      if(state.view==='cards'){
        if(e.code==='Space'){ e.preventDefault(); flipCard(); }
        if(e.key==='ArrowRight'){ e.preventDefault(); nextCard(); }
        if(e.key==='ArrowLeft'){ e.preventDefault(); prevCard(); }
      }
    });
  }

  function setTheme(key){
    if(!data.themes[key]) return;
    state.theme = key; state.cardIndex=0; state.cardBack=false; state.dialogStep=1; state.builderPattern=null; state.builderMiddle=null; state.builderEnd=null;
    renderThemeNav(); renderAll();
  }
  function setView(view){
    state.view=view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $(`#view-${view}`).classList.add('active');
    $$('.navItem').forEach(n => n.classList.toggle('active', n.dataset.view===view));
    $('#viewTitle').textContent = viewTitle(view);
    renderView(view);
  }
  function viewTitle(v){ return ({board:'Dashboard',dialog:'Sprechsituation',builder:'Satzbaukasten',register:'Angemessenheit',cards:'Karteikarten',worksheet:'Arbeitsblatt'}[v]||'Dashboard'); }
  function renderAll(){
    renderTopThemeSelect();
    $('#viewTitle').textContent=viewTitle(state.view);
    updateChrome();
    renderView(state.view);
  }
  function renderTopThemeSelect(){
    const select = $('#themeSelectTop');
    if(!select) return;
    select.innerHTML = Object.entries(data.themes).map(([k,t]) => `<option value="${k}" ${k===state.theme?'selected':''}>${esc(t.label)}</option>`).join('');
  }
  function renderView(v){ updateChrome(); ({board:renderBoard, dialog:renderDialog, builder:renderBuilder, register:renderRegister, cards:renderCards, worksheet:renderWorksheet}[v])(); }
  function updateChrome(){
    const randomBtn = $('#randomSpeechBtn');
    if(randomBtn) randomBtn.hidden = state.view !== 'dialog';
    const backBtn = $('#backToDashboardBtn');
    if(backBtn) backBtn.hidden = state.view === 'board';
    const select = $('#themeSelectTop');
    if(select && select.value !== state.theme) select.value = state.theme;
  }

  function bar(title, tag=''){ return `<div class="bar"><span>${esc(title)}</span><span class="pill">${esc(tag||theme().label)}</span></div>`; }
  function subbar(title, right=''){ return `<div class="subbar"><span>${esc(title)}</span><span class="muted">${esc(right)}</span></div>`; }

  function renderBoard(){
    const t=theme();
    $('#view-board').innerHTML = `
      <div class="boardGrid boardGridRefined dashboardFitGrid">
        <div class="panel situationPanel heroSituation">
          <div class="panelHead"><span>Situation</span><span>${esc(t.label)}</span></div>
          <div class="panelBody">
            <div class="lead">${esc(t.board.impulse)}</div>
            <p class="mutedText"><strong>Ziel:</strong> ${esc(t.goal)}</p>
          </div>
        </div>
        <div class="sideColumn">
          <div class="card verbSentenceOverview compactInfoCard"><h2 class="h2">Verben & Sätze</h2><div class="verbSentenceList">${t.sentences.map(s=>`<div class="verbSentenceTile"><div class="verbName">${esc(s.verb)}</div><div class="verbSentence">${esc(s.de)}</div></div>`).join('')}</div></div>
        </div>
        <div class="timerPanel card" aria-label="Timer">
          <div class="timerHead"><span>Timer</span><span class="timerHint">Arbeitszeit einstellen</span></div>
          <div class="timerBody">
            <div class="timerDisplay" id="timerDisplay">${formatTime(state.timerRemaining)}</div>
            <div class="timerControls">
              <label class="timerInputLabel"><span>Min.</span><input id="timerMinutes" type="number" min="1" max="90" step="1" value="${Math.max(1, Math.round(state.timerSeconds/60))}" ${state.timerRunning?'disabled':''}></label>
              <button class="smallBtn timerBtn" id="timerSetBtn" ${state.timerRunning?'disabled':''}>Setzen</button>
              <button class="primaryBtn timerBtn" id="timerStartBtn">${state.timerRunning?'Pause':'Start'}</button>
              <button class="ghostBtn timerBtn" id="timerResetBtn">Reset</button>
            </div>
          </div>
        </div>
        <div class="dashboardActions">
          <button class="dashboardActionCard" data-go-view="dialog">
            <span class="actionIcon">↔</span>
            <span><strong>Sprechsituation öffnen</strong><small>Partnerrollen projizieren und das Rollenspiel anleiten.</small></span>
          </button>
          <button class="dashboardActionCard" data-go-view="cards">
            <span class="actionIcon">▣</span>
            <span><strong>Karteikarten öffnen</strong><small>Sprechanlass projizieren und Sätze aufdecken.</small></span>
          </button>
          <button class="dashboardActionCard" data-go-view="worksheet">
            <span class="actionIcon">A4</span>
            <span><strong>Arbeitsblatt öffnen</strong><small>Arbeitsblatt oder Musterlösung anzeigen und drucken.</small></span>
          </button>
        </div>
      </div>`;
    $$('[data-go-view]').forEach(btn=>btn.onclick=()=>setView(btn.dataset.goView));
    bindTimerControls();
    updateTimerDisplay();
  }

  function formatTime(total){
    total = Math.max(0, Math.floor(total || 0));
    const m = Math.floor(total/60);
    const sec = total % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }
  let timerInterval = null;
  function bindTimerControls(){
    const minutes = $('#timerMinutes');
    const setBtn = $('#timerSetBtn');
    const startBtn = $('#timerStartBtn');
    const resetBtn = $('#timerResetBtn');
    if(!minutes || !setBtn || !startBtn || !resetBtn) return;
    setBtn.onclick = () => {
      const value = Math.max(1, Math.min(90, Number(minutes.value || 5)));
      state.timerSeconds = value * 60;
      state.timerRemaining = state.timerSeconds;
      state.timerRunning = false;
      state.timerEndAt = null;
      stopTimerInterval();
      renderBoard();
    };
    startBtn.onclick = () => {
      if(state.timerRunning) pauseTimer();
      else startTimer();
      renderBoard();
    };
    resetBtn.onclick = () => {
      state.timerRemaining = state.timerSeconds;
      state.timerRunning = false;
      state.timerEndAt = null;
      stopTimerInterval();
      renderBoard();
    };
  }
  function startTimer(){
    if(state.timerRemaining <= 0) state.timerRemaining = state.timerSeconds;
    state.timerEndAt = Date.now() + state.timerRemaining * 1000;
    state.timerRunning = true;
    stopTimerInterval();
    timerInterval = setInterval(tickTimer, 250);
    tickTimer();
  }
  function pauseTimer(){
    tickTimer();
    state.timerRunning = false;
    state.timerEndAt = null;
    stopTimerInterval();
  }
  function stopTimerInterval(){
    if(timerInterval){ clearInterval(timerInterval); timerInterval = null; }
  }
  function tickTimer(){
    if(!state.timerRunning || !state.timerEndAt) return;
    state.timerRemaining = Math.max(0, Math.ceil((state.timerEndAt - Date.now())/1000));
    updateTimerDisplay();
    if(state.timerRemaining <= 0){
      state.timerRunning = false;
      state.timerEndAt = null;
      stopTimerInterval();
      const panel = $('.timerPanel');
      if(panel) panel.classList.add('timerDone');
      const startBtn = $('#timerStartBtn');
      if(startBtn) startBtn.textContent = 'Start';
      const input = $('#timerMinutes');
      const setBtn = $('#timerSetBtn');
      if(input) input.disabled = false;
      if(setBtn) setBtn.disabled = false;
    }
  }
  function updateTimerDisplay(){
    const display = $('#timerDisplay');
    if(display) display.textContent = formatTime(state.timerRemaining);
  }


  function randomSpeechSituation(){
    const keys = Object.keys(data.themes).filter(k => data.themes[k]?.speechSituation);
    if(!keys.length) return;
    let next = keys[Math.floor(Math.random() * keys.length)];
    if(keys.length > 1){
      let guard = 0;
      while(next === state.theme && guard < 8){
        next = keys[Math.floor(Math.random() * keys.length)];
        guard++;
      }
    }
    state.theme = next;
    state.cardIndex=0; state.cardBack=false; state.dialogStep=1; state.builderPattern=null; state.builderMiddle=null; state.builderEnd=null;
    renderThemeNav();
    setView('dialog');
    renderTopThemeSelect();
  }

  function renderDialog(){
    const t=theme();
    const sp=t.speechSituation || fallbackSpeechSituation(t);
    const partnerCard = (p, accent='') => `
      <div class="situationRoleCard ${accent}">
        <div class="roleHeader"><span>${esc(p.title)}</span></div>
        <div class="roleTask">${esc(p.task)}</div>
        <div class="roleHelpGrid">
          <div>
            <h3>So gehst du vor</h3>
            <ul>${(p.support||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
          </div>
          <div>
            <h3>Hilfssätze</h3>
            <div class="phraseStack">${(p.phrases||[]).map(x=>`<div>${esc(x)}</div>`).join('')}</div>
          </div>
        </div>
      </div>`;
    $('#view-dialog').innerHTML = `
      <div class="speechSituation">
        <div class="situationIntro">
          <div>
            <div class="miniLabel">Sprechsituation</div>
            <strong>${esc(t.label)}</strong>
          </div>
          <p>${esc(sp.context)}</p>
        </div>
        <div class="partnerGrid">
          ${partnerCard(sp.partnerA,'partnerA')}
          ${partnerCard(sp.partnerB,'partnerB')}
        </div>
        <div class="speechFlow">
          <span>Ablauf:</span>
          ${(sp.flow||[]).map(x=>`<em>${esc(x)}</em>`).join('')}
        </div>
      </div>`;
  }

  function fallbackSpeechSituation(t){
    const w=t.worksheet || {};
    return {
      context: w.situation || t.situation || '',
      partnerA: {
        title:'Partner A',
        task:w.roleA || 'Du beginnst das Gespräch.',
        support:['Sage, was dein Anliegen ist.','Frage höflich nach.','Nutze passende Sätze aus der Sprachinsel.'],
        phrases:(t.board?.chunks || []).slice(0,4)
      },
      partnerB: {
        title:'Partner B',
        task:w.roleB || 'Du reagierst auf Partner A und hilfst weiter.',
        support:['Höre genau zu.','Stelle eine Rückfrage.','Gib eine klare Antwort oder Anweisung.'],
        phrases:(t.dialog || []).filter(d=>String(d.role||'').includes('B')).map(d=>d.text).slice(0,4)
      },
      flow:['Begrüßen','Anliegen klären','Nachfragen','Lösung geben']
    };
  }

  function renderBuilder(){
    const t=theme();
    const pattern = t.builder.find(b=>b.pattern===state.builderPattern) || null;
    const result = state.builderPattern ? `${state.builderPattern.replace('…', (state.builderMiddle||'…')).replace('..','.')}${state.builderEnd && !state.builderPattern.includes('?') ? '' : ''}` : 'Wähle ein Satzmuster aus.';
    $('#view-builder').innerHTML = subbar('Bausteine wählen','grammatikalisch passende Auswahl') + `
      <div class="builderLayout">
        <div class="choiceBox"><h3>1 · Satzmuster</h3>${t.builder.map(b=>`<button class="choiceBtn ${b.pattern===state.builderPattern?'active':''}" data-pattern="${esc(b.pattern)}">${esc(b.pattern)}</button>`).join('')}</div>
        <div class="choiceBox"><h3>2 · Passender Baustein</h3>${pattern ? pattern.middle.map(m=>`<button class="choiceBtn ${m===state.builderMiddle?'active':''}" data-middle="${esc(m)}">${esc(m)}</button>`).join('') : '<p class="mutedText">Wähle zuerst links ein Satzmuster. Dann erscheinen nur Bausteine, die grammatikalisch dazu passen.</p>'}</div>
        <div class="choiceBox"><h3>3 · Sprechen</h3><p class="mutedText">Sprich den Satz laut. Variiere danach: höflicher, langsamer, mit anderem Wort oder als kurze Frage.</p></div>
      </div>
      <div class="resultLine"><span>${esc(buildSentence())}</span><button class="smallBtn" id="builderReset">Zurücksetzen</button></div>`;
    $$('[data-pattern]').forEach(b=>b.onclick=()=>{state.builderPattern=b.dataset.pattern; state.builderMiddle=null; renderBuilder();});
    $$('[data-middle]').forEach(b=>b.onclick=()=>{state.builderMiddle=b.dataset.middle; renderBuilder();});
    $('#builderReset').onclick=()=>{state.builderPattern=null; state.builderMiddle=null; renderBuilder();};
  }
  function buildSentence(){
    if(!state.builderPattern) return 'Wähle ein Satzmuster aus.';
    if(!state.builderMiddle) return state.builderPattern;
    return state.builderPattern.replace('…', state.builderMiddle).replace('..','.');
  }

  function renderRegister(){
    const t=theme();
    $('#view-register').innerHTML = subbar('Passt das so?','Höflichkeit · Situation · Wirkung') + `
      <div class="registerGrid">${t.register.map(r=>`<div class="registerCard"><div class="registerPhrase">${esc(r.phrase)}</div><span class="badge">${esc(r.judgement)}</span><p class="mutedText">${esc(r.reason)}</p></div>`).join('')}</div>`;
  }

  function renderCards(){
    const t=theme(); const card=t.recall[state.cardIndex] || t.recall[0];
    $('#view-cards').innerHTML = `
      <div class="cardToolbar">
        <label><strong>Thema:</strong> <select id="cardThemeSelect">${Object.entries(data.themes).map(([k,v])=>`<option value="${k}" ${k===state.theme?'selected':''}>${esc(v.label)}</option>`).join('')}</select></label>
        <button class="smallBtn" id="prevCard">← Zurück</button><button class="primaryBtn" id="flipCard">${state.cardBack?'Verdecken':'Aufdecken'}</button><button class="smallBtn" id="nextCard">Weiter →</button>
      </div>
      <div class="flashStage">
        <div class="flashCard flipCard ${state.cardBack?'isFlipped':''}">
          <div class="flashInner">
            <section class="flashFace flashFront">
              <div class="flashHead"><span>Karte ${state.cardIndex+1} von ${t.recall.length}</span><span class="flashTopic">${esc(t.label)}</span></div>
              <div class="flashBody"><div class="promptBox"><div class="promptLabel">Sprechanlass</div>${esc(card.front)}</div></div>
            </section>
            <section class="flashFace flashBack">
              <div class="flashHead"><span>Karte ${state.cardIndex+1} von ${t.recall.length}</span><span class="flashTopic">${esc(t.label)}</span></div>
              <div class="flashBody"><div class="answers">${card.back.map(s=>`<div class="answer">${esc(s)}</div>`).join('')}</div></div>
            </section>
          </div>
        </div>
      </div>`;
    $('#cardThemeSelect').onchange=e=>setTheme(e.target.value);
    $('#prevCard').onclick=prevCard; $('#nextCard').onclick=nextCard; $('#flipCard').onclick=flipCard;
  }
  function flipCard(){
    state.cardBack=!state.cardBack;
    const c=$('.flashCard');
    if(c){ c.classList.toggle('isFlipped', state.cardBack); const b=$('#flipCard'); if(b) b.textContent=state.cardBack?'Verdecken':'Aufdecken'; }
    else renderCards();
  }
  function nextCard(){const t=theme();state.cardIndex=(state.cardIndex+1)%t.recall.length;state.cardBack=false;renderCards();}
  function prevCard(){const t=theme();state.cardIndex=(state.cardIndex-1+t.recall.length)%t.recall.length;state.cardBack=false;renderCards();}

  function renderWorksheet(){
    const isSecure = state.worksheetTab === 'secure';
    $('#view-worksheet').innerHTML = `
      <div class="worksheetControls"><div class="toolRow"><label><strong>Thema:</strong> <select id="wsThemeSelect">${Object.entries(data.themes).map(([k,v])=>`<option value="${k}" ${k===state.theme?'selected':''}>${esc(v.label)}</option>`).join('')}</select></label><div class="tabs"><button class="tabBtn ${state.worksheetTab==='sheet'?'active':''}" data-tab="sheet">Arbeitsblatt</button><button class="tabBtn ${state.worksheetTab==='solution'?'active':''}" data-tab="solution">Musterlösung</button><button class="tabBtn ${state.worksheetTab==='secure'?'active':''}" data-tab="secure">Sicherung</button></div></div><button class="primaryBtn" id="printBtn">Drucken</button></div>
      ${isSecure ? `<div class="sicherungToolbar" aria-label="Lösungen einzeln aufdecken"><span>Klicke direkt auf einzelne verdeckte Felder, um sie auf- oder zuzudecken.</span><button class="revealBtn" data-task="reset">Alle zudecken</button></div>` : ''}
      <div class="sheetFrame"><div id="worksheetPreview">${worksheetHTML(state.worksheetTab)}</div></div>`;
    $('#wsThemeSelect').onchange=e=>setTheme(e.target.value);
    $$('.tabBtn').forEach(b=>b.onclick=()=>{state.worksheetTab=b.dataset.tab;renderWorksheet();});
    $$('.revealBtn').forEach(b=>b.onclick=()=>{ if(b.dataset.task==='reset'){ state.sicherungOpen={}; renderWorksheet(); } });
    $$('.secureSolution').forEach(el=>el.onclick=()=>{ const key=el.dataset.key; state.sicherungOpen[key]=!state.sicherungOpen[key]; el.classList.toggle('revealed', !!state.sicherungOpen[key]); });
    $('#printBtn').onclick=printWorksheet;
  }

  function secureSolution(key, text){
    const open = !!state.sicherungOpen[key];
    return `<span class="solutionText secureSolution ${open?'revealed':''}" data-key="${esc(key)}" title="Klicken zum Auf-/Zudecken"><span class="secureMask" aria-hidden="true"></span><span class="secureContent">${esc(text)}</span></span>`;
  }

  function worksheetHTML(mode='sheet'){
    const t=theme(), w=t.worksheet;
    const solution = mode === true || mode === 'solution';
    const secure = mode === 'secure';
    const title = solution ? `${w.title} – Musterlösung` : secure ? `${w.title} – Sicherung` : w.title;
    const forcePageBreak = !['betrieb_maler','betrieb_maurer'].includes(state.theme);
    const pageClass = forcePageBreak ? ' forceTask5Page' : ' naturalTask5Flow';
    return `<article class="worksheetPage classicSheet${pageClass}${secure?' secureSheet':''}">
      <header class="sheetHeader">
        <div class="title-row"><h1>${esc(title)}</h1></div>
        <div class="meta">
          <div class="field"><span>Name:</span><div class="write-line"></div></div>
          <div class="field"><span>Datum:</span><div class="write-line"></div></div>
        </div>
      </header>

      <section class="sheetSection">
        <h2><span class="num">1</span>Situation</h2>
        <div class="box situation-box">
          <p>${esc(w.situation)}</p>
          <div class="goal"><strong>Ziel:</strong><span>${esc(w.goal)}</span></div>
        </div>
      </section>

      <section class="sheetSection">
        <h2><span class="num">2</span>Meine Sätze</h2>
        <table class="sentence-table">
          <thead><tr><th class="verb-col">Verb</th><th class="german-col">Satz auf Deutsch</th><th class="native-col">Meine Muttersprache</th></tr></thead>
          <tbody>${t.sentences.map(s=>`<tr><td>${esc(s.verb)}</td><td>${esc(s.de)}</td><td>${solution?'<span class="solutionText">individuelle Übersetzung</span>':secure?secureSolution(`2-${s.verb}`,'individuelle Übersetzung'):''}</td></tr>`).join('')}</tbody>
        </table>
      </section>

      <section class="sheetSection">
        <h2><span class="num">3</span>Satzbaukasten</h2>
        <div class="building-blocks">${t.boxes.map(b=>`<div class="mini-box"><div class="mini-box-title">${esc(b.title)}</div>${b.items.map(i=>`<div class="bullet-line"><span>${esc(i)}</span></div>`).join('')}</div>`).join('')}</div>
      </section>

      <section class="sheetSection">
        <h2><span class="num">4</span>Sprechen üben</h2>
        <div class="practice box">
          <div class="steps"><div class="step">1. Hören</div><div class="step">2. Nachsprechen</div><div class="step">3. Ohne Lesen sprechen</div><div class="step">4. Aufnehmen</div></div>
          <div class="field"><span>Schwieriges Wort:</span><div class="write-line"></div></div>
        </div>
      </section>

      <section class="sheetSection">
        <h2><span class="num">5</span>Aus dem Kopf sprechen</h2>
        <div class="recall-instruction">${esc(w.recallInstruction || 'Decke die Sätze oben ab. Dein Partner liest die Situationen vor. Antworte auf Deutsch ohne Hilfe. Erst sprechen, dann schreiben.')}</div>
        <table class="recall-table">
          <thead><tr><th>Situation</th><th>Mein Satz</th></tr></thead>
          <tbody>${w.recallSituations.map((s,i)=>`<tr><td>${esc(s)}</td><td>${solution?`<span class="solutionText">${esc(w.solutionRecall[i]||'')}</span>`:secure?secureSolution(`5-${i}`,w.solutionRecall[i]||''):''}</td></tr>`).join('')}</tbody>
        </table>
      </section>

      <section class="sheetSection">
        <h2><span class="num">6</span>Rollenspiel</h2>
        <div class="roleplay-grid">
          <div class="role-card"><strong>Person A:</strong>${esc(w.roleA)}</div>
          <div class="role-card"><strong>Person B:</strong>${esc(w.roleB)}</div>
        </div>
        <div class="note">Arbeitsauftrag: Spielt die Situation zu zweit. Benutzt mindestens drei Sätze aus der Tabelle. Danach wechselt ihr die Rollen.</div>
      </section>
    </article>`;
  }

  function printWorksheet(){
    const root = $('#printRoot');
    root.innerHTML = worksheetHTML(state.worksheetTab);
    document.body.classList.add('isPrinting');
    const cleanup = () => {
      document.body.classList.remove('isPrinting');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    requestAnimationFrame(() => requestAnimationFrame(() => window.print()));
  }
  function toggleFullscreen(){
    if(!document.fullscreenElement){ document.documentElement.requestFullscreen?.(); }
    else { document.exitFullscreen?.(); }
  }

  init();
})();
