/* HOMES CX Portal — Customers Module (고객 데이터) */
HomesApp.register('customers', {
  init(container) {
    this.el = container;
    this.render();
    HomesApp.on('sb:connected', () => this.render());
  },

  onShow() {
    this.render();
  },

  async render() {
    const SB = HomesSB.get();
    let contractCount = 0, tourCount = 0, contracts = [], tours = [];

    if (SB) {
      // Fetch counts
      const [r1, r2] = await Promise.all([
        SB.from('contracts').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(20),
        SB.from('tour_records').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(20)
      ]);

      if (r1.count != null) contractCount = r1.count;
      if (r1.data) contracts = r1.data;
      if (r2.count != null) tourCount = r2.count;
      if (r2.data) tours = r2.data;
    }

    const conversionRate = tourCount > 0 ? Math.round(contractCount / tourCount * 100) : 0;
    const isConnected = !!SB;

    this.el.innerHTML = `
      <div class="page-title">고객 데이터</div>
      <div class="page-desc" style="margin-bottom:24px">계약, 투어, 전환율 등 고객 데이터 종합</div>

      ${!isConnected ? `
        <div class="card" style="margin-bottom:20px;background:#fffbeb;border:1px solid #fde68a">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:20px;color:var(--orange)"><i class="ri-cloud-off-line"></i></span>
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--orange)">Supabase 연결 필요</div>
              <div style="font-size:12px;color:#92400e;margin-top:2px">설정 메뉴에서 Supabase를 연결하면 실시간 고객 데이터를 확인할 수 있습니다.</div>
            </div>
            <button class="btn btn-outline" style="margin-left:auto;flex-shrink:0" onclick="HomesApp.navigate('settings')">
              <i class="ri-settings-3-line"></i> 설정
            </button>
          </div>
        </div>
      ` : ''}

      <!-- KPI Cards -->
      <div class="grid-4" style="margin-bottom:20px">
        <div class="kpi-card">
          <div class="kpi-label">총 계약 건수</div>
          <div class="kpi-value" style="color:var(--accent)">${contractCount.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">contracts 테이블</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">투어 기록</div>
          <div class="kpi-value" style="color:var(--indigo)">${tourCount.toLocaleString()}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">tour_records 테이블</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">투어 전환율</div>
          <div class="kpi-value" style="color:var(--green)">${conversionRate}%</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">계약/투어 비율</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">운영 지점</div>
          <div class="kpi-value" style="color:var(--purple)">7</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">선정릉~안암</div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid-2" style="margin-bottom:20px">
        <!-- Recent Contracts -->
        <div class="card">
          <div class="section-title"><i class="ri-file-text-line"></i> 최근 계약</div>
          ${isConnected && contracts.length > 0 ? `
            <div style="max-height:400px;overflow-y:auto">
              <table class="cx-table">
                <thead>
                  <tr>
                    <th>계약일</th>
                    <th>지점</th>
                    <th>호실</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  ${contracts.slice(0, 15).map(c => `
                    <tr>
                      <td>${this._formatDate(c.created_at || c.contract_date || c.계약일)}</td>
                      <td>${c.지점 || c.location || c.branch || '-'}</td>
                      <td>${c.호실 || c.room || c.unit || '-'}</td>
                      <td><span class="badge ${this._contractStatusClass(c.상태 || c.status)}">${c.상태 || c.status || '활성'}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div style="text-align:center;padding:40px;color:var(--muted);font-size:13px">
              <i class="ri-database-2-line" style="font-size:32px;display:block;margin-bottom:8px;color:var(--dim)"></i>
              ${isConnected ? '계약 데이터가 없습니다.' : 'Supabase 연결 후 데이터가 표시됩니다.'}
            </div>
          `}
        </div>

        <!-- Tour Conversion Analysis -->
        <div class="card">
          <div class="section-title"><i class="ri-route-line"></i> 투어 전환 분석</div>
          ${isConnected && tours.length > 0 ? `
            <div style="margin-bottom:16px">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
                <div style="flex:1;background:var(--bg2);border-radius:var(--r-full);height:24px;overflow:hidden">
                  <div style="width:${conversionRate}%;background:var(--accent);height:100%;border-radius:var(--r-full);min-width:2px"></div>
                </div>
                <span style="font-size:14px;font-weight:700;color:var(--accent)">${conversionRate}%</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:16px">
                <span>투어 ${tourCount}건</span>
                <span>계약 ${contractCount}건</span>
              </div>
            </div>

            <div class="section-title" style="font-size:11px"><i class="ri-calendar-line"></i> 최근 투어 기록</div>
            <div style="max-height:260px;overflow-y:auto">
              ${tours.slice(0, 10).map(t => `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
                  <div style="width:36px;height:36px;background:var(--bg2);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    <i class="ri-walk-line" style="color:var(--indigo)"></i>
                  </div>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:12px;font-weight:600;color:var(--text)">${t.고객명 || t.customer_name || t.name || '고객'}</div>
                    <div style="font-size:11px;color:var(--dim)">${t.지점 || t.location || '-'} &middot; ${this._formatDate(t.created_at || t.투어일)}</div>
                  </div>
                  <span class="badge ${t.결과 === '계약' || t.result === 'contracted' ? 'badge-green' : 'badge-gray'}">${t.결과 || t.result || '대기'}</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="text-align:center;padding:40px;color:var(--muted);font-size:13px">
              <i class="ri-route-line" style="font-size:32px;display:block;margin-bottom:8px;color:var(--dim)"></i>
              ${isConnected ? '투어 데이터가 없습니다.' : 'Supabase 연결 후 분석이 표시됩니다.'}
            </div>
          `}
        </div>
      </div>

      <!-- Summary Card -->
      <div class="card">
        <div class="section-title"><i class="ri-bar-chart-box-line"></i> 고객 데이터 요약</div>
        <div class="grid-3">
          <div style="padding:16px;background:var(--bg2);border-radius:var(--r);text-align:center">
            <div style="font-size:11px;color:var(--dim);margin-bottom:4px">평균 계약 기간</div>
            <div style="font-size:20px;font-weight:700;color:var(--text-h)">6~12개월</div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">최소 1개월 ~ 최대 1년</div>
          </div>
          <div style="padding:16px;background:var(--bg2);border-radius:var(--r);text-align:center">
            <div style="font-size:11px;color:var(--dim);margin-bottom:4px">주요 입주 채널</div>
            <div style="font-size:20px;font-weight:700;color:var(--text-h)">온라인</div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">홈페이지, 직방, 다방</div>
          </div>
          <div style="padding:16px;background:var(--bg2);border-radius:var(--r);text-align:center">
            <div style="font-size:11px;color:var(--dim);margin-bottom:4px">타겟 고객</div>
            <div style="font-size:20px;font-weight:700;color:var(--text-h)">1인가구</div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">2030 직장인/대학원생</div>
          </div>
        </div>
      </div>
    `;
  },

  _formatDate(d) {
    if (!d) return '-';
    try {
      const dt = new Date(d);
      return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    } catch { return d; }
  },

  _contractStatusClass(status) {
    if (!status) return 'badge-green';
    const s = status.toLowerCase();
    if (s.includes('활성') || s.includes('active')) return 'badge-green';
    if (s.includes('만료') || s.includes('expired')) return 'badge-gray';
    if (s.includes('해지') || s.includes('terminated')) return 'badge-red';
    return 'badge-blue';
  }
});
