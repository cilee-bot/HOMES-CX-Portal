/* HOMES CX Portal — Customers Module (고객 데이터 현황판) */
HomesApp.register('customers', {
  init(container) {
    this.el = container;
    this._injectStyles();
    this._initialized_tabs = {};
    this._charts = {};
    this._RAW = {};
    this._BRANCHES = [];
    this._allContracts = [];
    this._activeCustomers = [];
    this._custSort = { key: null, asc: true };
    this._simScenarioChart = null;
    this._momChartInstances = {};
    this.render();
    HomesApp.on('sb:connected', () => this.reload());
  },

  onShow() {
    // Only reload if not yet loaded
    if (!this._loaded) this.reload();
  },

  _injectStyles() {
    if (document.getElementById('cx-customers-styles')) return;
    const style = document.createElement('style');
    style.id = 'cx-customers-styles';
    style.textContent = `
      .mod-customers {
        --cb-surface:#ffffff; --cb-surface2:#f1f5f9; --cb-border:#e2e8f0;
        --cb-text:#0f172a; --cb-muted:#64748b; --cb-dim:#94a3b8;
        --cb-accent1:#4fc3f7; --cb-accent2:#f48fb1; --cb-accent3:#a5d6a7;
        --cb-accent4:#ffcc80; --cb-accent5:#ce93d8;
        --cb-male:#4fc3f7; --cb-female:#f48fb1; --cb-corp:#ffcc80;
        --cb-occupied:#4ade80; --cb-vacant:#f87171; --cb-waiting:#fbbf24;
        --cb-new:#60a5fa; --cb-renew:#34d399;
        font-size:14px;
        color:var(--cb-text);
      }
      .mod-customers .cb-head { background:var(--cb-surface); border:1px solid var(--cb-border); border-radius:12px; padding:16px 20px; display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:12px; }
      .mod-customers .cb-title { font-size:19px; font-weight:700; letter-spacing:-.3px; }
      .mod-customers .cb-sub { font-size:13px; color:var(--cb-muted); margin-top:2px; }
      .mod-customers .cb-badge { background:rgba(79,195,247,.1); border:1px solid rgba(79,195,247,.3); color:var(--cb-accent1); padding:4px 12px; border-radius:20px; font-size:13px; font-family:'Space Mono','Courier New',monospace; }
      .mod-customers .cb-tabs { background:var(--cb-surface); border:1px solid var(--cb-border); border-radius:12px; padding:0 8px; display:flex; gap:0; overflow-x:auto; margin-bottom:20px; }
      .mod-customers .cb-tab { padding:14px 18px; cursor:pointer; color:var(--cb-muted); font-size:13px; font-weight:500; border-bottom:2px solid transparent; white-space:nowrap; transition:all .2s; }
      .mod-customers .cb-tab:hover { color:var(--cb-text); }
      .mod-customers .cb-tab.active { color:var(--cb-accent1); border-bottom-color:var(--cb-accent1); font-weight:700; }
      .mod-customers .cb-section { display:none; }
      .mod-customers .cb-section.active { display:block; animation:fadeInUp .4s ease; }
      @keyframes fadeInUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      .mod-customers .cb-heading { font-size:21px; font-weight:700; margin-bottom:6px; letter-spacing:-.3px; }
      .mod-customers .cb-desc { font-size:14px; color:var(--cb-muted); margin-bottom:24px; }
      .mod-customers .cb-sum-row { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:16px; margin-bottom:28px; }
      .mod-customers .cb-sum { background:var(--cb-surface); border:1px solid var(--cb-border); border-radius:12px; padding:20px; position:relative; overflow:hidden; }
      .mod-customers .cb-sum::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; }
      .mod-customers .cb-sum.c1::before { background:var(--cb-accent1); }
      .mod-customers .cb-sum.c2::before { background:var(--cb-accent2); }
      .mod-customers .cb-sum.c3::before { background:var(--cb-accent3); }
      .mod-customers .cb-sum.c4::before { background:var(--cb-accent4); }
      .mod-customers .cb-sum.c5::before { background:var(--cb-accent5); }
      .mod-customers .cb-sum.c6::before { background:linear-gradient(90deg,var(--cb-accent1),var(--cb-accent5)); }
      .mod-customers .cb-sum.c7::before { background:var(--cb-occupied); }
      .mod-customers .cb-sum.c8::before { background:var(--cb-vacant); }
      .mod-customers .cb-sum-lbl { font-size:12px; color:var(--cb-muted); text-transform:uppercase; letter-spacing:.8px; margin-bottom:8px; font-family:'Space Mono',monospace; }
      .mod-customers .cb-sum-val { font-size:32px; font-weight:900; line-height:1; margin-bottom:4px; }
      .mod-customers .cb-sum-sub { font-size:12px; color:var(--cb-muted); }
      .mod-customers .cb-g2 { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
      .mod-customers .cb-g3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; margin-bottom:20px; }
      .mod-customers .cb-g4 { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:16px; margin-bottom:20px; }
      @media (max-width:1200px){ .mod-customers .cb-g4{grid-template-columns:1fr 1fr;} .mod-customers .cb-g3{grid-template-columns:1fr 1fr;} }
      @media (max-width:768px){ .mod-customers .cb-g2, .mod-customers .cb-g3, .mod-customers .cb-g4{grid-template-columns:1fr;} }
      .mod-customers .cb-card { background:var(--cb-surface); border:1px solid var(--cb-border); border-radius:12px; padding:20px; }
      .mod-customers .cb-card-title { font-size:13px; font-weight:700; color:var(--cb-muted); text-transform:uppercase; letter-spacing:.8px; margin-bottom:16px; font-family:'Space Mono',monospace; display:flex; align-items:center; gap:8px; }
      .mod-customers .cb-card-title .cb-dot { width:6px; height:6px; border-radius:50%; background:var(--cb-accent1); }
      .mod-customers .cb-chart { position:relative; height:200px; }
      .mod-customers .cb-chart.sm { height:160px; }
      .mod-customers .cb-chart.md { height:220px; }
      .mod-customers .cb-chart.lg { height:260px; }
      .mod-customers .cb-branch-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; margin-bottom:20px; }
      .mod-customers .cb-branch-card { background:var(--cb-surface); border:1px solid var(--cb-border); border-radius:14px; padding:20px; transition:all .2s; }
      .mod-customers .cb-branch-card:hover { border-color:var(--cb-accent1); transform:translateY(-2px); box-shadow:0 8px 24px rgba(79,195,247,.1); }
      .mod-customers .cb-branch-name { font-size:17px; font-weight:700; margin-bottom:4px; }
      .mod-customers .cb-branch-total { font-size:13px; color:var(--cb-muted); margin-bottom:16px; }
      .mod-customers .cb-mini-stats { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:14px; }
      .mod-customers .cb-mini-stat { background:var(--cb-surface2); border-radius:8px; padding:10px; }
      .mod-customers .cb-mini-stat-val { font-size:18px; font-weight:700; font-family:'Space Mono',monospace; }
      .mod-customers .cb-mini-stat-lbl { font-size:12px; color:var(--cb-muted); margin-top:2px; }
      .mod-customers .cb-legend { display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }
      .mod-customers .cb-legend-item { display:flex; align-items:center; gap:5px; font-size:12px; color:var(--cb-muted); }
      .mod-customers .cb-legend-dot { width:8px; height:8px; border-radius:2px; flex-shrink:0; }
      .mod-customers .cb-table { width:100%; border-collapse:collapse; font-size:14px; }
      .mod-customers .cb-table th { background:var(--cb-surface2); padding:11px 14px; text-align:left; color:var(--cb-muted); font-size:12px; text-transform:uppercase; letter-spacing:.6px; border-bottom:1px solid var(--cb-border); font-family:'Space Mono',monospace; }
      .mod-customers .cb-table td { padding:11px 14px; border-bottom:1px solid rgba(226,232,240,.6); color:var(--cb-text); }
      .mod-customers .cb-table tr:hover td { background:rgba(15,23,42,.02); }
      .mod-customers .cb-compare-wrap { overflow-x:auto; }
      .mod-customers .cb-pill { display:inline-block; padding:2px 10px; border-radius:12px; font-size:12px; font-weight:500; }
      .mod-customers .cb-pill-blue { background:rgba(79,195,247,.15); color:var(--cb-accent1); }
      .mod-customers .cb-pill-green { background:rgba(74,222,128,.15); color:var(--cb-occupied); }
      .mod-customers .cb-pill-red { background:rgba(248,113,113,.15); color:var(--cb-vacant); }
      .mod-customers .cb-pill-yellow { background:rgba(251,191,36,.15); color:var(--cb-waiting); }
      .mod-customers .cb-input { background:var(--cb-surface2); border:1px solid var(--cb-border); color:var(--cb-text); padding:8px 14px; border-radius:8px; font-size:14px; }
      .mod-customers .cb-sim-input { background:var(--cb-surface2); border:1px solid var(--cb-border); color:var(--cb-text); padding:10px 14px; border-radius:8px; font-size:14px; font-family:'Space Mono',monospace; width:100%; }
      .mod-customers .cb-sim-label { font-size:12px; color:var(--cb-muted); font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:.5px; }
      .mod-customers .cb-sim-result { background:var(--cb-surface2); border:1px solid var(--cb-border); border-radius:10px; padding:16px; text-align:center; }
      .mod-customers .cb-sim-result-val { font-size:20px; font-weight:900; font-family:'Space Mono',monospace; line-height:1; margin-bottom:4px; }
      .mod-customers .cb-sim-result-lbl { font-size:11px; color:var(--cb-muted); }
      .mod-customers .cb-insight { background:var(--cb-surface); border:1px solid var(--cb-border); border-radius:14px; padding:20px; position:relative; overflow:hidden; }
      .mod-customers .cb-insight::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; }
      .mod-customers .cb-insight.positive::before { background:linear-gradient(90deg,#4ade80,#34d399); }
      .mod-customers .cb-insight.warning::before { background:linear-gradient(90deg,#fbbf24,#f59e0b); }
      .mod-customers .cb-insight.action::before { background:linear-gradient(90deg,#4fc3f7,#818cf8); }
      .mod-customers .cb-insight.risk::before { background:linear-gradient(90deg,#f87171,#f43f5e); }
      .mod-customers .cb-insight-tag { display:inline-block; font-size:10px; font-weight:700; padding:2px 10px; border-radius:10px; margin-bottom:10px; font-family:'Space Mono',monospace; text-transform:uppercase; letter-spacing:.6px; }
      .mod-customers .cb-tag-positive { background:rgba(74,222,128,.15); color:#4ade80; }
      .mod-customers .cb-tag-warning { background:rgba(251,191,36,.15); color:#fbbf24; }
      .mod-customers .cb-tag-action { background:rgba(79,195,247,.15); color:#4fc3f7; }
      .mod-customers .cb-tag-risk { background:rgba(248,113,113,.15); color:#f87171; }
      .mod-customers .cb-insight-title { font-size:15px; font-weight:700; margin-bottom:8px; line-height:1.4; }
      .mod-customers .cb-insight-body { font-size:13px; color:var(--cb-dim); line-height:1.6; }
      .mod-customers .cb-insight-metric { font-size:22px; font-weight:900; margin:10px 0 4px; }
      .mod-customers .cb-loading { padding:40px; text-align:center; color:var(--cb-muted); }
      .mod-customers .cb-spin { width:36px; height:36px; border:3px solid rgba(79,195,247,.2); border-top-color:#4fc3f7; border-radius:50%; animation:cbspin .8s linear infinite; margin:0 auto 14px; }
      @keyframes cbspin { to{transform:rotate(360deg)} }
    `;
    document.head.appendChild(style);

    // Register datalabels plugin globally once
    if (window.ChartDataLabels && window.Chart && !Chart._cxDatalabelsRegistered) {
      try { Chart.register(window.ChartDataLabels); Chart._cxDatalabelsRegistered = true; } catch {}
    }
  },

  render() {
    this.el.innerHTML = `
      <div class="mod-customers">
        <div class="cb-head">
          <div>
            <div class="cb-title">홈즈컴퍼니 고객 데이터 현황판</div>
            <div class="cb-sub">Customer Analytics Dashboard · 마케팅 DB 기준</div>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <div class="cb-badge" id="cb-unit-badge">총 — 호실 / — 지점</div>
            <div class="cb-badge" style="border-color:rgba(164,213,167,.3); color:var(--cb-accent3); background:rgba(164,213,167,.08);">데이터 기준: 마케팅 통합 DB</div>
          </div>
        </div>

        <div class="cb-tabs" id="cb-tabs">
          <div class="cb-tab active" data-tab="overview">📊 전체 현황</div>
          <div class="cb-tab" data-tab="branches">🏢 지점별 분석</div>
          <div class="cb-tab" data-tab="gender">👤 성별 분포</div>
          <div class="cb-tab" data-tab="nationality">🌏 국적 분포</div>
          <div class="cb-tab" data-tab="sales">💳 세일즈 유형</div>
          <div class="cb-tab" data-tab="job">💼 직업 분포</div>
          <div class="cb-tab" data-tab="age">📅 연령 분포</div>
          <div class="cb-tab" data-tab="contract">📋 계약 현황</div>
          <div class="cb-tab" data-tab="customers_list" style="color:#4ade80; font-weight:700;">🏠 고객/호실</div>
          <div class="cb-tab" data-tab="compare">⚖️ 지점 비교</div>
          <div class="cb-tab" data-tab="insight" style="color:#f59e0b; font-weight:700;">💡 매출 인사이트</div>
        </div>

        <div id="cb-content">
          <div class="cb-loading">
            <div class="cb-spin"></div>
            <div>Supabase에서 데이터 로딩 중...</div>
          </div>
        </div>
      </div>
    `;

    this.el.querySelectorAll('[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => this._showTab(tab.dataset.tab));
    });

    this.reload();
  },

  async reload() {
    if (!this.el.querySelector('#cb-content')) return;
    try {
      await this._fetchData();
      this._loaded = true;
      this._initialized_tabs = {};
      // Build all section containers
      this._renderSections();
      this._showTab('overview');
    } catch (e) {
      console.error('[customers] load failed', e);
      const c = this.el.querySelector('#cb-content');
      if (c) c.innerHTML = `<div class="cb-loading" style="color:#f87171;">데이터 로드 실패: ${e.message}<br><small>Supabase 연결을 확인하세요.</small></div>`;
    }
  },

  async _fetchData() {
    const SB = HomesSB.get();
    if (!SB) throw new Error('Supabase 미연결');

    const [contractsRes, vacancyRes, toursRes] = await Promise.all([
      SB.from('contracts').select('branch,room,name,phone,status,renewal_type,contract_type,contract_start,contract_end,rent,deposit,maintenance_fee,resident_name,resident_phone,vehicle_number,vat,tax_id').limit(5000),
      SB.from('vacancy').select('*'),
      SB.from('tour_records').select('branch,gender,nationality,age_group,move_in_purpose').limit(5000)
    ]);
    const rawContracts = contractsRes.data || [];
    const rawVacancy = vacancyRes.data || [];
    const rawTours = toursRes.data || [];

    // 지점명 정규화: 아코모가산바이홈즈(+101동/+201동) → "아코모 가산",
    //              아코모회기바이홈즈 → "아코모 회기", 어반하우스 제외
    const normalizeBranch = (raw) => {
      if (!raw) return null;
      const s = String(raw).trim();
      if (s.indexOf('어반하우스') !== -1) return null; // 어반하우스 제거
      if (s.indexOf('아코모가산바이홈즈') === 0) return '아코모 가산';
      if (s === '아코모회기바이홈즈' || s.indexOf('아코모회기바이홈즈') === 0) return '아코모 회기';
      return s;
    };
    const normList = (arr) => arr
      .map(r => { const nb = normalizeBranch(r.branch); return nb ? { ...r, branch: nb } : null; })
      .filter(Boolean);

    const contracts = normList(rawContracts);
    const vacancy = normList(rawVacancy);
    const tours = normList(rawTours);

    this._allContracts = contracts;

    const branchSet = new Set();
    vacancy.forEach(v => branchSet.add(v.branch));
    contracts.forEach(c => { if (c.branch) branchSet.add(c.branch); });
    this._BRANCHES = Array.from(branchSet).filter(Boolean).sort();

    const RAW = {};
    this._BRANCHES.forEach(b => {
      const bVac = vacancy.filter(v => v.branch === b);
      const totalUnits = bVac.reduce((s, v) => s + (v.total_units || 0), 0);
      const occupied   = bVac.reduce((s, v) => s + (v.occupied_units || 0), 0);
      const vacantA    = bVac.reduce((s, v) => s + (v.vacant_available || 0), 0);
      const vacantP    = bVac.reduce((s, v) => s + (v.vacant_pending || 0), 0);

      const bContracts = contracts.filter(c => c.branch === b && (c.status === '계약 완료' || c.status === '연장 계약'));
      const bTours = tours.filter(t => t.branch === b);

      const occStatus = { '재실': occupied, '공실': vacantA, '입주대기': vacantP };
      if (totalUnits === 0 && bContracts.length > 0) occStatus['재실'] = bContracts.length;

      const contractStatus = {};
      bContracts.forEach(c => {
        let key = '신규계약';
        if (c.renewal_type === '재계약(연장/과거 고객)') key = '재계약';
        else if (c.renewal_type === '중도퇴실') key = '중도퇴실';
        else if (c.status === '연장 계약') key = '재계약';
        contractStatus[key] = (contractStatus[key] || 0) + 1;
      });

      const genderMap = { '남': 0, '여': 0, '정보없음': 0 };
      bTours.forEach(t => {
        const g = (t.gender === '남' || t.gender === '여') ? t.gender : '정보없음';
        genderMap[g] += 1;
      });
      if (genderMap['남'] + genderMap['여'] + genderMap['정보없음'] === 0) {
        genderMap['정보없음'] = totalUnits || bContracts.length;
      }

      const natMap = { '내국인': 0, '외국인': 0, '정보없음': 0 };
      bTours.forEach(t => {
        const n = (t.nationality === '내국인' || t.nationality === '외국인') ? t.nationality : '정보없음';
        natMap[n] += 1;
      });
      if (natMap['내국인'] + natMap['외국인'] + natMap['정보없음'] === 0) {
        natMap['정보없음'] = totalUnits || bContracts.length;
      }

      // 세일즈 유형: 개인 / 개인사업자 / 법인사업자
      // 판별 기준: contracts.name(법인명 패턴), tax_id(사업자등록번호), vat(부가세)
      const salesMap = { '개인': 0, '개인사업자': 0, '법인사업자': 0 };
      bContracts.forEach(c => {
        const nm = (c.name || '').toString();
        const taxId = (c.tax_id || '').toString().replace(/[\s]/g, '');
        const vat = Number(c.vat) || 0;
        // 사업자등록번호 형식: 10자리(3-2-5) — 주민번호(6-7)와 구별
        const isBizReg = /^\d{3}-?\d{2}-?\d{5}$/.test(taxId);
        // 법인명 패턴: (주), 주식회사, ㈜, 법인
        const isCorp = /\(주\)|주식회사|㈜|법인/.test(nm);
        let k;
        if (isCorp) k = '법인사업자';
        else if (isBizReg || vat > 0) k = '개인사업자';
        else k = '개인';
        salesMap[k] += 1;
      });

      const jobMap = { '직장인': 0, '학생': 0, '기타': 0, '정보없음': 0 };
      bTours.forEach(t => {
        let j = '정보없음';
        const p = t.move_in_purpose;
        if (p === '직주근접' || p === '독립' || p === '기존집 만료' || p === '리모델링') j = '직장인';
        else if (p === '학업') j = '학생';
        else if (p) j = '기타';
        jobMap[j] += 1;
      });
      if (jobMap['직장인'] + jobMap['학생'] + jobMap['기타'] + jobMap['정보없음'] === 0) {
        jobMap['정보없음'] = totalUnits || bContracts.length;
      }

      const periodMap = {};
      bContracts.forEach(c => {
        if (!c.contract_start || !c.contract_end) { periodMap['정보없음'] = (periodMap['정보없음'] || 0) + 1; return; }
        const days = (new Date(c.contract_end) - new Date(c.contract_start)) / 86400000;
        let key = '정보없음';
        if (days <= 31) key = '1개월 이하';
        else if (days <= 93) key = '3개월 이하';
        else if (days <= 186) key = '6개월 이하';
        else if (days <= 366) key = '12개월 이하';
        else key = '12개월 초과';
        periodMap[key] = (periodMap[key] || 0) + 1;
      });

      const ageMap = {};
      bTours.forEach(t => { const a = t.age_group || '정보없음'; ageMap[a] = (ageMap[a] || 0) + 1; });
      if (Object.keys(ageMap).length === 0) ageMap['정보없음'] = totalUnits || bContracts.length;

      RAW[b] = {
        total: totalUnits || bContracts.length,
        입주현황: occStatus,
        계약상태: contractStatus,
        성별: genderMap,
        국적: natMap,
        직업: jobMap,
        세일즈유형: salesMap,
        계약기간: periodMap,
        연령대: ageMap
      };
    });
    this._RAW = RAW;

    const totalUnitsAll = this._BRANCHES.reduce((s, b) => s + (RAW[b].total || 0), 0);
    const badge = this.el.querySelector('#cb-unit-badge');
    if (badge) badge.textContent = `총 ${totalUnitsAll} 호실 / ${this._BRANCHES.length}개 지점`;
  },

  _renderSections() {
    const host = this.el.querySelector('#cb-content');
    host.innerHTML = `
      <section class="cb-section active" data-section="overview">${this._overviewHTML()}</section>
      <section class="cb-section" data-section="branches">${this._branchesHTML()}</section>
      <section class="cb-section" data-section="gender">${this._distHTML('성별 분포 현황', '지점별 성별 구성 비율 및 수량', 'gender')}</section>
      <section class="cb-section" data-section="nationality">${this._distHTML('국적 분포 현황', '내국인 / 외국인 / 정보없음 기준', 'nat')}</section>
      <section class="cb-section" data-section="sales">${this._distHTML('세일즈 유형 분포 현황', '계약 주체 기준 — 개인 / 개인사업자 / 법인사업자', 'sales')}</section>
      <section class="cb-section" data-section="job">${this._distHTML('직업 분포 현황', '지점별 고객 직업군 구성', 'job')}</section>
      <section class="cb-section" data-section="age">${this._distHTML('연령대 분포 현황', '나이 정보가 확인된 호실 기준 (일부 지점 데이터 한정)', 'age')}</section>
      <section class="cb-section" data-section="contract">${this._contractHTML()}</section>
      <section class="cb-section" data-section="customers_list">${this._custListHTML()}</section>
      <section class="cb-section" data-section="compare">${this._compareHTML()}</section>
      <section class="cb-section" data-section="insight">${this._insightHTML()}</section>
    `;
  },

  _showTab(name) {
    this.el.querySelectorAll('.cb-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    this.el.querySelectorAll('.cb-section').forEach(s => s.classList.toggle('active', s.dataset.section === name));
    if (!this._initialized_tabs[name]) {
      this._initialized_tabs[name] = true;
      const init = {
        overview:   () => this._initOverview(),
        branches:   () => this._initBranches(),
        gender:     () => this._initGender(),
        nationality:() => this._initNationality(),
        sales:      () => this._initSales(),
        job:        () => this._initJob(),
        age:        () => this._initAge(),
        contract:   () => this._initContract(),
        customers_list: () => this._initCustomers(),
        compare:    () => this._initCompare(),
        insight:    () => this._initInsight()
      };
      init[name] && init[name]();
    }
  },

  // ---------- Section HTML builders ----------
  _overviewHTML() {
    const sums = this._overviewSums();
    return `
      <div class="cb-heading">전체 고객 현황 요약</div>
      <div class="cb-desc">${this._BRANCHES.length}개 지점 전체 호실 기준 주요 지표</div>
      <div class="cb-sum-row">
        <div class="cb-sum c1"><div class="cb-sum-lbl">총 호실 수</div><div class="cb-sum-val" style="color:var(--cb-accent1)">${sums.total}</div><div class="cb-sum-sub">${this._BRANCHES.length}개 지점 합산</div></div>
        <div class="cb-sum c7"><div class="cb-sum-lbl">재실 (입주)</div><div class="cb-sum-val" style="color:var(--cb-occupied)">${sums.occupied}</div><div class="cb-sum-sub">${sums.occRate}% 점유율</div></div>
        <div class="cb-sum c8"><div class="cb-sum-lbl">공실</div><div class="cb-sum-val" style="color:var(--cb-vacant)">${sums.vacant}</div><div class="cb-sum-sub">유효 공실 ${sums.vacRate}%</div></div>
        <div class="cb-sum c4"><div class="cb-sum-lbl">입주 대기</div><div class="cb-sum-val" style="color:var(--cb-waiting)">${sums.waiting}</div><div class="cb-sum-sub">확정 입주 대기자</div></div>
        <div class="cb-sum c2"><div class="cb-sum-lbl">신규 계약</div><div class="cb-sum-val" style="color:var(--cb-accent2)">${sums.newC}</div><div class="cb-sum-sub">전체 대비 ${sums.newRate}%</div></div>
        <div class="cb-sum c3"><div class="cb-sum-lbl">재계약</div><div class="cb-sum-val" style="color:var(--cb-accent3)">${sums.renew}</div><div class="cb-sum-sub">전체 대비 ${sums.renewRate}%</div></div>
        <div class="cb-sum c5"><div class="cb-sum-lbl">여성 비율</div><div class="cb-sum-val" style="color:var(--cb-accent5)">${sums.femalePct}%</div><div class="cb-sum-sub">정보있는 호실 기준</div></div>
        <div class="cb-sum c6"><div class="cb-sum-lbl">외국인 비율</div><div class="cb-sum-val" style="color:var(--cb-accent1)">${sums.foreignPct}%</div><div class="cb-sum-sub">국적 확인 호실 기준</div></div>
      </div>
      <div class="cb-g2">
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot"></span>전체 입주현황 분포</div><div class="cb-chart md"><canvas id="ov-occ"></canvas></div></div>
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent2)"></span>계약 형태 분포</div><div class="cb-chart md"><canvas id="ov-contract"></canvas></div></div>
      </div>
      <div class="cb-g3">
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent5)"></span>성별 분포 (정보 있는 호실)</div><div class="cb-chart"><canvas id="ov-gender"></canvas></div></div>
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent3)"></span>국적 분포 (확인 호실)</div><div class="cb-chart"><canvas id="ov-nat"></canvas></div></div>
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent4)"></span>직업 분포 (확인 호실)</div><div class="cb-chart"><canvas id="ov-job"></canvas></div></div>
      </div>
      <div class="cb-card">
        <div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent4)"></span>지점별 호실 수 및 재실율</div>
        <div class="cb-chart lg"><canvas id="ov-branches"></canvas></div>
      </div>
    `;
  },

  _branchesHTML() {
    return `
      <div class="cb-heading">지점별 상세 현황</div>
      <div class="cb-desc">각 지점의 입주현황, 성별, 국적, 직업 분포 요약</div>
      <div class="cb-branch-grid" id="cb-branch-cards"></div>
    `;
  },

  _distHTML(title, desc, key) {
    return `
      <div class="cb-heading">${title}</div>
      <div class="cb-desc">${desc}</div>
      <div class="cb-g2">
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot"></span>전체 분포</div><div class="cb-chart md"><canvas id="${key}-overall"></canvas></div></div>
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot"></span>지점별 분포 (스택)</div><div class="cb-chart md"><canvas id="${key}-by-branch"></canvas></div></div>
      </div>
      <div class="cb-card"><div class="cb-card-title"><span class="cb-dot"></span>지점별 상세 수치</div><div class="cb-compare-wrap"><table class="cb-table" id="${key}-table"></table></div></div>
    `;
  },

  _contractHTML() {
    return `
      <div class="cb-heading">계약 현황</div>
      <div class="cb-desc">신규계약 / 재계약 / 계약기간 분포</div>
      <div class="cb-g2">
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-new)"></span>전체 계약 형태</div><div class="cb-chart md"><canvas id="ct-overall"></canvas></div></div>
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-new)"></span>계약 기간 분포</div><div class="cb-chart md"><canvas id="ct-duration"></canvas></div></div>
      </div>
      <div class="cb-card"><div class="cb-card-title"><span class="cb-dot"></span>지점별 계약 현황 상세</div><div class="cb-compare-wrap"><table class="cb-table" id="ct-table"></table></div></div>
    `;
  },

  _custListHTML() {
    return `
      <div class="cb-heading">🏠 고객/호실 현황</div>
      <div class="cb-desc">현재 활성 계약 고객 및 호실 정보</div>
      <div style="display:flex;gap:12px;margin:16px 0;flex-wrap:wrap;align-items:center;">
        <input type="text" id="cust-q" placeholder="검색 (이름/호실/연락처)" class="cb-input" style="width:240px">
        <select id="cust-br" class="cb-input"><option value="">전체 지점</option></select>
        <span id="cust-cnt" style="color:var(--cb-muted);font-size:13px;"></span>
      </div>
      <div style="overflow-x:auto;">
        <table class="cb-table" id="cust-tbl">
          <thead><tr>
            <th data-sort="branch" style="cursor:pointer">지점</th>
            <th data-sort="room" style="cursor:pointer">호실</th>
            <th>계약자</th><th>입주자</th><th>연락처</th>
            <th data-sort="contract_start" style="cursor:pointer">계약기간</th>
            <th data-sort="rent" style="cursor:pointer">임대료</th>
            <th>관리비</th>
            <th data-sort="deposit" style="cursor:pointer">보증금</th>
            <th>상태</th>
          </tr></thead>
          <tbody id="cust-body"></tbody>
        </table>
      </div>
    `;
  },

  _compareHTML() {
    return `
      <div class="cb-heading">지점 비교 분석</div>
      <div class="cb-desc">주요 지표 기준 지점 간 비교표 및 기간별 변화 추이</div>
      <div class="cb-card"><div class="cb-card-title"><span class="cb-dot"></span>지점별 종합 지표 비교</div><div class="cb-compare-wrap"><table class="cb-table" id="cmp-table"></table></div></div>
      <div style="height:20px"></div>
      <div class="cb-g2">
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent2)"></span>지점별 재실율 비교</div><div class="cb-chart md"><canvas id="cmp-occ"></canvas></div></div>
        <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-renew)"></span>지점별 재계약율 비교</div><div class="cb-chart md"><canvas id="cmp-renew"></canvas></div></div>
      </div>
      <div style="height:20px"></div>
      <div style="border-top:1px solid var(--cb-border); padding-top:28px; margin-top:4px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <div class="cb-heading" style="font-size:18px; margin-bottom:4px;">📈 기간별 변화 추이 (MoM · YoY)</div>
            <div class="cb-desc" style="margin-bottom:0; font-size:13px;">전월 대비(MoM) / 전년 동월 대비(YoY) 시뮬레이션</div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <span style="font-size:12px; color:var(--cb-muted);">지점 선택:</span>
            <select id="mom-branch" class="cb-input" style="padding:6px 12px;font-size:13px"><option value="all">전체 합산</option></select>
          </div>
        </div>
        <div id="mom-kpi" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:14px; margin-bottom:24px;"></div>
        <div class="cb-g2">
          <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent1)"></span>재실율 월별 추이 (MoM)</div><div class="cb-chart lg"><canvas id="mom-occ"></canvas></div></div>
          <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent3)"></span>재계약율 월별 추이 (MoM)</div><div class="cb-chart lg"><canvas id="mom-renew"></canvas></div></div>
        </div>
        <div class="cb-g2" style="margin-top:20px;">
          <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent4)"></span>신규계약 수 월별 추이</div><div class="cb-chart lg"><canvas id="mom-new"></canvas></div></div>
          <div class="cb-card"><div class="cb-card-title"><span class="cb-dot" style="background:var(--cb-accent5)"></span>공실 수 월별 추이</div><div class="cb-chart lg"><canvas id="mom-vac"></canvas></div></div>
        </div>
        <div class="cb-card" style="margin-top:20px;"><div class="cb-card-title"><span class="cb-dot"></span>MoM · YoY 수치 상세표</div><div class="cb-compare-wrap"><table class="cb-table" id="mom-detail"></table></div></div>
      </div>
    `;
  },

  _insightHTML() {
    return `
      <div class="cb-heading">💡 매출 인사이트 — 고객 데이터 × 매출 영향 분석</div>
      <div class="cb-desc">매출 = 입주자 수 × 평균 임대료 × 계약기간 | 고객 세그먼트별 매출 기여도 및 레버 분석</div>
      <div style="background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(79,195,247,.08)); border:1px solid rgba(245,158,11,.35); border-radius:14px; padding:20px 24px; margin-bottom:24px; display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
        <div style="font-size:22px; font-weight:900; color:#f59e0b; font-family:'Space Mono',monospace; white-space:nowrap;">매출 = 입주자 × 임대료 × 기간</div>
        <div style="flex:1; min-width:260px;">
          <div style="font-size:13px; color:var(--cb-dim); line-height:1.7;">
            세 변수 중 <strong style="color:#4fc3f7">입주자 수</strong>는 <em>공실율·재실율</em>에 의해,
            <strong style="color:#f48fb1">임대료</strong>는 <em>고객 유형·지점 프리미엄</em>에 의해,
            <strong style="color:#a5d6a7">기간</strong>은 <em>계약 길이·재계약율</em>에 의해 결정됩니다.
          </div>
        </div>
        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <div style="text-align:center;"><div style="font-size:20px;font-weight:900;color:#4fc3f7;font-family:'Space Mono',monospace;">₩312M</div><div style="font-size:11px;color:var(--cb-muted);">추정 월 매출 합산</div></div>
          <div style="text-align:center;"><div style="font-size:20px;font-weight:900;color:#f87171;font-family:'Space Mono',monospace;">₩27M</div><div style="font-size:11px;color:var(--cb-muted);">공실 기회비용/월</div></div>
        </div>
      </div>

      <div style="margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid rgba(79,195,247,.3);">
        <span style="font-size:16px; font-weight:800; color:#4fc3f7;">LEVER 1</span>
        <span style="font-size:15px; font-weight:700; margin-left:10px;">입주자 수 — 공실 기회비용 & 대기수요 전환</span>
      </div>
      <div class="cb-g3" style="margin-bottom:24px;">
        <div class="cb-card" style="border-top:2px solid #4fc3f7;"><div class="cb-card-title"><span class="cb-dot" style="background:#4fc3f7"></span>지점별 재실율 & 기회비용</div><div class="cb-chart lg"><canvas id="ins-vac"></canvas></div></div>
        <div class="cb-card" style="border-top:2px solid #f87171;"><div class="cb-card-title"><span class="cb-dot" style="background:#f87171"></span>공실 → 매출 전환 시뮬레이터</div><div id="ins-vac-sim" style="padding-top:8px;"></div></div>
        <div class="cb-card" style="border-top:2px solid #fbbf24;"><div class="cb-card-title"><span class="cb-dot" style="background:#fbbf24"></span>입주대기 수요 vs 공실</div><div class="cb-chart lg"><canvas id="ins-wv"></canvas></div></div>
      </div>

      <div style="margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid rgba(244,143,177,.3);">
        <span style="font-size:16px; font-weight:800; color:#f48fb1;">LEVER 2</span>
        <span style="font-size:15px; font-weight:700; margin-left:10px;">임대료 단가 — 고객 세그먼트별 평균 단가 비교</span>
      </div>
      <div class="cb-g2"><div class="cb-card" style="border-top:2px solid #f48fb1;"><div class="cb-card-title"><span class="cb-dot" style="background:#f48fb1"></span>직업별 평균 임대료</div><div class="cb-chart md"><canvas id="ins-rj"></canvas></div></div>
        <div class="cb-card" style="border-top:2px solid #f48fb1;"><div class="cb-card-title"><span class="cb-dot" style="background:#ce93d8"></span>국적별 평균 임대료</div><div class="cb-chart md"><canvas id="ins-rn"></canvas></div></div></div>
      <div class="cb-g2" style="margin-bottom:24px;"><div class="cb-card" style="border-top:2px solid #f48fb1;"><div class="cb-card-title"><span class="cb-dot" style="background:#80deea"></span>성별별 평균 임대료</div><div class="cb-chart md"><canvas id="ins-rg"></canvas></div></div>
        <div class="cb-card" style="border-top:2px solid #f48fb1;"><div class="cb-card-title"><span class="cb-dot" style="background:#ffcc80"></span>연령대별 평균 임대료</div><div class="cb-chart md"><canvas id="ins-ra"></canvas></div></div></div>

      <div style="margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid rgba(165,214,167,.3);">
        <span style="font-size:16px; font-weight:800; color:#a5d6a7;">LEVER 3</span>
        <span style="font-size:15px; font-weight:700; margin-left:10px;">계약기간 — 고객 유형별 장기계약 성향 분석</span>
      </div>
      <div class="cb-g2"><div class="cb-card" style="border-top:2px solid #a5d6a7;"><div class="cb-card-title"><span class="cb-dot" style="background:#a5d6a7"></span>직업별 평균 계약기간(월)</div><div class="cb-chart md"><canvas id="ins-dj"></canvas></div></div>
        <div class="cb-card" style="border-top:2px solid #a5d6a7;"><div class="cb-card-title"><span class="cb-dot" style="background:#a5d6a7"></span>국적별 평균 계약기간(월)</div><div class="cb-chart md"><canvas id="ins-dn"></canvas></div></div></div>
      <div class="cb-g2" style="margin-bottom:24px;"><div class="cb-card" style="border-top:2px solid #a5d6a7;"><div class="cb-card-title"><span class="cb-dot" style="background:#4fc3f7"></span>재계약 여부별 LTV 비교</div><div class="cb-chart md"><canvas id="ins-ltv"></canvas></div></div>
        <div class="cb-card" style="border-top:2px solid #a5d6a7;"><div class="cb-card-title"><span class="cb-dot" style="background:#f48fb1"></span>성별별 평균 계약기간(월)</div><div class="cb-chart md"><canvas id="ins-dg"></canvas></div></div></div>

      <div style="margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid rgba(245,158,11,.3);">
        <span style="font-size:16px; font-weight:800; color:#f59e0b;">TOTAL</span>
        <span style="font-size:15px; font-weight:700; margin-left:10px;">세그먼트별 추정 총매출 기여도</span>
      </div>
      <div class="cb-g2" style="margin-bottom:20px;">
        <div class="cb-card" style="border-top:2px solid #f59e0b;"><div class="cb-card-title"><span class="cb-dot" style="background:#f59e0b"></span>세그먼트별 건당 추정 매출 비교</div><div class="cb-chart lg"><canvas id="ins-totrev"></canvas></div></div>
        <div class="cb-card" style="border-top:2px solid #f59e0b;"><div class="cb-card-title"><span class="cb-dot" style="background:#f59e0b"></span>지점별 현재 월매출 추정</div><div class="cb-chart lg"><canvas id="ins-brm"></canvas></div></div>
      </div>

      <div style="margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid rgba(206,147,216,.3);">
        <span style="font-size:16px; font-weight:800; color:#ce93d8;">SIM</span>
        <span style="font-size:15px; font-weight:700; margin-left:10px;">매출 시뮬레이터 — 고객 파라미터 직접 입력</span>
      </div>
      <div class="cb-card" style="border-top:2px solid #ce93d8; margin-bottom:20px;">
        <div style="font-size:13px;color:var(--cb-muted);margin-bottom:20px;">아래 파라미터를 조정해 매출 변화를 실시간으로 확인하세요.</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;">
          <div><label class="cb-sim-label">총 호실 수</label><input type="number" class="cb-sim-input" id="sim-total" value="457"></div>
          <div><label class="cb-sim-label">재실율 (%)</label><input type="number" class="cb-sim-input" id="sim-occ" value="61" min="0" max="100"></div>
          <div><label class="cb-sim-label">평균 임대료 (원)</label><input type="number" class="cb-sim-input" id="sim-rent" value="1200000"></div>
          <div><label class="cb-sim-label">평균 계약기간 (월)</label><input type="number" class="cb-sim-input" id="sim-dur" value="9.5" step="0.5"></div>
          <div><label class="cb-sim-label">재계약율 (%)</label><input type="number" class="cb-sim-input" id="sim-renew" value="26" min="0" max="100"></div>
          <div><label class="cb-sim-label">재계약 시 기간 연장 (월)</label><input type="number" class="cb-sim-input" id="sim-renew-ext" value="6"></div>
        </div>
        <div id="sim-result" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;"></div>
        <div style="margin-top:20px;">
          <div class="cb-card-title"><span class="cb-dot" style="background:#ce93d8"></span>시나리오별 연간 매출 비교</div>
          <div class="cb-chart lg"><canvas id="sim-scenario"></canvas></div>
        </div>
      </div>

      <div style="margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid rgba(74,222,128,.3);">
        <span style="font-size:16px; font-weight:800; color:#4ade80;">KEY</span>
        <span style="font-size:15px; font-weight:700; margin-left:10px;">핵심 인사이트 & 액션 가이드</span>
      </div>
      <div id="ins-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:20px;"></div>
    `;
  },

  // ---------- Helpers ----------
  _pct(v, t) { return t ? ((v / t) * 100).toFixed(1) + '%' : '0%'; },
  _fmt(n) { if (n >= 1e8) return (n / 1e8).toFixed(1) + '억'; if (n >= 1e4) return Math.round(n / 1e4) + '만'; return Math.round(n).toLocaleString(); },

  _overviewSums() {
    const RAW = this._RAW, BR = this._BRANCHES;
    const total = BR.reduce((s, b) => s + (RAW[b].total || 0), 0);
    const occ = BR.reduce((s, b) => s + (RAW[b].입주현황['재실'] || 0), 0);
    const vac = BR.reduce((s, b) => s + (RAW[b].입주현황['공실'] || 0), 0);
    const wait = BR.reduce((s, b) => s + (RAW[b].입주현황['입주대기'] || 0), 0);
    const newC = BR.reduce((s, b) => s + (RAW[b].계약상태['신규계약'] || 0), 0);
    const renew = BR.reduce((s, b) => s + (RAW[b].계약상태['재계약'] || 0), 0);
    const male = BR.reduce((s, b) => s + (RAW[b].성별['남'] || 0), 0);
    const female = BR.reduce((s, b) => s + (RAW[b].성별['여'] || 0), 0);
    const foreign = BR.reduce((s, b) => s + (RAW[b].국적['외국인'] || 0), 0);
    const domestic = BR.reduce((s, b) => s + (RAW[b].국적['내국인'] || 0), 0);
    const gTot = male + female; const nTot = foreign + domestic;
    return {
      total, occupied: occ, vacant: vac, waiting: wait, newC, renew,
      occRate: total ? ((occ / total) * 100).toFixed(1) : 0,
      vacRate: total ? ((vac / total) * 100).toFixed(1) : 0,
      newRate: total ? ((newC / total) * 100).toFixed(1) : 0,
      renewRate: total ? ((renew / total) * 100).toFixed(1) : 0,
      femalePct: gTot ? Math.round(female / gTot * 100) : 0,
      foreignPct: nTot ? Math.round(foreign / nTot * 100) : 0
    };
  },

  _chartDefaults() {
    return {
      legend: { labels: { color: '#94a3b8', font: { family: "'Pretendard',sans-serif", size: 13 }, boxWidth: 12, boxHeight: 12, padding: 14 } },
      tooltip: { backgroundColor: '#fff', borderColor: '#e2e8f0', borderWidth: 1, titleColor: '#0f172a', bodyColor: '#64748b' }
    };
  },

  _donut(id, labels, data, colors) {
    const ctx = this.el.querySelector('#' + id); if (!ctx) return;
    if (this._charts[id]) { this._charts[id].destroy(); }
    const total = data.reduce((a, b) => a + b, 0);
    const def = this._chartDefaults();
    this._charts[id] = new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#f8fafc' }] },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '52%', layout: { padding: 20 },
        plugins: {
          legend: def.legend,
          tooltip: { ...def.tooltip, callbacks: { label: c => ` ${c.label}: ${c.raw}개 (${((c.raw / total) * 100).toFixed(1)}%)` } },
          datalabels: {
            display: c => (c.dataset.data[c.dataIndex] / total * 100) >= 4,
            color: '#fff', font: { family: "'Space Mono',monospace", size: 11, weight: 'bold' },
            formatter: v => `${v}\n${(v / total * 100).toFixed(1)}%`,
            textAlign: 'center', anchor: 'center', align: 'center'
          }
        }
      }
    });
  },

  _bar(id, labels, datasets, opts = {}) {
    const ctx = this.el.querySelector('#' + id); if (!ctx) return;
    if (this._charts[id]) this._charts[id].destroy();
    const def = this._chartDefaults();
    this._charts[id] = new Chart(ctx, {
      type: 'bar', data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false, indexAxis: opts.horizontal ? 'y' : 'x',
        scales: {
          x: { stacked: !!opts.stacked, ticks: { color: '#64748b', font: { size: 11, family: "'Pretendard'" } }, grid: { color: '#fff' } },
          y: { stacked: !!opts.stacked, ticks: { color: '#64748b', font: { size: 12, family: "'Pretendard'" }, callback: opts.yFmt || (v => v) }, grid: { color: '#fff' }, ...(opts.yMax ? { max: opts.yMax } : {}) }
        },
        plugins: {
          legend: datasets.length > 1 ? def.legend : { display: false },
          tooltip: { ...def.tooltip, callbacks: { label: c => ` ${c.dataset.label || ''}: ${opts.tFmt ? opts.tFmt(c.raw) : c.raw}` } },
          datalabels: { display: false }
        }
      }
    });
  },

  _table(id, headers, rows) {
    const t = this.el.querySelector('#' + id); if (!t) return;
    t.innerHTML = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
  },

  // ---------- Section initializers ----------
  _initOverview() {
    const RAW = this._RAW, BR = this._BRANCHES;
    const allOcc = {}; BR.forEach(b => Object.entries(RAW[b].입주현황).forEach(([k, v]) => allOcc[k] = (allOcc[k] || 0) + v));
    this._donut('ov-occ', Object.keys(allOcc), Object.values(allOcc), ['#4ade80', '#f87171', '#fbbf24', '#94a3b8']);

    const allCont = {}; BR.forEach(b => Object.entries(RAW[b].계약상태).forEach(([k, v]) => allCont[k] = (allCont[k] || 0) + v));
    this._donut('ov-contract', Object.keys(allCont), Object.values(allCont), ['#60a5fa', '#34d399', '#f87171', '#94a3b8', '#fbbf24']);

    const gt = { '남': 0, '여': 0, '정보없음': 0 };
    BR.forEach(b => Object.entries(RAW[b].성별).forEach(([k, v]) => { if (gt[k] != null) gt[k] += v; else gt['정보없음'] += v; }));
    this._donut('ov-gender', Object.keys(gt), Object.values(gt), ['#4fc3f7', '#f48fb1', '#94a3b8']);

    const nKeys = ['내국인', '외국인', '정보없음'];
    const nt = { '내국인': 0, '외국인': 0, '정보없음': 0 };
    BR.forEach(b => Object.entries(RAW[b].국적).forEach(([k, v]) => { if (nt[k] != null) nt[k] += v; else nt['정보없음'] += v; }));
    this._donut('ov-nat', nKeys, nKeys.map(k => nt[k]), ['#a5d6a7', '#4fc3f7', '#94a3b8']);

    const jKeys = ['직장인', '학생', '기타', '정보없음'];
    const jt = { '직장인': 0, '학생': 0, '기타': 0, '정보없음': 0 };
    BR.forEach(b => Object.entries(RAW[b].직업).forEach(([k, v]) => { if (jt[k] != null) jt[k] += v; else jt['기타'] += v; }));
    this._donut('ov-job', jKeys, jKeys.map(k => jt[k]), ['#ffcc80', '#ce93d8', '#ef9a9a', '#4a5568']);

    const labels = BR.map(b => b.replace('아코모 가산', '가산').replace('아코모 회기', '회기'));
    this._bar('ov-branches', labels, [
      { label: '재실', data: BR.map(b => RAW[b].입주현황['재실'] || 0), backgroundColor: '#4ade80' },
      { label: '공실', data: BR.map(b => RAW[b].입주현황['공실'] || 0), backgroundColor: '#f87171' },
      { label: '입주대기', data: BR.map(b => RAW[b].입주현황['입주대기'] || 0), backgroundColor: '#fbbf24' }
    ], { stacked: true });
  },

  _initBranches() {
    const host = this.el.querySelector('#cb-branch-cards'); if (!host) return;
    const COLORS = ['#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fbbf24', '#f87171', '#2dd4bf', '#fb923c', '#ec4899'];
    const RAW = this._RAW;
    host.innerHTML = '';
    this._BRANCHES.forEach((b, i) => {
      const d = RAW[b];
      const occ = d.입주현황['재실'] || 0, vac = d.입주현황['공실'] || 0;
      const newC = d.계약상태['신규계약'] || 0, renew = d.계약상태['재계약'] || 0;
      const male = d.성별['남'] || 0, female = d.성별['여'] || 0;
      const occRate = d.total ? Math.round(occ / d.total * 100) : 0;
      const gT = male + female;
      const mp = gT ? (male / gT * 100) : 0, fp = gT ? (female / gT * 100) : 0;
      const col = COLORS[i % COLORS.length];
      const card = document.createElement('div');
      card.className = 'cb-branch-card';
      card.style.borderTop = `3px solid ${col}`;
      card.innerHTML = `
        <div class="cb-branch-name">${b}</div>
        <div class="cb-branch-total">총 ${d.total}호실</div>
        <div class="cb-mini-stats">
          <div class="cb-mini-stat"><div class="cb-mini-stat-val" style="color:var(--cb-occupied)">${occ}</div><div class="cb-mini-stat-lbl">재실</div></div>
          <div class="cb-mini-stat"><div class="cb-mini-stat-val" style="color:var(--cb-vacant)">${vac}</div><div class="cb-mini-stat-lbl">공실</div></div>
          <div class="cb-mini-stat"><div class="cb-mini-stat-val" style="color:var(--cb-new)">${newC}</div><div class="cb-mini-stat-lbl">신규계약</div></div>
          <div class="cb-mini-stat"><div class="cb-mini-stat-val" style="color:var(--cb-renew)">${renew}</div><div class="cb-mini-stat-lbl">재계약</div></div>
        </div>
        <div style="font-size:10px;color:var(--cb-muted);margin-bottom:6px;">재실율 ${occRate}%</div>
        <div style="background:var(--cb-border);height:4px;border-radius:2px;overflow:hidden;margin-bottom:14px;">
          <div style="width:${occRate}%;height:100%;background:${col};border-radius:2px;"></div>
        </div>
        ${gT > 0 ? `
          <div style="font-size:10px;color:var(--cb-muted);margin-bottom:6px;">성별 구성 (${male}남 / ${female}여)</div>
          <div style="display:flex;height:6px;border-radius:3px;overflow:hidden;gap:1px;">
            <div style="width:${mp}%;background:var(--cb-male);"></div>
            <div style="width:${fp}%;background:var(--cb-female);"></div>
          </div>
          <div class="cb-legend" style="margin-top:6px;">
            <div class="cb-legend-item"><div class="cb-legend-dot" style="background:var(--cb-male)"></div>남 ${male}</div>
            <div class="cb-legend-item"><div class="cb-legend-dot" style="background:var(--cb-female)"></div>여 ${female}</div>
          </div>` : '<div style="font-size:10px;color:var(--cb-muted)">성별 정보 없음</div>'}
      `;
      host.appendChild(card);
    });
  },

  _stackedBranch(id, keys, colors, getData) {
    const BR = this._BRANCHES;
    const labels = BR.map(b => b.replace('아코모 가산', '가산').replace('아코모 회기', '회기'));
    const datasets = keys.map(k => ({ label: k, data: BR.map(b => getData(b, k)), backgroundColor: colors[k] || '#666' }));
    this._bar(id, labels, datasets, { stacked: true });
  },

  _initGender() {
    const keys = ['남', '여', '정보없음'];
    const colors = { '남': '#4fc3f7', '여': '#f48fb1', '정보없음': '#4a5568' };
    const total = { '남': 0, '여': 0, '정보없음': 0 };
    this._BRANCHES.forEach(b => keys.forEach(k => total[k] += (this._RAW[b].성별[k] || 0)));
    this._donut('gender-overall', keys, keys.map(k => total[k]), keys.map(k => colors[k]));
    this._stackedBranch('gender-by-branch', keys, colors, (b, k) => this._RAW[b].성별[k] || 0);
    const rows = this._BRANCHES.map(b => {
      const d = this._RAW[b].성별, t = this._RAW[b].total;
      return [b, `${d['남'] || 0} (${this._pct(d['남'] || 0, t)})`, `${d['여'] || 0} (${this._pct(d['여'] || 0, t)})`, `${d['정보없음'] || 0}`, t];
    });
    this._table('gender-table', ['지점', '남', '여', '정보없음', '합계'], rows);
  },

  _initNationality() {
    const keys = ['내국인', '외국인', '정보없음'];
    const colors = { '내국인': '#a5d6a7', '외국인': '#4fc3f7', '정보없음': '#4a5568' };
    const total = {}; keys.forEach(k => total[k] = 0);
    this._BRANCHES.forEach(b => keys.forEach(k => total[k] += (this._RAW[b].국적[k] || 0)));
    this._donut('nat-overall', keys, keys.map(k => total[k]), keys.map(k => colors[k]));
    this._stackedBranch('nat-by-branch', keys, colors, (b, k) => this._RAW[b].국적[k] || 0);
    const rows = this._BRANCHES.map(b => {
      const d = this._RAW[b].국적, t = this._RAW[b].total;
      return [b, `${d['내국인'] || 0} (${this._pct(d['내국인'] || 0, t)})`, `${d['외국인'] || 0} (${this._pct(d['외국인'] || 0, t)})`, `${d['정보없음'] || 0}`, t];
    });
    this._table('nat-table', ['지점', '내국인', '외국인', '정보없음', '합계'], rows);
  },

  _initSales() {
    const keys = ['개인', '개인사업자', '법인사업자'];
    const colors = { '개인': '#4fc3f7', '개인사업자': '#ffcc80', '법인사업자': '#ce93d8' };
    const total = {}; keys.forEach(k => total[k] = 0);
    this._BRANCHES.forEach(b => keys.forEach(k => total[k] += ((this._RAW[b].세일즈유형 || {})[k] || 0)));
    this._donut('sales-overall', keys, keys.map(k => total[k]), keys.map(k => colors[k]));
    this._stackedBranch('sales-by-branch', keys, colors, (b, k) => (this._RAW[b].세일즈유형 || {})[k] || 0);
    const rows = this._BRANCHES.map(b => {
      const d = this._RAW[b].세일즈유형 || {};
      const t = (d['개인'] || 0) + (d['개인사업자'] || 0) + (d['법인사업자'] || 0);
      return [
        b,
        `${d['개인'] || 0} (${this._pct(d['개인'] || 0, t)})`,
        `${d['개인사업자'] || 0} (${this._pct(d['개인사업자'] || 0, t)})`,
        `${d['법인사업자'] || 0} (${this._pct(d['법인사업자'] || 0, t)})`,
        t
      ];
    });
    this._table('sales-table', ['지점', '개인', '개인사업자', '법인사업자', '합계'], rows);
  },

  _initJob() {
    const keys = ['직장인', '학생', '기타', '정보없음'];
    const colors = { '직장인': '#ffcc80', '학생': '#ce93d8', '기타': '#ef9a9a', '정보없음': '#4a5568' };
    const total = {}; keys.forEach(k => total[k] = 0);
    this._BRANCHES.forEach(b => keys.forEach(k => total[k] += (this._RAW[b].직업[k] || 0)));
    this._donut('job-overall', keys, keys.map(k => total[k]), keys.map(k => colors[k]));
    this._stackedBranch('job-by-branch', keys, colors, (b, k) => this._RAW[b].직업[k] || 0);
    const rows = this._BRANCHES.map(b => {
      const d = this._RAW[b].직업, t = this._RAW[b].total;
      return [b, `${d['직장인'] || 0} (${this._pct(d['직장인'] || 0, t)})`, `${d['학생'] || 0} (${this._pct(d['학생'] || 0, t)})`, `${d['기타'] || 0}`, `${d['정보없음'] || 0}`, t];
    });
    this._table('job-table', ['지점', '직장인', '학생', '기타', '정보없음', '합계'], rows);
  },

  _initAge() {
    const keys = ['20대 미만', '20대', '30대', '40대', '50대', '60대 이상'];
    const colors = { '20대 미만': '#80deea', '20대': '#ce93d8', '30대': '#4fc3f7', '40대': '#a5d6a7', '50대': '#ffcc80', '60대 이상': '#ef9a9a' };
    const total = {}; keys.forEach(k => total[k] = 0);
    this._BRANCHES.forEach(b => { if (this._RAW[b].연령대) keys.forEach(k => total[k] += (this._RAW[b].연령대[k] || 0)); });
    const filtered = keys.filter(k => total[k] > 0);
    this._donut('age-overall', filtered, filtered.map(k => total[k]), filtered.map(k => colors[k]));
    this._stackedBranch('age-by-branch', filtered, colors, (b, k) => (this._RAW[b].연령대 || {})[k] || 0);
    const rows = this._BRANCHES.map(b => {
      const d = this._RAW[b].연령대 || {};
      const t = Object.values(d).reduce((s, v) => s + v, 0);
      if (t === 0) return [b, '-', '-', '-', '-', '-', '-', '데이터없음'];
      return [b, `${d['20대 미만'] || 0}`, `${d['20대'] || 0}`, `${d['30대'] || 0}`, `${d['40대'] || 0}`, `${d['50대'] || 0}`, `${d['60대 이상'] || 0}`, t];
    });
    this._table('age-table', ['지점', '20대 미만', '20대', '30대', '40대', '50대', '60대+', '합계(확인분)'], rows);
  },

  _initContract() {
    const allCont = {};
    this._BRANCHES.forEach(b => Object.entries(this._RAW[b].계약상태).forEach(([k, v]) => allCont[k] = (allCont[k] || 0) + v));
    this._donut('ct-overall', Object.keys(allCont), Object.values(allCont), ['#60a5fa', '#34d399', '#f87171', '#94a3b8', '#fbbf24']);

    const durKeys = ['1개월 이하', '3개월 이하', '6개월 이하', '12개월 이하', '12개월 초과', '정보없음'];
    const durColors = ['#80deea', '#4fc3f7', '#a5d6a7', '#ffcc80', '#ce93d8', '#4a5568'];
    const durTot = {}; durKeys.forEach(k => durTot[k] = 0);
    this._BRANCHES.forEach(b => durKeys.forEach(k => durTot[k] += (this._RAW[b].계약기간[k] || 0)));
    this._donut('ct-duration', durKeys, durKeys.map(k => durTot[k]), durColors);

    const rows = this._BRANCHES.map(b => {
      const d = this._RAW[b].계약상태, t = this._RAW[b].total;
      return [b, `${d['신규계약'] || 0} (${this._pct(d['신규계약'] || 0, t)})`, `${d['재계약'] || 0} (${this._pct(d['재계약'] || 0, t)})`, `${d['중도퇴실'] || 0}`, `${d['정보없음'] || 0}`, t];
    });
    this._table('ct-table', ['지점', '신규계약', '재계약', '중도퇴실', '정보없음', '합계'], rows);
  },

  _initCustomers() {
    const today = new Date().toISOString().split('T')[0];
    this._activeCustomers = (this._allContracts || []).filter(c => c.contract_end >= today && (c.status === '계약 완료' || c.status === '연장 계약'));
    const roomMap = {};
    this._activeCustomers.forEach(c => { const k = (c.branch || '') + '||' + (c.room || ''); if (!roomMap[k] || c.contract_start > roomMap[k].contract_start) roomMap[k] = c; });
    this._activeCustomers = Object.values(roomMap);

    const sel = this.el.querySelector('#cust-br');
    const branches = [...new Set(this._activeCustomers.map(c => c.branch).filter(Boolean))].sort();
    sel.innerHTML = '<option value="">전체 지점</option>' + branches.map(b => `<option>${b}</option>`).join('');

    const self = this;
    this.el.querySelector('#cust-q').addEventListener('input', () => self._filterCust());
    this.el.querySelector('#cust-br').addEventListener('change', () => self._filterCust());
    this.el.querySelectorAll('#cust-tbl [data-sort]').forEach(th => th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (self._custSort.key === key) self._custSort.asc = !self._custSort.asc;
      else { self._custSort.key = key; self._custSort.asc = true; }
      self._filterCust();
    }));
    this._filterCust();
  },

  _filterCust() {
    const q = (this.el.querySelector('#cust-q').value || '').toLowerCase();
    const br = this.el.querySelector('#cust-br').value;
    let filtered = this._activeCustomers.filter(c => {
      if (br && c.branch !== br) return false;
      if (q) {
        const txt = ((c.name || '') + (c.room || '') + (c.phone || '') + (c.resident_name || '')).toLowerCase();
        if (txt.indexOf(q) === -1) return false;
      }
      return true;
    });
    if (this._custSort.key) {
      const k = this._custSort.key, asc = this._custSort.asc;
      filtered.sort((a, b) => {
        const va = a[k] || '', vb = b[k] || '';
        if (typeof va === 'number') return asc ? va - vb : vb - va;
        return asc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      });
    }
    this.el.querySelector('#cust-cnt').textContent = `총 ${filtered.length}건`;
    const today = new Date();
    const body = this.el.querySelector('#cust-body');
    body.innerHTML = filtered.map(c => {
      const end = new Date(c.contract_end);
      const diff = Math.ceil((end - today) / 86400000);
      const color = diff <= 30 ? '#f87171' : diff <= 90 ? '#fbbf24' : '#4ade80';
      const fmt = v => v ? Number(v).toLocaleString() : '-';
      return `<tr>
        <td>${c.branch || '-'}</td>
        <td style="font-weight:700">${c.room || '-'}</td>
        <td>${c.name || '-'}</td>
        <td>${c.resident_name || '-'}</td>
        <td>${c.phone || '-'}</td>
        <td>${c.contract_start || ''} ~ ${c.contract_end || ''} <span style="color:${color};font-size:12px;">(${diff}일)</span></td>
        <td style="text-align:right">${fmt(c.rent)}</td>
        <td style="text-align:right">${fmt(c.maintenance_fee)}</td>
        <td style="text-align:right">${fmt(c.deposit)}</td>
        <td><span class="cb-pill ${c.status === '계약 완료' ? 'cb-pill-green' : 'cb-pill-blue'}">${c.status || '-'}</span></td>
      </tr>`;
    }).join('');
  },

  _initCompare() {
    const RAW = this._RAW, BR = this._BRANCHES;
    const COLORS = ['#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fbbf24', '#f87171', '#2dd4bf', '#fb923c', '#ec4899'];
    const rows = BR.map((b, i) => {
      const d = RAW[b];
      const occ = d.입주현황['재실'] || 0, vac = d.입주현황['공실'] || 0, wait = d.입주현황['입주대기'] || 0;
      const newC = d.계약상태['신규계약'] || 0, renew = d.계약상태['재계약'] || 0;
      const male = d.성별['남'] || 0, female = d.성별['여'] || 0;
      const foreign = d.국적['외국인'] || 0, domestic = d.국적['내국인'] || 0;
      const worker = d.직업['직장인'] || 0, student = d.직업['학생'] || 0;
      const occR = d.total ? (occ / d.total * 100).toFixed(0) : 0;
      const renewR = (newC + renew) > 0 ? (renew / (newC + renew) * 100).toFixed(0) : '-';
      return [
        `<span style="color:${COLORS[i % COLORS.length]};font-weight:700">${b}</span>`, d.total,
        `<span class="cb-pill cb-pill-green">${occ}</span>`,
        `<span class="cb-pill cb-pill-red">${vac}</span>`,
        `<span class="cb-pill cb-pill-yellow">${wait}</span>`,
        `${occR}%`,
        `<span class="cb-pill cb-pill-blue">${newC}</span>`,
        `<span class="cb-pill cb-pill-green" style="background:rgba(52,211,153,.15);color:var(--cb-renew)">${renew}</span>`,
        renewR !== '-' ? `${renewR}%` : '-',
        `${male}남 / ${female}여`, `${foreign}외 / ${domestic}내`, `${worker}직 / ${student}학`
      ];
    });
    this._table('cmp-table', ['지점', '총호실', '재실', '공실', '입주대기', '재실율', '신규계약', '재계약', '재계약율', '성별', '국적', '직업'], rows);

    const labels = BR.map(b => b.replace('아코모 가산', '가산').replace('아코모 회기', '회기'));
    const occRates = BR.map(b => RAW[b].total ? ((RAW[b].입주현황['재실'] || 0) / RAW[b].total * 100).toFixed(1) : 0);
    this._bar('cmp-occ', labels, [{ label: '재실율(%)', data: occRates, backgroundColor: COLORS, borderRadius: 4 }], { yMax: 100, yFmt: v => v + '%', tFmt: v => v + '%' });

    const renewRates = BR.map(b => {
      const n = RAW[b].계약상태['신규계약'] || 0, r = RAW[b].계약상태['재계약'] || 0;
      return (n + r) > 0 ? (r / (n + r) * 100).toFixed(1) : 0;
    });
    this._bar('cmp-renew', labels, [{ label: '재계약율(%)', data: renewRates, backgroundColor: COLORS.map(c => c + 'cc'), borderRadius: 4 }], { yMax: 100, yFmt: v => v + '%', tFmt: v => v + '%' });

    // MoM branch select
    const sel = this.el.querySelector('#mom-branch');
    BR.forEach(b => { const opt = document.createElement('option'); opt.value = b; opt.textContent = b; sel.appendChild(opt); });
    sel.addEventListener('change', () => this._renderMoM());
    this._renderMoM();
  },

  _renderMoM() {
    const MONTHS = ['24.02','24.03','24.04','24.05','24.06','24.07','24.08','24.09','24.10','24.11','24.12','25.01','25.02'];
    const MOM_ALL = {
      재실:[238,245,251,259,262,270,268,274,276,272,265,271,278],
      공실:[22,19,17,15,14,12,14,13,12,14,16,15,16],
      신규계약:[28,31,27,34,29,36,30,33,28,31,25,29,32],
      재계약:[8,9,11,10,12,13,11,14,12,10,9,11,13],
      총호실: Array(13).fill(457)
    };
    const branchKey = this.el.querySelector('#mom-branch').value;
    const src = branchKey === 'all' ? MOM_ALL : MOM_ALL; // 시뮬레이션 — 전체만 사용

    const occRates = src.재실.map((v, i) => (v / src.총호실[i] * 100).toFixed(1));
    const renewRates = src.재계약.map((v, i) => { const d = src.신규계약[i] + src.재계약[i]; return d > 0 ? (v / d * 100).toFixed(1) : 0; });

    const delta = (a, p = 1) => { const c = a[a.length - 1], pv = a[a.length - 1 - p]; if (!pv) return { val: 0, pct: 0 }; return { val: c - pv, pct: (c - pv) / pv * 100 }; };
    const occArr = src.재실.map((v, i) => v / src.총호실[i] * 100);
    const card = (label, val, m, y, col, inv = false) => {
      const fmt = d => { if (!d || d.val === 0) return `<span style="color:#4a5568">— 변동없음</span>`; const good = inv ? d.val <= 0 : d.val >= 0; const c = good ? '#4ade80' : '#f87171'; const a = d.val > 0 ? '▲' : '▼'; const s = d.val > 0 ? '+' : ''; return `<span style="color:${c}">${a} ${s}${d.val.toFixed ? d.val.toFixed(1) : d.val} (${s}${d.pct.toFixed(1)}%)</span>`; };
      return `<div style="background:var(--cb-surface);border:1px solid var(--cb-border);border-radius:12px;padding:18px;border-top:2px solid ${col};">
        <div style="font-size:11px;color:var(--cb-muted);font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">${label}</div>
        <div style="font-size:26px;font-weight:900;color:${col};line-height:1;margin-bottom:10px;">${val}</div>
        <div style="font-size:12px;margin-bottom:4px;"><span style="color:var(--cb-muted)">MoM</span> ${fmt(m)}</div>
        <div style="font-size:12px;"><span style="color:var(--cb-muted)">YoY</span> ${fmt(y)}</div>
      </div>`;
    };
    this.el.querySelector('#mom-kpi').innerHTML =
      card('재실율 (현재)', (src.재실[12] / src.총호실[12] * 100).toFixed(1) + '%', delta(occArr), delta(occArr, 12), '#4ade80')
      + card('공실 수 (현재)', src.공실[12] + '개', delta(src.공실), delta(src.공실, 12), '#f87171', true)
      + card('신규계약 (현재월)', src.신규계약[12] + '건', delta(src.신규계약), delta(src.신규계약, 12), '#60a5fa')
      + card('재계약 (현재월)', src.재계약[12] + '건', delta(src.재계약), delta(src.재계약, 12), '#34d399');

    const line = (id, label, data, color, yLabel = '') => {
      const ctx = this.el.querySelector('#' + id); if (!ctx) return;
      if (this._charts[id]) this._charts[id].destroy();
      this._charts[id] = new Chart(ctx, {
        type: 'line',
        data: { labels: MONTHS, datasets: [{ label, data, borderColor: color, backgroundColor: color + '22', borderWidth: 2.5, pointBackgroundColor: color, pointRadius: 4, fill: true, tension: .35 }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: {
            x: { ticks: { color: '#64748b', font: { size: 12 } }, grid: { color: '#fff' } },
            y: { ticks: { color: '#64748b', font: { size: 12 }, callback: v => yLabel ? v + yLabel : v }, grid: { color: '#fff' } }
          },
          plugins: { legend: { display: false }, tooltip: { backgroundColor: '#fff', borderColor: '#e2e8f0', borderWidth: 1, titleColor: '#0f172a', bodyColor: color }, datalabels: { display: false } }
        }
      });
    };
    line('mom-occ', '재실율', occRates, '#4fc3f7', '%');
    line('mom-renew', '재계약율', renewRates, '#34d399', '%');
    line('mom-new', '신규계약 수', src.신규계약, '#60a5fa', '건');
    line('mom-vac', '공실 수', src.공실, '#f87171', '개');

    const tblRows = MONTHS.map((m, i) => {
      const occR = (src.재실[i] / src.총호실[i] * 100).toFixed(1);
      const denom = src.신규계약[i] + src.재계약[i];
      const renewR = denom > 0 ? (src.재계약[i] / denom * 100).toFixed(1) : '-';
      return [`<strong>${m}</strong>`, src.재실[i], `${occR}%`, src.공실[i], src.신규계약[i], src.재계약[i], renewR !== '-' ? renewR + '%' : '-'];
    });
    this._table('mom-detail', ['월', '재실수', '재실율', '공실수', '신규계약', '재계약', '재계약율'], tblRows.reverse());
  },

  _initInsight() {
    const DATA = {
      branches: {
        '선정릉':{occ:52,vac:6,wait:3,rent:1485500,dur:10.0},
        '남영':{occ:56,vac:4,wait:4,rent:738511,dur:11.5},
        '망원':{occ:12,vac:6,wait:0,rent:681667,dur:7.0},
        '안암':{occ:41,vac:0,wait:19,rent:1254038,dur:7.1},
        '가산-101동':{occ:20,vac:0,wait:4,rent:1284889,dur:11.3},
        '가산-201동':{occ:33,vac:0,wait:2,rent:1317632,dur:12.3},
        '회기':{occ:60,vac:0,wait:26,rent:1317917,dur:8.7},
        '원효로240':{occ:4,vac:0,wait:0,rent:600000,dur:3.0}
      },
      job:{
        '직장인':{rent:1191594,dur:10.6,revenue:12720736},
        '학생/학교':{rent:1246333,dur:8.5,revenue:10428214},
        '교육/훈련':{rent:1405000,dur:2.9,revenue:4000000},
        '기타':{rent:1493636,dur:9.5,revenue:14248182},
        '이사/인테리어':{rent:1435000,dur:1.5,revenue:2010000}
      },
      nationality:{
        '내국인':{rent:1297698,dur:9.6,revenue:12404419},
        '외국인':{rent:1309820,dur:8.8,revenue:11515676},
        '법인':{rent:1170000,dur:12.0,revenue:14040000}
      },
      gender:{
        '남':{rent:1189297,dur:9.3,revenue:10804857},
        '여':{rent:1249722,dur:9.8,revenue:12169000},
        '사업자':{rent:1151905,dur:9.0,revenue:10983333}
      },
      age:{
        '20대':{rent:900588,dur:10.0,revenue:9370000},
        '30대':{rent:1037680,dur:10.0,revenue:10143920},
        '40대':{rent:1174833,dur:10.0,revenue:11046333},
        '50대':{rent:976154,dur:10.0,revenue:9574615},
        '60대+':{rent:1070000,dur:12.0,revenue:12333333}
      },
      contract:{
        '신규계약':{rent:1130991,dur:8.9,revenue:9752089},
        '재계약':{rent:1137804,dur:9.0,revenue:10016283},
        '재계약(장기)':{rent:1137804,dur:18.0,revenue:20480472}
      }
    };

    const bd = DATA.branches, bKeys = Object.keys(bd);
    const COLORS = ['#f472b6','#60a5fa','#34d399','#a78bfa','#fbbf24','#f87171','#2dd4bf','#fb923c'];
    this._bar('ins-vac', bKeys, [
      { label: '재실', data: bKeys.map(k => bd[k].occ), backgroundColor: '#4ade8088', borderRadius: 3 },
      { label: '공실', data: bKeys.map(k => bd[k].vac), backgroundColor: '#f8717188', borderRadius: 3 },
      { label: '입주대기', data: bKeys.map(k => bd[k].wait), backgroundColor: '#fbbf2488', borderRadius: 3 }
    ], { tFmt: v => v + '호' });

    // Vacancy sim
    const simEl = this.el.querySelector('#ins-vac-sim');
    const totalVac = bKeys.reduce((s, k) => s + bd[k].vac, 0);
    const totalOpp = bKeys.reduce((s, k) => s + bd[k].vac * bd[k].rent, 0);
    const avgRent = Math.round(bKeys.reduce((s, k) => s + bd[k].rent, 0) / bKeys.length);
    const self = this;
    simEl.innerHTML = `
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;color:var(--cb-muted);margin-bottom:6px;font-family:'Space Mono',monospace;">공실 전환율 조정</div>
        <input type="range" id="ins-vacs" min="0" max="100" value="50" style="width:100%;accent-color:#4fc3f7;cursor:pointer;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--cb-muted);">
          <span>0%</span><span id="ins-vacp" style="color:#4fc3f7;font-weight:700;">50%</span><span>100%</span>
        </div>
      </div>
      <div id="ins-vacr" style="display:flex;flex-direction:column;gap:8px;"></div>
      <div style="margin-top:12px;padding:10px 12px;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.25);border-radius:8px;">
        <div style="font-size:11px;color:#f87171;font-family:'Space Mono',monospace;margin-bottom:4px;">현재 공실 기회비용/월</div>
        <div style="font-size:22px;font-weight:900;color:#f87171;font-family:'Space Mono',monospace;">₩${this._fmt(totalOpp)}</div>
        <div style="font-size:12px;color:var(--cb-muted);margin-top:2px;">공실 ${totalVac}호 × 평균 임대료 ${this._fmt(avgRent)}원</div>
      </div>
    `;
    const updateVac = pct => {
      this.el.querySelector('#ins-vacp').textContent = pct + '%';
      const added = Math.round(totalVac * pct / 100);
      const rev = added * avgRent;
      this.el.querySelector('#ins-vacr').innerHTML = `
        <div style="background:rgba(79,195,247,.08);border:1px solid rgba(79,195,247,.2);border-radius:8px;padding:10px 14px;"><div style="font-size:11px;color:#4fc3f7;font-family:'Space Mono',monospace;margin-bottom:4px;">전환 시 추가 입주자</div><div style="font-size:20px;font-weight:900;color:#4fc3f7;">+${added}호</div></div>
        <div style="background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);border-radius:8px;padding:10px 14px;"><div style="font-size:11px;color:#4ade80;font-family:'Space Mono',monospace;margin-bottom:4px;">추가 월매출</div><div style="font-size:20px;font-weight:900;color:#4ade80;">+₩${self._fmt(rev)}</div></div>
        <div style="background:rgba(206,147,216,.08);border:1px solid rgba(206,147,216,.2);border-radius:8px;padding:10px 14px;"><div style="font-size:11px;color:#ce93d8;font-family:'Space Mono',monospace;margin-bottom:4px;">연간 환산 추가매출</div><div style="font-size:20px;font-weight:900;color:#ce93d8;">+₩${self._fmt(rev * 12)}</div></div>
      `;
    };
    this.el.querySelector('#ins-vacs').addEventListener('input', e => updateVac(+e.target.value));
    updateVac(50);

    this._bar('ins-wv', bKeys, [
      { label: '공실 수', data: bKeys.map(k => bd[k].vac), backgroundColor: '#f87171bb', borderRadius: 3 },
      { label: '입주대기', data: bKeys.map(k => bd[k].wait), backgroundColor: '#fbbf24bb', borderRadius: 3 }
    ], { tFmt: v => v + '호' });

    // Rent bars
    const jKeys = Object.keys(DATA.job);
    this._bar('ins-rj', jKeys, [{ label: '평균 임대료', data: jKeys.map(k => DATA.job[k].rent), backgroundColor: ['#ffcc80','#ce93d8','#80deea','#ef9a9a','#4fc3f7'], borderRadius: 4 }], { horizontal: true, tFmt: v => '₩' + v.toLocaleString() });
    const nKeys = Object.keys(DATA.nationality);
    this._bar('ins-rn', nKeys, [{ label: '평균 임대료', data: nKeys.map(k => DATA.nationality[k].rent), backgroundColor: ['#a5d6a7','#4fc3f7','#ffcc80'], borderRadius: 4 }], { tFmt: v => '₩' + v.toLocaleString() });
    const gKeys = Object.keys(DATA.gender);
    this._bar('ins-rg', gKeys, [{ label: '평균 임대료', data: gKeys.map(k => DATA.gender[k].rent), backgroundColor: ['#4fc3f7','#f48fb1','#ffcc80'], borderRadius: 4 }], { tFmt: v => '₩' + v.toLocaleString() });
    const aKeys = Object.keys(DATA.age);
    this._bar('ins-ra', aKeys, [{ label: '평균 임대료', data: aKeys.map(k => DATA.age[k].rent), backgroundColor: ['#80deea','#ce93d8','#4fc3f7','#a5d6a7','#ffcc80'], borderRadius: 4 }], { tFmt: v => '₩' + v.toLocaleString() });

    // Duration bars
    this._bar('ins-dj', jKeys, [{ label: '평균 계약기간(월)', data: jKeys.map(k => DATA.job[k].dur), backgroundColor: ['#ffcc80','#ce93d8','#80deea','#ef9a9a','#4fc3f7'], borderRadius: 4 }], { horizontal: true, tFmt: v => v + '개월' });
    this._bar('ins-dn', nKeys, [{ label: '평균 계약기간(월)', data: nKeys.map(k => DATA.nationality[k].dur), backgroundColor: ['#a5d6a7','#4fc3f7','#ffcc80'], borderRadius: 4 }], { tFmt: v => v + '개월' });
    this._bar('ins-dg', gKeys, [{ label: '평균 계약기간(월)', data: gKeys.map(k => DATA.gender[k].dur), backgroundColor: ['#4fc3f7','#f48fb1','#ffcc80'], borderRadius: 4 }], { tFmt: v => v + '개월' });

    // LTV
    const cKeys = Object.keys(DATA.contract);
    this._bar('ins-ltv', cKeys, [{ label: '추정 LTV', data: cKeys.map(k => DATA.contract[k].revenue), backgroundColor: ['#60a5fa','#34d399','#818cf8'], borderRadius: 4 }], { tFmt: v => '₩' + this._fmt(v) });

    // Total revenue
    const allSegs = ['직장인','학생/학교','기타','교육/훈련','이사/인테리어'];
    this._bar('ins-totrev', allSegs, [{ label: '건당 추정매출', data: allSegs.map(k => DATA.job[k]?.revenue || 0), backgroundColor: ['#ffcc80','#ce93d8','#ef9a9a','#80deea','#4fc3f7'], borderRadius: 4 }], { horizontal: true, tFmt: v => '₩' + this._fmt(v) });

    // Branch monthly revenue
    this._bar('ins-brm', bKeys, [
      { label: '현재 월매출 추정', data: bKeys.map(k => bd[k].occ * bd[k].rent), backgroundColor: COLORS, borderRadius: 4 },
      { label: '공실 포함 잠재 월매출', data: bKeys.map(k => (bd[k].occ + bd[k].vac) * bd[k].rent), backgroundColor: COLORS.map(c => c + '44'), borderRadius: 4 }
    ], { yFmt: v => '₩' + this._fmt(v), tFmt: v => '₩' + this._fmt(v) });

    // Simulator
    const simIds = ['sim-total','sim-occ','sim-rent','sim-dur','sim-renew','sim-renew-ext'];
    simIds.forEach(id => this.el.querySelector('#' + id).addEventListener('input', () => this._calcSim()));
    this._calcSim();

    // Insight cards
    const cards = [
      { type:'positive', tag:'기회', title:'직장인 고객이 LTV 최고 — 타깃 마케팅 강화', body:'직장인 고객의 건당 추정 매출은 <strong style="color:#ffcc80">₩12.7M</strong>으로 학생(₩10.4M) 대비 22% 높습니다. 직장인 비율이 높은 지점에서 리텐션 프로그램을 우선 운영하세요.', metric:'₩12.7M', metricColor:'#ffcc80', metricLabel:'직장인 1건 추정 LTV' },
      { type:'action',   tag:'액션', title:'재계약 고객은 기간이 길다 — 재계약 유인 강화', body:'2회차 재계약 시 <strong style="color:#34d399">₩20.5M</strong>으로 LTV가 2배 이상 증가합니다. 중기 재계약 특약·할인 등으로 연장을 유도하세요.', metric:'+110%', metricColor:'#34d399', metricLabel:'2회 재계약 시 LTV 증가율' },
      { type:'warning',  tag:'주의', title:'회기·안암 입주대기 수요가 공실을 초과', body:'회기 지점은 <strong style="color:#fbbf24">입주대기 26호</strong>, 안암도 19호 입주대기로 수요 초과 상태. 호실 확장 시 월 최대 <strong style="color:#fbbf24">₩59M</strong> 추가 매출 가능.', metric:'45명', metricColor:'#fbbf24', metricLabel:'회기+안암 초과 대기수요' },
      { type:'risk',     tag:'리스크', title:'망원·원효로 공실율 높음', body:'망원 6호 공실, 합산 <strong style="color:#f87171">월 기회비용 약 ₩5.6M</strong>. 단기 임대·SNS 타겟 광고 등 즉각적인 공실 해소 전략이 필요합니다.', metric:'₩5.6M', metricColor:'#f87171', metricLabel:'공실 기회비용/월' },
      { type:'action',   tag:'액션', title:'여성·40대 고객이 임대료 단가 높음', body:'여성 고객의 평균 임대료는 <strong style="color:#f48fb1">₩1.25M</strong>으로 남성 대비 5% 높고, 40대 고객이 연령대 중 최고 단가.', metric:'₩1.25M', metricColor:'#f48fb1', metricLabel:'여성 고객 평균 임대료' },
      { type:'positive', tag:'기회', title:'법인 고객은 12개월 장기계약 — 안정 매출원', body:'법인 고객의 평균 계약기간은 <strong style="color:#a5d6a7">12개월</strong>로 전체 평균(9.3개월) 대비 29% 길어 매출 안정성이 높음. B2B 영업을 검토하세요.', metric:'12개월', metricColor:'#a5d6a7', metricLabel:'법인 평균 계약기간' }
    ];
    this.el.querySelector('#ins-cards').innerHTML = cards.map(c => `
      <div class="cb-insight ${c.type}">
        <div><span class="cb-insight-tag cb-tag-${c.type}">${c.tag}</span></div>
        <div class="cb-insight-title">${c.title}</div>
        <div class="cb-insight-metric" style="color:${c.metricColor};font-family:'Space Mono',monospace;">${c.metric}
          <span style="font-size:12px;color:var(--cb-muted);font-family:'Pretendard',sans-serif;font-weight:400;"> ${c.metricLabel}</span>
        </div>
        <div class="cb-insight-body">${c.body}</div>
      </div>
    `).join('');
  },

  _calcSim() {
    const get = id => parseFloat(this.el.querySelector('#' + id).value);
    const total = get('sim-total') || 457;
    const occ = (get('sim-occ') || 61) / 100;
    const rent = get('sim-rent') || 1200000;
    const dur = get('sim-dur') || 9.5;
    const renew = (get('sim-renew') || 26) / 100;
    const renewExt = get('sim-renew-ext') || 6;

    const occupants = Math.round(total * occ);
    const monthly = occupants * rent;
    const annual = monthly * 12;
    const effDur = dur * (1 + renew * (renewExt / dur));
    const ltv = rent * effDur;
    const turnover = occupants * (1 - renew) * rent;

    this.el.querySelector('#sim-result').innerHTML = `
      <div class="cb-sim-result"><div class="cb-sim-result-val" style="color:#4fc3f7">${occupants}명</div><div class="cb-sim-result-lbl">현재 입주자 수</div></div>
      <div class="cb-sim-result"><div class="cb-sim-result-val" style="color:#4ade80">₩${this._fmt(monthly)}</div><div class="cb-sim-result-lbl">월 임대료 수입</div></div>
      <div class="cb-sim-result"><div class="cb-sim-result-val" style="color:#f59e0b">₩${this._fmt(annual)}</div><div class="cb-sim-result-lbl">연간 임대료 추정</div></div>
      <div class="cb-sim-result"><div class="cb-sim-result-val" style="color:#ce93d8">₩${this._fmt(ltv)}</div><div class="cb-sim-result-lbl">입주자 1인당 LTV</div></div>
      <div class="cb-sim-result"><div class="cb-sim-result-val" style="color:#ef9a9a">₩${this._fmt(turnover)}</div><div class="cb-sim-result-lbl">연간 이탈 기회비용</div></div>
      <div class="cb-sim-result"><div class="cb-sim-result-val" style="color:#a5d6a7">${effDur.toFixed(1)}개월</div><div class="cb-sim-result-lbl">재계약 반영 유효 기간</div></div>
    `;

    const s1 = annual;
    const s2 = Math.round(total * Math.min(occ + 0.1, 1)) * rent * 12;
    const s3 = occupants * rent * (dur * (1 + (renew + 0.1) * (renewExt / dur))) * 12 / dur;
    const s4 = occupants * (rent * 1.05) * 12;
    const s5 = Math.round(total * Math.min(occ + 0.1, 1)) * (rent * 1.05) * (dur * (1 + (renew + 0.1) * (renewExt / dur))) * 12 / dur;

    const ctx = this.el.querySelector('#sim-scenario'); if (!ctx) return;
    if (this._simScenarioChart) this._simScenarioChart.destroy();
    const self = this;
    this._simScenarioChart = new Chart(ctx, {
      type: 'bar',
      data: { labels: ['현재','공실10%↓','재계약율+10%','임대료+5%','복합 최적화'], datasets: [{ label: '연간 추정매출', data: [s1,s2,s3,s4,s5], backgroundColor: ['#4a5568','#4fc3f7','#34d399','#f48fb1','#f59e0b'], borderRadius: 6 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: { x: { ticks: { color: '#64748b', font: { size: 12 } }, grid: { color: '#fff' } }, y: { ticks: { color: '#64748b', font: { size: 12 }, callback: v => '₩' + self._fmt(v) }, grid: { color: '#fff' } } },
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#fff', borderColor: '#e2e8f0', borderWidth: 1, titleColor: '#0f172a', bodyColor: '#64748b', callbacks: { label: c => ` 연간매출: ₩${self._fmt(c.raw)}` } }, datalabels: { display: false } }
      }
    });
  }
});
