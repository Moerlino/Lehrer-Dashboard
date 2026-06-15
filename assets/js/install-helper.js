(function(){
  'use strict';
  const standalone=window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;
  if(standalone)document.documentElement.classList.add('ud-standalone');
  const ua=navigator.userAgent||'';
  const isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  let deferredPrompt=null;
  function dismissed(){try{return sessionStorage.getItem('ud-install-hint-dismissed')==='1'}catch(_e){return false}}
  function dismiss(el){try{sessionStorage.setItem('ud-install-hint-dismissed','1')}catch(_e){}el?.remove()}
  function show(kind){
    if(standalone||dismissed()||document.querySelector('.ud-install-hint'))return;
    const el=document.createElement('aside');
    el.className='ud-install-hint no-print';
    el.setAttribute('role','status');
    const iosText='<strong>Als Web-App nutzen</strong><span>In Safari auf <b>Teilen</b> tippen und <b>Zum Home-Bildschirm</b> wählen.</span>';
    const generic='<strong>App installieren</strong><span>Das Dashboard kann als eigenständige Web-App installiert werden.</span>';
    el.innerHTML=`<div>${kind==='ios'?iosText:generic}</div><div class="ud-install-actions">${kind==='prompt'?'<button type="button" class="btn primary" data-install>Installieren</button>':''}<button type="button" class="ud-install-close" aria-label="Hinweis schließen">×</button></div>`;
    document.body.appendChild(el);
    el.querySelector('.ud-install-close')?.addEventListener('click',()=>dismiss(el));
    el.querySelector('[data-install]')?.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();try{await deferredPrompt.userChoice}catch(_e){}deferredPrompt=null;dismiss(el)});
  }
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;setTimeout(()=>show('prompt'),900)});
  window.addEventListener('appinstalled',()=>document.querySelector('.ud-install-hint')?.remove());
  window.addEventListener('load',()=>{if(isIOS&&!standalone)setTimeout(()=>show('ios'),1200)});
})();
