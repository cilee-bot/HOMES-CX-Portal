/* HOMES CX Portal — Survey Module (고객여정 설문 도구 100% 이식) */
HomesApp.register('survey', {
  currentSub: 'overview',
  currentStage: 0,

  /* ── stage meta ── */
  STAGES: [
    { title: '\u2460 \ud22c\uc5b4 \ub2e8\uacc4', sub: '\ud22c\uc5b4 \ubc29\ubb38 \uc2dc\uc810\uc758 \uc124\ubb38\xb7\uc778\ud130\ubdf0\xb7\uc815\ubcf4\uc218\uc9d1', icon: '\ud83c\udfe0', label: '\ud22c\uc5b4', shortSub: '\uccab \ubc29\ubb38', tag: 't-blue' },
    { title: '\u2461 \uacc4\uc57d \ub2e8\uacc4', sub: '\ubaa8\ub450\uc2f8\uc778 \uc804\uc790\uacc4\uc57d \uc644\ub8cc \uc2dc\uc810', icon: '\ud83d\udcdd', label: '\uacc4\uc57d', shortSub: '\uc804\uc790\uacc4\uc57d', tag: 't-green' },
    { title: '\u2462 \uc785\uc8fc \ub2e8\uacc4', sub: '\uc774\uc0ac \ub2f9\uc77c \uc2dc\uc124\uc548\ub0b4\xb7\uccb4\ud06c\ub9ac\uc2a4\ud2b8\xb7\uc815\ubcf4\uc218\uc9d1', icon: '\ud83d\udce6', label: '\uc785\uc8fc', shortSub: '\uc774\uc0ac \ub2f9\uc77c', tag: 't-orange' },
    { title: '\u2463 \uc785\uc8fc 2\uc8fc\ud6c4', sub: '\ucd08\uae30 \uc801\uc751 \ud655\uc778 \xb7 NPS \uccab \uce21\uc815', icon: '\ud83d\udcc5', label: '2\uc8fc\ud6c4', shortSub: '\uc801\uc751 \ud655\uc778', tag: 't-purple' },
    { title: '\u2464 \uc785\uc8fc 1\uac1c\uc6d4\ud6c4', sub: '\uc815\ucc29 \ud655\uc778 \xb7 \uc601\uc5ed\ubcc4 \ub9cc\uc871\ub3c4 \xb7 \uc2ec\uce35 \uc778\ud130\ubdf0', icon: '\ud83d\udcc5', label: '1\uac1c\uc6d4\ud6c4', shortSub: '\uc815\ucc29 \ud655\uc778', tag: 't-cyan' },
    { title: '\u2465 \ud1f4\uac70 \ub2e8\uacc4', sub: '\uc774\ud0c8\uc0ac\uc720 \xb7 \ucd5c\uc885 NPS \xb7 \uc7ac\uc785\uc8fc \uc758\ud5a5 \ud30c\uc545', icon: '\ud83d\udeaa', label: '\ud1f4\uac70', shortSub: '\uc774\ud0c8 \ud30c\uc545', tag: 't-red' }
  ],

  /* ══════════════════════════════════════════
     init / onShow
     ══════════════════════════════════════════ */
  init(container, sub) {
    this.el = container;
    this.buildShell();
    if (sub) this.showSub(sub); else this.showSub('overview');
  },

  onShow(sub) {
    if (sub) this.showSub(sub);
  },

  /* ── sub-view switching ── */
  showSub(key) {
    this.currentSub = key || 'overview';
    this.el.querySelectorAll('.sv-view').forEach(v => v.style.display = 'none');
    const t = this.el.querySelector(`#sv-${this.currentSub}`);
    if (t) t.style.display = 'block';
    this.el.querySelectorAll('.sv-tab').forEach(b => b.classList.remove('badge-blue'));
    const btn = this.el.querySelector(`[data-sv-tab="${this.currentSub}"]`);
    if (btn) btn.classList.add('badge-blue');
  },

  /* ── goStage ── */
  goStage(idx) {
    this.currentStage = idx;
    this.showSub('stage');
    const s = this.STAGES[idx];
    this.el.querySelector('#sv-stage-title').textContent = s.title;
    this.el.querySelector('#sv-stage-sub').textContent = s.sub;
    this.el.querySelectorAll('.sv-stage-panel').forEach(p => p.style.display = 'none');
    const panel = this.el.querySelector(`[data-sv-stage="${idx}"]`);
    if (panel) panel.style.display = 'block';
    this.el.querySelectorAll('#sv-jmap2 .j-step').forEach((st, i) => st.classList.toggle('on', i === idx));
  },

  /* ── accordion toggle ── */
  togSc(el) {
    el.closest('.sc-wrap').classList.toggle('open');
  },

  /* ══════════════════════════════════════════
     BUILD SHELL — tabs + 4 sub-views
     ══════════════════════════════════════════ */
  buildShell() {
    const S = this.STAGES;
    this.el.innerHTML = `
      <!-- Tab bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:8px">
        <div>
          <div class="page-title">\uace0\uac1d\uc5ec\uc815 \uc124\ubb38 \xb7 \uc778\ud130\ubdf0 \xb7 \uc628\ubcf4\ub529 \ub3c4\uad6c</div>
          <div class="page-desc">6\uac1c \ud130\uce58\ud3ec\uc778\ud2b8\ubcc4 \uc124\ubb38 \ud15c\ud50c\ub9bf \xb7 \uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \xb7 \uace0\uac1d\uc815\ubcf4 \uc218\uc9d1 \xb7 \uc628\ubcf4\ub529 \ubc29\ubc95\ub860</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="badge badge-blue sv-tab" data-sv-tab="overview" onclick="HomesApp.modules.survey.showSub('overview')">\uc5ec\uc815 Overview</button>
          <button class="badge sv-tab" data-sv-tab="collect" onclick="HomesApp.modules.survey.showSub('collect')">\uace0\uac1d\uc815\ubcf4 \uc218\uc9d1</button>
          <button class="badge sv-tab" data-sv-tab="onboard" onclick="HomesApp.modules.survey.showSub('onboard')">\uc628\ubcf4\ub529 \ubc29\ubc95\ub860</button>
          <button class="badge sv-tab" data-sv-tab="stage" onclick="HomesApp.modules.survey.showSub('stage')">\ub2e8\uacc4\ubcc4 \uc124\ubb38</button>
        </div>
      </div>

      <!-- ═══════════ OVERVIEW ═══════════ -->
      <div id="sv-overview" class="sv-view">
        ${this.htmlOverview()}
      </div>

      <!-- ═══════════ COLLECT ═══════════ -->
      <div id="sv-collect" class="sv-view" style="display:none">
        ${this.htmlCollect()}
      </div>

      <!-- ═══════════ ONBOARD ═══════════ -->
      <div id="sv-onboard" class="sv-view" style="display:none">
        ${this.htmlOnboard()}
      </div>

      <!-- ═══════════ STAGE ═══════════ -->
      <div id="sv-stage" class="sv-view" style="display:none">
        ${this.htmlStage()}
      </div>
    `;
  },

  /* ══════════════════════════════════════════
     OVERVIEW PAGE
     ══════════════════════════════════════════ */
  htmlOverview() {
    const S = this.STAGES;
    return `
      <!-- KPI Row -->
      <div class="grid-3" style="margin-bottom:20px">
        <div class="kpi-card"><div class="kpi-label">\ud130\uce58\ud3ec\uc778\ud2b8</div><div class="kpi-value" style="color:var(--accent)">6</div><div style="font-size:11px;color:var(--dim);margin-top:2px">\uace0\uac1d\uc5ec\uc815 \ub2e8\uacc4</div></div>
        <div class="kpi-card"><div class="kpi-label">\uc124\ubb38\ud56d\ubaa9</div><div class="kpi-value" style="color:var(--green)">42</div><div style="font-size:11px;color:var(--dim);margin-top:2px">\uc804 \ub2e8\uacc4 \ud569\uacc4</div></div>
        <div class="kpi-card"><div class="kpi-label">\uc218\uc9d1\uc815\ubcf4</div><div class="kpi-value" style="color:var(--orange)">8</div><div style="font-size:11px;color:var(--dim);margin-top:2px">\uace0\uac1d \ud504\ub85c\ud544 \ud544\ub4dc</div></div>
        <div class="kpi-card"><div class="kpi-label">NPS \uce21\uc815</div><div class="kpi-value" style="color:var(--purple)">3</div><div style="font-size:11px;color:var(--dim);margin-top:2px">\uc785\uc8fc2\uc8fc\xb71\uac1c\uc6d4\xb7\ud1f4\uac70</div></div>
        <div class="kpi-card"><div class="kpi-label">\uc778\ud130\ubdf0</div><div class="kpi-value" style="color:var(--indigo)">6</div><div style="font-size:11px;color:var(--dim);margin-top:2px">\ub2e8\uacc4\ubcc4 \uc2a4\ud06c\ub9bd\ud2b8</div></div>
        <div class="kpi-card"><div class="kpi-label">\uc628\ubcf4\ub529</div><div class="kpi-value" style="color:var(--cyan)">4</div><div style="font-size:11px;color:var(--dim);margin-top:2px">\ucc44\ub110\ubcc4 \ubc29\ubc95\ub860</div></div>
      </div>

      <!-- Journey Map -->
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uace0\uac1d\uc5ec\uc815 \ub9f5 \u2014 6\uac1c \ud130\uce58\ud3ec\uc778\ud2b8</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:16px">\uac01 \ub2e8\uacc4 \ud074\ub9ad \uc2dc \uc0c1\uc138 \uc124\ubb38\xb7\uc2a4\ud06c\ub9bd\ud2b8 \ud655\uc778</div>
        <div class="journey-map" id="sv-jmap1">
          ${S.map((s, i) => `
            <div class="j-step${i === 0 ? ' on' : ''}" onclick="HomesApp.modules.survey.goStage(${i})">
              <div style="text-align:center">
                <div class="j-num">${i + 1}</div>
                <div class="j-title">${s.label}</div>
                <div class="j-desc">${s.shortSub}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Summary Table -->
      <div class="card">
        <div class="section-title">\ub2e8\uacc4\ubcc4 \uc2e4\ud589 \uc694\uc57d</div>
        <table class="cx-table">
          <thead><tr><th>\ub2e8\uacc4</th><th>\uc124\ubb38 \ubaa9\uc801</th><th>\uc218\uc9d1 \uc815\ubcf4</th><th>\ubc29\ubc95</th><th>\ub2f4\ub2f9</th><th>\ud0c0\uc774\ubc0d</th></tr></thead>
          <tbody>
            <tr><td><span class="tag t-blue">\ud22c\uc5b4</span></td><td>\uc720\uc785\uacbd\ub85c \xb7 \uae30\ub300\uc0ac\ud56d \ud30c\uc545</td><td>\uae30\ubcf8\uc815\ubcf4 \uc804\uccb4 (8\ud56d\ubaa9)</td><td>\ub300\uba74 \ud0dc\ube14\ub9bf / QR</td><td>\ud604\uc7a5 \ub9e4\ub2c8\uc800</td><td>\ud22c\uc5b4 \uc9c1\ud6c4</td></tr>
            <tr><td><span class="tag t-green">\uacc4\uc57d</span></td><td>\uacc4\uc57d \uacbd\ud5d8 \xb7 \uc815\ubcf4 \uc774\ud574\ub3c4</td><td>\uc774\uba54\uc77c \xb7 \uac70\uc8fc\ubaa9\uc801 \ubcf4\uc644</td><td>\ubaa8\ub450\uc2f8\uc778 \uc5f0\ub3d9 / \uce74\ud1a1</td><td>\uc6b4\uc601\ud300</td><td>\uacc4\uc57d \uc644\ub8cc \uc9c1\ud6c4</td></tr>
            <tr><td><span class="tag t-orange">\uc785\uc8fc</span></td><td>\uccab\uc778\uc0c1 \xb7 \uc2dc\uc124 \ub9cc\uc871\ub3c4</td><td>\uc785\uc8fc\uc77c \xb7 \uae34\uae09\uc5f0\ub77d\ucc98</td><td>\ub300\uba74 \uccb4\ud06c\ub9ac\uc2a4\ud2b8 / \uce74\ud1a1</td><td>\ud604\uc7a5 \ub9e4\ub2c8\uc800</td><td>\uc785\uc8fc \ub2f9\uc77c</td></tr>
            <tr><td><span class="tag t-purple">2\uc8fc\ud6c4</span></td><td>\ucd08\uae30 \uc801\uc751 \xb7 \ubd88\ud3b8\uc0ac\ud56d</td><td>NPS (\uccab \uce21\uc815)</td><td>\uce74\ud1a1 \uc790\ub3d9\ubc1c\uc1a1 / \ub300\uba74</td><td>CX\ud300</td><td>\uc785\uc8fc D+14</td></tr>
            <tr><td><span class="tag t-cyan">1\uac1c\uc6d4\ud6c4</span></td><td>\uc815\ucc29 \ub9cc\uc871\ub3c4 \xb7 \ucee4\ubba4\ub2c8\ud2f0</td><td>NPS \xb7 \uc601\uc5ed\ubcc4 \ub9cc\uc871\ub3c4</td><td>\uce74\ud1a1 \uc124\ubb38\ub9c1\ud06c / \uc778\ud130\ubdf0</td><td>CX\ud300</td><td>\uc785\uc8fc D+30</td></tr>
            <tr><td><span class="tag t-red">\ud1f4\uac70</span></td><td>\uc774\ud0c8\uc0ac\uc720 \xb7 \uac1c\uc120\uc810</td><td>NPS \xb7 \uc7ac\uc785\uc8fc \uc758\ud5a5</td><td>\ub300\uba74 / \uce74\ud1a1</td><td>\ud604\uc7a5 \ub9e4\ub2c8\uc800 + CX\ud300</td><td>\ud1f4\uc2e4 \uccb4\ud06c \uc2dc</td></tr>
          </tbody>
        </table>
      </div>
    `;
  },

  /* ══════════════════════════════════════════
     COLLECT PAGE
     ══════════════════════════════════════════ */
  htmlCollect() {
    return `
      <div class="page-title">\uace0\uac1d\uc815\ubcf4 \uc218\uc9d1 \uc591\uc2dd</div>
      <div class="page-desc" style="margin-bottom:24px">\ud22c\uc5b4 \uc2dc\uc810 \uba54\uc778 \uc218\uc9d1 \u2192 \uc774\ud6c4 \ub2e8\uacc4\uc5d0\uc11c \ubcf4\uc644. \uc544\ub798\ub294 \uc218\uc9d1 \uc591\uc2dd \ud504\ub9ac\ubdf0.</div>

      <!-- Profile Form Preview -->
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uae30\ubcf8 \ud504\ub85c\ud544 \uc815\ubcf4 (\ud22c\uc5b4 \uc2dc\uc810 \uc218\uc9d1)</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:16px">8\uac1c \ud544\ub4dc \u2014 \ud22c\uc5b4 \uc2dc \ud0dc\ube14\ub9bf \ub610\ub294 QR \uc591\uc2dd\uc73c\ub85c \uc218\uc9d1</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;background:var(--bg2);border-radius:var(--r);padding:20px">
          <div><div class="form-label">\uc774\ub984 <span style="color:var(--red)">*</span></div><input class="form-input" placeholder="\ud64d\uae38\ub3d9" readonly></div>
          <div><div class="form-label">\uc5f0\ub77d\ucc98 <span style="color:var(--red)">*</span></div><input class="form-input" placeholder="010-1234-5678" readonly></div>
          <div><div class="form-label">\uc774\uba54\uc77c</div><input class="form-input" placeholder="example@email.com" readonly></div>
          <div><div class="form-label">\uc131\ubcc4</div><div style="display:flex;gap:6px"><span class="tag t-blue">\ub0a8\uc131</span><span class="tag" style="background:var(--bg);border:1px solid var(--border)">\uc5ec\uc131</span><span class="tag" style="background:var(--bg);border:1px solid var(--border)">\uae30\ud0c0</span></div></div>
          <div><div class="form-label">\uad6d\uc801 <span style="color:var(--red)">*</span></div><select class="form-select"><option>\ub300\ud55c\ubbfc\uad6d</option><option>\uae30\ud0c0 (\uc9c1\uc811\uc785\ub825)</option></select></div>
          <div><div class="form-label">\uc9c1\uc5c5</div><select class="form-select"><option>\uc120\ud0dd\ud558\uc138\uc694</option><option>\uc9c1\uc7a5\uc778</option><option>\ub300\ud559\uc0dd/\ub300\ud559\uc6d0\uc0dd</option><option>\ud504\ub9ac\ub79c\uc11c</option><option>\uc790\uc601\uc5c5</option><option>\uae30\ud0c0</option></select></div>
          <div><div class="form-label">\uc5f0\ub839\ub300 <span style="color:var(--red)">*</span></div><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="tag" style="background:var(--bg);border:1px solid var(--border)">20\ub300 \ucd08\ubc18</span><span class="tag t-blue">20\ub300 \ud6c4\ubc18</span><span class="tag" style="background:var(--bg);border:1px solid var(--border)">30\ub300</span><span class="tag" style="background:var(--bg);border:1px solid var(--border)">40\ub300 \uc774\uc0c1</span></div></div>
          <div><div class="form-label">\uac70\uc8fc\ubaa9\uc801 <span style="color:var(--red)">*</span></div><select class="form-select"><option>\uc120\ud0dd\ud558\uc138\uc694</option><option>\uc9c1\uc7a5 \ucd9c\ud1f4\uadfc</option><option>\ud559\uad50 \ud1b5\ud559</option><option>\ub3c5\ub9bd/\uc790\ucde8</option><option>\uc77c\uc2dc\uc801 \uac70\uc8fc (\ud504\ub85c\uc81d\ud2b8 \ub4f1)</option><option>\uae30\ud0c0</option></select></div>
        </div>
      </div>

      <!-- Stage collection table -->
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\ub2e8\uacc4\ubcc4 \ucd94\uac00 \uc218\uc9d1 \ud56d\ubaa9</div>
        <table class="cx-table">
          <thead><tr><th>\ub2e8\uacc4</th><th>\ucd94\uac00 \uc218\uc9d1 \ud56d\ubaa9</th><th>\uc218\uc9d1 \ubc29\ubc95</th><th>\ud544\uc218/\uc120\ud0dd</th></tr></thead>
          <tbody>
            <tr><td><span class="tag t-blue">\ud22c\uc5b4</span></td><td>\uc720\uc785\uacbd\ub85c \xb7 \uad00\uc2ec\uc9c0\uc810 \xb7 \ud76c\ub9dd \uc785\uc8fc\uc77c \xb7 \uc608\uc0b0\ubc94\uc704</td><td>\ub300\uba74 \ud0dc\ube14\ub9bf \uc591\uc2dd</td><td>\ud544\uc218 4 + \uc120\ud0dd 4</td></tr>
            <tr><td><span class="tag t-green">\uacc4\uc57d</span></td><td>\uc774\uba54\uc77c(\ubbf8\uc218\uc9d1 \uc2dc) \xb7 \uac70\uc8fc\ubaa9\uc801 \uc0c1\uc138 \xb7 \uacc4\uc57d\uae30\uac04 \xb7 \ud638\uc2e4\ud0c0\uc785</td><td>\ubaa8\ub450\uc2f8\uc778 \uc5f0\ub3d9 \uc790\ub3d9\uc218\uc9d1</td><td>\uc790\ub3d9 \uc5f0\ub3d9</td></tr>
            <tr><td><span class="tag t-orange">\uc785\uc8fc</span></td><td>\uae34\uae09\uc5f0\ub77d\ucc98 \xb7 \uc54c\ub808\ub974\uae30/\ud2b9\uc774\uc0ac\ud56d \xb7 \uc120\ud638 \uc5f0\ub77d\uc2dc\uac04</td><td>\uc785\uc8fc \uccb4\ud06c\ub9ac\uc2a4\ud2b8 \uc591\uc2dd</td><td>\uae34\uae09\uc5f0\ub77d\ucc98 \ud544\uc218</td></tr>
            <tr><td><span class="tag t-purple">2\uc8fc\ud6c4</span></td><td>NPS \uc810\uc218 \xb7 \ucd08\uae30\ubd88\ud3b8 \xb7 \ucee4\ubba4\ub2c8\ud2f0 \ucc38\uc5ec\uc758\ud5a5</td><td>\uce74\ud1a1 \uc124\ubb38</td><td>NPS \ud544\uc218</td></tr>
            <tr><td><span class="tag t-cyan">1\uac1c\uc6d4\ud6c4</span></td><td>NPS \uc810\uc218 \xb7 \uc601\uc5ed\ubcc4 \ub9cc\uc871\ub3c4 \xb7 \ucd94\ucc9c\uc758\ud5a5 \uc0ac\uc720</td><td>\uce74\ud1a1 \uc124\ubb38 / \ub300\uba74 \uc778\ud130\ubdf0</td><td>NPS \ud544\uc218</td></tr>
            <tr><td><span class="tag t-red">\ud1f4\uac70</span></td><td>\ud1f4\uc2e4\uc0ac\uc720 \xb7 NPS \xb7 \uc7ac\uc785\uc8fc \uc758\ud5a5 \xb7 \uac1c\uc120 \uc694\uccad</td><td>\ub300\uba74 \uccb4\ud06c\ub9ac\uc2a4\ud2b8 / \uce74\ud1a1</td><td>\ud1f4\uc2e4\uc0ac\uc720 \ud544\uc218</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Supabase Schema -->
      <div class="card">
        <div class="section-title">Supabase \ub370\uc774\ud130 \uc2a4\ud0a4\ub9c8 (\ucc38\uc870)</div>
        <table class="cx-table">
          <thead><tr><th style="width:160px">\ud544\ub4dc\uba85</th><th style="width:100px">\ud0c0\uc785</th><th style="width:60px">\ud544\uc218</th><th>\uc124\uba85</th></tr></thead>
          <tbody>
            <tr><td><code style="color:var(--accent)">customer_name</code></td><td>text</td><td>\u2705</td><td>\uace0\uac1d \uc774\ub984</td></tr>
            <tr><td><code style="color:var(--accent)">phone</code></td><td>text</td><td>\u2705</td><td>\uc5f0\ub77d\ucc98</td></tr>
            <tr><td><code style="color:var(--accent)">email</code></td><td>text</td><td></td><td>\uc774\uba54\uc77c</td></tr>
            <tr><td><code style="color:var(--accent)">gender</code></td><td>enum</td><td></td><td>male / female / other</td></tr>
            <tr><td><code style="color:var(--accent)">nationality</code></td><td>text</td><td>\u2705</td><td>\uad6d\uc801</td></tr>
            <tr><td><code style="color:var(--accent)">occupation</code></td><td>text</td><td></td><td>\uc9c1\uc5c5</td></tr>
            <tr><td><code style="color:var(--accent)">age_group</code></td><td>text</td><td>\u2705</td><td>20s_early / 20s_late / 30s / 40s_plus</td></tr>
            <tr><td><code style="color:var(--accent)">residence_purpose</code></td><td>text</td><td>\u2705</td><td>\uac70\uc8fc\ubaa9\uc801</td></tr>
            <tr><td><code style="color:var(--accent)">source_channel</code></td><td>text</td><td></td><td>\uc720\uc785\uacbd\ub85c</td></tr>
            <tr><td><code style="color:var(--accent)">branch</code></td><td>text</td><td>\u2705</td><td>\uc9c0\uc810\uba85</td></tr>
            <tr><td><code style="color:var(--accent)">tour_date</code></td><td>date</td><td></td><td>\ud22c\uc5b4\uc77c</td></tr>
            <tr><td><code style="color:var(--accent)">contract_date</code></td><td>date</td><td></td><td>\uacc4\uc57d\uc77c</td></tr>
            <tr><td><code style="color:var(--accent)">move_in_date</code></td><td>date</td><td></td><td>\uc785\uc8fc\uc77c</td></tr>
            <tr><td><code style="color:var(--accent)">move_out_date</code></td><td>date</td><td></td><td>\ud1f4\uc2e4\uc77c</td></tr>
            <tr><td><code style="color:var(--accent)">nps_2w</code></td><td>integer</td><td></td><td>2\uc8fc\ucc28 NPS (0-10)</td></tr>
            <tr><td><code style="color:var(--accent)">nps_1m</code></td><td>integer</td><td></td><td>1\uac1c\uc6d4 NPS (0-10)</td></tr>
            <tr><td><code style="color:var(--accent)">nps_exit</code></td><td>integer</td><td></td><td>\ud1f4\uc2e4 NPS (0-10)</td></tr>
          </tbody>
        </table>
      </div>
    `;
  },

  /* ══════════════════════════════════════════
     ONBOARD PAGE
     ══════════════════════════════════════════ */
  htmlOnboard() {
    return `
      <div class="page-title">\uc628\ubcf4\ub529 \xb7 \uace0\uac1d\uc815\ubcf4 \ucde8\ub4dd \ubc29\ubc95\ub860</div>
      <div class="page-desc" style="margin-bottom:24px">\uace0\uac1d \ubd80\ub2f4\uc744 \ucd5c\uc18c\ud654\ud558\uba74\uc11c \uc815\ubcf4\ub97c \uc218\uc9d1\ud558\uace0 \uc11c\ube44\uc2a4\uc5d0 \uc548\ucc29\uc2dc\ud0a4\ub294 4\uac00\uc9c0 \ucc44\ub110</div>

      <!-- 4 Channels -->
      <div class="grid-4" style="margin-bottom:20px">
        <div class="card">
          <div style="font-size:22px;margin-bottom:8px">\ud83d\udcf1</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\uce74\uce74\uc624\ud1a1 \uc790\ub3d9 \uba54\uc2dc\uc9c0</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.7">\ud22c\uc5b4 \uc608\uc57d \ud655\uc778 \u2192 \uacc4\uc57d \uc548\ub0b4 \u2192 \uc785\uc8fc D-3 \uccb4\ud06c\ub9ac\uc2a4\ud2b8 \u2192 D+14 \uc124\ubb38 \u2192 D+30 \uc124\ubb38 \uc790\ub3d9 \ubc1c\uc1a1. \uce74\uce74\uc624 \ube44\uc988\uba54\uc2dc\uc9c0 API \ub610\ub294 \ucc44\ub110 \uba54\uc2dc\uc9c0 \ud65c\uc6a9.</div>
        </div>
        <div class="card">
          <div style="font-size:22px;margin-bottom:8px">\ud83d\udda5\ufe0f</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud0dc\ube14\ub9bf \ub300\uba74 \uc591\uc2dd</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.7">\ud22c\uc5b4 \ud604\uc7a5\uc5d0\uc11c \ub9e4\ub2c8\uc800\uac00 \ud0dc\ube14\ub9bf\uc73c\ub85c \uace0\uac1d\uc815\ubcf4 \uc785\ub825. \uc785\uc8fc \ub2f9\uc77c \uccb4\ud06c\ub9ac\uc2a4\ud2b8\ub3c4 \ud0dc\ube14\ub9bf \ud65c\uc6a9. \uc989\uc2dc Supabase \uc800\uc7a5.</div>
        </div>
        <div class="card">
          <div style="font-size:22px;margin-bottom:8px">\ud83d\udcce</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">QR\ucf54\ub4dc \uc124\ubb38</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.7">\ud638\uc2e4 \ub0b4 QR \uc2a4\ud2f0\ucee4 \u2192 \uc785\uc8fc \uac00\uc774\ub4dc + \uc124\ubb38 \uc5f0\uacb0. Wi-Fi \uc548\ub0b4, \ub3c4\uc5b4\ub77d \uc0ac\uc6a9\ubc95, \uc4f0\ub808\uae30 \ubc30\ucd9c \ub4f1 \uc815\ubcf4 \uc81c\uacf5\uacfc \ub3d9\uc2dc\uc5d0 \ub9cc\uc871\ub3c4 \uc218\uc9d1.</div>
        </div>
        <div class="card">
          <div style="font-size:22px;margin-bottom:8px">\ud83e\udd1d</div>
          <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ub300\uba74 \uc778\ud130\ubdf0</div>
          <div style="font-size:12px;color:var(--muted);line-height:1.7">\uc785\uc8fc 2\uc8fc/1\uac1c\uc6d4 \uc2dc\uc810 CX\ud300 \ud604\uc7a5 \ubc29\ubb38 \ub300\uba74 \uc778\ud130\ubdf0. \uc2ec\uce35 \ud53c\ub4dc\ubc31 \uc218\uc9d1. \uc124\ubb38 \ubbf8\uc751\ub2f5\uc790 \ub300\uc0c1 \ud314\ub85c\uc5c5. 10\ubd84 \uc774\ub0b4 \uac04\uacb0\ud558\uac8c.</div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc628\ubcf4\ub529 \ud0c0\uc784\ub77c\uc778</div>
        <div style="margin-top:16px">
          <div class="tl-item done"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">D-7 : \ud22c\uc5b4 \uc608\uc57d \ud655\uc778</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\uce74\uce74\uc624\ud1a1 \uc790\ub3d9 \uba54\uc2dc\uc9c0 \ubc1c\uc1a1. \ud22c\uc5b4 \uc77c\uc815 \xb7 \uc900\ube44\ubb3c \xb7 \uc9c0\uc810 \uc704\uce58 \uc548\ub0b4.</div></div>
          <div class="tl-item done"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">D-Day : \ud22c\uc5b4 \ubc29\ubb38</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\ub300\uba74 \ud0dc\ube14\ub9bf\uc73c\ub85c \uae30\ubcf8\uc815\ubcf4 8\ud56d\ubaa9 \uc218\uc9d1. \ud22c\uc5b4 \uc9c1\ud6c4 \uac04\ub2e8 \uc124\ubb38 (\uae30\ub300\uc0ac\ud56d 3\ubb38\ud56d).</div></div>
          <div class="tl-item done"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">\uacc4\uc57d \uc644\ub8cc \uc9c1\ud6c4</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\ubaa8\ub450\uc2f8\uc778 \uacc4\uc57d \uc644\ub8cc \uc2dc \uacc4\uc57d \uacbd\ud5d8 \uc124\ubb38 \uce74\ud1a1 \uc790\ub3d9 \ubc1c\uc1a1. \uc785\uc8fc \uc548\ub0b4 \ud0a4\ud2b8 \uc804\ub2ec.</div></div>
          <div class="tl-item"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">\uc785\uc8fc D-3 : \uc0ac\uc804 \uc548\ub0b4</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\uc785\uc8fc \uccb4\ud06c\ub9ac\uc2a4\ud2b8 \xb7 \uac00\uc2a4\uc804\uc785 \xb7 \ub178\ud06c\ud0c0\uc6b4 \uc571\uc124\uce58 \xb7 Wi-Fi \uc815\ubcf4 \uce74\ud1a1 \ubc1c\uc1a1.</div></div>
          <div class="tl-item"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">\uc785\uc8fc D-Day : \uc774\uc0ac \ub2f9\uc77c</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\ub300\uba74 \uccb4\ud06c\ub9ac\uc2a4\ud2b8. \uc2dc\uc124 \uc548\ub0b4 (\uc5d0\uc5b4\ucee8\xb7\ubcf4\uc77c\ub7ec\xb7\ub3c4\uc5b4\ub77d\xb7\ubd84\ub9ac\uc218\uac70). \uae34\uae09\uc5f0\ub77d\ucc98 \uc218\uc9d1.</div></div>
          <div class="tl-item"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">D+3 : \uccab \uc548\ubd80 \uba54\uc2dc\uc9c0</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\u201c\uc798 \uc801\uc751\ud558\uace0 \uacc4\uc2e0\uac00\uc694?\u201d \uac04\ub2e8 \uc548\ubd80. \ubd88\ud3b8\uc0ac\ud56d \uc788\uc73c\uba74 \ud3b8\ud558\uac8c \ub9d0\uc500\ud574\ub2ec\ub77c\uace0 \uc548\ub0b4.</div></div>
          <div class="tl-item"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">D+14 : 2\uc8fc\ucc28 \uc124\ubb38</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">NPS \uccab \uce21\uc815 + \ucd08\uae30 \uc801\uc751 \uc124\ubb38 7\ubb38\ud56d. \uce74\ud1a1 \uc790\ub3d9\ubc1c\uc1a1. \ubbf8\uc751\ub2f5 \uc2dc D+16 \ub9ac\ub9c8\uc778\ub4dc.</div></div>
          <div class="tl-item"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">D+30 : 1\uac1c\uc6d4 \uc124\ubb38</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">NPS + \uc601\uc5ed\ubcc4 \ub9cc\uc871\ub3c4 (\uacf5\uac04\xb7\uc11c\ube44\uc2a4\xb7\ucee4\ubba4\ub2c8\ud2f0\xb7\ube44\uc6a9). \uc778\ud130\ubdf0 \ud76c\ub9dd\uc790 \ubaa8\uc9d1.</div></div>
          <div class="tl-item"><div class="tl-dot"></div><div style="font-size:13px;font-weight:600;color:var(--text-h)">\ud1f4\uc2e4 \ud655\uc815 \uc2dc : \ud1f4\uac70 \uc124\ubb38</div><div style="font-size:12px;color:var(--muted);margin-top:2px;line-height:1.7">\ud1f4\uc2e4 \uccb4\ud06c \uc2dc \ub300\uba74 \uc124\ubb38 \ub610\ub294 \uce74\ud1a1. \uc774\ud0c8\uc0ac\uc720 \xb7 NPS \xb7 \uc7ac\uc785\uc8fc \uc758\ud5a5 \xb7 \uac1c\uc120\uc810 \uc218\uc9d1.</div></div>
        </div>
      </div>

      <!-- Principles -->
      <div class="card">
        <div class="section-title">\uc815\ubcf4 \uc218\uc9d1 \uc6d0\uce59</div>
        <div class="grid-2" style="margin-top:12px">
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:8px">\ucd5c\uc18c \ubd80\ub2f4 \uc6d0\uce59</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ud55c \ubc88\uc5d0 5\ubd84 \uc774\ub0b4. \uc124\ubb38\uc740 7\ubb38\ud56d \uc774\ud558. \uc120\ud0dd\uc9c0 \uc704\uc8fc (\uc8fc\uad00\uc2dd \ucd5c\uc18c\ud654). \ud22c\uc5b4 \uc2dc \uae30\ubcf8\uc815\ubcf4\ub294 \ub9e4\ub2c8\uc800\uac00 \ub300\ud654 \uc911 \uc790\uc5f0\uc2a4\ub7fd\uac8c \uc218\uc9d1.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:8px">\uc810\uc9c4\uc801 \uc218\uc9d1</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ud22c\uc5b4: \uae30\ubcf8 8\ud56d\ubaa9 \u2192 \uacc4\uc57d: \uc790\ub3d9\uc5f0\ub3d9 \u2192 \uc785\uc8fc: \uae34\uae09\uc5f0\ub77d\ucc98 \u2192 2\uc8fc/1\uac1c\uc6d4: NPS + \ub9cc\uc871\ub3c4. \ud55c \ubc88\uc5d0 \ubaa8\ub4e0 \uac83\uc744 \ubb3b\uc9c0 \uc54a\uc74c.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:8px">\uac00\uce58 \uad50\ud658</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\uc815\ubcf4 \uc218\uc9d1 \uc2dc \ubc18\ub4dc\uc2dc \ud61c\ud0dd \uc81c\uacf5. \uc608: \uc124\ubb38 \uc644\ub8cc \uc2dc \uce74\ud398 \ucfe0\ud3f0, \uc785\uc8fc \uac00\uc774\ub4dc QR\uc5d0 \uc720\uc6a9 \uc815\ubcf4 \ud3ec\ud568, \uc778\ud130\ubdf0 \ucc38\uc5ec \uc2dc \uad00\ub9ac\ube44 \ud560\uc778.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:8px">\ub370\uc774\ud130 \ud1b5\ud569</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ubaa8\ub4e0 \uc218\uc9d1 \ub370\uc774\ud130 \u2192 Supabase \ub2e8\uc77c DB. \uace0\uac1d ID \uae30\uc900 \ub2e8\uacc4\ubcc4 \ub370\uc774\ud130 \ub204\uc801. \uc911\ubcf5 \uc218\uc9d1 \ubc29\uc9c0.</div>
          </div>
        </div>
      </div>
    `;
  },

  /* ══════════════════════════════════════════
     STAGE PAGE (all 6 stages)
     ══════════════════════════════════════════ */
  htmlStage() {
    const S = this.STAGES;
    return `
      <div id="sv-stage-title" class="page-title">${S[0].title}</div>
      <div id="sv-stage-sub" class="page-desc" style="margin-bottom:20px">${S[0].sub}</div>

      <!-- Journey Map mini -->
      <div class="journey-map" id="sv-jmap2" style="margin-bottom:24px">
        ${S.map((s, i) => `
          <div class="j-step${i === 0 ? ' on' : ''}" onclick="HomesApp.modules.survey.goStage(${i})">
            <div style="text-align:center">
              <div class="j-num">${i + 1}</div>
              <div class="j-title">${s.label}</div>
              <div class="j-desc">${s.shortSub}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- ===== Stage 0: 투어 ===== -->
      <div class="sv-stage-panel" data-sv-stage="0">
        ${this.htmlStage0()}
      </div>

      <!-- ===== Stage 1: 계약 ===== -->
      <div class="sv-stage-panel" data-sv-stage="1" style="display:none">
        ${this.htmlStage1()}
      </div>

      <!-- ===== Stage 2: 입주 ===== -->
      <div class="sv-stage-panel" data-sv-stage="2" style="display:none">
        ${this.htmlStage2()}
      </div>

      <!-- ===== Stage 3: 입주 2주후 ===== -->
      <div class="sv-stage-panel" data-sv-stage="3" style="display:none">
        ${this.htmlStage3()}
      </div>

      <!-- ===== Stage 4: 입주 1개월후 ===== -->
      <div class="sv-stage-panel" data-sv-stage="4" style="display:none">
        ${this.htmlStage4()}
      </div>

      <!-- ===== Stage 5: 퇴거 ===== -->
      <div class="sv-stage-panel" data-sv-stage="5" style="display:none">
        ${this.htmlStage5()}
      </div>
    `;
  },

  /* ── Stage 0: 투어 ── */
  htmlStage0() {
    return `
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc124\ubb38 \ud15c\ud50c\ub9bf \u2014 \ud22c\uc5b4 \uc9c1\ud6c4 (3\ubd84)</div>
        <table class="cx-table">
          <thead><tr><th style="width:36px">#</th><th style="width:240px">\uc9c8\ubb38</th><th>\uc120\ud0dd\uc9c0 / \ud615\uc2dd</th><th style="width:60px">\ud544\uc218</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>HOMES\ub97c \uc5b4\ub5bb\uac8c \uc54c\uac8c \ub418\uc168\ub098\uc694?</td><td>\ub124\uc774\ubc84 \uac80\uc0c9 / \uc778\uc2a4\ud0c0\uadf8\ub7a8 / \uc9c0\uc778\ucd94\ucc9c / \ubd80\ub3d9\uc0b0 / \uae30\ud0c0</td><td>\u2705</td></tr>
            <tr><td>2</td><td>\ucf54\ub9ac\ube59\uc744 \uc120\ud0dd\ud558\uc2e0 \uc774\uc720\ub294?</td><td>\uac00\uaca9 / \uc704\uce58 / \ucee4\ubba4\ub2c8\ud2f0 / \ud480\ud37c\ub2c8\uc2dc\ub4dc / \uae30\ud0c0</td><td>\u2705</td></tr>
            <tr><td>3</td><td>\uc785\uc8fc \ud76c\ub9dd \uc2dc\uae30\ub294?</td><td>\uc989\uc2dc / 1\uc8fc\ub0b4 / 2\uc8fc\ub0b4 / 1\uac1c\uc6d4\ub0b4 / \ubbf8\uc815</td><td>\u2705</td></tr>
            <tr><td>4</td><td>\uc608\uc0b0 \ubc94\uc704\ub294? (\uc6d4 \uc784\ub300\ub8cc \uae30\uc900)</td><td>40\ub9cc\uc6d0\ub300 / 50\ub9cc\uc6d0\ub300 / 60\ub9cc\uc6d0\ub300 / 70\ub9cc\uc6d0 \uc774\uc0c1</td><td></td></tr>
            <tr><td>5</td><td>\ud22c\uc5b4 \uc2dc \uac00\uc7a5 \uc778\uc0c1\uc801\uc774\uc5c8\ub358 \uc810\uc740?</td><td>\uc8fc\uad00\uc2dd (\ud55c\uc904)</td><td></td></tr>
            <tr><td>6</td><td>\ucd94\uac00\ub85c \uad81\uae08\ud558\uc2e0 \uc810\uc774 \uc788\uc73c\uc2e0\uac00\uc694?</td><td>\uc8fc\uad00\uc2dd (\ud55c\uc904)</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \u2014 \ud22c\uc5b4 \ub300\uba74 (\ub9e4\ub2c8\uc800\uc6a9)</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">\ud22c\uc5b4 \uc548\ub0b4 + \uc790\uc5f0\uc2a4\ub7ec\uc6b4 \uc815\ubcf4 \uc218\uc9d1 \uc2a4\ud06c\ub9bd\ud2b8</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            <strong>[\uc778\uc0ac / \ub77c\ud3ec \ud615\uc131]</strong><br>
            \u201c\uc548\ub155\ud558\uc138\uc694, \u25cb\u25cb\u25cb\ub2d8! HOMES \u25cb\u25cb\uc9c0\uc810 \ub9e4\ub2c8\uc800 \u25a1\u25a1\u25a1\uc785\ub2c8\ub2e4. \uc624\ub298 \uc640\uc8fc\uc154\uc11c \uac10\uc0ac\ud569\ub2c8\ub2e4.\u201d<br><br>
            <strong>[\uc790\uc5f0\uc2a4\ub7ec\uc6b4 \uc815\ubcf4 \uc218\uc9d1]</strong><br>
            \u201c\ud639\uc2dc \uc800\ud76c\ub97c \uc5b4\ub5bb\uac8c \uc54c\uac8c \ub418\uc168\uc5b4\uc694?\u201d \u2192 <em>(\uc720\uc785\uacbd\ub85c \uae30\ub85d)</em><br>
            \u201c\ud604\uc7ac \uc5b4\ub514 \ucabd\uc5d0\uc11c \ucd9c\ud1f4\uadfc(\ud1b5\ud559) \ud558\uc2dc\ub098\uc694?\u201d \u2192 <em>(\uac70\uc8fc\ubaa9\uc801 \ud30c\uc545)</em><br>
            \u201c\uc785\uc8fc\ub294 \uc5b8\uc81c\ucbe4 \uc0dd\uac01\ud558\uace0 \uacc4\uc138\uc694?\u201d \u2192 <em>(\ud76c\ub9dd \uc785\uc8fc\uc77c)</em><br><br>
            <strong>[\ud22c\uc5b4 \uc9c4\ud589]</strong><br>
            \uac1c\uc778\uacf5\uac04 \u2192 \uacf5\uc6a9\ub77c\uc6b4\uc9c0 \u2192 \uc138\ud0c1\uc2e4 \u2192 \ubd84\ub9ac\uc218\uac70 \u2192 \ucd9c\uc785\uc2dc\uc2a4\ud15c \uc21c\uc11c<br>
            \uac01 \uacf5\uac04\uc5d0\uc11c \u201c\u25cb\u25cb\ub2d8 \uc9c1\uc5c5 \ud2b9\uc131\uc0c1 \uc774 \ubd80\ubd84\uc774 \uc911\uc694\ud558\uc2e4 \uac83 \uac19\uc544\uc694\u201d \uc2dd\uc73c\ub85c \ub9de\ucda4 \uc548\ub0b4<br><br>
            <strong>[\ub9c8\ubb34\ub9ac]</strong><br>
            \u201c\uac04\ub2e8\ud55c \uc124\ubb38 \ud558\ub098\ub9cc \ubd80\ud0c1\ub4dc\ub824\ub3c4 \ub420\uae4c\uc694? 1\ubd84\uc774\uba74 \ub429\ub2c8\ub2e4.\u201d \u2192 \ud0dc\ube14\ub9bf \uc804\ub2ec<br>
            \u201c\uad81\uae08\ud558\uc2e0 \uc810 \uc788\uc73c\uc2dc\uba74 \uce74\uce74\uc624\ud1a1 \ucc44\ub110\ub85c \ud3b8\ud558\uac8c \uc5f0\ub77d \uc8fc\uc138\uc694.\u201d
          </div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">\uace0\uac1d\uc815\ubcf4 \uc218\uc9d1 \ud3ec\uc778\ud2b8</div>
        <div class="grid-2">
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udcf1 \ud0dc\ube14\ub9bf \uc591\uc2dd (\uba54\uc778)</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ub9e4\ub2c8\uc800\uac00 \ud22c\uc5b4 \uc911 \ub300\ud654\ub85c \ud30c\uc545\ud55c \uc815\ubcf4\ub97c \ud0dc\ube14\ub9bf\uc5d0 \uc785\ub825. \ud22c\uc5b4 \ud6c4 \uace0\uac1d\uc5d0\uac8c \ub098\uba38\uc9c0 \ud56d\ubaa9 \uc9c1\uc811 \uc785\ub825 \uc694\uccad. Supabase \uc9c1\uc811 \uc5f0\ub3d9.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udcce QR \ud3f4\ubc31</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ud0dc\ube14\ub9bf \uc0ac\uc6a9 \ubd88\uac00 \uc2dc QR\ucf54\ub4dc \u2192 \ubaa8\ubc14\uc77c \uc591\uc2dd. \ud22c\uc5b4 \ud604\uc7a5 \uc548\ub0b4 \ub370\uc2a4\ud06c\uc5d0 QR \ube44\uce58. \ub3d9\uc77c \uc591\uc2dd \ubaa8\ubc14\uc77c \ucd5c\uc801\ud654 \ubc84\uc804.</div>
          </div>
        </div>
      </div>
    `;
  },

  /* ── Stage 1: 계약 ── */
  htmlStage1() {
    return `
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc124\ubb38 \ud15c\ud50c\ub9bf \u2014 \uacc4\uc57d \uc644\ub8cc \uc9c1\ud6c4 (2\ubd84)</div>
        <table class="cx-table">
          <thead><tr><th style="width:36px">#</th><th style="width:240px">\uc9c8\ubb38</th><th>\uc120\ud0dd\uc9c0 / \ud615\uc2dd</th><th style="width:60px">\ud544\uc218</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>\uacc4\uc57d \uacfc\uc815(\ubaa8\ub450\uc2f8\uc778)\uc740 \ud3b8\ub9ac\ud558\uc168\ub098\uc694?</td><td>\ub9e4\uc6b0 \ud3b8\ub9ac / \ud3b8\ub9ac / \ubcf4\ud1b5 / \ubd88\ud3b8 / \ub9e4\uc6b0 \ubd88\ud3b8</td><td>\u2705</td></tr>
            <tr><td>2</td><td>\uacc4\uc57d \ub0b4\uc6a9(\ube44\uc6a9\xb7\uaddc\uce59 \ub4f1) \uc774\ud574\uac00 \ucda9\ubd84\ud558\uc168\ub098\uc694?</td><td>\ucda9\ubd84 / \ub300\uccb4\ub85c / \ubd80\uc871 / \uc774\ud574 \uc548\ub428</td><td>\u2705</td></tr>
            <tr><td>3</td><td>\uc785\uc8fc \uc804 \ucd94\uac00\ub85c \uc548\ub0b4\ubc1b\uace0 \uc2f6\uc740 \uc0ac\ud56d\uc740?</td><td>\uc2dc\uc124\uc774\uc6a9 / \uad00\ub9ac\ube44 / \ucee4\ubba4\ub2c8\ud2f0 / \uc8fc\ubcc0\uc815\ubcf4 / \uc5c6\uc74c</td><td></td></tr>
            <tr><td>4</td><td>\uacc4\uc57d \uacfc\uc815\uc5d0\uc11c \uac1c\uc120\ub418\uba74 \uc88b\uaca0\ub294 \uc810\uc740?</td><td>\uc8fc\uad00\uc2dd (\ud55c\uc904)</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \u2014 \uce74\uce74\uc624\ud1a1 \uba54\uc2dc\uc9c0</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">\uacc4\uc57d \uc644\ub8cc \ucd95\ud558 + \uc124\ubb38 \uc694\uccad \uba54\uc2dc\uc9c0</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            <strong>[\uce74\uce74\uc624\ud1a1 \ube44\uc988\uba54\uc2dc\uc9c0]</strong><br><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8, \ucd95\ud558\ub4dc\ub9bd\ub2c8\ub2e4! \ud83c\udf89<br>
            HOMES \u25cb\u25cb\uc9c0\uc810 \uacc4\uc57d\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.<br><br>
            \uc785\uc8fc \uc804\uae4c\uc9c0 \uc544\ub798 \uc900\ube44\uc0ac\ud56d\uc744 \ud655\uc778\ud574 \uc8fc\uc138\uc694:<br>
            \u2705 \uac00\uc2a4 \uc804\uc785\uc2e0\uace0 (\ucf54\uc6d0\uc5d0\ub108\uc9c0)<br>
            \u2705 \ub178\ud06c\ud0c0\uc6b4 \uc571 \uc124\uce58 + \uac00\uc785<br>
            \u2705 \uc794\uae08 \uc785\uae08 \ud655\uc778<br><br>
            1\ubd84 \uc124\ubb38\uc5d0 \uc751\ub2f5\ud574 \uc8fc\uc2dc\uba74 \ub354 \ub098\uc740 \uc11c\ube44\uc2a4\ub97c \uc900\ube44\ud558\uaca0\uc2b5\ub2c8\ub2e4.<br>
            [\uc124\ubb38 \ubc14\ub85c\uac00\uae30]\u201d<br><br>
            <strong>[\ubbf8\uc751\ub2f5 \uc2dc D+2 \ub9ac\ub9c8\uc778\ub4dc]</strong><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8, \uc785\uc8fc \uc900\ube44\ub294 \uc798 \ub418\uace0 \uacc4\uc2e0\uac00\uc694?<br>
            \uac04\ub2e8\ud55c \uc124\ubb38 \uc544\uc9c1 \uc548 \ud558\uc168\ub2e4\uba74 \ubd80\ud0c1\ub4dc\ub824\uc694 \ud83d\ude0a [\ub9c1\ud06c]\u201d
          </div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">\uc790\ub3d9 \uc218\uc9d1 \ub370\uc774\ud130 (\ubaa8\ub450\uc2f8\uc778 \uc5f0\ub3d9)</div>
        <div class="grid-2">
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udcc4 \uacc4\uc57d\uc11c \uc790\ub3d9 \ucd94\ucd9c</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\uacc4\uc57d\uc77c \xb7 \uacc4\uc57d\uae30\uac04 \xb7 \ud638\uc2e4\ubc88\ud638 \xb7 \ud638\uc2e4\ud0c0\uc785 \xb7 \ubcf4\uc99d\uae08 \xb7 \uc6d4\uc784\ub300\ub8cc \xb7 \uc9c0\uc810\uba85 \u2192 Supabase \uc790\ub3d9 \uc800\uc7a5. \ubaa8\ub450\uc2f8\uc778 \uc6f9\ud6c5 or \uc218\ub3d9 \uc785\ub825.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udce7 \uc774\uba54\uc77c \ubcf4\uc644 \uc218\uc9d1</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ud22c\uc5b4 \uc2dc \uc774\uba54\uc77c \ubbf8\uc218\uc9d1 \uace0\uac1d \u2192 \uacc4\uc57d \uc2dc\uc810\uc5d0\uc11c \ubaa8\ub450\uc2f8\uc778 \uc11c\uba85 \uc774\uba54\uc77c\ub85c \uc790\ub3d9 \ud655\ubcf4. DB \uc5c5\ub370\uc774\ud2b8.</div>
          </div>
        </div>
      </div>
    `;
  },

  /* ── Stage 2: 입주 ── */
  htmlStage2() {
    return `
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc124\ubb38 \ud15c\ud50c\ub9bf \u2014 \uc785\uc8fc \ub2f9\uc77c \uccb4\ud06c\ub9ac\uc2a4\ud2b8 (5\ubd84)</div>
        <table class="cx-table">
          <thead><tr><th style="width:36px">#</th><th style="width:240px">\uc9c8\ubb38</th><th>\uc120\ud0dd\uc9c0 / \ud615\uc2dd</th><th style="width:60px">\ud544\uc218</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>\ud638\uc2e4 \uc0c1\ud0dc(\uccad\uacb0\ub3c4\xb7\uac00\uad6c)\ub294 \ub9cc\uc871\ud558\uc2dc\ub098\uc694?</td><td>\ub9e4\uc6b0 \ub9cc\uc871 / \ub9cc\uc871 / \ubcf4\ud1b5 / \ubd88\ub9cc\uc871</td><td>\u2705</td></tr>
            <tr><td>2</td><td>\uc2dc\uc124 \uc548\ub0b4\ub97c \ucda9\ubd84\ud788 \ubc1b\uc73c\uc168\ub098\uc694?</td><td>\ucda9\ubd84 / \ub300\uccb4\ub85c / \ubd80\uc871</td><td>\u2705</td></tr>
            <tr><td>3</td><td>\uc5d0\uc5b4\ucee8(\ub0c9\ubc29\uc804\uc6a9)/\ubcf4\uc77c\ub7ec \uc0ac\uc6a9\ubc95\uc744 \uc774\ud574\ud558\uc168\ub098\uc694?</td><td>\uc774\ud574\ud568 / \uc7ac\uc124\uba85 \ud544\uc694</td><td>\u2705</td></tr>
            <tr><td>4</td><td>\ub178\ud06c\ud0c0\uc6b4 \uc571(\ucd9c\uc785) \uc815\uc0c1 \uc791\ub3d9\ud558\ub098\uc694?</td><td>\uc815\uc0c1 / \ubb38\uc81c\uc788\uc74c</td><td>\u2705</td></tr>
            <tr><td>5</td><td>Wi-Fi \uc5f0\uacb0\uc740 \uc815\uc0c1\uc778\uac00\uc694?</td><td>\uc815\uc0c1 / \ubb38\uc81c\uc788\uc74c</td><td>\u2705</td></tr>
            <tr><td>6</td><td>\uae34\uae09 \uc5f0\ub77d\ucc98\ub97c \uc54c\ub824\uc8fc\uc138\uc694</td><td>\uc774\ub984 + \uc5f0\ub77d\ucc98 (\uac00\uc871 \ub4f1)</td><td>\u2705</td></tr>
            <tr><td>7</td><td>\uccab\uc778\uc0c1 \ud55c\ub9c8\ub514</td><td>\uc8fc\uad00\uc2dd (\ud55c\uc904)</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="section-title">\uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \u2014 \uc785\uc8fc \ub2f9\uc77c \ub300\uba74 (\ub9e4\ub2c8\uc800\uc6a9)</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">\uc785\uc8fc \ub2f9\uc77c \uc2dc\uc124 \uc548\ub0b4 + \uccb4\ud06c\ub9ac\uc2a4\ud2b8 \uc2a4\ud06c\ub9bd\ud2b8</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            <strong>[\ud658\uc601 \uc778\uc0ac]</strong><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8, \ud658\uc601\ud569\ub2c8\ub2e4! HOMES \u25cb\u25cb\uc9c0\uc810\uc5d0\uc11c \ud3b8\uc548\ud55c \uc0dd\ud65c \ub418\uc2dc\uae38 \ubc14\ub78d\ub2c8\ub2e4.\u201d<br><br>
            <strong>[\ud544\uc218 \uc548\ub0b4 \u2014 5\uac00\uc9c0]</strong><br>
            \u2460 <strong>\uc5d0\uc5b4\ucee8\xb7\ubcf4\uc77c\ub7ec:</strong> \u201c\uc5d0\uc5b4\ucee8\uc740 \ub0c9\ubc29\uc804\uc6a9\uc774\uace0, \ub09c\ubc29\uc740 \ubcf4\uc77c\ub7ec \uc0ac\uc6a9\ud569\ub2c8\ub2e4.\u201d (\ub9ac\ubaa8\ucee8 \uc9c1\uc811 \uc2dc\uc5f0)<br>
            \u2461 <strong>\ub3c4\uc5b4\ub77d:</strong> \u201c\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd\ubc95, \ubc30\ud130\ub9ac \uad50\uccb4 \uc2dc\uae30 \uc54c\ub824\ub4dc\ub9b4\uac8c\uc694.\u201d (9V \uac74\uc804\uc9c0 \ube44\uc0c1\uc804\uc6d0 \uc124\uba85)<br>
            \u2462 <strong>Wi-Fi:</strong> \u201cSSID\ub294 HOMES+\ud638\uc2e4\ubc88\ud638, \ube44\ubc00\ubc88\ud638\ub294 \uc5ec\uae30 \uc2a4\ud2f0\ucee4\uc5d0 \uc788\uc2b5\ub2c8\ub2e4.\u201d<br>
            \u2463 <strong>\ubd84\ub9ac\uc218\uac70:</strong> \u201c\ud074\ub9b0\ud558\uc6b0\uc2a4 \uc704\uce58\uc640 \ubc30\ucd9c \uc694\uc77c \uc548\ub0b4\ub4dc\ub9bd\ub2c8\ub2e4.\u201d<br>
            \u2464 <strong>\uae34\uae09 \uc5f0\ub77d:</strong> \u201c\ubb38\uc81c \ubc1c\uc0dd \uc2dc \uce74\uce74\uc624\ud1a1 \u2018\ud648\uc988\uc2a4\ud29c\ub514\uc624\u2019 \ucc44\ub110\ub85c \uc5f0\ub77d \uc8fc\uc138\uc694.\u201d<br><br>
            <strong>[\uccb4\ud06c\ub9ac\uc2a4\ud2b8 \ud655\uc778]</strong><br>
            \ud0dc\ube14\ub9bf\uc73c\ub85c \ud638\uc2e4 \uc0c1\ud0dc \uccb4\ud06c + \uace0\uac1d \uc11c\uba85 \u2192 \u201c\ud639\uc2dc \ubc14\ub85c \ubd88\ud3b8\ud558\uc2e0 \uc810 \uc788\uc73c\uc2dc\uba74 \uc9c0\uae08 \ub9d0\uc500\ud574 \uc8fc\uc138\uc694.\u201d<br><br>
            <strong>[\ub9c8\ubb34\ub9ac]</strong><br>
            \u201c3\uc77c \ub4a4\uc5d0 \uc548\ubd80 \uba54\uc2dc\uc9c0 \ub4dc\ub9b4\uac8c\uc694. \ud3b8\ud558\uac8c \uc9c0\ub0b4\uc2dc\ub2e4\uac00 \ubb50\ub4e0 \uce74\ud1a1 \uc8fc\uc138\uc694!\u201d
          </div></div>
        </div>
      </div>
    `;
  },

  /* ── Stage 3: 입주 2주후 ── */
  htmlStage3() {
    return `
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc124\ubb38 \ud15c\ud50c\ub9bf \u2014 \uc785\uc8fc 2\uc8fc\ud6c4 (3\ubd84)</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:14px">NPS \uccab \uce21\uc815 \uc2dc\uc810. \uce74\uce74\uc624\ud1a1 \uc790\ub3d9 \ubc1c\uc1a1 (D+14)</div>
        <table class="cx-table">
          <thead><tr><th style="width:36px">#</th><th style="width:240px">\uc9c8\ubb38</th><th>\uc120\ud0dd\uc9c0 / \ud615\uc2dd</th><th style="width:60px">\ud544\uc218</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>HOMES\ub97c \uc9c0\uc778\uc5d0\uac8c \ucd94\ucc9c\ud560 \uc758\ud5a5\uc740? (NPS)</td><td>0~10 \uc2a4\ucf00\uc77c</td><td>\u2705</td></tr>
            <tr><td>2</td><td>\uc704 \uc810\uc218\ub97c \uc8fc\uc2e0 \uc774\uc720\ub294?</td><td>\uc8fc\uad00\uc2dd (\ud55c\uc904)</td><td>\u2705</td></tr>
            <tr><td>3</td><td>\uc785\uc8fc \ud6c4 \uac00\uc7a5 \ub9cc\uc871\uc2a4\ub7ec\uc6b4 \uc810\uc740?</td><td>\uacf5\uac04 / \uc704\uce58 / \uc11c\ube44\uc2a4 / \ucee4\ubba4\ub2c8\ud2f0 / \uac00\uaca9 / \uae30\ud0c0</td><td></td></tr>
            <tr><td>4</td><td>\uc785\uc8fc \ud6c4 \uac00\uc7a5 \ubd88\ud3b8\ud588\ub358 \uc810\uc740?</td><td>\uc2dc\uc124 / \uc18c\uc74c / \uccad\uc18c / \uad00\ub9ac\ube44 / Wi-Fi / \uc5c6\uc74c / \uae30\ud0c0</td><td></td></tr>
            <tr><td>5</td><td>\ub9e4\ub2c8\uc800 \uc751\ub300\uc5d0 \ub9cc\uc871\ud558\uc2dc\ub098\uc694?</td><td>\ub9e4\uc6b0 \ub9cc\uc871 / \ub9cc\uc871 / \ubcf4\ud1b5 / \ubd88\ub9cc\uc871</td><td></td></tr>
            <tr><td>6</td><td>\ucee4\ubba4\ub2c8\ud2f0 \ud65c\ub3d9\uc5d0 \uad00\uc2ec \uc788\uc73c\uc2e0\uac00\uc694?</td><td>\ub9e4\uc6b0 \uad00\uc2ec / \uad00\uc2ec / \ubcf4\ud1b5 / \uad00\uc2ec\uc5c6\uc74c</td><td></td></tr>
            <tr><td>7</td><td>\uac1c\uc120 \uc694\uccad \uc0ac\ud56d (\uc790\uc720\ub86d\uac8c)</td><td>\uc8fc\uad00\uc2dd</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \u2014 \ub300\uba74 (CX\ud300\uc6a9)</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">2\uc8fc\ucc28 \ud314\ub85c\uc5c5 \ub300\uba74 \uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            <strong>[\ub300\uba74 \uc624\ud504\ub2dd]</strong><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8 \uc548\ub155\ud558\uc138\uc694, HOMES CX\ud300 \u25a1\u25a1\u25a1\uc785\ub2c8\ub2e4.<br>
            \uc785\uc8fc 2\uc8fc \ub418\uc168\ub294\ub370, \uc798 \uc801\uc751\ud558\uace0 \uacc4\uc2e0\uc9c0 \uc7a0\uae50 \uc778\uc0ac\ub4dc\ub9ac\ub7ec \uc654\uc5b4\uc694. 5\ubd84 \uc815\ub3c4 \uad1c\ucc2e\uc73c\uc2e4\uae4c\uc694?\u201d<br><br>
            <strong>[\ud575\uc2ec \uc9c8\ubb38 3\uac00\uc9c0]</strong><br>
            \u2460 \u201c\uc0dd\ud65c\ud558\uc2dc\uba74\uc11c \uac00\uc7a5 \ub9cc\uc871\uc2a4\ub7ec\uc6b4 \uc810\uc740 \ubf50\uc608\uc694?\u201d<br>
            \u2461 \u201c\ubc18\ub300\ub85c \ubd88\ud3b8\ud558\uac70\ub098 \uc544\uc26c\uc6b4 \uc810\uc740\uc694?\u201d<br>
            \u2462 \u201c0~10\uc810 \uc911 \uc9c0\uc778\uc5d0\uac8c HOMES \ucd94\ucc9c \uc810\uc218\ub97c \uc900\ub2e4\uba74?\u201d \u2192 <em>(NPS \uae30\ub85d)</em><br><br>
            <strong>[\ubd88\ud3b8 \uc0ac\ud56d \uc788\uc744 \ub54c]</strong><br>
            \u201c\uc9c1\uc811 \ubcf4\uc5ec\uc8fc\uc2dc\uaca0\uc5b4\uc694?\u201d \u2192 \ud604\uc7a5 \ud655\uc778 \ud6c4 \u201c\ubc14\ub85c \ub2f4\ub2f9 \ub9e4\ub2c8\uc800\uc5d0\uac8c \uc804\ub2ec\ud574\uc11c [\uad6c\uccb4\uc801 \uc77c\uc815]\uae4c\uc9c0 \ud574\uacb0 \uc548\ub0b4\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.\u201d<br><br>
            <strong>[\ub9c8\ubb34\ub9ac]</strong><br>
            \u201c\uc9c1\uc811 \ub9cc\ub098\ubed5\uace0 \uc774\uc57c\uae30 \ub098\ub20c \uc218 \uc788\uc5b4\uc11c \uc88b\uc558\uc2b5\ub2c8\ub2e4. \uc55e\uc73c\ub85c\ub3c4 \ubd88\ud3b8\ud55c \uc810 \uc788\uc73c\uc2dc\uba74 \uce74\ud1a1\uc73c\ub85c \ud3b8\ud558\uac8c \ub9d0\uc500\ud574 \uc8fc\uc138\uc694!\u201d
          </div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">\uc790\ub3d9 \ubc1c\uc1a1 \uba54\uc2dc\uc9c0 (\uce74\uce74\uc624\ud1a1)</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">D+14 \uc790\ub3d9 \uc124\ubb38 \uc694\uccad \uba54\uc2dc\uc9c0</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            \u201c\u25cb\u25cb\u25cb\ub2d8, HOMES \u25cb\u25cb\uc9c0\uc810\uc5d0\uc11c \uc0dd\ud65c\ud55c \uc9c0 2\uc8fc\uac00 \ub418\uc5c8\uc5b4\uc694! \ud83c\udfe0<br><br>
            \uc798 \uc801\uc751\ud558\uace0 \uacc4\uc2e0\uac00\uc694?<br>
            \uac04\ub2e8\ud55c \uc124\ubb38(1\ubd84)\uc5d0 \uc751\ub2f5\ud574 \uc8fc\uc2dc\uba74, \ub354 \ub098\uc740 \uc11c\ube44\uc2a4\ub97c \ub9cc\ub4dc\ub294 \ub370 \ud070 \ub3c4\uc6c0\uc774 \ub429\ub2c8\ub2e4.<br><br>
            [\uc124\ubb38 \ubc14\ub85c\uac00\uae30]<br><br>
            \u2615 \uc124\ubb38 \uc644\ub8cc \uc2dc \uce74\ud398 \uae30\ud504\ud2f0\ucf58\uc744 \ubcf4\ub0b4\ub4dc\ub824\uc694!\u201d<br><br>
            <strong>[D+16 \ubbf8\uc751\ub2f5 \ub9ac\ub9c8\uc778\ub4dc]</strong><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8, \ud639\uc2dc \uc124\ubb38 \uc544\uc9c1 \uc548 \ud558\uc168\ub2e4\uba74 1\ubd84\ub9cc \ubd80\ud0c1\ub4dc\ub824\uc694 \ud83d\ude0a [\ub9c1\ud06c]\u201d
          </div></div>
        </div>
      </div>
    `;
  },

  /* ── Stage 4: 입주 1개월후 ── */
  htmlStage4() {
    return `
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc124\ubb38 \ud15c\ud50c\ub9bf \u2014 \uc785\uc8fc 1\uac1c\uc6d4\ud6c4 (5\ubd84)</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:14px">NPS \ucd94\uc801 + \uc601\uc5ed\ubcc4 \ub9cc\uc871\ub3c4 \uc2ec\uce35 \uce21\uc815</div>
        <table class="cx-table">
          <thead><tr><th style="width:36px">#</th><th style="width:240px">\uc9c8\ubb38</th><th>\uc120\ud0dd\uc9c0 / \ud615\uc2dd</th><th style="width:60px">\ud544\uc218</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>HOMES\ub97c \uc9c0\uc778\uc5d0\uac8c \ucd94\ucc9c\ud560 \uc758\ud5a5\uc740? (NPS)</td><td>0~10 \uc2a4\ucf00\uc77c</td><td>\u2705</td></tr>
            <tr><td>2</td><td>\uc704 \uc810\uc218\ub97c \uc8fc\uc2e0 \uc774\uc720\ub294?</td><td>\uc8fc\uad00\uc2dd</td><td>\u2705</td></tr>
            <tr><td>3</td><td>\uac1c\uc778 \uacf5\uac04(\ubc29) \ub9cc\uc871\ub3c4</td><td>5\uc810 \ucc99\ub3c4</td><td>\u2705</td></tr>
            <tr><td>4</td><td>\uacf5\uc6a9 \uacf5\uac04(\ub77c\uc6b4\uc9c0\xb7\uc138\ud0c1\uc2e4) \ub9cc\uc871\ub3c4</td><td>5\uc810 \ucc99\ub3c4</td><td>\u2705</td></tr>
            <tr><td>5</td><td>\uc2dc\uc124 \uad00\ub9ac\xb7\uc218\ub9ac \ub300\uc751 \ub9cc\uc871\ub3c4</td><td>5\uc810 \ucc99\ub3c4</td><td></td></tr>
            <tr><td>6</td><td>\uad00\ub9ac\ube44 \ub300\ube44 \uac00\uce58 \ub9cc\uc871\ub3c4</td><td>5\uc810 \ucc99\ub3c4</td><td>\u2705</td></tr>
            <tr><td>7</td><td>\ub9e4\ub2c8\uc800/CS \uc751\ub300 \ub9cc\uc871\ub3c4</td><td>5\uc810 \ucc99\ub3c4</td><td></td></tr>
            <tr><td>8</td><td>\ucee4\ubba4\ub2c8\ud2f0\xb7\uc774\uc6c3 \uad00\uacc4 \ub9cc\uc871\ub3c4</td><td>5\uc810 \ucc99\ub3c4</td><td></td></tr>
            <tr><td>9</td><td>\uac00\uc7a5 \uac1c\uc120\uc774 \ud544\uc694\ud55c 1\uac00\uc9c0\ub294?</td><td>\uacf5\uac04 / \uccad\uc18c / \uc11c\ube44\uc2a4 / \ube44\uc6a9 / \uc18c\uc74c / \uc2dc\uc2a4\ud15c / \uae30\ud0c0</td><td>\u2705</td></tr>
            <tr><td>10</td><td>\uc2ec\uce35 \uc778\ud130\ubdf0(15\ubd84)\uc5d0 \ucc38\uc5ec \uc758\ud5a5\uc774 \uc788\uc73c\uc2e0\uac00\uc694?</td><td>\uc608(\uad00\ub9ac\ube44 \ud560\uc778) / \uc544\ub2c8\uc624</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="section-title">\uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \u2014 \uc2ec\uce35 \uc778\ud130\ubdf0 (15\ubd84, CX\ud300)</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">1\uac1c\uc6d4\ucc28 \uc2ec\uce35 \uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 (\ud76c\ub9dd\uc790 \ub300\uc0c1)</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            <strong>[\uc624\ud504\ub2dd]</strong><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8, \uc778\ud130\ubdf0 \ucc38\uc5ec \uac10\uc0ac\ud569\ub2c8\ub2e4. 15\ubd84 \uc815\ub3c4 \uc18c\uc694\ub418\uba70, \ub9d0\uc500\ud558\uc2e0 \ub0b4\uc6a9\uc740 \uc11c\ube44\uc2a4 \uac1c\uc120\uc5d0\ub9cc \ud65c\uc6a9\ub429\ub2c8\ub2e4.\u201d<br><br>
            <strong>[Part 1: \uc804\ubc18\uc801 \uacbd\ud5d8 (5\ubd84)]</strong><br>
            \u2460 \u201cHOMES \uc0dd\ud65c\uc744 \ud55c\ub9c8\ub514\ub85c \ud45c\ud604\ud55c\ub2e4\uba74?\u201d<br>
            \u2461 \u201c\uc785\uc8fc \uc804 \uae30\ub300\uc640 \ube44\uad50\ud574\uc11c \uc5b4\ub5a0\uc138\uc694?\u201d<br>
            \u2462 \u201c\uc77c\uc0c1\uc5d0\uc11c \uac00\uc7a5 \uc88b\uc740 \uc21c\uac04\uc740? \uac00\uc7a5 \ubd88\ud3b8\ud55c \uc21c\uac04\uc740?\u201d<br><br>
            <strong>[Part 2: \uc601\uc5ed\ubcc4 \uc2ec\uce35 (5\ubd84)]</strong><br>
            \u2463 \u201c\uacf5\uac04(\ubc29\xb7\ub77c\uc6b4\uc9c0)\uc5d0\uc11c \ubc14\uafb8\uace0 \uc2f6\uc740 \uc810\uc740?\u201d<br>
            \u2464 \u201c\uad00\ub9ac\ube44\uc5d0 \ub300\ud574 \uc5b4\ub5bb\uac8c \ub290\ub07c\uc138\uc694? \uac00\uce58 \ub300\ube44 \uc801\uc815\ud55c\uac00\uc694?\u201d<br>
            \u2465 \u201c\ub9e4\ub2c8\uc800\ub098 CS \ub300\uc751\uc5d0\uc11c \uae30\uc5b5\ub098\ub294 \uacbd\ud5d8\uc774 \uc788\ub098\uc694?\u201d<br><br>
            <strong>[Part 3: \ubbf8\ub798 \uc758\ud5a5 (5\ubd84)]</strong><br>
            \u2466 \u201c\uacc4\uc57d \uc5f0\uc7a5 \uc758\ud5a5\uc740 \uc5b4\ub290 \uc815\ub3c4\uc778\uac00\uc694?\u201d<br>
            \u2467 \u201c\uc5b4\ub5a4 \uc810\uc774 \uac1c\uc120\ub418\uba74 \ubc18\ub4dc\uc2dc \uc5f0\uc7a5\ud558\uc2dc\uaca0\uc5b4\uc694?\u201d<br>
            \u2468 \u201cHOMES\uc5d0 \ubc14\ub77c\ub294 \uc0c8\ub85c\uc6b4 \uc11c\ube44\uc2a4\uac00 \uc788\ub2e4\uba74?\u201d<br><br>
            <strong>[\ub9c8\ubb34\ub9ac]</strong><br>
            \u201c\uc18c\uc911\ud55c \uc758\uacac \uac10\uc0ac\ud569\ub2c8\ub2e4. \ub9d0\uc500\ud558\uc2e0 [\ud575\uc2ec \ud0a4\uc6cc\ub4dc] \uad00\ub828\ud574\uc11c \uac1c\uc120 \uc9c4\ud589 \uc0c1\ud669 \uacf5\uc720\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.\u201d
          </div></div>
        </div>
      </div>
    `;
  },

  /* ── Stage 5: 퇴거 ── */
  htmlStage5() {
    return `
      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc124\ubb38 \ud15c\ud50c\ub9bf \u2014 \ud1f4\uac70 \uc2dc\uc810 (5\ubd84)</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:14px">\uc774\ud0c8 \uc0ac\uc720 \ud30c\uc545 + \ucd5c\uc885 NPS + \uc7ac\uc785\uc8fc \uc758\ud5a5</div>
        <table class="cx-table">
          <thead><tr><th style="width:36px">#</th><th style="width:240px">\uc9c8\ubb38</th><th>\uc120\ud0dd\uc9c0 / \ud615\uc2dd</th><th style="width:60px">\ud544\uc218</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>\ud1f4\uc2e4\uc758 \uc8fc\ub41c \uc0ac\uc720\ub294?</td><td>\uacc4\uc57d\ub9cc\ub8cc / \uc9c1\uc7a5\xb7\ud559\uad50 \uc774\ub3d9 / \ub354 \ub098\uc740 \uc8fc\uac70 / \ube44\uc6a9 / \uc11c\ube44\uc2a4 \ubd88\ub9cc / \uac1c\uc778\uc0ac\uc720 / \uae30\ud0c0</td><td>\u2705</td></tr>
            <tr><td>2</td><td>HOMES\ub97c \uc9c0\uc778\uc5d0\uac8c \ucd94\ucc9c\ud560 \uc758\ud5a5\uc740? (NPS)</td><td>0~10 \uc2a4\ucf00\uc77c</td><td>\u2705</td></tr>
            <tr><td>3</td><td>\uc704 \uc810\uc218\ub97c \uc8fc\uc2e0 \uc774\uc720\ub294?</td><td>\uc8fc\uad00\uc2dd</td><td>\u2705</td></tr>
            <tr><td>4</td><td>\uc804\uccb4 \uac70\uc8fc \uae30\uac04 \uc911 \uac00\uc7a5 \ub9cc\uc871\uc2a4\ub7ec\uc6e0\ub358 \uc810\uc740?</td><td>\uacf5\uac04 / \uc704\uce58 / \uc11c\ube44\uc2a4 / \ucee4\ubba4\ub2c8\ud2f0 / \uac00\uaca9 / \uae30\ud0c0</td><td></td></tr>
            <tr><td>5</td><td>\uc804\uccb4 \uac70\uc8fc \uae30\uac04 \uc911 \uac00\uc7a5 \ubd88\ub9cc\uc871\uc2a4\ub7ec\uc6e0\ub358 \uc810\uc740?</td><td>\uc2dc\uc124 / \uc18c\uc74c / \ube44\uc6a9 / \uad00\ub9ac / \uccad\uc18c / \uc5c6\uc74c / \uae30\ud0c0</td><td></td></tr>
            <tr><td>6</td><td>\ud1f4\uc2e4 \uc808\ucc28(\uc6d0\uc0c1\ubcf5\uad6c\xb7\uc815\uc0b0)\ub294 \uc6d0\ud65c\ud588\ub098\uc694?</td><td>\ub9e4\uc6b0 \uc6d0\ud65c / \uc6d0\ud65c / \ubcf4\ud1b5 / \ubd88\ud3b8 / \ub9e4\uc6b0 \ubd88\ud3b8</td><td>\u2705</td></tr>
            <tr><td>7</td><td>\ud5a5\ud6c4 HOMES\uc5d0 \uc7ac\uc785\uc8fc\ud560 \uc758\ud5a5\uc774 \uc788\uc73c\uc2e0\uac00\uc694?</td><td>\ubc18\ub4dc\uc2dc / \uace0\ub824 / \ubaa8\ub974\uaca0\uc74c / \uc5c6\uc74c</td><td>\u2705</td></tr>
            <tr><td>8</td><td>\uc5b4\ub5a4 \uc810\uc774 \uac1c\uc120\ub418\uba74 \uc7ac\uc785\uc8fc\ud558\uc2dc\uaca0\uc5b4\uc694?</td><td>\uc8fc\uad00\uc2dd</td><td></td></tr>
            <tr><td>9</td><td>HOMES\uc5d0 \uc804\ud558\uace0 \uc2f6\uc740 \ud55c\ub9c8\ub514</td><td>\uc8fc\uad00\uc2dd</td><td></td></tr>
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-bottom:20px">
        <div class="section-title">\uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8 \u2014 \ud1f4\uc2e4 \ub300\uba74 (\ub9e4\ub2c8\uc800 + CX\ud300)</div>
        <div class="sc-wrap">
          <div class="sc-head" onclick="HomesApp.modules.survey.togSc(this)">
            <h3 style="flex:1;font-size:13px;font-weight:600">\ud1f4\uac70 \uc778\ud130\ubdf0 \uc2a4\ud06c\ub9bd\ud2b8</h3>
            <span class="sc-arrow">\u25b6</span>
          </div>
          <div class="sc-body"><div style="font-size:12px;color:var(--muted);line-height:2.0">
            <strong>[\ud1f4\uc2e4 \uccb4\ud06c \uc2dc \ub300\uba74]</strong><br>
            \u201c\u25cb\u25cb\u25cb\ub2d8, \uadf8\ub3d9\uc548 HOMES\uc5d0\uc11c \uc9c0\ub0b4\uc8fc\uc154\uc11c \uac10\uc0ac\ud569\ub2c8\ub2e4.<br>
            \ud1f4\uc2e4 \uccb4\ud06c \uc9c4\ud589\ud558\uba74\uc11c \uc9e7\uac8c \uc5ec\ucda4\ubd10\ub3c4 \ub420\uae4c\uc694?\u201d<br><br>
            <strong>[\ud575\uc2ec \uc9c8\ubb38]</strong><br>
            \u2460 \u201c\uc774\ubc88\uc5d0 \ud1f4\uc2e4\ud558\uc2dc\ub294 \uac00\uc7a5 \ud070 \uc774\uc720\uac00 \ubb54\uac00\uc694?\u201d<br>
            \u2461 \u201cHOMES \uc0dd\ud65c \uc911 \uac00\uc7a5 \uc88b\uc558\ub358 \uc810\uc740\uc694?\u201d<br>
            \u2462 \u201c\uc544\uc26c\uc6e0\uac70\ub098 \ubc14\ub00c\uc5c8\uc73c\uba74 \ud558\ub294 \uc810\uc740?\u201d<br>
            \u2463 \u201c\ub098\uc911\uc5d0 \ub2e4\uc2dc \ucf54\ub9ac\ube59\uc744 \ucc3e\uc73c\uc2dc\uac8c \ub418\uba74 HOMES\ub3c4 \uace0\ub824\ud558\uc2dc\uaca0\uc5b4\uc694?\u201d<br><br>
            <strong>[\ubd88\ub9cc \ud1f4\uc2e4 \uc2dc \ucd94\uac00]</strong><br>
            \u201c\ubd88\ud3b8\uc744 \ub4dc\ub9b0 \uc810 \uc8c4\uc1a1\ud569\ub2c8\ub2e4. \uad6c\uccb4\uc801\uc73c\ub85c \uc5b4\ub5a4 \ubd80\ubd84\uc774 \uac00\uc7a5 \uacb0\uc815\uc801\uc774\uc5c8\ub098\uc694?\u201d<br>
            \u2192 \uc774\ud0c8\uc0ac\uc720 \uc0c1\uc138 \uae30\ub85d. \ub2f4\ub2f9 \ub9e4\ub2c8\uc800 \ud53c\ub4dc\ubc31. CX\ud300 \ubcf4\uace0\uc11c \uc791\uc131.<br><br>
            <strong>[\ub9c8\ubb34\ub9ac]</strong><br>
            \u201c\uc88b\uc740 \uacf3\uc73c\ub85c \uc774\uc0ac\ud558\uc154\uc11c \uc798 \uc9c0\ub0b4\uc2dc\uae38 \ubc14\ub78d\ub2c8\ub2e4. \uc5b8\uc81c\ub4e0 \ub2e4\uc2dc \ucc3e\uc544\uc8fc\uc138\uc694!\u201d<br>
            \u2192 \ud1f4\uc2e4 \ud6c4 1\uc8fc\uc77c \ub0b4 \ubcf4\uc99d\uae08 \ubc18\ud658 + \uac10\uc0ac \uba54\uc2dc\uc9c0 \uce74\ud1a1 \ubc1c\uc1a1.
          </div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">\ud1f4\uac70 \ub370\uc774\ud130 \ud65c\uc6a9</div>
        <div class="grid-3">
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udcca \uc774\ud0c8 \uc0ac\uc720 \ubd84\uc11d</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\ud1f4\uc2e4 \uc0ac\uc720\ub97c \uce74\ud14c\uace0\ub9ac\ubcc4\ub85c \uc9d1\uacc4. \ud1b5\uc81c \uac00\ub2a5/\ubd88\uac00\ub2a5 \ubd84\ub9ac. \ud1b5\uc81c \uac00\ub2a5 \uc0ac\uc720(\uc11c\ube44\uc2a4 \ubd88\ub9cc, \ube44\uc6a9 \ub4f1) \u2192 \uc6b0\uc120 \uac1c\uc120 \ub300\uc0c1.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udd04 \uc7ac\uc785\uc8fc \ud30c\uc774\ud504\ub77c\uc778</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">\u201c\uc7ac\uc785\uc8fc \uace0\ub824\u201d \uc751\ub2f5 \uace0\uac1d \u2192 \ubcc4\ub3c4 \ub9ac\uc2a4\ud2b8 \uad00\ub9ac. \uc0c8 \uc9c0\uc810 \uc624\ud508\xb7\ud504\ub85c\ubaa8\uc158 \uc2dc \uc6b0\uc120 \uc548\ub0b4. Retention \uc804\ub7b5 \ud575\uc2ec \ub370\uc774\ud130.</div>
          </div>
          <div class="card" style="box-shadow:none;border:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:6px">\ud83d\udcc8 NPS \ucd94\uc774 \ube44\uad50</div>
            <div style="font-size:12px;color:var(--muted);line-height:1.8">2\uc8fc \u2192 1\uac1c\uc6d4 \u2192 \ud1f4\uac70 NPS \ubcc0\ud654 \ucd94\uc801. \uc810\uc218 \ud558\ub77d \uad6c\uac04 = \uc11c\ube44\uc2a4 \uc2e4\ud328 \uc9c0\uc810. \uc9c0\uc810\ubcc4\xb7\uace0\uac1d\uad70\ubcc4 \ube44\uad50 \ubd84\uc11d.</div>
          </div>
        </div>
      </div>
    `;
  }
});
