/* HOMES CX Portal — VOC Module (기존 voc-dashboard 기능 100% 이식) */
const VocMod = {
  DATA: [],
  CH: {},

  async loadData() {
    const SB = HomesSB.get();
    if (SB) {
      const { data, error } = await SB.from('voc').select('*').order('접수일', { ascending: false });
      if (!error && data) { this.DATA = data; return; }
    }
    this.DATA = JSON.parse(localStorage.getItem('voc_data') || '[]');
  },

  async persist() {
    if (!HomesSB.isConnected()) localStorage.setItem('voc_data', JSON.stringify(this.DATA));
  },

  weekStart(d) {
    const dt = new Date(d); const day = dt.getDay();
    dt.setDate(dt.getDate() - day + (day === 0 ? -6 : 1));
    dt.setHours(0,0,0,0); return dt;
  },

  weekRows(ago) {
    const ws = this.weekStart(new Date()); ws.setDate(ws.getDate() - ago * 7);
    const we = new Date(ws); we.setDate(we.getDate() + 7);
    return this.DATA.filter(r => { if (!r.접수일) return false; const d = new Date(r.접수일); return d >= ws && d < we; });
  },

  exportCSV() {
    const cols = ['접수일','지점','호실','문의자','접수경로','대분류','소분류','상세내용','중요도','처리상태','대응내용','대응자','완료일'];
    const rows = this.DATA.map(r => cols.map(c => `"${(r[c]||'').toString().replace(/"/g,'""')}"`).join(','));
    const csv = '\uFEFF' + [cols.join(','), ...rows].join('\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})), download: `VOC_${HomesApp.today()}.csv` });
    a.click();
  },

  async loadSamples() {
    if (!confirm('샘플 데이터 8건을 추가하시겠습니까?')) return;
    const s = [
      { id:'s1', 접수일:'2026-03-17', 지점:'선정릉', 호실:'702', 문의자:'길상유학', 접수경로:'카카오채널', 대분류:'시설', 소분류:'누수', 상세내용:'702호 천정에서 누수 발생', 중요도:'긴급', 처리상태:'완료', 대응내용:'누수업체 출동 완료', 대응자:'송현준' },
      { id:'s2', 접수일:'2026-03-17', 지점:'남영', 호실:'1005', 문의자:'이정희', 접수경로:'카카오채널', 대분류:'시설', 소분류:'변기', 상세내용:'변기가 막힌 듯 물이 안 내려감', 중요도:'하', 처리상태:'완료', 대응내용:'사용법 안내', 대응자:'신예진' },
      { id:'s3', 접수일:'2026-03-18', 지점:'망원', 호실:'601', 문의자:'이주영', 접수경로:'카카오채널', 대분류:'시설', 소분류:'보일러', 상세내용:'한파 중 보일러 19도 이상 안 올라감', 중요도:'상', 처리상태:'완료', 대응내용:'보일러 기사 연락처 전달', 대응자:'신예진' },
      { id:'s4', 접수일:'2026-03-18', 지점:'선정릉', 호실:'1102', 문의자:'서지원', 접수경로:'유선', 대분류:'계약', 소분류:'연장', 상세내용:'연장 시 인상 임대료 문의', 중요도:'중', 처리상태:'진행중', 대응내용:'', 대응자:'' },
      { id:'s5', 접수일:'2026-03-19', 지점:'회기', 호실:'305', 문의자:'김철수', 접수경로:'방문', 대분류:'시설', 소분류:'안면인식', 상세내용:'안면인식 등록 후 인식 실패 반복', 중요도:'중', 처리상태:'진행중', 대응내용:'', 대응자:'' },
      { id:'s6', 접수일:'2026-03-19', 지점:'가산', 호실:'201', 문의자:'박영희', 접수경로:'카카오채널', 대분류:'생활문의', 소분류:'소음', 상세내용:'옆 호실 야간 소음 민원', 중요도:'중', 처리상태:'진행중', 대응내용:'', 대응자:'' },
      { id:'s7', 접수일:'2026-03-19', 지점:'선정릉', 호실:'903', 문의자:'Mozes Mooney', 접수경로:'유선', 대분류:'계약', 소분류:'연장', 상세내용:'계약 연장 의향 문의', 중요도:'중', 처리상태:'진행중', 대응내용:'연장 진행 중', 대응자:'은영' },
      { id:'s8', 접수일:'2026-03-20', 지점:'남영', 호실:'502', 문의자:'최지영', 접수경로:'카카오채널', 대분류:'퇴실', 소분류:'보증금', 상세내용:'보증금 반환 계좌 변경 요청', 중요도:'하', 처리상태:'완료', 대응내용:'변경 계좌로 처리 완료', 대응자:'신예진' },
    ];
    const existing = JSON.parse(localStorage.getItem('voc_data')||'[]');
    localStorage.setItem('voc_data', JSON.stringify([...s, ...existing]));
    await this.loadData(); this.renderAll();
    HomesApp.toast('샘플 데이터 추가 완료');
  }
};

HomesApp.register('voc', {
  currentTab: 'dash',

  async init(container) {
    this.el = container;
    await VocMod.loadData();
    this.buildHTML();
    this.renderAll();
    HomesApp.on('voc:updated', async () => { await VocMod.loadData(); this.renderAll(); });
    HomesApp.on('sb:connected', async () => { await VocMod.loadData(); this.renderAll(); });
  },

  onShow(sub) {
    if (sub) this.switchTab(sub);
    this.renderAll();
  },

  switchTab(tab) {
    this.currentTab = tab || 'dash';
    this.el.querySelectorAll('.voc-view').forEach(el => el.style.display = 'none');
    const target = this.el.querySelector(`#voc-${this.currentTab}`);
    if (target) { target.style.display = 'block'; target.classList.add('fade'); }
    this.el.querySelectorAll('.voc-tab').forEach(b => b.classList.remove('badge-blue'));
    const btn = this.el.querySelector(`[data-voc-tab="${this.currentTab}"]`);
    if (btn) btn.classList.add('badge-blue');
  },

  renderAll() {
    this.renderDash();
    this.renderList();
    this.renderReport();
  },

  buildHTML() {
    const locs = '<option value="">선택</option><option>선정릉</option><option>남영</option><option>망원</option><option>가산</option><option>회기</option><option>원효로</option><option>안암</option>';
    this.el.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <div>
          <div class="page-title">VOC 관리</div>
          <div class="page-desc">고객 문의 접수 및 처리 현황</div>
        </div>
        <div style="display:flex;gap:4px">
          <button class="voc-tab badge badge-blue" data-voc-tab="dash" onclick="HomesApp.navigate('voc','dash')" style="cursor:pointer;padding:6px 12px">대시보드</button>
          <button class="voc-tab badge badge-gray" data-voc-tab="input" onclick="HomesApp.navigate('voc','input')" style="cursor:pointer;padding:6px 12px">VOC 입력</button>
          <button class="voc-tab badge badge-gray" data-voc-tab="list" onclick="HomesApp.navigate('voc','list')" style="cursor:pointer;padding:6px 12px">목록</button>
          <button class="voc-tab badge badge-gray" data-voc-tab="report" onclick="HomesApp.navigate('voc','report')" style="cursor:pointer;padding:6px 12px">주간 리포트</button>
        </div>
      </div>

      <!-- DASHBOARD -->
      <div id="voc-dash" class="voc-view">
        <div class="grid-4" style="margin-bottom:16px">
          <div class="kpi-card"><div class="kpi-label">이번주 VOC</div><div class="kpi-value" id="vk-week" style="color:var(--text-h)">0</div><div id="vk-trend" style="font-size:11px;margin-top:2px"></div></div>
          <div class="kpi-card"><div class="kpi-label">미완료</div><div class="kpi-value" id="vk-pend" style="color:var(--amber)">0</div><div style="font-size:11px;color:var(--muted)">즉시 처리 필요</div></div>
          <div class="kpi-card"><div class="kpi-label">긴급 미완료</div><div class="kpi-value" id="vk-urg" style="color:var(--red)">0</div><div style="font-size:11px;color:var(--muted)">우선 대응</div></div>
          <div class="kpi-card"><div class="kpi-label">전체 처리율</div><div class="kpi-value" id="vk-rate" style="color:var(--green)">—</div><div style="font-size:11px;color:var(--muted)">누적 기준</div></div>
        </div>
        <div class="grid-2" style="margin-bottom:16px">
          <div class="card" style="grid-column:span 1"><div class="section-title">주간 VOC 추이 (8주)</div><div class="chart-h"><canvas id="vc-trend"></canvas></div></div>
          <div class="card"><div class="section-title">분류별 분포</div><div class="chart-h"><canvas id="vc-cat"></canvas></div></div>
        </div>
        <div class="grid-2" style="margin-bottom:16px">
          <div class="card"><div class="section-title">지점별 현황</div><div class="chart-h-sm"><canvas id="vc-loc"></canvas></div></div>
          <div class="card"><div class="section-title">이번주 인사이트</div><div id="voc-insights" style="font-size:13px;color:var(--text);line-height:1.8"></div></div>
        </div>
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div class="section-title" style="margin:0">최근 접수</div><button onclick="HomesApp.navigate('voc','list')" class="btn btn-outline" style="font-size:11px;padding:4px 10px">전체 보기</button></div><div id="voc-recent"></div></div>
      </div>

      <!-- INPUT -->
      <div id="voc-input" class="voc-view" style="display:none">
        <div class="card" style="max-width:640px;margin:0 auto">
          <h2 style="font-size:16px;font-weight:700;color:var(--text-h);margin-bottom:16px">VOC 접수 등록</h2>
          <form id="voc-form" onsubmit="VocFormHandler.submit(event)" style="display:flex;flex-direction:column;gap:12px">
            <div class="grid-2">
              <div><label class="form-label">접수일 *</label><input type="date" id="vf-date" required class="form-input"></div>
              <div><label class="form-label">지점 *</label><select id="vf-loc" required class="form-select">${locs}</select></div>
            </div>
            <div class="grid-2">
              <div><label class="form-label">호실</label><input type="text" id="vf-room" placeholder="예: 501" class="form-input"></div>
              <div><label class="form-label">문의자</label><input type="text" id="vf-name" placeholder="이름" class="form-input"></div>
            </div>
            <div class="grid-2">
              <div><label class="form-label">접수경로 *</label><select id="vf-ch" required class="form-select"><option value="">선택</option><option>카카오채널</option><option>방문</option><option>유선</option><option>문자</option><option>홈즈직원</option><option>이메일</option></select></div>
              <div><label class="form-label">중요도 *</label><select id="vf-pri" required class="form-select"><option value="">선택</option><option>긴급</option><option>상</option><option>중</option><option>하</option></select></div>
            </div>
            <div class="grid-2">
              <div><label class="form-label">대분류 *</label><select id="vf-cat" required class="form-select"><option value="">선택</option><option>시설</option><option>계약</option><option>생활문의</option><option>투어</option><option>퇴실</option><option>기타</option></select></div>
              <div><label class="form-label">소분류</label><input type="text" id="vf-sub" placeholder="직접 입력" list="vf-sub-list" class="form-input"><datalist id="vf-sub-list"><option>보일러</option><option>안면인식</option><option>냉난방기</option><option>누수</option><option>환풍기</option><option>변기</option><option>인터넷</option><option>악취</option><option>연장</option><option>월세</option><option>보증금</option><option>세금계산서</option><option>소음</option><option>청소</option><option>투어일정</option><option>중도퇴실</option></datalist></div>
            </div>
            <div><label class="form-label">상세내용 *</label><textarea id="vf-content" required rows="3" placeholder="문의 내용을 상세하게 입력해주세요" class="form-input" style="resize:none"></textarea></div>
            <div><label class="form-label">대응 내용</label><textarea id="vf-resp" rows="2" placeholder="처리 내용" class="form-input" style="resize:none"></textarea></div>
            <div class="grid-2">
              <div><label class="form-label">대응자</label><input type="text" id="vf-handler" placeholder="담당자" class="form-input"></div>
              <div><label class="form-label">처리상태</label><select id="vf-status" class="form-select"><option value="진행중">진행중</option><option value="완료">완료</option></select></div>
            </div>
            <button type="submit" class="btn btn-secondary btn-full" style="margin-top:4px">VOC 등록하기</button>
          </form>
          <div id="vf-ok" style="display:none;margin-top:12px;background:var(--green-muted);color:var(--green);text-align:center;padding:10px;border-radius:var(--r-sm);font-size:13px;font-weight:500">VOC가 등록되었습니다</div>
        </div>
      </div>

      <!-- LIST -->
      <div id="voc-list" class="voc-view" style="display:none">
        <div class="card" style="margin-bottom:12px">
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            <input type="text" id="vs-search" placeholder="검색 (이름, 내용, 소분류...)" oninput="VocListHandler.render()" class="form-input" style="flex:1;min-width:200px">
            <select id="vs-loc" onchange="VocListHandler.render()" class="form-select" style="width:auto">${'<option value="">전체 지점</option><option>선정릉</option><option>남영</option><option>망원</option><option>가산</option><option>회기</option><option>원효로</option><option>안암</option>'}</select>
            <select id="vs-cat" onchange="VocListHandler.render()" class="form-select" style="width:auto"><option value="">전체 분류</option><option>시설</option><option>계약</option><option>생활문의</option><option>투어</option><option>퇴실</option><option>기타</option></select>
            <select id="vs-status" onchange="VocListHandler.render()" class="form-select" style="width:auto"><option value="">전체 상태</option><option>진행중</option><option>완료</option></select>
            <select id="vs-pri" onchange="VocListHandler.render()" class="form-select" style="width:auto"><option value="">전체 중요도</option><option>긴급</option><option>상</option><option>중</option><option>하</option></select>
            <button onclick="VocMod.exportCSV()" class="btn btn-outline">CSV 내보내기</button>
          </div>
        </div>
        <div class="card" style="padding:0;overflow:hidden">
          <div id="vl-count" style="padding:8px 16px;font-size:11px;color:var(--dim);border-bottom:1px solid var(--border)"></div>
          <div style="overflow-x:auto">
            <table class="cx-table"><thead><tr>
              <th>접수일</th><th>지점</th><th>호실</th><th>분류</th><th>소분류</th><th>중요도</th><th>상태</th><th>내용</th><th>대응자</th><th></th>
            </tr></thead><tbody id="vl-body"></tbody></table>
            <div id="vl-empty" style="display:none;text-align:center;padding:40px;color:var(--dim);font-size:13px">등록된 VOC가 없습니다</div>
          </div>
        </div>
      </div>

      <!-- REPORT -->
      <div id="voc-report" class="voc-view" style="display:none">
        <div class="grid-2">
          <div class="card" style="grid-column:span 1">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
              <h2 style="font-size:16px;font-weight:700;color:var(--text-h)">주간 인사이트 리포트</h2>
              <span id="vr-week" style="font-size:13px;color:var(--dim)"></span>
            </div>
            <div id="vr-content" style="font-size:13px;color:var(--text);line-height:1.8"></div>
          </div>
          <div class="card">
            <h3 style="font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:12px">즉시 조치 필요</h3>
            <div id="vr-actions" style="font-size:12px"></div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('vf-date').value = HomesApp.today();
  },

  renderDash() {
    const D = VocMod.DATA;
    const tw = VocMod.weekRows(0), lw = VocMod.weekRows(1);
    const pend = D.filter(x => x.처리상태 !== '완료');
    const urg = pend.filter(x => x.중요도 === '긴급');
    const done = D.filter(x => x.처리상태 === '완료');
    const rate = D.length ? Math.round(done.length / D.length * 100) : null;

    const $ = id => this.el.querySelector('#' + id);
    if ($('vk-week')) $('vk-week').textContent = tw.length;
    if ($('vk-pend')) $('vk-pend').textContent = pend.length;
    if ($('vk-urg')) $('vk-urg').textContent = urg.length;
    if ($('vk-rate')) $('vk-rate').textContent = rate !== null ? rate + '%' : '—';

    const diff = tw.length - lw.length;
    const tEl = $('vk-trend');
    if (tEl) tEl.innerHTML = diff > 0 ? `<span style="color:var(--red)">▲ ${diff}건 증가</span>`
      : diff < 0 ? `<span style="color:var(--green)">▼ ${Math.abs(diff)}건 감소</span>`
      : `<span style="color:var(--dim)">전주 동일</span>`;

    // Charts
    this.drawTrend(); this.drawCat(); this.drawLoc();

    // Insights
    const ins = $('voc-insights');
    if (ins) {
      if (!D.length) { ins.innerHTML = '<span style="color:var(--dim)">데이터가 없습니다.</span>'; }
      else {
        const topCat = HomesApp.topKey(HomesApp.countBy(tw, '대분류'));
        const topLoc = HomesApp.topKey(HomesApp.countBy(pend, '지점'));
        let h = `<div>이번주 <b>${tw.length}건</b> 접수 — ${diff > 0 ? `전주 대비 <b style="color:var(--red)">${diff}건 증가</b>` : diff < 0 ? `전주 대비 <b style="color:var(--green)">${Math.abs(diff)}건 감소</b>` : '전주 동일'}</div>`;
        if (topCat) h += `<div>최다 유형: <b>${topCat}</b></div>`;
        if (topLoc) h += `<div>미완료 최다: <b>${topLoc}</b></div>`;
        if (urg.length) h += `<div style="color:var(--red);font-weight:600">긴급 미완료 ${urg.length}건</div>`;
        ins.innerHTML = h;
      }
    }

    // Recent
    const rec = $('voc-recent');
    if (rec) {
      const rows = D.slice(0, 6);
      if (!rows.length) { rec.innerHTML = '<div style="text-align:center;padding:20px;color:var(--dim);font-size:13px">VOC를 등록해보세요</div>'; }
      else {
        rec.innerHTML = rows.map(r => `
          <div onclick="VocModalHandler.open('${r.id}')" style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid var(--border);cursor:pointer;transition:.15s" onmouseover="this.style.background='var(--bg2)'" onmouseout="this.style.background=''">
            <span class="badge badge-${r.중요도||'하'}">${r.중요도||'—'}</span>
            <span style="font-size:11px;color:var(--dim);width:48px;flex-shrink:0">${r.지점||'—'}</span>
            <span style="font-size:11px;color:var(--dim);width:32px;flex-shrink:0">${r.호실||''}</span>
            <span style="font-size:12px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.상세내용||'—'}</span>
            <span class="badge badge-${r.처리상태||'진행중'}">${r.처리상태||'진행중'}</span>
          </div>`).join('');
      }
    }
  },

  drawTrend() {
    const canvas = this.el.querySelector('#vc-trend'); if (!canvas) return;
    const labels = [], vals = [];
    for (let i = 7; i >= 0; i--) {
      const ws = VocMod.weekStart(new Date()); ws.setDate(ws.getDate() - i * 7);
      labels.push(`${ws.getMonth()+1}/${ws.getDate()}`);
      vals.push(VocMod.weekRows(i).length);
    }
    if (VocMod.CH.trend) VocMod.CH.trend.destroy();
    VocMod.CH.trend = new Chart(canvas, {
      type: 'line',
      data: { labels, datasets: [{ data: vals, borderColor: '#4F46E5', backgroundColor: 'rgba(79,70,229,.08)', fill: true, tension: .4, pointBackgroundColor: '#4F46E5', pointRadius: 4 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(0,0,0,.04)' } }, x: { grid: { display: false } } } }
    });
  },

  drawCat() {
    const canvas = this.el.querySelector('#vc-cat'); if (!canvas) return;
    const c = HomesApp.countBy(VocMod.DATA, '대분류');
    const colors = ['#4F46E5','#7C3AED','#2563EB','#0891B2','#059669','#D97706','#DC2626'];
    if (VocMod.CH.cat) VocMod.CH.cat.destroy();
    VocMod.CH.cat = new Chart(canvas, {
      type: 'doughnut',
      data: { labels: Object.keys(c), datasets: [{ data: Object.values(c), backgroundColor: colors, borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 8 } } } }
    });
  },

  drawLoc() {
    const canvas = this.el.querySelector('#vc-loc'); if (!canvas) return;
    const c = HomesApp.countBy(VocMod.DATA, '지점');
    const sorted = Object.entries(c).sort((a,b) => b[1] - a[1]);
    if (VocMod.CH.loc) VocMod.CH.loc.destroy();
    VocMod.CH.loc = new Chart(canvas, {
      type: 'bar',
      data: { labels: sorted.map(x=>x[0]), datasets: [{ data: sorted.map(x=>x[1]), backgroundColor: 'rgba(79,70,229,.65)', borderRadius: 5 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(0,0,0,.04)' } }, x: { grid: { display: false } } } }
    });
  },

  renderList() { VocListHandler.render(); },

  renderReport() {
    const D = VocMod.DATA;
    const now = new Date();
    const ws = VocMod.weekStart(now);
    const we = new Date(ws); we.setDate(we.getDate() + 6);
    const weekEl = this.el.querySelector('#vr-week');
    if (weekEl) weekEl.textContent = `${ws.getMonth()+1}/${ws.getDate()} ~ ${we.getMonth()+1}/${we.getDate()}`;

    const tw = VocMod.weekRows(0), lw = VocMod.weekRows(1);
    const pend = D.filter(x => x.처리상태 !== '완료');
    const urg = pend.filter(x => x.중요도 === '긴급');
    const diff = tw.length - lw.length;
    const rate = tw.length ? Math.round(tw.filter(x => x.처리상태 === '완료').length / tw.length * 100) : 0;
    const cats = HomesApp.countBy(tw, '대분류');
    const locs = HomesApp.countBy(tw, '지점');

    let r = '';
    const trendTxt = diff > 0 ? `전주 대비 <b style="color:var(--red)">${diff}건 증가</b>` : diff < 0 ? `전주 대비 <b style="color:var(--green)">${Math.abs(diff)}건 감소</b>` : '전주 동일';
    r += `<div style="background:var(--indigo-muted);border-radius:var(--r);padding:16px;margin-bottom:16px"><b style="color:var(--indigo)">주간 개요</b><br>이번주 총 <b>${tw.length}건</b> 접수. ${trendTxt}. 처리율 <b>${rate}%</b></div>`;

    if (Object.keys(cats).length) {
      const sorted = Object.entries(cats).sort((a,b) => b[1] - a[1]);
      r += `<div style="margin-bottom:16px"><b>분류별 현황</b><div class="grid-3" style="margin-top:8px">${sorted.map(([k,n]) => `<div style="background:var(--bg2);border-radius:var(--r-sm);padding:12px;text-align:center"><div style="font-size:22px;font-weight:800;color:var(--indigo)">${n}</div><div style="font-size:11px;color:var(--muted)">${k}</div></div>`).join('')}</div></div>`;
    }
    if (Object.keys(locs).length) {
      const sorted = Object.entries(locs).sort((a,b) => b[1] - a[1]);
      r += `<div style="margin-bottom:16px"><b>지점별 현황</b><div style="margin-top:8px">${sorted.map(([loc,n]) => {
        const pct = tw.length ? Math.round(n / tw.length * 100) : 0;
        return `<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><span style="font-weight:500">${loc}</span><span style="color:var(--dim)">${n}건 (${pct}%)</span></div><div style="height:6px;background:var(--bg3);border-radius:3px"><div style="height:6px;background:var(--indigo);border-radius:3px;width:${pct}%"></div></div></div>`;
      }).join('')}</div></div>`;
    }

    const recs = [];
    if (urg.length) recs.push(`긴급 VOC <b>${urg.length}건</b> 미완료`);
    if (pend.length) recs.push(`전체 미완료 <b>${pend.length}건</b>`);
    if (cats['시설']) recs.push(`시설 관련 <b>${cats['시설']}건</b> — 정기 점검 확인`);
    if (!recs.length) recs.push('특이사항 없음');
    r += `<div style="background:var(--yellow-muted);border-radius:var(--r);padding:16px"><b style="color:var(--yellow)">권장 조치</b><ul style="margin-top:8px;padding-left:20px">${recs.map(x => `<li style="margin-bottom:4px">${x}</li>`).join('')}</ul></div>`;

    const contentEl = this.el.querySelector('#vr-content');
    if (contentEl) contentEl.innerHTML = r;

    const actEl = this.el.querySelector('#vr-actions');
    if (actEl) {
      const actions = [
        ...urg.map(x => `<div style="display:flex;gap:6px;align-items:start;margin-bottom:6px"><div style="width:6px;height:6px;border-radius:50%;background:var(--red);margin-top:6px;flex-shrink:0"></div><span>[긴급] ${x.지점||''} ${x.호실||''}호 — ${x.소분류||x.대분류||''}</span></div>`),
        ...pend.filter(x => x.중요도==='상').slice(0,3).map(x => `<div style="display:flex;gap:6px;align-items:start;margin-bottom:6px"><div style="width:6px;height:6px;border-radius:50%;background:var(--amber);margin-top:6px;flex-shrink:0"></div><span>[상] ${x.지점||''} — ${x.소분류||x.대분류||''}</span></div>`),
      ];
      actEl.innerHTML = actions.length ? actions.join('') : '<div style="color:var(--green)">모든 VOC 처리 완료</div>';
    }
  }
});

// Form handler
const VocFormHandler = {
  async submit(e) {
    e.preventDefault();
    const v = id => document.getElementById(id)?.value || '';
    const entry = {
      접수일: v('vf-date'), 지점: v('vf-loc'), 호실: v('vf-room'), 문의자: v('vf-name'),
      접수경로: v('vf-ch'), 대분류: v('vf-cat'), 소분류: v('vf-sub'), 상세내용: v('vf-content'),
      중요도: v('vf-pri'), 처리상태: v('vf-status'), 대응내용: v('vf-resp'), 대응자: v('vf-handler'),
      완료일: v('vf-status') === '완료' ? HomesApp.today() : null
    };
    const SB = HomesSB.get();
    if (SB) {
      const { error } = await SB.from('voc').insert([entry]);
      if (error) { alert('저장 실패: ' + error.message); return; }
    } else {
      VocMod.DATA.unshift({ id: Date.now().toString(), ...entry });
      await VocMod.persist();
    }
    document.getElementById('voc-form').reset();
    document.getElementById('vf-date').value = HomesApp.today();
    const ok = document.getElementById('vf-ok');
    ok.style.display = 'block';
    setTimeout(() => ok.style.display = 'none', 2500);
    await VocMod.loadData();
    HomesApp.emit('voc:updated');
  }
};

// List handler
const VocListHandler = {
  render() {
    const D = VocMod.DATA;
    const q = (document.getElementById('vs-search')?.value || '').toLowerCase();
    const loc = document.getElementById('vs-loc')?.value || '';
    const cat = document.getElementById('vs-cat')?.value || '';
    const stat = document.getElementById('vs-status')?.value || '';
    const pri = document.getElementById('vs-pri')?.value || '';

    let rows = D.filter(r => {
      if (loc && r.지점 !== loc) return false;
      if (cat && r.대분류 !== cat) return false;
      if (stat && r.처리상태 !== stat) return false;
      if (pri && r.중요도 !== pri) return false;
      if (q) { const txt = [r.문의자, r.상세내용, r.소분류, r.대응내용, r.호실, r.대응자].join(' ').toLowerCase(); if (!txt.includes(q)) return false; }
      return true;
    });

    const cnt = document.getElementById('vl-count');
    if (cnt) cnt.textContent = `총 ${rows.length}건 (전체 ${D.length}건)`;

    const body = document.getElementById('vl-body');
    const empty = document.getElementById('vl-empty');
    if (!body) return;
    if (!rows.length) { body.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
    if (empty) empty.style.display = 'none';

    body.innerHTML = rows.map(r => `
      <tr onclick="VocModalHandler.open('${r.id}')" style="cursor:pointer">
        <td style="font-size:11px;color:var(--dim)">${HomesApp.fmtDate(r.접수일)}</td>
        <td style="font-size:12px;font-weight:500">${r.지점||'—'}</td>
        <td style="font-size:11px;color:var(--muted)">${r.호실||'—'}</td>
        <td style="font-size:12px">${r.대분류||'—'}</td>
        <td style="font-size:11px;color:var(--dim)">${r.소분류||'—'}</td>
        <td><span class="badge badge-${r.중요도||'하'}">${r.중요도||'—'}</span></td>
        <td><span class="badge badge-${r.처리상태||'진행중'}">${r.처리상태||'진행중'}</span></td>
        <td style="font-size:12px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.상세내용||'—'}</td>
        <td style="font-size:11px;color:var(--dim)">${r.대응자||'—'}</td>
        <td>${r.처리상태 !== '완료' ? `<button onclick="event.stopPropagation();VocModalHandler.quickDone('${r.id}')" style="font-size:11px;color:var(--accent);background:none;border:none;cursor:pointer">완료처리</button>` : ''}</td>
      </tr>`).join('');
  }
};

// Modal handler
const VocModalHandler = {
  open(id) {
    const r = VocMod.DATA.find(x => String(x.id) === String(id));
    if (!r) return;
    document.getElementById('modal-title').textContent = 'VOC 상세 / 수정';
    document.getElementById('modal-body').innerHTML = `
      <div style="display:flex;flex-direction:column;gap:12px;font-size:13px">
        <div class="grid-2" style="background:var(--bg2);border-radius:var(--r);padding:12px">
          <div><div style="font-size:10px;color:var(--dim)">접수일</div><div style="font-weight:500">${HomesApp.fmtDate(r.접수일)}</div></div>
          <div><div style="font-size:10px;color:var(--dim)">지점/호실</div><div style="font-weight:500">${r.지점||'—'} ${r.호실||''}</div></div>
          <div><div style="font-size:10px;color:var(--dim)">문의자</div><div style="font-weight:500">${r.문의자||'—'}</div></div>
          <div><div style="font-size:10px;color:var(--dim)">접수경로</div><div style="font-weight:500">${r.접수경로||'—'}</div></div>
          <div><div style="font-size:10px;color:var(--dim)">분류</div><div style="font-weight:500">${r.대분류||'—'} / ${r.소분류||'—'}</div></div>
          <div><div style="font-size:10px;color:var(--dim)">중요도</div><span class="badge badge-${r.중요도||'하'}">${r.중요도||'—'}</span></div>
        </div>
        <div><div style="font-size:10px;color:var(--dim);margin-bottom:4px">상세 내용</div><div style="background:var(--bg2);border-radius:var(--r-sm);padding:12px;line-height:1.7">${r.상세내용||'—'}</div></div>
        <div><div style="font-size:10px;color:var(--dim);margin-bottom:4px">대응 내용</div><textarea id="vm-resp" rows="2" class="form-input" style="resize:none">${r.대응내용||''}</textarea></div>
        <div class="grid-2">
          <div><div style="font-size:10px;color:var(--dim);margin-bottom:4px">대응자</div><input type="text" id="vm-handler" value="${r.대응자||''}" class="form-input"></div>
          <div><div style="font-size:10px;color:var(--dim);margin-bottom:4px">처리상태</div><select id="vm-status" class="form-select"><option value="진행중" ${r.처리상태!=='완료'?'selected':''}>진행중</option><option value="완료" ${r.처리상태==='완료'?'selected':''}>완료</option></select></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:4px">
          <button onclick="VocModalHandler.save('${r.id}')" class="btn btn-secondary" style="flex:1">저장</button>
          <button onclick="VocModalHandler.del('${r.id}')" class="btn btn-danger" style="padding:8px 20px">삭제</button>
        </div>
      </div>`;
    document.getElementById('cx-modal').classList.add('show');
  },

  async save(id) {
    const resp = document.getElementById('vm-resp').value;
    const handler = document.getElementById('vm-handler').value;
    const status = document.getElementById('vm-status').value;
    const SB = HomesSB.get();
    if (SB) {
      await SB.from('voc').update({ 대응내용: resp, 대응자: handler, 처리상태: status, 완료일: status === '완료' ? HomesApp.today() : null }).eq('id', id);
    } else {
      const i = VocMod.DATA.findIndex(x => String(x.id) === String(id));
      if (i >= 0) { Object.assign(VocMod.DATA[i], { 대응내용: resp, 대응자: handler, 처리상태: status }); await VocMod.persist(); }
    }
    document.getElementById('cx-modal').classList.remove('show');
    await VocMod.loadData(); HomesApp.emit('voc:updated');
  },

  async del(id) {
    if (!confirm('삭제하시겠습니까?')) return;
    const SB = HomesSB.get();
    if (SB) { await SB.from('voc').delete().eq('id', id); }
    else { VocMod.DATA = VocMod.DATA.filter(x => String(x.id) !== String(id)); await VocMod.persist(); }
    document.getElementById('cx-modal').classList.remove('show');
    await VocMod.loadData(); HomesApp.emit('voc:updated');
  },

  async quickDone(id) {
    const SB = HomesSB.get();
    if (SB) { await SB.from('voc').update({ 처리상태: '완료', 완료일: HomesApp.today() }).eq('id', id); }
    else {
      const i = VocMod.DATA.findIndex(x => String(x.id) === String(id));
      if (i >= 0) { VocMod.DATA[i].처리상태 = '완료'; VocMod.DATA[i].완료일 = HomesApp.today(); await VocMod.persist(); }
    }
    await VocMod.loadData(); HomesApp.emit('voc:updated');
  }
};
