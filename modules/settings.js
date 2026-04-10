/* HOMES CX Portal — Settings Module */
HomesApp.register('settings', {
  init(container) {
    const cfg = HomesSB.getConfig();
    container.innerHTML = `
      <div class="page-title">설정</div>
      <div class="page-desc" style="margin-bottom:24px">Supabase 연결 및 데이터 관리</div>

      <div style="max-width:600px">
        <div class="card" style="margin-bottom:16px">
          <h3 style="font-weight:700;color:var(--text-h);margin-bottom:4px">
            <i class="ri-cloud-line"></i> Supabase 연결
          </h3>
          <p style="font-size:12px;color:var(--dim);margin-bottom:16px">Supabase를 연결하면 팀원 간 실시간 데이터 공유가 가능합니다.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div>
              <label class="form-label">Project URL</label>
              <input type="text" id="set-sb-url" class="form-input" placeholder="https://xxxxxxxx.supabase.co" value="${cfg.url||''}">
            </div>
            <div>
              <label class="form-label">Anon Key <span style="color:var(--dim)">(anon public)</span></label>
              <input type="password" id="set-sb-key" class="form-input" placeholder="eyJhbGciOiJ..." value="${cfg.key||''}">
            </div>
            <button class="btn btn-primary btn-full" onclick="SettingsMod.connectSB()">연결 저장 및 테스트</button>
            <div id="set-sb-msg" style="font-size:12px;text-align:center;min-height:20px"></div>
          </div>
        </div>

        <div class="card" style="margin-bottom:16px">
          <h3 style="font-weight:700;color:var(--text-h);margin-bottom:12px">
            <i class="ri-database-2-line"></i> 데이터 관리
          </h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-outline btn-full" onclick="SettingsMod.exportVOC()">
              <i class="ri-download-line"></i> VOC CSV 내보내기
            </button>
            <button class="btn btn-outline btn-full" onclick="SettingsMod.loadSamples()">
              <i class="ri-flask-line"></i> 샘플 데이터 불러오기
            </button>
            <button class="btn btn-danger btn-full" onclick="SettingsMod.clearAll()">
              <i class="ri-delete-bin-line"></i> VOC 로컬 데이터 초기화
            </button>
          </div>
        </div>

        <div class="card">
          <h3 style="font-weight:700;color:var(--text-h);margin-bottom:8px">
            <i class="ri-information-line"></i> 포탈 정보
          </h3>
          <div style="font-size:12px;color:var(--muted);line-height:2">
            <div>HOMES CX Portal v1.0</div>
            <div>Supabase Project: bqzzszmhzfkcbgoyavcn</div>
            <div>모듈: VOC 관리, 고객여정 설문, 헬프센터, 고객데이터, CX역할</div>
          </div>
        </div>
      </div>
    `;
  }
});

const SettingsMod = {
  async connectSB() {
    const url = document.getElementById('set-sb-url').value.trim();
    const key = document.getElementById('set-sb-key').value.trim();
    const msg = document.getElementById('set-sb-msg');
    if (!url || !key) { msg.innerHTML = '<span style="color:var(--red)">URL과 Key를 모두 입력하세요</span>'; return; }
    msg.innerHTML = '<span style="color:var(--muted)">연결 테스트 중...</span>';
    const result = await HomesSB.connect(url, key);
    if (result.ok) {
      msg.innerHTML = '<span style="color:var(--green)">연결 성공!</span>';
      HomesApp.toast('Supabase 연결 완료');
    } else {
      msg.innerHTML = `<span style="color:var(--red)">${result.error}</span>`;
    }
  },
  exportVOC() {
    if (typeof VocMod !== 'undefined' && VocMod.exportCSV) VocMod.exportCSV();
    else HomesApp.toast('VOC 모듈을 먼저 열어주세요');
  },
  loadSamples() {
    if (typeof VocMod !== 'undefined' && VocMod.loadSamples) VocMod.loadSamples();
    else HomesApp.toast('VOC 모듈을 먼저 열어주세요');
  },
  clearAll() {
    if (!confirm('모든 로컬 VOC 데이터를 삭제합니다.')) return;
    localStorage.removeItem('voc_data');
    HomesApp.toast('로컬 데이터 초기화 완료');
    HomesApp.emit('voc:updated');
  }
};
