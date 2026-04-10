/* HOMES CX Portal — CX Team & Roles Module (CX 팀/역할) */
HomesApp.register('cxroles', {
  init(container) {
    this.el = container;
    this.render();
  },

  render() {
    this.el.innerHTML = `
      <div class="page-title">CX 팀 / 역할</div>
      <div class="page-desc" style="margin-bottom:24px">홈즈컴퍼니 CX 조직 구조, 미션, KPI, 업무 방식</div>

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
        <div class="section-title"><i class="ri-organization-chart"></i> CX 조직 구조</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:16px">3개 Division 체계</div>

        <div class="grid-3">
          <!-- Brand Division -->
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

          <!-- CX Division -->
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

          <!-- Space Division -->
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
          <!-- Weekly -->
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

          <!-- Task -->
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

          <!-- Meeting -->
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
