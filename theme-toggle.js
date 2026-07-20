/* Fyscal — light/dark theme toggle. Light is default; persists to localStorage.
   Injects a small fixed pill toggle bottom-right. Sets data-theme on <html>. */
(function () {
  var KEY = 'fyscal-theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  function ic(dark) {
    return dark
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  }
  function build() {
    var b = document.createElement('button');
    b.id = 'fyscal-theme-toggle';
    b.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:9999;display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border:1px solid var(--border-input);background:var(--surface);color:var(--fg);font:600 12.5px var(--font-body,sans-serif);cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.18);border-radius:9999px';
    function sync() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      b.innerHTML = ic(dark) + '<span>' + (dark ? 'Dark' : 'Light') + '</span>';
    }
    b.onclick = function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) { document.documentElement.removeAttribute('data-theme'); try { localStorage.setItem(KEY, 'light'); } catch (e) {} }
      else { document.documentElement.setAttribute('data-theme', 'dark'); try { localStorage.setItem(KEY, 'dark'); } catch (e) {} }
      sync();
    };
    sync();
    document.body.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
