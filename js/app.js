/* HOMES CX Portal — App Shell Controller */
const HomesApp = (() => {
  const modules = {};
  const listeners = {};
  let currentModule = null;
  let currentSub = null;

  // ── Event Bus ──
  function on(event, fn) {
    (listeners[event] = listeners[event] || []).push(fn);
  }
  function emit(event, data) {
    (listeners[event] || []).forEach(fn => fn(data));
  }

  // ── Module Registry ──
  function register(id, mod) {
    modules[id] = mod;
  }

  // ── Router ──
  function navigate(moduleId, subId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(el => el.classList.remove('active'));

    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-sub-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-sub').forEach(el => el.classList.remove('open'));

    // Show target module
    const container = document.getElementById('mod-' + moduleId);
    if (container) {
      container.classList.add('active');
      container.classList.add('fade');
    }

    // Activate nav item
    const navItem = document.querySelector(`[data-nav="${moduleId}"]`);
    if (navItem) {
      navItem.classList.add('active');
      // Open parent sub-nav if exists
      const subNav = navItem.nextElementSibling;
      if (subNav && subNav.classList.contains('nav-sub')) subNav.classList.add('open');
    }

    // Activate sub item
    if (subId) {
      const subItem = document.querySelector(`[data-sub="${moduleId}.${subId}"]`);
      if (subItem) subItem.classList.add('active');
    }

    // Initialize module if first time, or call onShow
    const mod = modules[moduleId];
    if (mod) {
      if (!mod._initialized) {
        mod._initialized = true;
        if (mod.init) mod.init(container, subId);
      }
      if (mod.onShow) mod.onShow(subId);
    }

    currentModule = moduleId;
    currentSub = subId;
    window.location.hash = subId ? `${moduleId}/${subId}` : moduleId;
  }

  // ── Hash change handler ──
  function handleHash() {
    const hash = (window.location.hash || '#dashboard').slice(1);
    const [mod, sub] = hash.split('/');
    navigate(mod || 'dashboard', sub || null);
  }

  // ── Init ──
  async function init() {
    window.addEventListener('hashchange', handleHash);

    // Setup nav clicks
    document.querySelectorAll('.nav-item[data-nav]').forEach(el => {
      el.addEventListener('click', () => {
        const mod = el.dataset.nav;
        const sub = el.dataset.defaultSub || null;
        navigate(mod, sub);
      });
    });
    document.querySelectorAll('.nav-sub-item[data-sub]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        const [mod, sub] = el.dataset.sub.split('.');
        navigate(mod, sub);
      });
    });

    // Supabase auto-connect
    const connected = await HomesSB.autoConnect();
    updateDbBadge(connected);

    on('sb:connected', () => updateDbBadge(true));

    // Route to initial hash
    handleHash();
  }

  function updateDbBadge(connected) {
    const el = document.getElementById('db-badge');
    if (!el) return;
    if (connected) {
      el.textContent = '☁ Supabase';
      el.className = 'db-badge db-cloud';
    } else {
      el.textContent = '로컬';
      el.className = 'db-badge db-local';
    }
  }

  // ── Helpers ──
  function toast(msg) {
    let el = document.getElementById('cx-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cx-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }

  const today = () => new Date().toISOString().split('T')[0];
  const fmtDate = s => s ? new Date(s).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }) : '—';
  const countBy = (arr, key) => arr.reduce((acc, x) => { const k = x[key] || '기타'; acc[k] = (acc[k] || 0) + 1; return acc; }, {});
  const topKey = obj => Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return {
    register, navigate, on, emit, init, toast,
    today, fmtDate, countBy, topKey,
    get current() { return currentModule; },
    get currentSub() { return currentSub; }
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => HomesApp.init());
