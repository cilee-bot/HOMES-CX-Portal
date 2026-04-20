/* HOMES CX Portal — CX Dashboard Module (고객 성과·건강도·활동·계약 현황) */
HomesApp.register('dashboard', {
  init(container) {
    this.el = container;
    this._injectStyles();
    this.render();
  },
  onShow() { this.render(); },

  _injectStyles() {
    if (document.getElementById('cx-dashboard-styles')) return;
    const style = document.createElement('style');
    style.id = 'cx-dashboard-styles';
    style.textContent = `
      .mod-dashboard {
        --d-bg:#ffffff; --d-sidebar:#f8fafc; --d-card:#ffffff; --d-border:#e2e8f0;
        --d-text:#0f172a; --d-text2:#475569; --d-muted:#94a3b8;
        --d-blue:#3b82f6; --d-blue-bg:#eff6ff;
        --d-green:#10b981; --d-green-bg:#ecfdf5;
        --d-red:#ef4444;   --d-red-bg:#fef2f2;
        --d-amber:#f59e0b; --d-amber-bg:#fffbeb;
        --d-purple:#8b5cf6; --d-purple-bg:#f5f3ff;
        --d-shadow-sm:0 1px 2px rgba(0,0,0,0.04);
        --d-shadow-md:0 2px 8px rgba(0,0,0,0.06);
        --d-radius:10px;
        color: var(--d-text);
      }
      .mod-dashboard .dp-header { margin-bottom:24px; }
      .mod-dashboard .dp-header-row { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
      .mod-dashboard .dp-header h2 { font-size:22px; font-weight:700; color:var(--d-text); letter-spacing:-0.5px; line-height:1.3; }
      .mod-dashboard .dp-header p { font-size:13px; color:var(--d-muted); margin-top:4px; }
      .mod-dashboard .dp-period { display:flex; gap:4px; background:var(--d-sidebar); padding:3px; border-radius:8px; border:1px solid var(--d-border); }
      .mod-dashboard .dp-period-btn { padding:5px 12px; font-size:12px; font-weight:500; border:none; background:none; border-radius:6px; cursor:pointer; color:var(--d-text2); transition:all .15s; }
      .mod-dashboard .dp-period-btn.active { background:#fff; color:var(--d-text); box-shadow:var(--d-shadow-sm); }
      .mod-dashboard .dp-section { margin-bottom:28px; }
      .mod-dashboard .dp-section-header { display:flex; align-items:center; gap:8px; margin-bottom:14px; }
      .mod-dashboard .dp-section-num { width:22px; height:22px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; }
      .mod-dashboard .dp-section-title { font-size:14px; font-weight:600; color:var(--d-text); }
      .mod-dashboard .dp-section-sub { font-size:12px; color:var(--d-muted); margin-left:auto; }
      .mod-dashboard .dp-row { display:grid; gap:14px; }
      .mod-dashboard .dp-row.c2 { grid-template-columns:repeat(2,1fr); }
      .mod-dashboard .dp-row.c3 { grid-template-columns:repeat(3,1fr); }
      .mod-dashboard .dp-row.c4 { grid-template-columns:repeat(4,1fr); }
      .mod-dashboard .dp-card { background:var(--d-card); border:1px solid var(--d-border); border-radius:var(--d-radius); padding:20px; box-shadow:var(--d-shadow-sm); transition:box-shadow .2s; }
      .mod-dashboard .dp-card:hover { box-shadow:var(--d-shadow-md); }
      .mod-dashboard .dp-label { font-size:12px; color:var(--d-muted); font-weight:500; margin-bottom:8px; }
      .mod-dashboard .dp-value { font-size:28px; font-weight:700; letter-spacing:-1px; line-height:1; color:var(--d-text); }
      .mod-dashboard .dp-meta { display:flex; align-items:center; gap:6px; margin-top:8px; font-size:12px; }
      .mod-dashboard .dp-up { color:var(--d-green); font-weight:600; }
      .mod-dashboard .dp-down { color:var(--d-red); font-weight:600; }
      .mod-dashboard .dp-flat { color:var(--d-muted); font-weight:600; }
      .mod-dashboard .dp-meta span:last-child { color:var(--d-muted); }
      .mod-dashboard .dp-big { text-align:center; padding:28px 20px; }
      .mod-dashboard .dp-big .dp-value { font-size:40px; }
      .mod-dashboard .dp-big .dp-label { font-size:13px; font-weight:600; margin-bottom:12px; }
      .mod-dashboard .dp-ring { position:relative; width:100px; height:100px; margin:0 auto 14px; }
      .mod-dashboard .dp-ring svg { transform:rotate(-90deg); }
      .mod-dashboard .dp-ring-val { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:22px; font-weight:700; }
      .mod-dashboard .dp-mini { margin-top:16px; }
      .mod-dashboard .dp-bar-row { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
      .mod-dashboard .dp-bar-label { font-size:11px; color:var(--d-text2); width:60px; flex-shrink:0; text-align:right; }
      .mod-dashboard .dp-bar-track { flex:1; height:6px; background:#f1f5f9; border-radius:3px; overflow:hidden; }
      .mod-dashboard .dp-bar-fill { height:100%; border-radius:3px; transition:width .6s ease; }
      .mod-dashboard .dp-bar-val { font-size:11px; font-weight:600; color:var(--d-text); width:42px; text-align:right; }
      .mod-dashboard .dp-risk-table { width:100%; border-collapse:collapse; }
      .mod-dashboard .dp-risk-table th { font-size:11px; font-weight:600; color:var(--d-muted); text-align:left; padding:8px 12px; border-bottom:1px solid var(--d-border); text-transform:uppercase; letter-spacing:.5px; }
      .mod-dashboard .dp-risk-table td { font-size:13px; padding:10px 12px; border-bottom:1px solid #f1f5f9; color:var(--d-text2); }
      .mod-dashboard .dp-risk-table tr:last-child td { border-bottom:none; }
      .mod-dashboard .dp-risk-table .dp-name { font-weight:600; color:var(--d-text); }
      .mod-dashboard .dp-tag { display:inline-block; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600; }
      .mod-dashboard .dp-tag-red { background:var(--d-red-bg); color:var(--d-red); }
      .mod-dashboard .dp-tag-amber { background:var(--d-amber-bg); color:var(--d-amber); }
      .mod-dashboard .dp-tag-green { background:var(--d-green-bg); color:var(--d-green); }
      .mod-dashboard .dp-tag-blue { background:var(--d-blue-bg); color:var(--d-blue); }
      .mod-dashboard .dp-tag-purple { background:var(--d-purple-bg); color:var(--d-purple); }
      .mod-dashboard .dp-nps-break { display:flex; align-items:center; gap:16px; margin-top:14px; justify-content:center; }
      .mod-dashboard .dp-nps-legend { display:flex; flex-direction:column; gap:6px; }
      .mod-dashboard .dp-nps-item { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--d-text2); }
      .mod-dashboard .dp-nps-dot { width:8px; height:8px; border-radius:2px; }
      .mod-dashboard .dp-act { display:flex; align-items:center; gap:14px; }
      .mod-dashboard .dp-act-ico { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
      .mod-dashboard .dp-act .dp-value { font-size:22px; }
      .mod-dashboard .dp-spark { margin-top:12px; display:flex; align-items:end; gap:3px; height:36px; }
      .mod-dashboard .dp-spark-bar { flex:1; border-radius:2px; min-height:3px; transition:height .4s ease; }
      .mod-dashboard .dp-tl { display:flex; gap:4px; margin-top:12px; }
      .mod-dashboard .dp-tl-block { flex:1; height:28px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:600; color:#fff; }
      .mod-dashboard .dp-month-lbl { display:flex; gap:4px; margin-top:4px; }
      .mod-dashboard .dp-month-lbl span { flex:1; text-align:center; font-size:10px; color:var(--d-muted); }
      @media (max-width:900px) {
        .mod-dashboard .dp-row.c3, .mod-dashboard .dp-row.c4 { grid-template-columns:repeat(2,1fr); }
      }
      @media (max-width:600px) {
        .mod-dashboard .dp-row.c2, .mod-dashboard .dp-row.c3, .mod-dashboard .dp-row.c4 { grid-template-columns:1fr; }
      }
    `;
    document.head.appendChild(style);
  },

  async render() {
    // Load Supabase VOC data for live KPI overrides (optional)
    const SB = HomesSB.get();
    let vocCount = 87, urgCount = 12;
    if (SB) {
      try {
        const { data: vocData } = await SB.from('voc').select('중요도,처리상태').limit(500);
        if (vocData && vocData.length) {
          vocCount = vocData.length;
          urgCount = vocData.filter(v => v.중요도 === '긴급' && v.처리상태 !== '완료').length;
        }
      } catch {}
    }

    this.el.innerHTML = `
      <div class="mod-dashboard">

        <div class="dp-header">
          <div class="dp-header-row">
            <div>
              <h2>CX 대시보드</h2>
              <p>고객 성과 → 건강도 → CX 활동 → 계약 현황</p>
            </div>
            <div class="dp-period">
              <button class="dp-period-btn">주간</button>
              <button class="dp-period-btn active">월간</button>
              <button class="dp-period-btn">분기</button>
            </div>
          </div>
        </div>

        <!-- Section 1: Outcome -->
        <div class="dp-section">
          <div class="dp-section-header">
            <div class="dp-section-num" style="background:var(--d-blue)">1</div>
            <div class="dp-section-title">고객 성과 (Outcome)</div>
            <div class="dp-section-sub">CX 활동의 최종 목표 지표</div>
          </div>
          <div class="dp-row c3">
            <div class="dp-card dp-big">
              <div class="dp-label">재계약율 (Retention)</div>
              <div class="dp-ring">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" stroke-width="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="8"
                    stroke-dasharray="251.3" stroke-dashoffset="47.5" stroke-linecap="round"/>
                </svg>
                <div class="dp-ring-val" style="color:var(--d-blue)">81%</div>
              </div>
              <div class="dp-meta" style="justify-content:center"><span class="dp-up">▲ 3.2%</span><span>vs 전월</span></div>
            </div>

            <div class="dp-card dp-big">
              <div class="dp-label">NPS</div>
              <div class="dp-value" style="color:var(--d-green); font-size:44px; margin-bottom:8px">+42</div>
              <div class="dp-meta" style="justify-content:center"><span class="dp-up">▲ 5p</span><span>vs 전월</span></div>
              <div class="dp-nps-break">
                <div class="dp-nps-legend">
                  <div class="dp-nps-item"><div class="dp-nps-dot" style="background:var(--d-green)"></div>추천 62%</div>
                  <div class="dp-nps-item"><div class="dp-nps-dot" style="background:var(--d-amber)"></div>중립 18%</div>
                  <div class="dp-nps-item"><div class="dp-nps-dot" style="background:var(--d-red)"></div>비추천 20%</div>
                </div>
              </div>
            </div>

            <div class="dp-card dp-big">
              <div class="dp-label">입주 만족도 (CSAT)</div>
              <div class="dp-ring">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" stroke-width="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="8"
                    stroke-dasharray="251.3" stroke-dashoffset="62.8" stroke-linecap="round"/>
                </svg>
                <div class="dp-ring-val" style="color:var(--d-green)">4.2</div>
              </div>
              <div class="dp-meta" style="justify-content:center"><span class="dp-up">▲ 0.3</span><span>vs 전월 (5점 만점)</span></div>
            </div>
          </div>

          <div class="dp-card" style="margin-top:14px">
            <div class="dp-label" style="margin-bottom:12px">지점별 재계약율</div>
            <div class="dp-mini">
              ${this._bar('선정릉', 92, 'var(--d-blue)')}
              ${this._bar('남영',   85, 'var(--d-blue)')}
              ${this._bar('회기',   80, 'var(--d-blue)')}
              ${this._bar('안암',   76, 'var(--d-blue)')}
              ${this._bar('가산',   72, 'var(--d-amber)')}
              ${this._bar('Japan',  68, 'var(--d-amber)')}
            </div>
          </div>
        </div>

        <!-- Section 2: Health -->
        <div class="dp-section">
          <div class="dp-section-header">
            <div class="dp-section-num" style="background:var(--d-amber)">2</div>
            <div class="dp-section-title">고객 건강도 (Health)</div>
            <div class="dp-section-sub">조기 개입이 필요한 시그널</div>
          </div>
          <div class="dp-row c4">
            ${this._healthCard('⚠️','var(--d-red-bg)','var(--d-red)','이탈위험 고객','12','▲ 3명','vs 전월','down')}
            ${this._healthCard('📅','var(--d-amber-bg)','var(--d-amber)','계약만료 임박 (30일)','28','-','갱신 컨택 필요','flat')}
            ${this._healthCard('🔁','var(--d-purple-bg)','var(--d-purple)','VOC 반복 고객','7','▲ 2명','3회 이상','down')}
            ${this._healthCard('✅','var(--d-green-bg)','var(--d-green)','온보딩 미완료','5','▼ 2명','vs 전월','up')}
          </div>

          <div class="dp-card" style="margin-top:14px">
            <div class="dp-label" style="margin-bottom:12px">이탈위험 고객 Top 5</div>
            <table class="dp-risk-table">
              <thead><tr>
                <th>고객명</th><th>지점</th><th>위험 요인</th><th>위험도</th><th>잔여 계약</th><th>담당자</th>
              </tr></thead>
              <tbody>
                ${this._riskRow('김○○','가산','VOC 4회 + 미응답','red','Critical','14일','박지은')}
                ${this._riskRow('이○○','남영','시설 불만 반복','red','Critical','21일','최수현')}
                ${this._riskRow('정○○','회기','결제 지연 2회','amber','High','35일','김하나')}
                ${this._riskRow('Tanaka','Japan','커뮤니케이션 단절','amber','High','28일','송조')}
                ${this._riskRow('최○○','선정릉','소음 민원 2회','amber','High','42일','박지은')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 3: Activity -->
        <div class="dp-section">
          <div class="dp-section-header">
            <div class="dp-section-num" style="background:var(--d-green)">3</div>
            <div class="dp-section-title">CX 활동 (Activity)</div>
            <div class="dp-section-sub">팀 운영 효율 지표</div>
          </div>
          <div class="dp-row c4">
            <div class="dp-card">
              <div class="dp-label">VOC 접수</div>
              <div class="dp-value">${vocCount}<span style="font-size:14px;color:var(--d-muted);font-weight:400">건</span></div>
              ${this._sparkline([40,55,70,50,65,45,80,75,60,90,70,100], ['#bfdbfe','#bfdbfe','#93c5fd','#bfdbfe','#93c5fd','#bfdbfe','#60a5fa','#60a5fa','#93c5fd','#3b82f6','#93c5fd','#3b82f6'])}
              <div class="dp-meta"><span class="dp-down">▲ 12%</span><span>vs 전월</span></div>
            </div>
            <div class="dp-card">
              <div class="dp-label">VOC 처리율</div>
              <div class="dp-value" style="color:var(--d-green)">94%</div>
              ${this._sparkline([85,88,82,90,92,87,95,89,91,93,94,94], ['#bbf7d0','#86efac','#bbf7d0','#86efac','#4ade80','#86efac','#4ade80','#86efac','#4ade80','#4ade80','#22c55e','#22c55e'])}
              <div class="dp-meta"><span class="dp-up">▲ 2%p</span><span>vs 전월</span></div>
            </div>
            <div class="dp-card">
              <div class="dp-label">평균 응답시간</div>
              <div class="dp-value">2.4<span style="font-size:14px;color:var(--d-muted);font-weight:400">시간</span></div>
              ${this._sparkline([90,80,70,65,75,60,55,50,45,48,42,40], ['#fde68a','#fde68a','#fcd34d','#bbf7d0','#fde68a','#bbf7d0','#bbf7d0','#86efac','#86efac','#86efac','#4ade80','#4ade80'])}
              <div class="dp-meta"><span class="dp-up">▼ 0.8h</span><span>vs 전월 (개선)</span></div>
            </div>
            <div class="dp-card">
              <div class="dp-label">설문 회수율</div>
              <div class="dp-value">67%</div>
              ${this._sparkline([50,55,52,58,60,55,62,58,64,60,65,67], ['#c4b5fd','#c4b5fd','#c4b5fd','#a78bfa','#a78bfa','#c4b5fd','#a78bfa','#a78bfa','#8b5cf6','#a78bfa','#8b5cf6','#8b5cf6'])}
              <div class="dp-meta"><span class="dp-up">▲ 5%p</span><span>vs 전월</span></div>
            </div>
          </div>

          <div class="dp-row c2" style="margin-top:14px">
            <div class="dp-card">
              <div class="dp-label" style="margin-bottom:12px">VOC 카테고리 분포</div>
              <div class="dp-mini">
                ${this._bar('시설/하자', 38, 'var(--d-red)',   '38%')}
                ${this._bar('소음',     22, 'var(--d-amber)', '22%')}
                ${this._bar('계약/결제', 18, 'var(--d-blue)',  '18%')}
                ${this._bar('입주/퇴실', 12, 'var(--d-purple)','12%')}
                ${this._bar('기타',     10, 'var(--d-muted)', '10%')}
              </div>
            </div>
            <div class="dp-card">
              <div class="dp-label" style="margin-bottom:12px">지점별 VOC 건수</div>
              <div class="dp-mini">
                ${this._bar('가산',   100, 'var(--d-red)',   '24건')}
                ${this._bar('남영',    75, 'var(--d-amber)', '18건')}
                ${this._bar('회기',    63, 'var(--d-blue)',  '15건')}
                ${this._bar('안암',    50, 'var(--d-blue)',  '12건')}
                ${this._bar('선정릉',  42, 'var(--d-green)', '10건')}
                ${this._bar('Japan',   33, 'var(--d-green)',  '8건')}
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Pipeline -->
        <div class="dp-section">
          <div class="dp-section-header">
            <div class="dp-section-num" style="background:var(--d-purple)">4</div>
            <div class="dp-section-title">계약 현황 (Pipeline)</div>
            <div class="dp-section-sub">후행 지표 — 성과의 결과</div>
          </div>
          <div class="dp-row c4">
            <div class="dp-card">
              <div class="dp-label">전체 입주자</div>
              <div class="dp-value">342<span style="font-size:14px;color:var(--d-muted);font-weight:400">명</span></div>
              <div class="dp-meta"><span class="dp-up">▲ 8명</span><span>vs 전월</span></div>
            </div>
            <div class="dp-card">
              <div class="dp-label">신규 계약</div>
              <div class="dp-value" style="color:var(--d-blue)">18<span style="font-size:14px;color:var(--d-muted);font-weight:400">건</span></div>
              <div class="dp-meta"><span class="dp-up">▲ 3건</span><span>vs 전월</span></div>
            </div>
            <div class="dp-card">
              <div class="dp-label">갱신 완료</div>
              <div class="dp-value" style="color:var(--d-green)">23<span style="font-size:14px;color:var(--d-muted);font-weight:400">건</span></div>
              <div class="dp-meta"><span class="dp-up">▲ 5건</span><span>vs 전월</span></div>
            </div>
            <div class="dp-card">
              <div class="dp-label">해지</div>
              <div class="dp-value" style="color:var(--d-red)">6<span style="font-size:14px;color:var(--d-muted);font-weight:400">건</span></div>
              <div class="dp-meta"><span class="dp-up">▼ 2건</span><span>vs 전월</span></div>
            </div>
          </div>

          <div class="dp-card" style="margin-top:14px">
            <div class="dp-label" style="margin-bottom:12px">월별 계약 현황 (최근 6개월)</div>
            <div class="dp-tl">
              <div class="dp-tl-block" style="background:var(--d-blue);opacity:.6">14</div>
              <div class="dp-tl-block" style="background:var(--d-blue);opacity:.7">16</div>
              <div class="dp-tl-block" style="background:var(--d-blue);opacity:.75">15</div>
              <div class="dp-tl-block" style="background:var(--d-blue);opacity:.8">19</div>
              <div class="dp-tl-block" style="background:var(--d-blue);opacity:.9">15</div>
              <div class="dp-tl-block" style="background:var(--d-blue)">18</div>
            </div>
            <div class="dp-month-lbl">
              <span>11월</span><span>12월</span><span>1월</span><span>2월</span><span>3월</span><span>4월</span>
            </div>
            <div class="dp-tl" style="margin-top:8px">
              <div class="dp-tl-block" style="background:var(--d-red);opacity:.6">9</div>
              <div class="dp-tl-block" style="background:var(--d-red);opacity:.7">11</div>
              <div class="dp-tl-block" style="background:var(--d-red);opacity:.8">8</div>
              <div class="dp-tl-block" style="background:var(--d-red);opacity:.7">10</div>
              <div class="dp-tl-block" style="background:var(--d-red);opacity:.9">8</div>
              <div class="dp-tl-block" style="background:var(--d-red)">6</div>
            </div>
            <div class="dp-month-lbl">
              <span style="color:var(--d-blue)">● 신규</span>
              <span></span><span></span><span></span><span></span>
              <span style="color:var(--d-red)">● 해지</span>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  _bar(label, pct, color, valText) {
    return `<div class="dp-bar-row">
      <span class="dp-bar-label">${label}</span>
      <div class="dp-bar-track"><div class="dp-bar-fill" style="width:${pct}%;background:${color}"></div></div>
      <span class="dp-bar-val">${valText || pct + '%'}</span>
    </div>`;
  },

  _healthCard(icon, bg, color, label, val, deltaText, metaText, trend) {
    const trendClass = trend === 'up' ? 'dp-up' : trend === 'down' ? 'dp-down' : 'dp-flat';
    return `<div class="dp-card">
      <div class="dp-act">
        <div class="dp-act-ico" style="background:${bg};color:${color}">${icon}</div>
        <div>
          <div class="dp-label">${label}</div>
          <div class="dp-value">${val}</div>
        </div>
      </div>
      <div class="dp-meta"><span class="${trendClass}">${deltaText}</span><span>${metaText}</span></div>
    </div>`;
  },

  _riskRow(name, loc, reason, tagColor, tagText, remain, owner) {
    return `<tr>
      <td class="dp-name">${name}</td>
      <td>${loc}</td>
      <td>${reason}</td>
      <td><span class="dp-tag dp-tag-${tagColor}">${tagText}</span></td>
      <td>${remain}</td>
      <td>${owner}</td>
    </tr>`;
  },

  _sparkline(heights, colors) {
    return `<div class="dp-spark">
      ${heights.map((h, i) => `<div class="dp-spark-bar" style="height:${h}%;background:${colors[i]}"></div>`).join('')}
    </div>`;
  }
});
