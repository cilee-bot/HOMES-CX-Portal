/* HOMES CX Portal — CX Dashboard Module (종합 대시보드) */
HomesApp.register('dashboard', {
  init(container) { this.el = container; this.render(); },
  onShow() { this.render(); },

  async render() {
    const SB = HomesSB.get();
    let vocData = [], contractCount = 0, tourCount = 0, vacancyData = [];

    // Load VOC data
    if (SB) {
      const r1 = await SB.from('voc').select('*').order('접수일', { ascending: false });
      if (r1.data) vocData = r1.data;
      const r2 = await SB.from('contracts').select('id', { count: 'exact', head: true });
      if (r2.count != null) contractCount = r2.count;
      const r3 = await SB.from('tour_records').select('id', { count: 'exact', head: true });
      if (r3.count != null) tourCount = r3.count;
      const r4 = await SB.from('vacancy').select('*');
      if (r4.data) vacancyData = r4.data;
    } else {
      vocData = JSON.parse(localStorage.getItem('voc_data') || '[]');
    }

    const pend = vocData.filter(x => x.처리상태 !== '완료');
    const done = vocData.filter(x => x.처리상태 === '완료');
    const rate = vocData.length ? Math.round(done.length / vocData.length * 100) : 0;
    const urg = pend.filter(x => x.중요도 === '긴급');

    this.el.innerHTML = `
      <div class="page-title">CX 대시보드</div>
      <div class="page-desc" style="margin-bottom:24px">홈즈 고객경험 운영 현황 종합</div>

      <!-- KPI Row -->
      <div class="grid-4" style="margin-bottom:20px">
        <div class="kpi-card">
          <div class="kpi-label">총 VOC</div>
          <div class="kpi-value" style="color:var(--indigo)">${vocData.length}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">미완료 ${pend.length}건</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">VOC 처리율</div>
          <div class="kpi-value" style="color:var(--green)">${rate}%</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">완료 ${done.length}건</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">긴급 미완료</div>
          <div class="kpi-value" style="color:var(--red)">${urg.length}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">즉시 대응 필요</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">계약 건수</div>
          <div class="kpi-value" style="color:var(--accent)">${contractCount.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">투어 ${tourCount}건</div>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid-2" style="margin-bottom:20px">
        <div class="card">
          <div class="section-title"><i class="ri-line-chart-line"></i> VOC 분류별 현황</div>
          <div class="chart-h"><canvas id="dash-c-cat"></canvas></div>
        </div>
        <div class="card">
          <div class="section-title"><i class="ri-map-pin-line"></i> 지점별 VOC</div>
          <div class="chart-h"><canvas id="dash-c-loc"></canvas></div>
        </div>
      </div>

      <!-- Quick Access -->
      <div class="card">
        <div class="section-title"><i class="ri-compass-3-line"></i> 빠른 접근</div>
        <div class="grid-3">
          <div onclick="HomesApp.navigate('voc','input')" style="padding:16px;background:var(--indigo-muted);border-radius:var(--r);cursor:pointer;text-align:center">
            <div style="font-size:24px;margin-bottom:4px"><i class="ri-chat-new-line" style="color:var(--indigo)"></i></div>
            <div style="font-size:13px;font-weight:600;color:var(--indigo)">VOC 등록</div>
          </div>
          <div onclick="HomesApp.navigate('survey','overview')" style="padding:16px;background:var(--accent-muted);border-radius:var(--r);cursor:pointer;text-align:center">
            <div style="font-size:24px;margin-bottom:4px"><i class="ri-survey-line" style="color:var(--accent)"></i></div>
            <div style="font-size:13px;font-weight:600;color:var(--accent)">설문 도구</div>
          </div>
          <div onclick="HomesApp.navigate('kb','customer')" style="padding:16px;background:var(--green-muted);border-radius:var(--r);cursor:pointer;text-align:center">
            <div style="font-size:24px;margin-bottom:4px"><i class="ri-book-open-line" style="color:var(--green)"></i></div>
            <div style="font-size:13px;font-weight:600;color:var(--green)">헬프센터</div>
          </div>
        </div>
      </div>

      <!-- Recent VOC -->
      ${vocData.length ? `
      <div class="card" style="margin-top:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div class="section-title" style="margin-bottom:0"><i class="ri-list-check-2"></i> 최근 VOC</div>
          <button onclick="HomesApp.navigate('voc','list')" class="btn btn-outline" style="font-size:11px;padding:4px 10px">전체 보기</button>
        </div>
        <table class="cx-table">
          <thead><tr>
            <th>접수일</th><th>지점</th><th>분류</th><th>중요도</th><th>상태</th><th>내용</th>
          </tr></thead>
          <tbody>
            ${vocData.slice(0,5).map(r => `<tr>
              <td style="font-size:12px;color:var(--dim)">${HomesApp.fmtDate(r.접수일)}</td>
              <td style="font-size:12px;font-weight:500">${r.지점||'—'}</td>
              <td style="font-size:12px">${r.대분류||'—'}</td>
              <td><span class="badge badge-${r.중요도||'하'}">${r.중요도||'—'}</span></td>
              <td><span class="badge badge-${r.처리상태||'진행중'}">${r.처리상태||'진행중'}</span></td>
              <td style="font-size:12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.상세내용||'—'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>` : ''}
    `;

    // Draw charts
    if (vocData.length) {
      this.drawCatChart(vocData);
      this.drawLocChart(vocData);
    }
  },

  drawCatChart(data) {
    const c = HomesApp.countBy(data, '대분류');
    const colors = ['#4F46E5','#7C3AED','#2563EB','#0891B2','#059669','#D97706','#DC2626'];
    new Chart(document.getElementById('dash-c-cat'), {
      type: 'doughnut',
      data: { labels: Object.keys(c), datasets: [{ data: Object.values(c), backgroundColor: colors, borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 8 } } } }
    });
  },

  drawLocChart(data) {
    const c = HomesApp.countBy(data, '지점');
    const sorted = Object.entries(c).sort((a,b) => b[1] - a[1]);
    new Chart(document.getElementById('dash-c-loc'), {
      type: 'bar',
      data: { labels: sorted.map(x=>x[0]), datasets: [{ data: sorted.map(x=>x[1]), backgroundColor: 'rgba(59,130,246,.6)', borderRadius: 5 }] },
      options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(0,0,0,.04)' } }, y: { grid: { display: false } } } }
    });
  }
});
