/* HOMES CX Portal — CX Team & Roles Module (CX 팀/역할) */
HomesApp.register('cxroles', {
  init(container) {
    this.el = container;
    this.render();
  },

  render() {
    this.el.innerHTML = `
      <style>
        .cxr { font-family:'Pretendard',sans-serif; color:#0f172a; }
        .cxr-section { margin-bottom:32px; }
        .cxr-title { font-size:20px; font-weight:800; margin-bottom:6px; letter-spacing:-.02em; }
        .cxr-sub { font-size:13px; color:#64748b; margin-bottom:20px; }
        .cxr-card { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; }
        .cxr-card.dark { background:linear-gradient(135deg,#0f172a,#1e293b); color:#fff; border:none; }

        /* --- 운영구조 --- */
        .cxr-org-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
        .cxr-org-item { text-align:center; padding:18px 10px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; transition:all .2s; }
        .cxr-org-item:hover { border-color:#2563eb; transform:translateY(-2px); }
        .cxr-org-item.hl { background:linear-gradient(135deg,rgba(37,99,235,.08),rgba(37,99,235,.03)); border-color:#2563eb; box-shadow:0 4px 20px rgba(37,99,235,.12); }
        .cxr-org-abbr { font-size:22px; font-weight:900; font-family:'Space Mono',monospace; margin-bottom:4px; }
        .cxr-org-pct { font-size:28px; font-weight:900; font-family:'Space Mono',monospace; margin-bottom:6px; }
        .cxr-org-label { font-size:12px; color:#64748b; }

        .cxr-flow { display:flex; align-items:center; gap:0; flex-wrap:wrap; justify-content:center; }
        .cxr-flow-box { padding:12px 18px; border-radius:10px; font-size:13px; font-weight:700; text-align:center; min-width:100px; position:relative; }
        .cxr-flow-box .sub { font-size:10px; font-weight:400; color:#64748b; margin-top:4px; }
        .cxr-flow-arr { font-size:18px; color:#94a3b8; padding:0 6px; flex-shrink:0; }

        /* --- 고객경험 --- */
        .cxr-pain-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .cxr-pain-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; text-align:center; transition:all .2s; }
        .cxr-pain-card:hover { border-color:#f87171; transform:translateY(-2px); }
        .cxr-pain-icon { font-size:28px; margin-bottom:8px; }
        .cxr-pain-title { font-size:14px; font-weight:700; margin-bottom:4px; }
        .cxr-pain-desc { font-size:11px; color:#64748b; line-height:1.5; }

        .cxr-goal-banner { display:flex; align-items:center; justify-content:center; gap:40px; padding:20px; background:linear-gradient(135deg,rgba(37,99,235,.06),rgba(16,185,129,.06)); border:1px solid rgba(37,99,235,.2); border-radius:12px; margin-bottom:20px; }
        .cxr-goal-item { text-align:center; }
        .cxr-goal-val { font-size:24px; font-weight:900; font-family:'Space Mono',monospace; }
        .cxr-goal-lbl { font-size:12px; color:#64748b; margin-top:2px; }

        .cxr-om-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
        .cxr-om-item { text-align:center; padding:14px 8px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; }
        .cxr-om-num { width:26px; height:26px; border-radius:50%; background:#2563eb; color:#fff; font-size:12px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; margin-bottom:6px; }
        .cxr-om-label { font-size:12px; font-weight:600; }

        /* --- CX 프레임워크 --- */
        .cxr-fw-compare { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
        .cxr-fw-box { padding:18px; border-radius:12px; border:1px solid #e2e8f0; }
        .cxr-fw-box h4 { font-size:15px; font-weight:800; margin-bottom:10px; }
        .cxr-fw-flow { font-size:13px; color:#334155; line-height:2; }
        .cxr-fw-flow .arrow { color:#2563eb; font-weight:700; }

        .cxr-flywheel { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:16px; }
        .cxr-fly-step { padding:16px; border-radius:12px; border:1px solid #e2e8f0; position:relative; }
        .cxr-fly-num { width:28px; height:28px; border-radius:50%; font-size:13px; font-weight:900; display:flex; align-items:center; justify-content:center; margin-bottom:10px; color:#fff; }
        .cxr-fly-title { font-size:13px; font-weight:700; margin-bottom:6px; }
        .cxr-fly-desc { font-size:11px; color:#64748b; line-height:1.6; }
        .cxr-fly-step::after { content:'\\2192'; position:absolute; right:-12px; top:50%; transform:translateY(-50%); font-size:18px; color:#94a3b8; }
        .cxr-fly-step:last-child::after { content:'\\21BB'; color:#2563eb; font-weight:700; }

        /* --- CX역할 --- */
        .cxr-role-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .cxr-role-card { padding:18px; border-radius:12px; border:2px solid; text-align:center; transition:all .2s; }
        .cxr-role-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.08); }
        .cxr-role-step { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.05em; margin-bottom:8px; }
        .cxr-role-title { font-size:15px; font-weight:800; margin-bottom:8px; }
        .cxr-role-desc { font-size:12px; color:#64748b; line-height:1.6; }

        .cxr-conclusion { text-align:center; padding:20px; background:linear-gradient(135deg,#0f172a,#1e293b); color:#fff; border-radius:14px; }
        .cxr-conclusion h3 { font-size:16px; font-weight:800; margin-bottom:8px; }
        .cxr-conclusion p { font-size:13px; color:rgba(255,255,255,.7); line-height:1.7; }

        /* --- 기존 섹션 --- */
        .cxr-divider { border:none; border-top:2px dashed #e2e8f0; margin:40px 0; }

        @media(max-width:900px) {
          .cxr-org-grid, .cxr-pain-grid, .cxr-flywheel, .cxr-role-grid { grid-template-columns:repeat(2,1fr); }
          .cxr-fw-compare, .cxr-om-grid { grid-template-columns:repeat(2,1fr); }
          .cxr-flow { flex-direction:column; }
          .cxr-flow-arr { transform:rotate(90deg); }
        }
      </style>

      <div class="cxr">
        <div class="page-title">CX 팀 / 역할</div>
        <div class="page-desc" style="margin-bottom:28px">홈즈컴퍼니 운영구조, 고객경험 정의, CX 프레임워크, CX 역할 & 미션</div>

        <!-- ========== 1. 운영구조 ========== -->
        <div class="cxr-section">
          <div class="cxr-title">🏗 운영 조직 구조</div>
          <div class="cxr-sub">지점 운영 인력의 기능별 배분 — SM·LM·OM+CX·FM 4개 직무</div>

          <div class="cxr-org-grid">
            <div class="cxr-org-item">
              <div class="cxr-org-abbr" style="color:#8b5cf6">SM</div>
              <div class="cxr-org-pct" style="color:#8b5cf6">30%</div>
              <div class="cxr-org-label">Sales Manager<br>영업</div>
            </div>
            <div class="cxr-org-item">
              <div class="cxr-org-abbr" style="color:#2563eb">LM</div>
              <div class="cxr-org-pct" style="color:#2563eb">40%</div>
              <div class="cxr-org-label">Leasing<br>계약 · 리텐션</div>
            </div>
            <div class="cxr-org-item hl">
              <div class="cxr-org-abbr" style="color:#2563eb">OM+CX</div>
              <div class="cxr-org-pct" style="color:#2563eb">5%</div>
              <div class="cxr-org-label">Operations · CS대응<br><strong style="color:#2563eb">핵심 포지션</strong></div>
            </div>
            <div class="cxr-org-item">
              <div class="cxr-org-abbr" style="color:#f59e0b">FM</div>
              <div class="cxr-org-pct" style="color:#f59e0b">25%</div>
              <div class="cxr-org-label">Facility<br>시설관리</div>
            </div>
          </div>

          <div class="cxr-card" style="margin-bottom:0">
            <div style="font-size:14px;font-weight:700;margin-bottom:14px;">고객 여정 — 계약부터 연장/퇴실까지</div>
            <div class="cxr-flow">
              <div class="cxr-flow-box" style="background:#ede9fe;color:#6d28d9;">계약<div class="sub">SM · LM</div></div>
              <div class="cxr-flow-arr">→</div>
              <div class="cxr-flow-box" style="background:#dbeafe;color:#1d4ed8;">입주<div class="sub">OM+CX</div></div>
              <div class="cxr-flow-arr">→</div>
              <div class="cxr-flow-box" style="background:linear-gradient(135deg,#dbeafe,#bfdbfe);color:#1d4ed8;border:2px solid #2563eb;box-shadow:0 0 16px rgba(37,99,235,.15);">입주 적응(1주)<div class="sub">OM+CX · FM</div></div>
              <div class="cxr-flow-arr">→</div>
              <div class="cxr-flow-box" style="background:#dcfce7;color:#15803d;">안정화<div class="sub">LM · OM+CX</div></div>
              <div class="cxr-flow-arr">→</div>
              <div class="cxr-flow-box" style="background:#fef3c7;color:#b45309;">연장 / 퇴실<div class="sub">LM · OM+CX</div></div>
            </div>
          </div>
        </div>

        <!-- ========== 2. 고객경험 ========== -->
        <div class="cxr-section">
          <div class="cxr-title">😣 고객 PAIN POINT</div>
          <div class="cxr-sub">1인가구 입주자가 실제로 겪는 4가지 핵심 문제</div>

          <div class="cxr-pain-grid">
            <div class="cxr-pain-card">
              <div class="cxr-pain-icon">🏠</div>
              <div class="cxr-pain-title">입주 전</div>
              <div class="cxr-pain-desc">정보 비대칭과 불안<br>어떤 곳인지 모른 채 계약</div>
            </div>
            <div class="cxr-pain-card">
              <div class="cxr-pain-icon">🔧</div>
              <div class="cxr-pain-title">살면서</div>
              <div class="cxr-pain-desc">혼자 고장수리, 아플 때<br>도움 요청이 어려움</div>
            </div>
            <div class="cxr-pain-card">
              <div class="cxr-pain-icon">💬</div>
              <div class="cxr-pain-title">관계</div>
              <div class="cxr-pain-desc">집주인 소통, 고립감<br>커뮤니티 부재</div>
            </div>
            <div class="cxr-pain-card">
              <div class="cxr-pain-icon">📦</div>
              <div class="cxr-pain-title">퇴거 시</div>
              <div class="cxr-pain-desc">원상복구, 보증금 분쟁<br>퇴실 절차 불투명</div>
            </div>
          </div>

          <div class="cxr-goal-banner">
            <div class="cxr-goal-item">
              <div class="cxr-goal-val" style="color:#2563eb">Retention ↑</div>
              <div class="cxr-goal-lbl">재계약 · 유지 상승</div>
            </div>
            <div style="font-size:28px;color:#94a3b8;font-weight:300">+</div>
            <div class="cxr-goal-item">
              <div class="cxr-goal-val" style="color:#10b981">NPS ↑</div>
              <div class="cxr-goal-lbl">만족도 · 추천 상승</div>
            </div>
          </div>

          <div style="font-size:14px;font-weight:700;margin-bottom:12px;">OM(운영) + CX 관리 5개 영역</div>
          <div class="cxr-om-grid">
            <div class="cxr-om-item"><div class="cxr-om-num">1</div><div class="cxr-om-label">정보 안내</div></div>
            <div class="cxr-om-item"><div class="cxr-om-num">2</div><div class="cxr-om-label">서비스</div></div>
            <div class="cxr-om-item"><div class="cxr-om-num">3</div><div class="cxr-om-label">공용 공간</div></div>
            <div class="cxr-om-item"><div class="cxr-om-num">4</div><div class="cxr-om-label">시설</div></div>
            <div class="cxr-om-item"><div class="cxr-om-num">5</div><div class="cxr-om-label">생활 편의</div></div>
          </div>
        </div>

        <!-- ========== 3. CX 프레임워크 ========== -->
        <div class="cxr-section">
          <div class="cxr-title">⚙️ CX 프레임워크</div>
          <div class="cxr-sub">고객 불만의 본질을 구분하고, 순환 개선 체계로 지속 성장</div>

          <div class="cxr-fw-compare">
            <div class="cxr-fw-box" style="background:#fef3c7;">
              <h4 style="color:#b45309;">😤 번거로움 해소</h4>
              <div class="cxr-fw-flow">
                절차가 복잡하다 <span class="arrow">→</span> 편리해졌다 <span class="arrow">→</span> <strong>만족</strong>
              </div>
              <div style="margin-top:10px;font-size:11px;color:#92400e;line-height:1.6">프로세스 간소화, 셀프서비스, 자동 안내 등으로 <b>절차적 마찰</b>을 제거</div>
            </div>
            <div class="cxr-fw-box" style="background:#dbeafe;">
              <h4 style="color:#1d4ed8;">😰 불편함 해소</h4>
              <div class="cxr-fw-flow">
                환경이 나쁘다 <span class="arrow">→</span> 살 만해졌다 <span class="arrow">→</span> <strong>의지 → 신뢰</strong>
              </div>
              <div style="margin-top:10px;font-size:11px;color:#1e40af;line-height:1.6">시설 품질, 소음, 안전 등 <b>환경적 불편</b>을 해소하여 신뢰 구축</div>
            </div>
          </div>

          <div style="font-size:15px;font-weight:800;margin-bottom:14px;">🔄 CX FLYWHEEL — 순환 개선 체계</div>
          <div class="cxr-flywheel">
            <div class="cxr-fly-step" style="border-color:#2563eb;background:rgba(37,99,235,.04);">
              <div class="cxr-fly-num" style="background:#2563eb;">1</div>
              <div class="cxr-fly-title">CX 구조 기본 실행</div>
              <div class="cxr-fly-desc">고객 데이터 수집<br>VoC 수집 체계화</div>
            </div>
            <div class="cxr-fly-step" style="border-color:#8b5cf6;background:rgba(139,92,246,.04);">
              <div class="cxr-fly-num" style="background:#8b5cf6;">2</div>
              <div class="cxr-fly-title">VoC 분석 및 대응</div>
              <div class="cxr-fly-desc">문제 진단 · 우선순위 해결<br>반복 문의 절감</div>
            </div>
            <div class="cxr-fly-step" style="border-color:#10b981;background:rgba(16,185,129,.04);">
              <div class="cxr-fly-num" style="background:#10b981;">3</div>
              <div class="cxr-fly-title">실행 및 고객경험 개선</div>
              <div class="cxr-fly-desc">저비용 고효과 액션<br>현장 적용 · 검증</div>
            </div>
            <div class="cxr-fly-step" style="border-color:#f59e0b;background:rgba(245,158,11,.04);">
              <div class="cxr-fly-num" style="background:#f59e0b;">4</div>
              <div class="cxr-fly-title">더 나은 고객경험 탐색</div>
              <div class="cxr-fly-desc">고객 인터뷰<br>커뮤니티 · 멤버십</div>
            </div>
          </div>
          <div style="text-align:center;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:13px;font-weight:700;color:#15803d;">
            🎯 최종 목표: <span style="font-family:'Space Mono',monospace;font-size:15px;">NPS ↑ · Retention ↑</span> &nbsp;|&nbsp; 반복문의 ↓ · 고객만족 ↑
          </div>
        </div>

        <!-- ========== 4. CX역할 ========== -->
        <div class="cxr-section">
          <div class="cxr-title">🎯 CX의 역할</div>
          <div class="cxr-sub">OM에서 시작해서 고객 경험으로 완성한다 — 4단계 CX 운영 책임</div>

          <div class="cxr-role-grid">
            <div class="cxr-role-card" style="border-color:#2563eb;background:rgba(37,99,235,.04);">
              <div class="cxr-role-step" style="color:#2563eb;">STEP 1</div>
              <div class="cxr-role-title" style="color:#1d4ed8;">진단</div>
              <div class="cxr-role-desc">OM 5개 영역에서<br><strong>문제를 발견하고 정의</strong></div>
            </div>
            <div class="cxr-role-card" style="border-color:#8b5cf6;background:rgba(139,92,246,.04);">
              <div class="cxr-role-step" style="color:#8b5cf6;">STEP 2</div>
              <div class="cxr-role-title" style="color:#7c3aed;">데이터 수집</div>
              <div class="cxr-role-desc">있으면 분석하고<br><strong>없으면 수집 체계를 만든다</strong></div>
            </div>
            <div class="cxr-role-card" style="border-color:#10b981;background:rgba(16,185,129,.04);">
              <div class="cxr-role-step" style="color:#10b981;">STEP 3</div>
              <div class="cxr-role-title" style="color:#059669;">설계 · 실행</div>
              <div class="cxr-role-desc">데이터 기반 개선안을 설계하고<br><strong>현장에 적용</strong></div>
            </div>
            <div class="cxr-role-card" style="border-color:#f59e0b;background:rgba(245,158,11,.04);">
              <div class="cxr-role-step" style="color:#f59e0b;">STEP 4</div>
              <div class="cxr-role-title" style="color:#d97706;">측정 · 개선</div>
              <div class="cxr-role-desc">NPS로 효과를 측정하고<br><strong>반복 개선 사이클 운영</strong></div>
            </div>
          </div>

          <div class="cxr-conclusion">
            <h3>CX본부의 책임 범위</h3>
            <p>OM 문제 진단 → 데이터 수집 · 설계 → 실행 → 측정 · 개선까지<br>
            <strong style="color:#4fc3f7;">고객 경험의 전체 사이클을 책임</strong>지는 조직입니다.</p>
          </div>
        </div>

        <!-- ========== 기존 섹션 구분선 ========== -->
        <hr class="cxr-divider">

        <!-- Mission -->
        <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:white">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
            <div style="width:44px;height:44px;background:rgba(255,255,255,.1);border-radius:12px;display:flex;align-items:center;justify-content:center">
              <i class="ri-rocket-2-line" style="font-size:22px"></i>
            </div>
            <div>
              <div style="font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.05em">CX Mission</div>
              <div style="font-size:18px;font-weight:800;letter-spacing:-.02em">"AX-CX" Tech Driven</div>
            </div>
          </div>
          <div style="font-size:14px;line-height:1.7;color:rgba(255,255,255,.8);margin-bottom:12px">
            1인가구 공유주거 운영솔루션 회사로 도약
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span style="font-size:11px;padding:4px 10px;background:rgba(255,255,255,.1);border-radius:20px">AX (AI Transformation)</span>
            <span style="font-size:11px;padding:4px 10px;background:rgba(255,255,255,.1);border-radius:20px">고객경험 혁신</span>
            <span style="font-size:11px;padding:4px 10px;background:rgba(255,255,255,.1);border-radius:20px">운영 자동화</span>
            <span style="font-size:11px;padding:4px 10px;background:rgba(255,255,255,.1);border-radius:20px">데이터 기반 의사결정</span>
          </div>
        </div>

        <!-- CP 10 KPI -->
        <div class="card" style="margin-bottom:20px">
          <div class="section-title"><i class="ri-bar-chart-grouped-line"></i> CP 10 핵심 KPI</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:16px">전사 핵심 지표 10개 중 CX 관련 KPI</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${this._renderKPIs().join('')}
          </div>
        </div>

        <!-- CX Team Structure -->
        <div class="card" style="margin-bottom:20px">
          <div class="section-title"><i class="ri-organization-chart"></i> CX 조직 구조 (3-Division)</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:16px">Brand · CX · Space 3개 Division 체계</div>
          <div class="grid-3">
            <div style="border:1px solid var(--border);border-radius:var(--r);overflow:hidden">
              <div style="padding:16px;background:var(--purple-muted);border-bottom:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <i class="ri-megaphone-line" style="font-size:18px;color:var(--purple)"></i>
                  <span style="font-weight:700;font-size:14px;color:var(--purple)">Brand</span>
                </div>
                <div style="font-size:11px;color:var(--muted)">브랜드 전략 및 마케팅</div>
              </div>
              <div style="padding:16px;font-size:12px;color:var(--text);line-height:2">
                <div>&bull; 브랜드 매뉴얼 수립</div>
                <div>&bull; 마케팅 채널 관리</div>
                <div>&bull; 콘텐츠 기획/제작</div>
                <div>&bull; SNS 운영</div>
                <div>&bull; 홈페이지/직방/다방 관리</div>
              </div>
            </div>
            <div style="border:2px solid var(--accent);border-radius:var(--r);overflow:hidden">
              <div style="padding:16px;background:var(--accent-muted);border-bottom:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <i class="ri-customer-service-2-line" style="font-size:18px;color:var(--accent)"></i>
                  <span style="font-weight:700;font-size:14px;color:var(--accent)">CX</span>
                  <span class="badge badge-blue" style="font-size:9px">Core</span>
                </div>
                <div style="font-size:11px;color:var(--muted)">고객경험 관리 및 운영</div>
              </div>
              <div style="padding:16px;font-size:12px;color:var(--text);line-height:2">
                <div>&bull; VOC 접수/처리/분석</div>
                <div>&bull; 고객 여정 관리 (투어~퇴실)</div>
                <div>&bull; 헬프센터 운영</div>
                <div>&bull; 고객 만족도 NPS 관리</div>
                <div>&bull; CX 자동화 시스템 구축</div>
                <div>&bull; 설문/피드백 수집</div>
              </div>
            </div>
            <div style="border:1px solid var(--border);border-radius:var(--r);overflow:hidden">
              <div style="padding:16px;background:var(--green-muted);border-bottom:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                  <i class="ri-building-2-line" style="font-size:18px;color:var(--green)"></i>
                  <span style="font-weight:700;font-size:14px;color:var(--green)">Space</span>
                </div>
                <div style="font-size:11px;color:var(--muted)">공간 운영 및 시설 관리</div>
              </div>
              <div style="padding:16px;font-size:12px;color:var(--text);line-height:2">
                <div>&bull; 지점 시설 관리</div>
                <div>&bull; 관리사무소 협업</div>
                <div>&bull; 입주/퇴실 프로세스</div>
                <div>&bull; 공실 관리 및 객실 정비</div>
                <div>&bull; 안전/보안 관리</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Work Style -->
        <div class="card" style="margin-bottom:20px">
          <div class="section-title"><i class="ri-calendar-schedule-line"></i> Work Style</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:16px">CX팀 업무 규칙 및 협업 방식</div>
          <div class="grid-3">
            <div class="card card-sm" style="background:var(--bg2)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div style="width:32px;height:32px;background:var(--accent-muted);border-radius:8px;display:flex;align-items:center;justify-content:center">
                  <i class="ri-calendar-check-line" style="color:var(--accent)"></i>
                </div>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">Weekly</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.8">
                <div>&bull; <strong>월요일 AM</strong> 주간 계획 공유</div>
                <div>&bull; <strong>금요일 PM</strong> 주간 회고</div>
                <div>&bull; Notion 주간 보고서 작성</div>
                <div>&bull; VOC 주간 리포트 발행</div>
              </div>
            </div>
            <div class="card card-sm" style="background:var(--bg2)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div style="width:32px;height:32px;background:var(--green-muted);border-radius:8px;display:flex;align-items:center;justify-content:center">
                  <i class="ri-task-line" style="color:var(--green)"></i>
                </div>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">Task</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.8">
                <div>&bull; Notion 태스크 보드 사용</div>
                <div>&bull; 우선순위: <span class="badge badge-red" style="font-size:10px">긴급</span> <span class="badge badge-orange" style="font-size:10px">상</span> <span class="badge badge-blue" style="font-size:10px">중</span> <span class="badge badge-green" style="font-size:10px">하</span></div>
                <div>&bull; SLA: 긴급 2h / 상 24h / 중 48h</div>
                <div>&bull; 완료 시 처리 내용 기록 필수</div>
              </div>
            </div>
            <div class="card card-sm" style="background:var(--bg2)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
                <div style="width:32px;height:32px;background:var(--purple-muted);border-radius:8px;display:flex;align-items:center;justify-content:center">
                  <i class="ri-discuss-line" style="color:var(--purple)"></i>
                </div>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">Meeting</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.8">
                <div>&bull; 회의 전 안건 사전 공유</div>
                <div>&bull; 30분 이내 원칙</div>
                <div>&bull; 액션 아이템 명확히 기록</div>
                <div>&bull; Notion 미팅 노트 활용</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Focus Areas -->
        <div class="card">
          <div class="section-title"><i class="ri-focus-3-line"></i> CX 중점 추진 과제</div>
          <div class="grid-2">
            <div style="padding:16px;background:var(--bg2);border-radius:var(--r)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:20px">&#x1f4d6;</span>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">CP #9 브랜드 매뉴얼</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.7">
                홈즈 브랜드 아이덴티티, 톤앤매너, 커뮤니케이션 가이드라인을 체계화하여 모든 접점에서 일관된 브랜드 경험을 제공합니다.
              </div>
              <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
                <span class="badge badge-purple">브랜드 가이드</span>
                <span class="badge badge-purple">톤앤매너</span>
                <span class="badge badge-purple">디자인 시스템</span>
              </div>
            </div>
            <div style="padding:16px;background:var(--bg2);border-radius:var(--r)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:20px">&#x2b50;</span>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">CP #10 고객만족도 NPS 70+</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.7">
                Net Promoter Score 70점 이상 달성을 목표로 고객 여정 전 단계에서 만족도를 측정하고 개선합니다.
              </div>
              <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
                <span class="badge badge-green">NPS 70+</span>
                <span class="badge badge-green">CSAT</span>
                <span class="badge badge-green">CES</span>
              </div>
            </div>
            <div style="padding:16px;background:var(--bg2);border-radius:var(--r)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:20px">&#x1f916;</span>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">AX-CX 자동화</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.7">
                AI/자동화 도구를 활용하여 VOC 분류, 응대 자동화, 고객 인사이트 분석 등 CX 업무 효율을 극대화합니다.
              </div>
              <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
                <span class="badge badge-cyan">AI 자동분류</span>
                <span class="badge badge-cyan">챗봇</span>
                <span class="badge badge-cyan">자동 리포트</span>
              </div>
            </div>
            <div style="padding:16px;background:var(--bg2);border-radius:var(--r)">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="font-size:20px">&#x1f3e0;</span>
                <span style="font-weight:700;font-size:13px;color:var(--text-h)">공간 운영 고도화</span>
              </div>
              <div style="font-size:12px;color:var(--text);line-height:1.7">
                7개 지점(선정릉, 남영, 망원, 가산, 회기, 원효로, 안암)의 시설/공실 관리를 데이터 기반으로 최적화합니다.
              </div>
              <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
                <span class="badge badge-orange">공실 최소화</span>
                <span class="badge badge-orange">시설 예방정비</span>
                <span class="badge badge-orange">입퇴실 자동화</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _renderKPIs() {
    const kpis = [
      { num: 1, title: '매출 목표 달성', desc: '월/분기 매출 계획 대비 실적', icon: 'ri-money-dollar-circle-line', color: 'var(--green)', cx: false },
      { num: 2, title: '공실률 관리', desc: '전체 객실 대비 공실 비율 최소화', icon: 'ri-home-line', color: 'var(--orange)', cx: false },
      { num: 3, title: '투어 전환율', desc: '투어 → 계약 전환율 향상', icon: 'ri-route-line', color: 'var(--accent)', cx: true },
      { num: 4, title: '계약 연장률', desc: '기존 입주자 재계약 비율', icon: 'ri-refresh-line', color: 'var(--indigo)', cx: true },
      { num: 5, title: '관리비 수납률', desc: '관리비 정기 수납 비율', icon: 'ri-bank-card-line', color: 'var(--green)', cx: false },
      { num: 6, title: 'VOC 처리 시간', desc: 'VOC 접수~완료 평균 소요시간 단축', icon: 'ri-timer-line', color: 'var(--red)', cx: true },
      { num: 7, title: '시설 하자 대응', desc: '시설 문제 발생~해결 소요시간', icon: 'ri-tools-line', color: 'var(--orange)', cx: true },
      { num: 8, title: '운영 비용 효율', desc: '관리 운영비 최적화', icon: 'ri-funds-line', color: 'var(--purple)', cx: false },
      { num: 9, title: '브랜드 매뉴얼', desc: '브랜드 가이드라인 수립 및 적용', icon: 'ri-book-2-line', color: 'var(--purple)', cx: true },
      { num: 10, title: '고객만족도 NPS 70+', desc: 'Net Promoter Score 70점 이상 달성', icon: 'ri-star-smile-line', color: 'var(--accent)', cx: true }
    ];

    return kpis.map(k => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:${k.cx ? 'var(--accent-muted)' : 'var(--bg2)'};border-radius:var(--r-sm);${k.num >= 9 ? 'border:1.5px solid var(--accent)' : ''}">
        <div style="width:28px;height:28px;background:${k.cx ? 'var(--accent)' : 'var(--bg)'};color:${k.cx ? 'white' : 'var(--dim)'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0">${k.num}</div>
        <i class="${k.icon}" style="font-size:16px;color:${k.color};flex-shrink:0"></i>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text-h)">${k.title}</div>
          <div style="font-size:11px;color:var(--muted)">${k.desc}</div>
        </div>
        ${k.cx ? '<span class="badge badge-blue" style="font-size:9px;flex-shrink:0">CX</span>' : ''}
      </div>
    `);
  }
});
