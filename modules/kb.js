/* HOMES CX Portal — Knowledge Base Module (헬프센터) */
/* Depends on: kb-data.js (DEFAULT_KB, KBStorage), HomesSB, HomesApp */

HomesApp.register('kb', {
  currentView: 'customer',  // 'customer' | 'admin'
  currentLocation: 'all',
  currentEditId: null,
  searchIndex: [],

  init(container, sub) {
    this.el = container;
    this._initKBStorage();
    this._buildSearchIndex();
    this._buildShell();
    if (sub) this.currentView = sub;
    this._showView(this.currentView);
  },

  onShow(sub) {
    if (sub && sub !== this.currentView) {
      this.currentView = sub;
    }
    this._showView(this.currentView);
  },

  /* ================================================================
     KBStorage init — use portal's shared Supabase via HomesSB
     ================================================================ */
  _initKBStorage() {
    if (typeof KBStorage !== 'undefined') {
      const SB = HomesSB.get();
      if (SB) {
        KBStorage.initSupabase();
        KBStorage.fetchAll().catch(() => {});
      }
    }
  },

  _buildSearchIndex() {
    const KB = KBStorage.getKB();
    this.searchIndex = Object.entries(KB.articles).map(([id, a]) => ({
      id, title: a.title, tags: a.tags || [], category: a.category, popular: a.popular || 999
    }));
  },

  /* ================================================================
     Shell — tab container for customer / admin views
     ================================================================ */
  _buildShell() {
    this.el.innerHTML = `
      <div id="kb-customer-view" style="display:none"></div>
      <div id="kb-admin-view" style="display:none"></div>
    `;
  },

  _showView(view) {
    this.currentView = view || 'customer';
    this.el.querySelector('#kb-customer-view').style.display = 'none';
    this.el.querySelector('#kb-admin-view').style.display = 'none';

    if (this.currentView === 'admin') {
      this._renderAdmin();
      this.el.querySelector('#kb-admin-view').style.display = 'block';
    } else {
      this._renderCustomerHome();
      this.el.querySelector('#kb-customer-view').style.display = 'block';
    }
  },

  /* ================================================================
     CUSTOMER VIEW — Help Center
     ================================================================ */
  _renderCustomerHome() {
    const KB = KBStorage.getKB();
    const popular = this.searchIndex
      .filter(a => a.popular < 999)
      .sort((a, b) => a.popular - b.popular)
      .slice(0, 10);

    const locations = ['전체 지점', '선정릉', '남영', '망원', '가산', '회기', '원효로', '안암'];

    const container = this.el.querySelector('#kb-customer-view');
    container.innerHTML = `
      <div class="page-title">헬프센터</div>
      <div class="page-desc" style="margin-bottom:20px">입주 생활에 필요한 정보를 검색해보세요</div>

      <!-- Location Filter + Search -->
      <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center">
        <select id="kb-loc-filter" class="form-select" style="width:140px;flex-shrink:0">
          ${locations.map((l, i) => `<option value="${i === 0 ? 'all' : l}">${l}</option>`).join('')}
        </select>
        <div style="flex:1;min-width:200px;position:relative">
          <i class="ri-search-line" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--dim)"></i>
          <input id="kb-search" type="text" class="form-input" style="padding-left:32px" placeholder="검색: 보일러, 관리비, 퇴실 절차, 주차..." autocomplete="off">
          <div id="kb-search-results" style="display:none;position:absolute;top:100%;left:0;right:0;z-index:50;background:var(--bg);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow);max-height:320px;overflow-y:auto;margin-top:4px"></div>
        </div>
      </div>

      <!-- Hero Quick Actions -->
      <div class="grid-4" style="margin-bottom:20px">
        <div class="card card-sm" style="text-align:center;cursor:pointer" data-kb-quick="emergency-contact">
          <div style="font-size:22px;margin-bottom:2px;color:var(--red)"><i class="ri-alarm-warning-line"></i></div>
          <div style="font-size:12px;font-weight:600">긴급 연락처</div>
        </div>
        <div class="card card-sm" style="text-align:center;cursor:pointer" data-kb-quick="move-in-checklist">
          <div style="font-size:22px;margin-bottom:2px;color:var(--accent)"><i class="ri-checkbox-circle-line"></i></div>
          <div style="font-size:12px;font-weight:600">입주 체크리스트</div>
        </div>
        <div class="card card-sm" style="text-align:center;cursor:pointer" data-kb-quick="management-fee">
          <div style="font-size:22px;margin-bottom:2px;color:var(--accent)"><i class="ri-money-cny-circle-line"></i></div>
          <div style="font-size:12px;font-weight:600">관리비 안내</div>
        </div>
        <div class="card card-sm" style="text-align:center;cursor:pointer" data-kb-quick="move-out-process">
          <div style="font-size:22px;margin-bottom:2px;color:var(--accent)"><i class="ri-door-open-line"></i></div>
          <div style="font-size:12px;font-weight:600">퇴실 안내</div>
        </div>
      </div>

      <!-- Categories -->
      <div class="section-title"><i class="ri-folder-3-line"></i> 카테고리</div>
      <div class="grid-3" style="margin-bottom:24px" id="kb-cat-grid">
        ${KB.categories.map(cat => `
          <div class="card card-sm" style="cursor:pointer" data-kb-cat="${cat.id}">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <div style="width:36px;height:36px;background:var(--bg2);border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center">
                <i class="${cat.icon}" style="font-size:18px;color:var(--text-h)"></i>
              </div>
              <div style="font-weight:700;font-size:14px;color:var(--text-h)">${cat.title}</div>
            </div>
            <div style="font-size:12px;color:var(--muted)">${cat.desc}</div>
            <div style="font-size:11px;color:var(--accent);margin-top:6px;font-weight:600">${cat.articleIds.length}개 문서 &rarr;</div>
          </div>
        `).join('')}
      </div>

      <!-- Popular Articles -->
      <div class="section-title"><i class="ri-fire-line"></i> 자주 묻는 질문</div>
      <div class="card" style="padding:0;overflow:hidden" id="kb-popular">
        ${popular.map((a, i) => {
          const cat = KB.categories.find(c => c.id === a.category);
          return `<div style="display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid var(--border);cursor:pointer" data-kb-article="${a.id}">
            <span style="color:var(--dim);font-weight:700;font-size:12px;width:20px;text-align:right;flex-shrink:0">${i + 1}</span>
            <span class="badge badge-gray" style="flex-shrink:0">${cat ? cat.title : ''}</span>
            <span style="font-size:13px;color:var(--text);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.title}</span>
            <i class="ri-arrow-right-s-line" style="color:var(--dim);flex-shrink:0"></i>
          </div>`;
        }).join('')}
      </div>

      <!-- Category Detail View (hidden) -->
      <div id="kb-cat-detail" style="display:none"></div>

      <!-- Article View (hidden) -->
      <div id="kb-article-detail" style="display:none"></div>

      <!-- Footer info -->
      <div style="margin-top:32px;padding:20px;background:var(--bg2);border-radius:var(--r);font-size:12px;color:var(--muted);text-align:center;line-height:1.8">
        <div>대표번호 <strong style="color:var(--text-h)">1544-0338</strong> | 평일 09:00~18:00</div>
        <div>긴급 시설: 24시간 카카오 채널 접수</div>
        <div style="margin-top:4px;font-size:11px;color:var(--dim)">선정릉 &middot; 남영 &middot; 망원 &middot; 가산 &middot; 회기 &middot; 원효로 &middot; 안암</div>
      </div>
    `;

    // Bind events
    this._bindCustomerEvents(container);
  },

  _bindCustomerEvents(root) {
    const self = this;

    // Quick action cards
    root.querySelectorAll('[data-kb-quick]').forEach(el => {
      el.onclick = () => self._showArticle(el.dataset.kbQuick);
    });

    // Category cards
    root.querySelectorAll('[data-kb-cat]').forEach(el => {
      el.onclick = () => self._showCategory(el.dataset.kbCat);
    });

    // Popular article clicks
    root.querySelectorAll('[data-kb-article]').forEach(el => {
      el.onclick = () => self._showArticle(el.dataset.kbArticle);
    });

    // Location filter
    const locFilter = root.querySelector('#kb-loc-filter');
    if (locFilter) {
      locFilter.value = this.currentLocation;
      locFilter.onchange = () => {
        self.currentLocation = locFilter.value;
        self._applyLocationFilter();
        HomesApp.toast(self.currentLocation === 'all' ? '전체 지점 문서 표시' : `${self.currentLocation}점 선택됨`);
      };
    }

    // Search
    const searchInput = root.querySelector('#kb-search');
    const searchResults = root.querySelector('#kb-search-results');
    if (searchInput && searchResults) {
      searchInput.oninput = () => self._handleSearch(searchInput.value, searchResults);
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#kb-search') && !e.target.closest('#kb-search-results')) {
          searchResults.style.display = 'none';
        }
      });
    }
  },

  _handleSearch(query, container) {
    if (!query.trim()) { container.style.display = 'none'; return; }
    const KB = KBStorage.getKB();
    const q = query.toLowerCase().trim();
    const results = this.searchIndex
      .filter(a => a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)))
      .slice(0, 8);

    if (results.length === 0) {
      container.innerHTML = `<div style="padding:16px;text-align:center;font-size:13px;color:var(--muted)">
        <p>검색 결과가 없습니다.</p>
        <p style="margin-top:4px">대표번호 <strong>1544-0338</strong> 또는 카카오 채널로 문의해주세요.</p>
      </div>`;
    } else {
      const self = this;
      container.innerHTML = results.map(a => {
        const cat = KB.categories.find(c => c.id === a.category);
        return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--border)" data-kb-sr="${a.id}">
          <span class="badge badge-gray" style="flex-shrink:0">${cat ? cat.title : ''}</span>
          <span style="font-size:13px;color:var(--text);flex:1">${a.title}</span>
          <i class="ri-arrow-right-s-line" style="color:var(--dim)"></i>
        </div>`;
      }).join('');
      container.querySelectorAll('[data-kb-sr]').forEach(el => {
        el.onclick = () => { container.style.display = 'none'; self._showArticle(el.dataset.kbSr); };
      });
    }
    container.style.display = 'block';
  },

  /* ── Show Category ── */
  _showCategory(catId) {
    const KB = KBStorage.getKB();
    const cat = KB.categories.find(c => c.id === catId);
    if (!cat) return;

    const articles = cat.articleIds.map(id => ({ id, ...KB.articles[id] })).filter(Boolean);
    const self = this;

    // Hide home sections, show detail
    const cv = this.el.querySelector('#kb-customer-view');
    const homeEls = cv.querySelectorAll(':scope > :not(#kb-cat-detail):not(#kb-article-detail)');
    homeEls.forEach(el => el.style.display = 'none');

    const detail = cv.querySelector('#kb-cat-detail');
    detail.style.display = 'block';
    detail.innerHTML = `
      <nav style="font-size:12px;color:var(--muted);margin-bottom:16px">
        <a href="#" style="color:var(--accent)" id="kb-back-home">홈</a>
        <span style="margin:0 6px">&rsaquo;</span>
        <span style="color:var(--text-h);font-weight:600">${cat.title}</span>
      </nav>
      <div class="card" style="display:flex;align-items:center;gap:14px;margin-bottom:16px;padding:16px">
        <div style="width:44px;height:44px;background:var(--bg2);border-radius:var(--r);display:flex;align-items:center;justify-content:center">
          <i class="${cat.icon}" style="font-size:22px;color:var(--text-h)"></i>
        </div>
        <div>
          <div style="font-weight:700;font-size:16px;color:var(--text-h)">${cat.title}</div>
          <div style="font-size:12px;color:var(--muted)">${cat.desc}</div>
        </div>
      </div>
      <div class="card" style="padding:0;overflow:hidden">
        ${articles.map(a => `<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer" data-kb-article="${a.id}">
          <i class="ri-article-line" style="color:var(--dim)"></i>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text)">${a.title}</div>
            <div style="font-size:11px;color:var(--dim);margin-top:2px"><i class="ri-time-line"></i> ${a.time || 2}분 &middot; ${a.difficulty || '초급'}</div>
          </div>
          <i class="ri-arrow-right-s-line" style="color:var(--dim)"></i>
        </div>`).join('')}
      </div>
    `;

    detail.querySelector('#kb-back-home').onclick = (e) => { e.preventDefault(); self._backToHome(); };
    detail.querySelectorAll('[data-kb-article]').forEach(el => {
      el.onclick = () => self._showArticle(el.dataset.kbArticle);
    });
  },

  /* ── Show Article ── */
  _showArticle(articleId) {
    const KB = KBStorage.getKB();
    const article = KB.articles[articleId];
    if (!article) return;

    const cat = KB.categories.find(c => c.id === article.category);
    const self = this;

    // Hide home & category, show article detail
    const cv = this.el.querySelector('#kb-customer-view');
    const homeEls = cv.querySelectorAll(':scope > :not(#kb-article-detail)');
    homeEls.forEach(el => el.style.display = 'none');

    const detail = cv.querySelector('#kb-article-detail');
    detail.style.display = 'block';

    // Related articles
    let relatedHtml = '';
    if (article.related && article.related.length > 0) {
      const relItems = article.related.filter(id => KB.articles[id]).map(id => {
        const ra = KB.articles[id];
        const rc = KB.categories.find(c => c.id === ra.category);
        return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border);cursor:pointer" data-kb-article="${id}">
          <span class="badge badge-gray" style="flex-shrink:0">${rc ? rc.title : ''}</span>
          <span style="font-size:13px;color:var(--text);flex:1">${ra.title}</span>
          <i class="ri-arrow-right-s-line" style="color:var(--dim)"></i>
        </div>`;
      }).join('');
      relatedHtml = `
        <div style="margin-top:20px">
          <div class="section-title"><i class="ri-links-line"></i> 관련 문서</div>
          <div class="card" style="padding:0;overflow:hidden">${relItems}</div>
        </div>`;
    }

    detail.innerHTML = `
      <nav style="font-size:12px;color:var(--muted);margin-bottom:16px">
        <a href="#" style="color:var(--accent)" id="kb-art-home">홈</a>
        <span style="margin:0 6px">&rsaquo;</span>
        <a href="#" style="color:var(--accent)" id="kb-art-cat">${cat ? cat.title : ''}</a>
        <span style="margin:0 6px">&rsaquo;</span>
        <span style="color:var(--text-h);font-weight:600">${article.title}</span>
      </nav>

      <div class="card">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
          <span class="badge badge-gray">${cat ? cat.title : ''}</span>
          <span style="font-size:11px;color:var(--dim)"><i class="ri-time-line"></i> ${article.time || 2}분</span>
          <span style="font-size:11px;color:var(--dim)">&middot; ${article.difficulty || '초급'}</span>
        </div>
        <h2 style="font-size:18px;font-weight:800;color:var(--text-h);margin-bottom:16px;letter-spacing:-.02em">${article.title}</h2>
        <div class="kb-article-body" style="font-size:13px;line-height:1.8;color:var(--text)">
          ${article.content}
        </div>
      </div>

      <!-- Feedback -->
      <div class="card" style="text-align:center;margin-top:16px">
        <p style="font-size:13px;color:var(--muted);margin-bottom:10px">이 문서가 도움이 되었나요?</p>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="btn btn-primary" id="kb-fb-yes"><i class="ri-thumb-up-line"></i> 도움이 됐어요</button>
          <button class="btn btn-outline" id="kb-fb-no"><i class="ri-thumb-down-line"></i> 아직 해결 안됨</button>
        </div>
        <div id="kb-fb-result" style="margin-top:10px;font-size:12px;display:none"></div>
      </div>

      ${relatedHtml}
    `;

    // Breadcrumb nav
    detail.querySelector('#kb-art-home').onclick = (e) => { e.preventDefault(); self._backToHome(); };
    detail.querySelector('#kb-art-cat').onclick = (e) => { e.preventDefault(); if (cat) self._showCategory(cat.id); };

    // Feedback
    const fbResult = detail.querySelector('#kb-fb-result');
    detail.querySelector('#kb-fb-yes').onclick = () => {
      fbResult.innerHTML = '<span style="color:var(--accent)">감사합니다! 의견이 반영되었습니다.</span>';
      fbResult.style.display = 'block';
    };
    detail.querySelector('#kb-fb-no').onclick = () => {
      fbResult.innerHTML = '<span style="color:var(--muted)">해결되지 않으셨군요. 대표번호 <strong>1544-0338</strong> 또는 카카오 채널로 문의해주세요.</span>';
      fbResult.style.display = 'block';
    };

    // Related article clicks
    detail.querySelectorAll('[data-kb-article]').forEach(el => {
      el.onclick = () => self._showArticle(el.dataset.kbArticle);
    });

    // Apply location filter
    setTimeout(() => self._applyLocationFilter(), 0);
  },

  _backToHome() {
    const cv = this.el.querySelector('#kb-customer-view');
    cv.querySelector('#kb-cat-detail').style.display = 'none';
    cv.querySelector('#kb-article-detail').style.display = 'none';
    const homeEls = cv.querySelectorAll(':scope > :not(#kb-cat-detail):not(#kb-article-detail)');
    homeEls.forEach(el => el.style.display = '');
  },

  _applyLocationFilter() {
    const loc = this.currentLocation;
    this.el.querySelectorAll('[data-location]').forEach(el => {
      if (loc === 'all') {
        el.style.display = '';
      } else {
        const locs = el.dataset.location.split(',');
        el.style.display = locs.includes(loc) ? '' : 'none';
      }
    });
  },

  /* ================================================================
     ADMIN VIEW — Article Editor
     ================================================================ */
  _renderAdmin() {
    const container = this.el.querySelector('#kb-admin-view');
    container.innerHTML = `
      <div class="page-title">헬프센터 관리자</div>
      <div class="page-desc" style="margin-bottom:20px">문서 편집 및 관리</div>

      <!-- Dashboard (article list) -->
      <div id="kb-admin-dash">
        <!-- Supabase status -->
        <div class="card card-sm" style="margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px">
              <span id="kb-sb-icon" style="color:var(--orange)"><i class="ri-cloud-off-line"></i></span>
              <span id="kb-sb-text" style="font-size:13px;font-weight:600;color:var(--orange)">오프라인 모드 (localStorage)</span>
            </div>
            <div style="font-size:11px;color:var(--dim);margin-top:2px">Supabase 연결은 설정 메뉴에서 관리합니다.</div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0">
            <button class="btn btn-outline" id="kb-export-btn"><i class="ri-download-line"></i> 내보내기</button>
            <button class="btn btn-outline" id="kb-import-btn"><i class="ri-upload-line"></i> 가져오기</button>
            <input id="kb-import-file" type="file" accept=".json" style="display:none">
          </div>
        </div>

        <!-- Stats -->
        <div class="grid-4" style="margin-bottom:16px">
          <div class="kpi-card">
            <div class="kpi-label">전체 문서</div>
            <div class="kpi-value" id="kb-stat-total">0</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">편집된 문서</div>
            <div class="kpi-value" style="color:var(--accent)" id="kb-stat-modified">0</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">카테고리</div>
            <div class="kpi-value" id="kb-stat-cats">0</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">운영 지점</div>
            <div class="kpi-value" style="color:var(--green)">7</div>
          </div>
        </div>

        <!-- Filter -->
        <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;align-items:center">
          <div style="flex:1;min-width:200px;position:relative">
            <i class="ri-search-line" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--dim)"></i>
            <input id="kb-admin-search" type="text" class="form-input" style="padding-left:32px" placeholder="문서 검색..." autocomplete="off">
          </div>
          <select id="kb-admin-cat-filter" class="form-select" style="width:160px">
            <option value="all">전체 카테고리</option>
          </select>
          <select id="kb-admin-status-filter" class="form-select" style="width:120px">
            <option value="all">전체 상태</option>
            <option value="modified">편집됨</option>
            <option value="default">기본값</option>
          </select>
        </div>

        <!-- Article List -->
        <div id="kb-admin-list"></div>
      </div>

      <!-- Editor (hidden) -->
      <div id="kb-admin-editor" style="display:none">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
          <button class="btn btn-outline" id="kb-editor-back"><i class="ri-arrow-left-line"></i> 목록으로</button>
          <span style="color:var(--border)">|</span>
          <span class="badge badge-gray" id="kb-editor-cat-badge"></span>
          <span style="font-size:11px;color:var(--dim);font-family:monospace" id="kb-editor-id"></span>
          <div style="margin-left:auto;display:flex;gap:8px">
            <button class="btn btn-danger" id="kb-editor-reset"><i class="ri-refresh-line"></i> 기본값 복원</button>
            <button class="btn btn-primary" id="kb-editor-save"><i class="ri-save-line"></i> 저장</button>
          </div>
        </div>

        <!-- Basic Info -->
        <div class="card" style="margin-bottom:16px">
          <div class="section-title"><i class="ri-file-info-line"></i> 기본 정보</div>
          <div class="grid-2">
            <div>
              <label class="form-label">문서 제목</label>
              <input id="kb-edit-title" type="text" class="form-input">
            </div>
            <div>
              <label class="form-label">태그 (쉼표 구분)</label>
              <input id="kb-edit-tags" type="text" class="form-input" placeholder="보일러, 난방, 온수">
            </div>
            <div>
              <label class="form-label">예상 소요시간 (분)</label>
              <input id="kb-edit-time" type="number" min="1" max="30" class="form-input">
            </div>
            <div>
              <label class="form-label">난이도</label>
              <select id="kb-edit-diff" class="form-select">
                <option value="초급">초급</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Content Editor -->
        <div class="card" style="margin-bottom:16px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div class="section-title" style="margin-bottom:0"><i class="ri-file-edit-line"></i> 본문 내용</div>
            <div style="display:flex;gap:2px;align-items:center" id="kb-toolbar">
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px" data-cmd="bold" title="굵게"><i class="ri-bold"></i></button>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px" data-cmd="underline" title="밑줄"><i class="ri-underline"></i></button>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px" data-cmd="insertUnorderedList" title="목록"><i class="ri-list-unordered"></i></button>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px" data-cmd="insertOrderedList" title="순서목록"><i class="ri-list-ordered"></i></button>
              <span style="width:1px;height:20px;background:var(--border);margin:0 4px"></span>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px;color:var(--orange)" id="kb-btn-location" title="지점별 내용 추가"><i class="ri-map-pin-add-line"></i> 지점별</button>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px;color:var(--accent)" id="kb-btn-callout-info" title="안내 박스"><i class="ri-information-line"></i></button>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px;color:var(--orange)" id="kb-btn-callout-warn" title="주의 박스"><i class="ri-error-warning-line"></i></button>
              <button class="btn btn-outline" style="padding:4px 8px;font-size:12px;color:var(--red)" id="kb-btn-callout-danger" title="위험 박스"><i class="ri-alarm-warning-line"></i></button>
            </div>
          </div>
          <div id="kb-edit-content" contenteditable="true" style="min-height:300px;border:1px solid var(--border);border-radius:var(--r-sm);padding:16px;outline:none;font-size:13px;line-height:1.7"></div>
          <div style="font-size:11px;color:var(--dim);margin-top:6px"><i class="ri-information-line"></i> 점선 테두리 = 지점별 콘텐츠 (해당 지점 선택 시에만 고객에게 표시)</div>
        </div>

        <!-- Preview -->
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <div class="section-title" style="margin-bottom:0"><i class="ri-eye-line"></i> 미리보기</div>
            <button class="btn btn-outline" style="padding:4px 10px;font-size:11px" id="kb-preview-refresh"><i class="ri-refresh-line"></i> 새로고침</button>
          </div>
          <div id="kb-preview-content" style="font-size:13px;line-height:1.7;color:var(--text);border:1px solid var(--border);border-radius:var(--r-sm);padding:16px;background:var(--bg2);min-height:100px"></div>
        </div>
      </div>
    `;

    this._updateAdminSbStatus();
    this._renderAdminStats();
    this._populateCategoryFilter();
    this._renderArticleList();
    this._bindAdminEvents(container);
  },

  _updateAdminSbStatus() {
    const connected = (typeof KBStorage !== 'undefined' && KBStorage.isConnected()) || HomesSB.isConnected();
    const icon = this.el.querySelector('#kb-sb-icon');
    const text = this.el.querySelector('#kb-sb-text');
    if (connected && icon && text) {
      icon.innerHTML = '<i class="ri-cloud-line"></i>';
      icon.style.color = 'var(--green)';
      text.textContent = '클라우드 연결됨 (Supabase)';
      text.style.color = 'var(--green)';
    }
  },

  _renderAdminStats() {
    const overrides = KBStorage.getOverrides();
    const el = (id) => this.el.querySelector('#' + id);
    const total = el('kb-stat-total');
    const modified = el('kb-stat-modified');
    const cats = el('kb-stat-cats');
    if (total) total.textContent = Object.keys(DEFAULT_KB.articles).length;
    if (modified) modified.textContent = Object.keys(overrides).length;
    if (cats) cats.textContent = DEFAULT_KB.categories.length;
  },

  _populateCategoryFilter() {
    const sel = this.el.querySelector('#kb-admin-cat-filter');
    if (!sel) return;
    DEFAULT_KB.categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.title;
      sel.appendChild(opt);
    });
  },

  _renderArticleList() {
    const container = this.el.querySelector('#kb-admin-list');
    if (!container) return;

    const overrides = KBStorage.getOverrides();
    const search = (this.el.querySelector('#kb-admin-search')?.value || '').toLowerCase();
    const catFilter = this.el.querySelector('#kb-admin-cat-filter')?.value || 'all';
    const statusFilter = this.el.querySelector('#kb-admin-status-filter')?.value || 'all';
    const self = this;

    let html = '';
    DEFAULT_KB.categories.forEach(cat => {
      if (catFilter !== 'all' && cat.id !== catFilter) return;

      const articles = cat.articleIds.map(id => {
        const art = KBStorage.getArticle(id);
        return { id, ...art, isModified: !!overrides[id] };
      }).filter(a => {
        if (search && !a.title.toLowerCase().includes(search) && !(a.tags || []).some(t => t.includes(search))) return false;
        if (statusFilter === 'modified' && !a.isModified) return false;
        if (statusFilter === 'default' && a.isModified) return false;
        return true;
      });

      if (articles.length === 0) return;

      html += `<div style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;display:flex;align-items:center;gap:6px">
          <i class="${cat.icon}"></i> ${cat.title}
          <span style="font-weight:400;color:var(--dim)">${articles.length}개</span>
        </div>
        ${articles.map(a => `
          <div class="card card-sm" style="margin-bottom:6px;cursor:pointer;display:flex;align-items:center;gap:10px;${a.isModified ? 'border-left:3px solid var(--accent)' : ''}" data-kb-edit="${a.id}">
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.title}</div>
              <div style="font-size:11px;color:var(--dim);margin-top:2px">${(a.tags || []).slice(0, 4).join(', ')}</div>
            </div>
            ${a.isModified ? '<span class="badge badge-blue">편집됨</span>' : ''}
            <i class="ri-pencil-line" style="color:var(--dim);flex-shrink:0"></i>
          </div>
        `).join('')}
      </div>`;
    });

    container.innerHTML = html || '<div style="text-align:center;padding:32px;color:var(--muted);font-size:13px">검색 결과가 없습니다.</div>';

    // Bind edit clicks
    container.querySelectorAll('[data-kb-edit]').forEach(el => {
      el.onclick = () => self._openEditor(el.dataset.kbEdit);
    });
  },

  _bindAdminEvents(root) {
    const self = this;

    // Filter events
    const searchInput = root.querySelector('#kb-admin-search');
    const catFilter = root.querySelector('#kb-admin-cat-filter');
    const statusFilter = root.querySelector('#kb-admin-status-filter');
    if (searchInput) searchInput.oninput = () => self._renderArticleList();
    if (catFilter) catFilter.onchange = () => self._renderArticleList();
    if (statusFilter) statusFilter.onchange = () => self._renderArticleList();

    // Export
    root.querySelector('#kb-export-btn')?.addEventListener('click', () => self._exportData());

    // Import
    const importBtn = root.querySelector('#kb-import-btn');
    const importFile = root.querySelector('#kb-import-file');
    if (importBtn && importFile) {
      importBtn.onclick = () => importFile.click();
      importFile.onchange = (e) => self._importData(e);
    }

    // Editor toolbar commands
    root.querySelector('#kb-toolbar')?.querySelectorAll('[data-cmd]').forEach(btn => {
      btn.onclick = () => {
        document.execCommand(btn.dataset.cmd, false, null);
        root.querySelector('#kb-edit-content')?.focus();
      };
    });

    // Location block
    root.querySelector('#kb-btn-location')?.addEventListener('click', () => self._insertLocationBlock());

    // Callout buttons
    root.querySelector('#kb-btn-callout-info')?.addEventListener('click', () => self._insertCallout('info'));
    root.querySelector('#kb-btn-callout-warn')?.addEventListener('click', () => self._insertCallout('warning'));
    root.querySelector('#kb-btn-callout-danger')?.addEventListener('click', () => self._insertCallout('danger'));

    // Editor navigation
    root.querySelector('#kb-editor-back')?.addEventListener('click', () => self._closeEditor());
    root.querySelector('#kb-editor-save')?.addEventListener('click', () => self._saveArticle());
    root.querySelector('#kb-editor-reset')?.addEventListener('click', () => self._resetArticle());
    root.querySelector('#kb-preview-refresh')?.addEventListener('click', () => self._refreshPreview());
  },

  /* ── Editor Operations ── */
  _openEditor(id) {
    this.currentEditId = id;
    const art = KBStorage.getArticle(id);
    if (!art) return;

    const cat = DEFAULT_KB.categories.find(c => c.articleIds.includes(id));

    this.el.querySelector('#kb-admin-dash').style.display = 'none';
    this.el.querySelector('#kb-admin-editor').style.display = 'block';

    this.el.querySelector('#kb-editor-cat-badge').textContent = cat ? cat.title : '';
    this.el.querySelector('#kb-editor-id').textContent = id;
    this.el.querySelector('#kb-edit-title').value = art.title;
    this.el.querySelector('#kb-edit-tags').value = (art.tags || []).join(', ');
    this.el.querySelector('#kb-edit-time').value = art.time || 3;
    this.el.querySelector('#kb-edit-diff').value = art.difficulty || '초급';
    this.el.querySelector('#kb-edit-content').innerHTML = art.content || '';

    this._refreshPreview();
  },

  _closeEditor() {
    this.currentEditId = null;
    this.el.querySelector('#kb-admin-editor').style.display = 'none';
    this.el.querySelector('#kb-admin-dash').style.display = 'block';
    this._renderAdminStats();
    this._renderArticleList();
  },

  async _saveArticle() {
    if (!this.currentEditId) return;

    const data = {
      title: this.el.querySelector('#kb-edit-title').value.trim(),
      tags: this.el.querySelector('#kb-edit-tags').value.split(',').map(t => t.trim()).filter(Boolean),
      time: parseInt(this.el.querySelector('#kb-edit-time').value) || 3,
      difficulty: this.el.querySelector('#kb-edit-diff').value,
      content: this.el.querySelector('#kb-edit-content').innerHTML,
      _lastEdited: new Date().toISOString(),
      _editedBy: 'admin'
    };

    await KBStorage.saveArticle(this.currentEditId, data);
    const where = KBStorage.isConnected() ? '(Supabase + 로컬)' : '(로컬)';
    HomesApp.toast(`저장 완료 ${where}. 고객 화면에 즉시 반영됩니다.`);
    this._refreshPreview();
    this._buildSearchIndex();
  },

  async _resetArticle() {
    if (!this.currentEditId) return;
    if (!confirm('기본값으로 복원하시겠습니까? 편집한 내용이 모두 사라집니다.')) return;

    await KBStorage.deleteOverride(this.currentEditId);
    this._openEditor(this.currentEditId);
    HomesApp.toast('기본값으로 복원되었습니다.');
  },

  _refreshPreview() {
    const content = this.el.querySelector('#kb-edit-content')?.innerHTML || '';
    const preview = this.el.querySelector('#kb-preview-content');
    if (preview) preview.innerHTML = content;
  },

  _insertLocationBlock() {
    const loc = prompt('지점명을 입력하세요 (예: 가산, 회기):');
    if (!loc) return;
    const html = `<p data-location="${loc.trim()}" style="border:1px dashed #f59e0b;padding:4px 8px;border-radius:4px;margin:4px 0;"><strong>${loc.trim()}</strong> — 여기에 지점별 내용을 입력하세요</p>`;
    document.execCommand('insertHTML', false, html);
  },

  _insertCallout(type) {
    const styles = {
      info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af', icon: 'ri-information-line', label: '안내' },
      warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e', icon: 'ri-error-warning-line', label: '주의' },
      danger: { bg: '#fef2f2', border: '#fecaca', color: '#991b1b', icon: 'ri-alarm-warning-line', label: '위험' }
    };
    const s = styles[type];
    const html = `<div style="background:${s.bg};border:1px solid ${s.border};border-radius:8px;padding:12px;margin:8px 0;">
      <p style="color:${s.color};font-size:14px;"><i class="${s.icon}"></i> <strong>${s.label}</strong> — 내용을 입력하세요</p>
    </div>`;
    document.execCommand('insertHTML', false, html);
  },

  _exportData() {
    const data = KBStorage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `helpcenter-edits-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    HomesApp.toast('편집 데이터가 다운로드되었습니다.');
  },

  _importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const self = this;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        KBStorage.importData(e.target.result);
        if (KBStorage.isConnected()) {
          HomesApp.toast('Supabase에 동기화 중...');
          await KBStorage.syncToRemote();
        }
        self._renderAdminStats();
        self._renderArticleList();
        self._buildSearchIndex();
        HomesApp.toast(`${Object.keys(KBStorage.getOverrides()).length}개 문서의 편집 데이터를 가져왔습니다.`);
      } catch (err) {
        alert('파일 형식이 올바르지 않습니다.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }
});
