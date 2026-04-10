/* HOMES CX Portal — Supabase Singleton Client */
const HomesSB = (() => {
  let client = null;
  const CONFIG_KEY = 'homes_cx_cfg';
  const LEGACY_KEYS = ['voc_cfg', 'homes_sb_cfg'];

  // Default Supabase credentials (HOMES CX project)
  const DEFAULT_URL = 'https://bqzzszmhzfkcbgoyavcn.supabase.co';
  const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxenpzem1oemZrY2Jnb3lhdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5ODU2NTAsImV4cCI6MjA4OTU2MTY1MH0.ScflftO0AwvhfKvr77JuxM4-QEaaLJJNZ-OTYHPU_3Q';

  function migrateConfig() {
    if (localStorage.getItem(CONFIG_KEY)) return;
    for (const k of LEGACY_KEYS) {
      const v = localStorage.getItem(k);
      if (v) {
        try {
          const cfg = JSON.parse(v);
          if (cfg.url && cfg.key) {
            localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
            return;
          }
        } catch {}
      }
    }
  }

  function getConfig() {
    migrateConfig();
    try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveConfig(url, key) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify({ url, key }));
    // Also save to legacy keys for backward compat
    LEGACY_KEYS.forEach(k => localStorage.setItem(k, JSON.stringify({ url, key })));
  }

  async function init(url, key) {
    try {
      const lib = window.supabase || window.Supabase;
      if (!lib || !lib.createClient) throw new Error('Supabase SDK not loaded');
      client = lib.createClient(url, key);
      return true;
    } catch (e) {
      console.error('[HomesSB] init failed:', e);
      client = null;
      return false;
    }
  }

  async function connect(url, key) {
    const ok = await init(url, key);
    if (!ok) return { ok: false, error: 'SDK 초기화 실패' };
    try {
      const { error } = await client.from('voc').select('id').limit(1);
      if (error) throw error;
      saveConfig(url, key);
      HomesApp.emit('sb:connected');
      return { ok: true };
    } catch (e) {
      client = null;
      const msg = (e.message || '').toLowerCase();
      let guide = '연결 실패: ' + e.message;
      if (msg.includes('api key') || msg.includes('jwt')) guide = 'API 키가 올바르지 않습니다. anon public 키를 확인하세요.';
      else if (msg.includes('does not exist') || msg.includes('relation')) guide = '테이블이 없습니다. SQL을 먼저 실행하세요.';
      else if (msg.includes('fetch') || msg.includes('network')) guide = '네트워크 오류. Project URL을 확인하세요.';
      return { ok: false, error: guide };
    }
  }

  async function autoConnect() {
    const cfg = getConfig();
    const url = cfg.url || DEFAULT_URL;
    const key = cfg.key || DEFAULT_KEY;
    if (url && key) {
      const ok = await init(url, key);
      if (ok) {
        // Save so settings page shows current values
        if (!cfg.url) saveConfig(url, key);
        HomesApp.emit('sb:connected');
      }
      return ok;
    }
    return false;
  }

  function get() { return client; }
  function isConnected() { return client !== null; }

  return { connect, autoConnect, get, getConfig, saveConfig, isConnected };
})();
