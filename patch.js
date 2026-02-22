// ===== MAFIAENS HEVN - PATCH v2 =====
(function () {
  'use strict';

  // =============================================
  // 1. CSS - sterkere regler for tekst og layout
  // =============================================
  const style = document.createElement('style');
  style.textContent = `
    /* ---- TEKST: Alt som er svart/mørkt → lys gul ---- */
    * {
      --tw-text-opacity: 1;
    }
    body, body * {
      color: inherit;
    }

    /* Overskriver alle svarte og mørke tekstklasser */
    .text-black,
    .text-gray-900,
    .text-gray-800,
    .text-gray-700,
    .text-gray-600,
    .text-foreground,
    .text-card-foreground,
    .text-popover-foreground,
    .text-secondary-foreground {
      color: #fde68a !important;
    }

    /* Tekst inni kort/bokser som arver mørk bakgrunn */
    .bg-white *,
    .bg-gray-50 *,
    .bg-gray-100 *,
    [class*="bg-white"] *,
    [class*="bg-gray-1"] * {
      color: #fde68a !important;
    }

    /* Spesifikk fix for fengsel-siden og lignende lister */
    [class*="divide-y"] div p,
    [class*="divide-y"] div span,
    [class*="space-y"] div p,
    [class*="space-y"] div span {
      color: #fde68a !important;
    }

    /* Placeholder */
    input::placeholder, textarea::placeholder {
      color: #a78b39 !important;
    }

    /* Behold farger som allerede er satt eksplisitt */
    .text-white          { color: #fff !important; }
    .text-yellow-400     { color: #facc15 !important; }
    .text-yellow-500     { color: #eab308 !important; }
    .text-green-400      { color: #4ade80 !important; }
    .text-red-400        { color: #f87171 !important; }
    .text-blue-400       { color: #60a5fa !important; }
    .text-purple-400     { color: #c084fc !important; }
    .text-orange-400     { color: #fb923c !important; }
    .text-gray-400       { color: #9ca3af !important; }
    .text-gray-300       { color: #d1d5db !important; }
    .text-gray-500       { color: #6b7280 !important; }

    /* ---- Skjul Oppdater-knapp ---- */
    #hide-refresh-btn { display: none !important; }

    /* ---- ROLLEFARGER ---- */
    .patch-role-admin     { color: #ef4444 !important; font-weight: bold; }
    .patch-role-moderator { color: #c084fc !important; font-weight: bold; }
    .patch-role-leader    { color: #f59e0b !important; font-weight: bold; }
    .patch-role-user      { color: #4ade80 !important; }

    .patch-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .patch-dot.admin     { background: #ef4444; box-shadow: 0 0 5px #ef4444; }
    .patch-dot.moderator { background: #c084fc; box-shadow: 0 0 5px #c084fc; }
    .patch-dot.leader    { background: #f59e0b; box-shadow: 0 0 5px #f59e0b; }
    .patch-dot.user      { background: #4ade80; box-shadow: 0 0 5px #4ade80; }

    /* ---- FLYPLASS MODAL ---- */
    #airport-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.75);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
    }
    #airport-modal {
      background: #111;
      border: 1px solid #333;
      border-radius: 12px;
      width: 580px;
      max-width: 95vw;
      overflow: hidden;
      color: #fde68a;
    }
    #airport-modal .airport-header {
      position: relative;
      height: 130px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    #airport-modal .airport-header h2 {
      font-size: 28px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
      z-index: 2;
      letter-spacing: 2px;
    }
    #airport-modal .airport-header::before {
      content: '✈';
      position: absolute;
      font-size: 80px;
      opacity: 0.15;
      color: #fff;
      left: 20px;
    }
    #airport-modal .airport-body {
      padding: 20px;
    }
    #airport-modal .airport-info {
      text-align: center;
      margin-bottom: 16px;
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.6;
    }
    #airport-modal .airport-owner {
      text-align: center;
      margin-bottom: 16px;
      font-size: 13px;
      color: #9ca3af;
    }
    #airport-modal .airport-owner strong {
      color: #facc15;
    }
    #airport-modal table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    #airport-modal table th {
      text-align: left;
      padding: 8px 12px;
      color: #9ca3af;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid #333;
    }
    #airport-modal table td {
      padding: 12px;
      border-bottom: 1px solid #222;
      color: #fde68a;
      font-size: 14px;
    }
    #airport-modal table tr:hover td { background: #1a1a1a; }
    #airport-modal table tr.selected td { background: #1c2a1c; }
    #airport-modal table .police-high    { color: #ef4444; }
    #airport-modal table .police-medium  { color: #f59e0b; }
    #airport-modal table .police-low     { color: #4ade80; }
    #airport-modal table .police-max     { color: #ef4444; font-weight: bold; }
    #airport-modal .radio-cell input { cursor: pointer; width: 16px; height: 16px; }
    #airport-modal .airport-footer {
      display: flex;
      justify-content: flex-end;
      padding: 12px 20px;
      border-top: 1px solid #333;
      gap: 10px;
    }
    #airport-modal .btn-cancel {
      background: #333; color: #ccc;
      border: none; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 14px;
    }
    #airport-modal .btn-travel {
      background: #1d4ed8; color: #fff;
      border: none; padding: 8px 24px;
      border-radius: 6px; cursor: pointer; font-size: 14px;
      font-weight: bold;
    }
    #airport-modal .btn-travel:hover { background: #2563eb; }
    #airport-modal .btn-travel:disabled { background: #555; cursor: not-allowed; }

    /* ---- Flyplass link i sidebar / profil ---- */
    .patch-airport-link {
      cursor: pointer;
      color: #60a5fa !important;
      text-decoration: underline;
      font-size: 12px;
    }
    .patch-airport-link:hover { color: #93c5fd !important; }

    /* Skjul by-feltet i profil-redigering */
    .patch-hide-city-input { display: none !important; }

    /* ---- Rolle-legend ---- */
    #patch-role-legend {
      display: flex; flex-wrap: wrap; gap: 10px;
      padding: 10px 14px;
      background: #0d0d0d;
      border: 1px solid #222;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 12px;
    }
    #patch-role-legend .legend-item {
      display: flex; align-items: center; gap: 5px;
    }
  `;
  document.head.appendChild(style);


  // =============================================
  // 2. FLYPLASS DATA
  // =============================================
  const CITIES = [
    { name: 'Oslo',      police: 'Høy',      policeClass: 'police-high',   price: 0,         home: true },
    { name: 'Bergen',    police: 'Høy',       policeClass: 'police-high',   price: 1400000 },
    { name: 'Gøteborg',  police: 'Middels',   policeClass: 'police-medium', price: 1800000 },
    { name: 'Stockholm', police: 'Lav',       policeClass: 'police-low',    price: 2200000 },
    { name: 'København', police: 'Maksimum',  policeClass: 'police-max',    price: 2500000 },
    { name: 'Lahti',     police: 'Lav',       policeClass: 'police-low',    price: 2800000 },
    { name: 'Helsinki',  police: 'Middels',   policeClass: 'police-medium', price: 3000000 },
    { name: 'Århus',     police: 'Høy',       policeClass: 'police-high',   price: 2600000 },
  ];

  function formatKr(amount) {
    return amount.toLocaleString('no-NO') + ' kr';
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('mafiaenshevn_user') || 'null');
    } catch { return null; }
  }

  function saveUserCity(city) {
    try {
      const user = getCurrentUser();
      if (!user) return;
      user.city = city;
      localStorage.setItem('mafiaenshevn_user', JSON.stringify(user));
      // Trigger storage event for React to pick up
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('mafiaUserUpdated', { detail: user }));
    } catch(e) { console.error(e); }
  }

  // =============================================
  // 3. FLYPLASS MODAL
  // =============================================
  let selectedCity = null;
  let airportOwner = 'Staten';

  function openAirportModal() {
    if (document.getElementById('airport-modal-overlay')) return;

    const user = getCurrentUser();
    const currentCity = user?.city || 'Oslo';
    selectedCity = null;

    const overlay = document.createElement('div');
    overlay.id = 'airport-modal-overlay';

    const rows = CITIES.filter(c => !c.home || c.name !== currentCity).map(city => `
      <tr data-city="${city.name}" class="${city.name === currentCity ? 'selected' : ''}">
        <td class="radio-cell">
          <input type="radio" name="city-choice" value="${city.name}" ${city.name === currentCity ? 'checked' : ''}>
        </td>
        <td style="font-weight:${city.name === currentCity ? 'bold' : 'normal'}">${city.name}${city.name === currentCity ? ' (her nå)' : ''}</td>
        <td class="${city.policeClass}">${city.police}</td>
        <td>${city.price === 0 ? '—' : formatKr(city.price)}</td>
      </tr>
    `).join('');

    overlay.innerHTML = `
      <div id="airport-modal">
        <div class="airport-header">
          <h2>✈ Flyplass</h2>
        </div>
        <div class="airport-body">
          <div class="airport-info">
            Her kan du reise til forskjellige byer. Husk at politinivået varierer fra by til by.<br>
            Politinivået avgjør vanskelighetsgraden på kriminalitet i byen.
          </div>
          <div class="airport-owner">Flyplassen eies av <strong>${airportOwner}</strong></div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Destinasjon</th>
                <th>Politinivå</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody id="city-rows">
              ${rows}
            </tbody>
          </table>
        </div>
        <div class="airport-footer">
          <button class="btn-cancel" id="airport-cancel">Avbryt</button>
          <button class="btn-travel" id="airport-travel" disabled>Reis ✈</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Radio change
    overlay.querySelectorAll('input[type=radio]').forEach(radio => {
      radio.addEventListener('change', () => {
        selectedCity = radio.value;
        const travelBtn = document.getElementById('airport-travel');
        if (travelBtn) {
          travelBtn.disabled = selectedCity === currentCity;
        }
        overlay.querySelectorAll('tr[data-city]').forEach(tr => {
          tr.classList.toggle('selected', tr.dataset.city === selectedCity);
        });
      });
    });

    // Row click
    overlay.querySelectorAll('tr[data-city]').forEach(tr => {
      tr.addEventListener('click', () => {
        const radio = tr.querySelector('input[type=radio]');
        if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change')); }
      });
    });

    document.getElementById('airport-cancel').addEventListener('click', closeAirportModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeAirportModal(); });

    document.getElementById('airport-travel').addEventListener('click', () => {
      if (!selectedCity || selectedCity === currentCity) return;

      const cityData = CITIES.find(c => c.name === selectedCity);
      const user = getCurrentUser();
      if (!user) return;

      if (cityData && cityData.price > 0 && user.money < cityData.price) {
        alert(`Du har ikke nok penger! Reise til ${selectedCity} koster ${formatKr(cityData.price)}.`);
        return;
      }

      if (cityData && cityData.price > 0) {
        user.money -= cityData.price;
      }

      user.city = selectedCity;
      localStorage.setItem('mafiaenshevn_user', JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('mafiaUserUpdated', { detail: user }));

      closeAirportModal();

      // Vis bekreftelse
      showToast(`✈ Du fløy til ${selectedCity}!`, '#4ade80');

      // Oppdater by-visning i UI
      patchDOM();
    });
  }

  function closeAirportModal() {
    const overlay = document.getElementById('airport-modal-overlay');
    if (overlay) overlay.remove();
  }

  function showToast(msg, color = '#facc15') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:30px; left:50%; transform:translateX(-50%);
      background:#1a1a1a; border:1px solid ${color}; color:${color};
      padding:12px 24px; border-radius:8px; z-index:99999;
      font-size:14px; font-weight:bold; box-shadow:0 4px 20px rgba(0,0,0,0.5);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }


  // =============================================
  // 4. DOM PATCHES
  // =============================================
  let legendAdded = false;
  let profileCityPatched = false;

  function patchDOM() {

    // 4a. Fjern "Oppdater"-knappen
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Oppdater' && !btn.id) {
        btn.id = 'hide-refresh-btn';
      }
    });

    // 4b. Valuta: bytt $ til kr i tekst-noder
    replaceMoneyNodes(document.body);

    // 4c. Online spillere: fargefarger + legend
    patchOnlinePlayers();

    // 4d. Skjul by-input i profil-redigering
    patchProfileCityField();

    // 4e. Legg til Flyplass-knapp i profil by-visning
    patchProfileAirportLink();
  }

  // =============================================
  // 5. VALUTA: $ → kr
  // =============================================
  const moneyRegex = /\$\s?([\d,\s]+)/g;
  function replaceMoneyNodes(node) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const original = node.textContent;
      const updated = original.replace(/\$\s?([\d ,]+)/g, (_, amt) => 'kr ' + amt.trim());
      if (updated !== original) node.textContent = updated;
      return;
    }
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') return;
    node.childNodes.forEach(c => replaceMoneyNodes(c));
  }


  // =============================================
  // 6. ONLINE SPILLERE: rollefarger + legend
  // =============================================
  function patchOnlinePlayers() {
    // Finn Online-seksjon
    const onlineHeading = Array.from(document.querySelectorAll('h2')).find(
      el => el.textContent.includes('spillere online')
    );

    if (onlineHeading && !document.getElementById('patch-role-legend')) {
      const legend = document.createElement('div');
      legend.id = 'patch-role-legend';
      legend.innerHTML = `
        <span class="legend-item"><span class="patch-dot admin"></span><span style="color:#ef4444">Admin</span></span>
        <span class="legend-item"><span class="patch-dot moderator"></span><span style="color:#c084fc">Moderator</span></span>
        <span class="legend-item"><span class="patch-dot leader"></span><span style="color:#f59e0b">Familieleder</span></span>
        <span class="legend-item"><span class="patch-dot user"></span><span style="color:#4ade80">Spiller</span></span>
      `;
      const parent = onlineHeading.closest('[class*="card"], [class*="space-y"], section') || onlineHeading.parentNode;
      parent.insertBefore(legend, parent.firstChild);
    }

    // Farge online-rader
    const rows = document.querySelectorAll('[class*="divide-y"] > div[class*="p-4"]');
    rows.forEach(row => {
      if (row.dataset.patchedRole) return;

      const allText = row.textContent.toLowerCase();
      let roleClass = 'user';
      if (allText.includes('admin')) roleClass = 'admin';
      else if (allText.includes('moderator') || allText.includes('mod')) roleClass = 'moderator';
      else if (allText.includes('leder') || allText.includes('leader') || allText.includes('underboss')) roleClass = 'leader';

      if (!row.querySelector('.patch-dot')) {
        const dot = document.createElement('span');
        dot.className = `patch-dot ${roleClass}`;
        const nameEl = row.querySelector('[class*="font-medium"], [class*="font-bold"], [class*="font-semibold"]');
        if (nameEl) {
          nameEl.parentNode.insertBefore(dot, nameEl);
          nameEl.className += ` patch-role-${roleClass}`;
        }
      }

      row.dataset.patchedRole = '1';
    });
  }


  // =============================================
  // 7. PROFIL: Skjul by-inputfelt, legg til flyplass-link
  // =============================================
  function patchProfileCityField() {
    // Finn city input-felt i profil og skjul det
    document.querySelectorAll('input').forEach(input => {
      const label = input.closest('[class*="space-y"], div')?.querySelector('label');
      const placeholder = input.getAttribute('placeholder') || '';
      if (
        (label && /by|city|lokasjon/i.test(label.textContent)) ||
        /by|city|lokasjon/i.test(placeholder)
      ) {
        const wrapper = input.closest('[class*="space-y-2"], [class*="flex-col"], div');
        if (wrapper && !wrapper.dataset.patchedCity) {
          wrapper.dataset.patchedCity = '1';
          wrapper.classList.add('patch-hide-city-input');
        }
      }
    });
  }

  function patchProfileAirportLink() {
    // Finn by-visningen i profil og legg til "Endre via flyplass"-link
    const citySpans = Array.from(document.querySelectorAll('span, p')).filter(el => {
      const user = getCurrentUser();
      return user?.city && el.textContent.trim() === user.city && !el.dataset.patchedAirport;
    });

    citySpans.forEach(span => {
      span.dataset.patchedAirport = '1';
      const link = document.createElement('span');
      link.className = 'patch-airport-link';
      link.textContent = ' ✈ Fly til ny by';
      link.onclick = (e) => { e.stopPropagation(); openAirportModal(); };
      span.parentNode.insertBefore(link, span.nextSibling);
    });
  }


  // =============================================
  // 8. OBSERVER + AUTO-REFRESH
  // =============================================
  const observer = new MutationObserver(() => {
    patchDOM();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Auto-refresh hvert 30 sek
  setInterval(() => {
    patchDOM();
    window.dispatchEvent(new CustomEvent('mafiaAutoRefresh'));
  }, 30000);

  // Initial patch
  setTimeout(patchDOM, 800);
  setTimeout(patchDOM, 2000);
  setTimeout(patchDOM, 5000);

  console.log('[PATCH v2] Mafiaens Hevn patch lastet ✓');

})();
