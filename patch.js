// ===== MAFIAENS HEVN - PATCH v3 =====
(function () {
  'use strict';

  const style = document.createElement('style');
  style.textContent = `
    /* TEKST - Mørkegul */
    body { color: #d4a017 !important; }
    .text-black, .text-gray-900, .text-gray-800 { color: #d4a017 !important; }
    .text-gray-700, .text-gray-600 { color: #c9950f !important; }
    .text-foreground, .text-card-foreground, .text-secondary-foreground, .text-popover-foreground { color: #d4a017 !important; }
    .bg-white, [class*="bg-white"] { background-color: #1a1a1a !important; color: #d4a017 !important; }
    .bg-white *, [class*="bg-white"] * { color: #d4a017 !important; }
    input, textarea, select { color: #d4a017 !important; background-color: #1a1a1a !important; border-color: #333 !important; }
    input::placeholder, textarea::placeholder { color: #7a5c0a !important; }
    .text-white { color: #ffffff !important; }
    .text-yellow-400 { color: #facc15 !important; }
    .text-green-400, .text-green-500 { color: #4ade80 !important; }
    .text-red-400, .text-red-500 { color: #f87171 !important; }
    .text-blue-400 { color: #60a5fa !important; }
    .text-purple-400 { color: #c084fc !important; }
    .text-gray-400 { color: #9ca3af !important; }
    .text-gray-300 { color: #d1d5db !important; }
    .text-gray-500 { color: #6b7280 !important; }
    .text-orange-400 { color: #fb923c !important; }

    /* Skjul Oppdater */
    #hide-refresh-btn { display: none !important; }

    /* PROFIL CARD */
    #ppcard {
      background: linear-gradient(135deg, #1a0a00 0%, #2a1500 40%, #1a1000 100%);
      border: 1px solid #5a3a00; border-radius: 16px;
      padding: 28px; margin-bottom: 16px;
      display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;
    }
    #ppavwrap { position: relative; flex-shrink: 0; }
    #ppav {
      width: 100px; height: 100px; border-radius: 50%;
      border: 3px solid #a855f7; background: #2a1a3a;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    #ppav img { width: 100%; height: 100%; object-fit: cover; }
    #ppcambtn {
      position: absolute; bottom: 2px; left: 2px;
      background: #1a1a1a; border: 2px solid #333; border-radius: 50%;
      width: 28px; height: 28px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 13px; color: #d4a017; z-index: 10;
    }
    #ppcambtn:hover { background: #2a2a2a; }
    #ppimginput { display: none; margin-top: 8px; width: 200px; }
    #ppimginput input {
      width: 100%; padding: 6px 10px;
      background: #1a1a1a; border: 1px solid #444;
      border-radius: 6px; color: #d4a017; font-size: 12px;
    }
    #ppimginput .btnrow { display: flex; gap: 6px; margin-top: 6px; }
    #ppimginput button { padding: 4px 12px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; }
    #ppimgsave { background: #1d4ed8; color: #fff; }
    #ppimgcancel { background: #333; color: #ccc; }
    #ppinfo { flex: 1; min-width: 200px; }
    #ppinfo .ppname { font-size: 26px; font-weight: bold; color: #fff; margin-bottom: 4px; }
    #ppinfo .pprank { color: #facc15; font-size: 16px; margin-bottom: 8px; }
    #ppinfo .ppmeta { display: flex; gap: 16px; flex-wrap: wrap; font-size: 13px; color: #9ca3af; }
    #ppinfo .ppmeta span { display: flex; align-items: center; gap: 4px; }
    .ppbadge {
      display: inline-block; background: #4c1d95; color: #c084fc;
      font-size: 11px; padding: 2px 10px; border-radius: 999px;
      font-weight: 600; margin-left: 8px; vertical-align: middle;
    }
    .aplink { cursor: pointer; color: #60a5fa !important; font-size: 11px; margin-left: 6px; }
    .aplink:hover { text-decoration: underline; color: #93c5fd !important; }

    /* FLYPLASS MODAL */
    #apov {
      position: fixed; inset: 0; background: rgba(0,0,0,0.82);
      z-index: 99999; display: flex; align-items: center; justify-content: center;
    }
    #apbox {
      background: #111; border: 1px solid #333; border-radius: 14px;
      width: 600px; max-width: 95vw; overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8);
    }
    #apbox .aphd {
      background: linear-gradient(135deg, #0a0a1a, #0f1a2e, #0a1a0a);
      height: 120px; display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    #apbox .aphd h2 { font-size: 28px; font-weight: bold; color: #fff; z-index: 2; letter-spacing: 3px; }
    #apbox .aphd::before { content:'✈'; position:absolute; font-size:100px; opacity:0.07; color:#fff; left:-10px; transform:rotate(-15deg); }
    #apbox .apbd { padding: 20px; }
    #apbox .apinfo { text-align:center; font-size:13px; color:#9ca3af; line-height:1.7; margin-bottom:12px; }
    #apbox .apown { text-align:center; font-size:13px; color:#6b7280; margin-bottom:16px; }
    #apbox .apown strong { color: #facc15; }
    #apbox table { width:100%; border-collapse:collapse; }
    #apbox table th { padding:8px 12px; color:#6b7280; font-size:11px; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #2a2a2a; text-align:left; }
    #apbox table td { padding:13px 12px; border-bottom:1px solid #1a1a1a; font-size:14px; color:#d4a017; cursor:pointer; }
    #apbox table tr:hover td { background:#1a1a1a; }
    #apbox table tr.apsel td { background:#0d1f0d; }
    #apbox .ph { color:#f87171; } #apbox .pm { color:#ef4444; font-weight:bold; }
    #apbox .pl { color:#f59e0b; } #apbox .plow { color:#4ade80; }
    #apbox input[type=radio] { width:15px; height:15px; cursor:pointer; accent-color:#4ade80; }
    #apbox .apft { display:flex; justify-content:flex-end; gap:10px; padding:14px 20px; border-top:1px solid #222; }
    #apbox .apcnl { background:#222; color:#aaa; border:1px solid #333; padding:9px 22px; border-radius:7px; cursor:pointer; font-size:14px; }
    #apbox .apgo { background:#1d4ed8; color:#fff; border:none; padding:9px 26px; border-radius:7px; cursor:pointer; font-size:14px; font-weight:bold; }
    #apbox .apgo:hover { background:#2563eb; }
    #apbox .apgo:disabled { background:#2a2a2a; color:#555; cursor:not-allowed; }

    /* ONLINE DOTS */
    .pd { width:9px; height:9px; border-radius:50%; display:inline-block; margin-right:5px; }
    .pd.admin { background:#ef4444; box-shadow:0 0 5px #ef4444; }
    .pd.mod   { background:#c084fc; box-shadow:0 0 5px #c084fc; }
    .pd.lead  { background:#f59e0b; box-shadow:0 0 5px #f59e0b; }
    .pd.user  { background:#4ade80; box-shadow:0 0 5px #4ade80; }
    #ptleg { display:flex; flex-wrap:wrap; gap:10px; padding:10px 14px; background:#0d0d0d; border:1px solid #1a1a1a; border-radius:8px; margin-bottom:12px; }
    #ptleg span { display:flex; align-items:center; gap:5px; font-size:12px; }

    /* TOAST */
    .pttoast { position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:#1a1a1a; border-radius:8px; padding:12px 24px; font-size:14px; font-weight:bold; z-index:999999; box-shadow:0 4px 20px rgba(0,0,0,0.6); pointer-events:none; }
  `;
  document.head.appendChild(style);

  // HELPERS
  // Separat nøkkel for profilbilde - overlever React sine localStorage-skrivinger
  const IMG_KEY = 'mafiaenshevn_profileImage';
  function getStoredImage() { return localStorage.getItem(IMG_KEY) || ''; }
  function saveStoredImage(url) { if(url) localStorage.setItem(IMG_KEY, url); else localStorage.removeItem(IMG_KEY); }

  // Patch localStorage.setItem så React ikke kan slette profilbilde
  const _origSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(key, value) {
    if (key === 'mafiaenshevn_user') {
      try {
        const data = JSON.parse(value);
        const savedImg = getStoredImage();
        if (savedImg && !data.profileImage) {
          data.profileImage = savedImg;
        } else if (data.profileImage) {
          saveStoredImage(data.profileImage);
        }
        _origSetItem(key, JSON.stringify(data));
        return;
      } catch(e) {}
    }
    _origSetItem(key, value);
  };

  function getUser() { try { const u = JSON.parse(localStorage.getItem('mafiaenshevn_user')||'null'); if(u && !u.profileImage) { const img = getStoredImage(); if(img) u.profileImage = img; } return u; } catch { return null; } }
  function saveUser(u) { if(u && u.profileImage) saveStoredImage(u.profileImage); localStorage.setItem('mafiaenshevn_user', JSON.stringify(u)); window.dispatchEvent(new Event('storage')); }
  function kr(n) { return (n||0).toLocaleString('no-NO') + ' kr'; }
  function toast(msg, color='#4ade80') {
    const t = document.createElement('div'); t.className='pttoast';
    t.style.border=`1px solid ${color}`; t.style.color=color; t.textContent=msg;
    document.body.appendChild(t); setTimeout(()=>t.remove(), 3500);
  }

  // CITIES
  const CITIES = [
    {name:'Oslo',      p:'Høy',     c:'ph',  price:0},
    {name:'Bergen',    p:'Høy',     c:'ph',  price:1400000},
    {name:'Gøteborg',  p:'Middels', c:'pl',  price:1800000},
    {name:'Stockholm', p:'Lav',     c:'plow',price:2200000},
    {name:'København', p:'Maksimum',c:'pm',  price:2500000},
    {name:'Lahti',     p:'Lav',     c:'plow',price:2800000},
    {name:'Helsinki',  p:'Middels', c:'pl',  price:3000000},
    {name:'Århus',     p:'Høy',     c:'ph',  price:2600000},
  ];

  // FLYPLASS
  function openAirport() {
    if (document.getElementById('apov')) return;
    const user = getUser(); const cur = user?.city||'Oslo'; let chosen=null;
    const rows = CITIES.map(c=>`
      <tr data-c="${c.name}" class="${c.name===cur?'apsel':''}">
        <td><input type="radio" name="apc" value="${c.name}" ${c.name===cur?'checked':''}></td>
        <td>${c.name}${c.name===cur?' <span style="font-size:11px;color:#6b7280">(her nå)</span>':''}</td>
        <td class="${c.c}">${c.p}</td>
        <td>${c.price===0?'—':kr(c.price)}</td>
      </tr>`).join('');
    const ov=document.createElement('div'); ov.id='apov';
    ov.innerHTML=`<div id="apbox">
      <div class="aphd"><h2>✈ Flyplass</h2></div>
      <div class="apbd">
        <div class="apinfo">Her kan du reise til forskjellige byer i Skandinavia.<br>Politinivået avgjør vanskelighetsgraden på kriminalitet i byen.</div>
        <div class="apown">Flyplassen eies av <strong>Staten</strong></div>
        <table><thead><tr><th></th><th>Destinasjon</th><th>Politinivå</th><th>Pris</th></tr></thead><tbody>${rows}</tbody></table>
      </div>
      <div class="apft"><button class="apcnl" id="apcnl">Avbryt</button><button class="apgo" id="apgo" disabled>Reis ✈</button></div>
    </div>`;
    document.body.appendChild(ov);
    ov.querySelectorAll('input[type=radio]').forEach(r=>{
      r.addEventListener('change',()=>{
        chosen=r.value;
        document.getElementById('apgo').disabled=chosen===cur;
        ov.querySelectorAll('tr[data-c]').forEach(tr=>tr.classList.toggle('apsel',tr.dataset.c===chosen));
      });
    });
    ov.querySelectorAll('tr[data-c]').forEach(tr=>{
      tr.onclick=()=>{const r=tr.querySelector('input');if(r){r.checked=true;r.dispatchEvent(new Event('change'));}};
    });
    document.getElementById('apcnl').onclick=()=>ov.remove();
    ov.onclick=e=>{if(e.target===ov)ov.remove();};
    document.getElementById('apgo').onclick=()=>{
      if(!chosen||chosen===cur)return;
      const city=CITIES.find(c=>c.name===chosen);
      const u=getUser(); if(!u)return;
      if(city.price>0&&u.money<city.price){toast(`Ikke nok penger! Reise koster ${kr(city.price)}`,'#ef4444');return;}
      if(city.price>0)u.money-=city.price;
      u.city=chosen; saveUser(u); ov.remove();
      toast(`✈ Du fløy til ${chosen}!`);
      setTimeout(()=>{const pc=document.getElementById('ppcard');if(pc)pc.remove();buildProfileCard();},400);
    };
  }

  // PROFIL KORT
  const RANKS=['Nybegynner','Bråkmaker','Løpegutt','Gangster','Langer','Kaptein','Juniorsjef','Sjef','Underboss','Consigliere','Capo','Capo di Monte','Capo dei Capi','Capo di Tutti Capi','Don','Gudfar','Legende'];
  function buildProfileCard() {
    if (document.getElementById('ppcard')) return;
    // Finn profil-seksjon via gradient-klassen som brukes der
    const orig = document.querySelector('[class*="bg-gradient-to-r"][class*="yellow-500"]');
    if (!orig) return;
    const user = getUser(); if (!user) return;
    orig.style.display='none';
    const rank = RANKS[Math.min((user.rank||1)-1, RANKS.length-1)]||'Nybegynner';
    const roleLabel = user.role==='admin'?'Administrator':user.role==='moderator'?'Moderator':'';
    const card=document.createElement('div'); card.id='ppcard';
    card.innerHTML=`
      <div id="ppavwrap">
        <div id="ppav">
          ${user.profileImage?`<img id="ppavimg" src="${user.profileImage}" alt="${user.name}">`:`<span style="font-size:36px">👤</span>`}
        </div>
        <div id="ppcambtn" title="Endre profilbilde">📷</div>
        <div id="ppimginput">
          <input type="text" id="ppimgurl" placeholder="Lim inn bilde-URL..." value="${user.profileImage||''}">
          <div class="btnrow">
            <button id="ppimgsave">Lagre</button>
            <button id="ppimgcancel">Avbryt</button>
          </div>
        </div>
      </div>
      <div id="ppinfo">
        <div class="ppname">${user.name}${roleLabel?`<span class="ppbadge">${roleLabel}</span>`:''}</div>
        <div class="pprank">${rank}</div>
        <div class="ppmeta">
          <span>🏙️ ${user.city||'Oslo'}<span class="aplink" id="pflylink">✈ Fly</span></span>
          <span>📊 Rank ${user.rank}/15</span>
          <span>${user.inPrison?'🔒 I fengsel':'🟢 Fri'}</span>
        </div>
      </div>
    `;
    orig.parentNode.insertBefore(card, orig);
    card.querySelector('#ppcambtn').onclick=()=>{
      const w=document.getElementById('ppimginput');
      w.style.display=w.style.display==='block'?'none':'block';
    };
    card.querySelector('#ppimgsave').onclick=()=>{
      const url=document.getElementById('ppimgurl').value.trim();
      const u=getUser(); if(!u)return;
      u.profileImage=url; saveUser(u);
      const av=document.getElementById('ppav');
      av.innerHTML=`<img id="ppavimg" src="${url}" alt="${u.name}" style="width:100%;height:100%;object-fit:cover">`;
      document.getElementById('ppimginput').style.display='none';
      toast('Profilbilde oppdatert! 🎉');
    };
    card.querySelector('#ppimgcancel').onclick=()=>{ document.getElementById('ppimginput').style.display='none'; };
    card.querySelector('#pflylink').onclick=openAirport;
  }

  // VALUTA
  function fixMoney(node) {
    if(!node)return;
    if(node.nodeType===3){
      const t=node.textContent, u=t.replace(/\$\s?([\d ,]+)/g,(_,n)=>'kr '+n.trim());
      if(u!==t)node.textContent=u; return;
    }
    if(/^(SCRIPT|STYLE|INPUT|TEXTAREA)$/.test(node.nodeName))return;
    node.childNodes.forEach(fixMoney);
  }

  // FENGSEL - vis profilbilde og injiser bruker i He-listen om mangler
  function patchPrison() {
    const user = getUser();
    if (!user || !user.inPrison) return;

    // Finn fengsel-tabellen - alle "innsatte" rader
    const prisonRows = document.querySelectorAll('[class*="divide-y"] > div[class*="p-4"]');
    let userFoundInPrison = false;

    prisonRows.forEach(row => {
      const nameEl = row.querySelector('[class*="font-semibold"]');
      if (!nameEl) return;

      // Sjekk om dette er brukeren
      if (nameEl.textContent.trim() === user.name) {
        userFoundInPrison = true;
        // Vis profilbilde hvis det finnes
        const avatarWrap = row.querySelector('[class*="rounded-full"]');
        if (avatarWrap && user.profileImage && !avatarWrap.querySelector('img')) {
          avatarWrap.style.overflow = 'hidden';
          avatarWrap.innerHTML = `<img src="${user.profileImage}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
        }
      } else {
        // Vis profilbilde for andre spillere om de har det (fra allUsers)
        const avatarWrap = row.querySelector('[class*="rounded-full"]');
        if (avatarWrap && !avatarWrap.querySelector('img')) {
          // Prøv å hente bilde fra en evt. lagret liste
          const storedImg = localStorage.getItem('pp_' + (nameEl.textContent.trim()));
          if (storedImg) {
            avatarWrap.style.overflow = 'hidden';
            avatarWrap.innerHTML = `<img src="${storedImg}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
          }
        }
      }
    });

    // Hvis bruker er i fengsel men ikke vises i listen, injiser dem
    if (!userFoundInPrison) {
      const prisonContainer = document.querySelector('[class*="divide-y"]');
      if (!prisonContainer) return;

      // Sjekk at dette faktisk er fengsel-containeren (har "Bryt ut" knapper eller Bot-badges)
      const isFengselet = prisonContainer.querySelector('[class*="yellow-500"]') || prisonContainer.textContent.includes('Bot');
      if (!isFengselet) return;

      // Unngå å legge til dobbelt
      if (prisonContainer.querySelector('[data-patch-user="1"]')) return;

      const RANKS = ['Nybegynner','Bråkmaker','Løpegutt','Gangster','Langer','Kaptein','Juniorsjef','Sjef','Underboss','Consigliere','Capo','Capo di Monte','Capo dei Capi','Capo di Tutti Capi','Don','Gudfar','Legende'];
      const rank = RANKS[Math.min((user.rank||1)-1, RANKS.length-1)];
      const releaseTime = user.prisonReleaseTime || (Date.now() + 60000);
      const secsLeft = Math.max(0, Math.floor((releaseTime - Date.now()) / 1000));
      const reason = user.prisonReason || 'Kriminalitet';
      const avatar = user.profileImage
        ? `<img src="${user.profileImage}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5" style="color:#6b7280"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

      const row = document.createElement('div');
      row.className = 'p-4 hover:bg-white/5 transition-colors';
      row.dataset.patchUser = '1';
      row.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;border-radius:50%;background:#222;display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px solid #a855f7">
              ${avatar}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-weight:600;color:#fff">${user.name}</span>
                <span style="font-size:11px;padding:2px 8px;border-radius:999px;background:#1a1a1a;border:1px solid #333;color:#d4a017">Deg</span>
              </div>
              <div style="font-size:12px;color:#6b7280">${rank} • ${reason}</div>
            </div>
          </div>
          <div style="text-align:right">
            <div style="display:flex;align-items:center;gap:4px;color:#facc15">
              <span style="font-family:monospace;font-size:14px" data-prison-timer="${releaseTime}">${secsLeft}s</span>
            </div>
            <div style="font-size:12px;color:#6b7280">${Math.floor((releaseTime - Date.now())/60000)} minutters dom</div>
          </div>
        </div>
      `;
      prisonContainer.prepend(row);
    }

    // Oppdater timere
    document.querySelectorAll('[data-prison-timer]').forEach(el => {
      const rt = parseInt(el.dataset.prisonTimer);
      const s = Math.max(0, Math.floor((rt - Date.now()) / 1000));
      const m = Math.floor(s / 60), sec = s % 60;
      el.textContent = m > 0 ? `${m}m ${sec}s` : `${s}s`;
    });
  }
  function patchOnline() {
    const h2=Array.from(document.querySelectorAll('h2')).find(e=>e.textContent.includes('spillere online'));
    if(h2&&!document.getElementById('ptleg')){
      const leg=document.createElement('div'); leg.id='ptleg';
      leg.innerHTML=`
        <span><span class="pd admin"></span><span style="color:#ef4444">Admin</span></span>
        <span><span class="pd mod"></span><span style="color:#c084fc">Moderator</span></span>
        <span><span class="pd lead"></span><span style="color:#f59e0b">Familieleder</span></span>
        <span><span class="pd user"></span><span style="color:#4ade80">Spiller</span></span>
      `;
      const p=h2.closest('[class*="card"],[class*="space"],[class*="bg-"]')||h2.parentNode;
      p.insertBefore(leg,p.firstChild);
    }
    document.querySelectorAll('[class*="divide-y"] > div[class*="p-4"]').forEach(row=>{
      if(row.dataset.pr)return; row.dataset.pr='1';
      const txt=row.textContent.toLowerCase();
      let rc='user';
      if(txt.includes('admin'))rc='admin';
      else if(txt.includes('moderator'))rc='mod';
      else if(txt.includes('leder')||txt.includes('leader')||txt.includes('underboss'))rc='lead';
      if(!row.querySelector('.pd')){
        const dot=document.createElement('span'); dot.className=`pd ${rc}`;
        const nm=row.querySelector('[class*="font-medium"],[class*="font-bold"],[class*="font-semibold"]');
        if(nm)nm.parentNode.insertBefore(dot,nm);
      }
    });
  }

  // SKJUL OPPDATER
  function hideRefresh() {
    document.querySelectorAll('button').forEach(b=>{if(b.textContent.trim()==='Oppdater')b.id='hide-refresh-btn';});
  }

  // Lagre eget profilbilde med navn-nøkkel for visning i fengsel
  function syncProfileImageByName() {
    const user = getUser();
    if (user && user.name && user.profileImage) {
      localStorage.setItem('pp_' + user.name, user.profileImage);
    }
  }

  // MAIN
  function patch() {
    hideRefresh();
    fixMoney(document.body);
    patchOnline();
    buildProfileCard();
    syncProfileImageByName();
    patchPrison();
  }

  new MutationObserver(patch).observe(document.body,{childList:true,subtree:true});
  setInterval(patch,30000);
  // Oppdater fengsel-timere hvert sekund
  setInterval(()=>{
    document.querySelectorAll('[data-prison-timer]').forEach(el=>{
      const rt=parseInt(el.dataset.prisonTimer);
      const s=Math.max(0,Math.floor((rt-Date.now())/1000));
      const m=Math.floor(s/60),sec=s%60;
      el.textContent=m>0?`${m}m ${sec}s`:`${s}s`;
    });
    patchPrison();
  }, 1000);
  setTimeout(patch,800);
  setTimeout(patch,2500);
  setTimeout(patch,5000);
  console.log('[PATCH v4] ✓');
})();
