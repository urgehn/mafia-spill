// ===== MAFIAENS HEVN - PATCH v1 =====
// Endringer: tekst til lys gul, valuta til kr, fjern oppdater-knapp,
// fiks online spillere med rollefarger, auto-refresh

(function() {
  'use strict';

  // ---- 1. LEGG TIL PATCH-CSS ----
  const style = document.createElement('style');
  style.textContent = `
    /* Lys gul tekst der svart tekst er brukt */
    .text-black,
    [class*="text-black"] {
      color: #facc15 !important;
    }

    /* Bedre lesbarhet for grå tekster */
    .text-gray-600,
    .text-gray-700,
    .text-gray-800,
    .text-gray-900 {
      color: #fde68a !important;
    }

    /* Placeholder tekst */
    input::placeholder,
    textarea::placeholder {
      color: #a78b39 !important;
    }

    /* Skjul den originale Oppdater-knappen */
    button[class*="border-[#333]"]:has-text("Oppdater") {
      display: none !important;
    }

    /* Rollefarger for online spillere */
    .role-badge-admin    { color: #ef4444 !important; font-weight: bold; }
    .role-badge-moderator { color: #a855f7 !important; font-weight: bold; }
    .role-badge-user     { color: #4ade80 !important; }
    .role-badge-leader   { color: #f59e0b !important; font-weight: bold; }

    /* Online indikator */
    .online-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      vertical-align: middle;
    }
    .online-dot.admin    { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .online-dot.moderator{ background: #a855f7; box-shadow: 0 0 6px #a855f7; }
    .online-dot.leader   { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
    .online-dot.user     { background: #4ade80; box-shadow: 0 0 6px #4ade80; }

    /* Fargeforklaring badge */
    #role-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 10px 16px;
      background: #111;
      border: 1px solid #222;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 12px;
    }
    #role-legend span {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Fjern oppdater-knapp via tekst-innhold (ekstra sikkerhet) */
    button.border-\\[\\#333\\] {
      /* Skjules via JS under */
    }
  `;
  document.head.appendChild(style);


  // ---- 2. DOM-OBSERVER: gjør endringer når React har rendret ----
  const observer = new MutationObserver(() => {
    patchDOM();
  });
  observer.observe(document.body, { childList: true, subtree: true });


  function patchDOM() {
    // 2a. Fjern "Oppdater"-knappen
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Oppdater') {
        btn.style.display = 'none';
      }
    });

    // 2b. Bytt valuta fra $ til kr
    replaceTextNodes(document.body, /\$([0-9\s,\.]+)/g, (match, amount) => {
      return 'kr ' + amount;
    });

    // 2c. Legg til fargeforklaring på Online-siden
    addRoleLegend();

    // 2d. Fiks online spillere med rollefarger
    colorOnlinePlayers();
  }


  // ---- 3. VALUTA: erstatt $-tegn med kr i tekst-noder ----
  function replaceTextNodes(node, regex, replacer) {
    if (node.nodeType === Node.TEXT_NODE) {
      const newText = node.textContent.replace(regex, replacer);
      if (newText !== node.textContent) {
        node.textContent = newText;
      }
      return;
    }
    // Ikke kjør på script/style-tagger
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') return;
    node.childNodes.forEach(child => replaceTextNodes(child, regex, replacer));
  }


  // ---- 4. ROLLEFARGER FOR ONLINE SPILLERE ----
  function colorOnlinePlayers() {
    // Finn alle rader i online-spillere seksjonen
    const rows = document.querySelectorAll('[class*="OnlinePlayers"] div[class*="p-4"], div[class*="divide-y"] > div[class*="p-4"]');
    rows.forEach(row => {
      // Finn rolle-badge eller tekst
      const roleEl = row.querySelector('[class*="text-xs"]');
      if (!roleEl) return;

      const roleText = roleEl.textContent.toLowerCase();
      let dotClass = 'user';
      let roleLabel = '';

      if (roleText.includes('admin')) {
        dotClass = 'admin';
        roleLabel = '👑 Admin';
      } else if (roleText.includes('moderator') || roleText.includes('mod')) {
        dotClass = 'moderator';
        roleLabel = '🛡️ Moderator';
      } else if (roleText.includes('leader') || roleText.includes('leder')) {
        dotClass = 'leader';
        roleLabel = '⭐ Familieleder';
      }

      // Legg til farget dot hvis ikke allerede gjort
      if (!row.querySelector('.online-dot')) {
        const dot = document.createElement('span');
        dot.className = `online-dot ${dotClass}`;
        const nameEl = row.querySelector('[class*="font-medium"], [class*="font-bold"]');
        if (nameEl && nameEl.parentNode) {
          nameEl.parentNode.insertBefore(dot, nameEl);
        }
      }
    });
  }


  // ---- 5. ROLLEFORKLARING ----
  let legendAdded = false;
  function addRoleLegend() {
    // Finn Online spillere-siden
    const onlineHeader = Array.from(document.querySelectorAll('h2, h3')).find(
      el => el.textContent.includes('spillere online') || el.textContent.includes('Online spillere')
    );

    if (onlineHeader && !legendAdded && !document.getElementById('role-legend')) {
      legendAdded = true;
      const legend = document.createElement('div');
      legend.id = 'role-legend';
      legend.innerHTML = `
        <span><span class="online-dot admin"></span><span style="color:#ef4444">Admin</span></span>
        <span><span class="online-dot moderator"></span><span style="color:#a855f7">Moderator</span></span>
        <span><span class="online-dot leader"></span><span style="color:#f59e0b">Familieleder</span></span>
        <span><span class="online-dot user"></span><span style="color:#4ade80">Spiller</span></span>
      `;
      const container = onlineHeader.closest('[class*="card"], section, [class*="space-y"]');
      if (container) {
        container.insertBefore(legend, container.firstChild);
      } else {
        onlineHeader.parentNode.insertBefore(legend, onlineHeader.nextSibling);
      }
    }
  }


  // ---- 6. AUTO-REFRESH (erstatter Oppdater-knappen) ----
  // Simuler klikk på refresh hvert 30. sekund
  let autoRefreshInterval = setInterval(() => {
    // Oppdater "sist aktiv" tidsstempel ved å dispatch en custom event
    window.dispatchEvent(new CustomEvent('mafiaAutoRefresh'));

    // Prøv å finne og klikke en skjult refresh-trigger
    const hiddenRefresh = document.querySelector('[data-refresh], [class*="refresh"]');
    if (hiddenRefresh) hiddenRefresh.click();

    // Oppdater tekst-noder med ny valuta (React kan ha re-rendret)
    patchDOM();
  }, 30000);


  // ---- 7. INITIAL PATCH etter React er ferdig ----
  // Vent litt for at React skal laste, deretter patch
  setTimeout(patchDOM, 1000);
  setTimeout(patchDOM, 2500);
  setTimeout(patchDOM, 5000);

  console.log('[PATCH] Mafiaens Hevn patch v1 lastet ✓');
})();
