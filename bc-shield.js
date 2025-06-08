/**
 * bc-shield.js
 * Version: 2025-updated
 * All-in-one self-contained protection script (BC Shield)
 */

(function () {
  // ─── Config ──────────────────────────────────────────────────────
  const config = Object.assign({
    devtools: true,
    iframe: true,
    trap: true,
    antiCopy: true,
    sanitizer: true
  }, window.BCShieldConfig || {});

  const isDebug = location.search.includes('debug');

  // ─── Inject Runtime CSS ───────────────────────────────────────────
  const css = `
    #bcshield-warning-container .bc-shield-warning {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      font-family: 'Arial', sans-serif;
      color: #333;
      text-align: center;
      z-index: 9999;
    }
    #bcshield-warning-container .icon {
      font-size: 2.5rem;
      color: #dc3545;
      margin-bottom: 0.625rem;
    }
    #bcshield-warning-container h1 {
      font-size: 1.5rem;
      color: #dc3545;
      margin: 0 0 0.625rem;
    }
    #bcshield-warning-container p {
      font-size: 0.875rem;
      color: #555;
      margin: 0;
      line-height: 1.4;
    }
    @media (max-width: 600px) {
      #bcshield-warning-container .bc-shield-warning { width: 95%; }
      #bcshield-warning-container .icon { font-size: 2rem; }
      #bcshield-warning-container h1 { font-size: 1.25rem; }
      #bcshield-warning-container p { font-size: 0.75rem; }
    }
  `;
  const styleTag = document.createElement('style');
  styleTag.textContent = css.trim();
  document.head.appendChild(styleTag);

  // ─── Helper: Render Block Message ────────────────────────────────
  function renderBlock(title, message) {
    document.body.innerHTML = `
      <div id="bcshield-warning-container">
        <div class="bc-shield-warning">
          <div class="icon">⚠️</div>
          <h1>${title}</h1>
          <p>${message}</p>
        </div>
      </div>
    `;
  }

  // ─── Iframe Block ────────────────────────────────────────────────
  if (config.iframe && window.top !== window.self) {
    renderBlock("Access Blocked", "This content is protected by BC SHIELD and cannot be viewed within an iframe.");
    throw new Error("BC Shield: Blocked in iframe.");
  }

  // ─── Devtools Detection ──────────────────────────────────────────
  if (config.devtools) {
    let triggered = false;
    setInterval(() => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const devtoolsOpen = widthDiff > 180 || heightDiff > 180 || window.innerHeight < 400;

      if (devtoolsOpen && !triggered) {
        triggered = true;
        renderBlock("Access Blocked", "Developer Tools are open. Access is blocked by BC SHIELD.");
        console.warn("⚠️ Devtools detected by BC Shield");
      }
    }, 1000);
  }

  // ─── Bot Trap ────────────────────────────────────────────────────
  if (config.trap) {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function (e) {
        const trapInput = form.querySelector('input[name="bc_trap"]');
        if (trapInput && trapInput.value) {
          e.preventDefault();
          alert("Bot detected by BC SHIELD.");
        }
      });
    });
  }

  // ─── Anti-Copy / Context Menu Block ──────────────────────────────
  if (config.antiCopy) {
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.onkeydown = function (e) {
      if (e.ctrlKey && ['u', 's', 'c', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
    };
  }

  // ─── Sanitizer Exposure ──────────────────────────────────────────
  if (config.sanitizer) {
    window.BCShield = {
      sanitize: str => str.replace(/[<>"']/g, '')
    };
  }

  if (isDebug) console.log("[BC Shield] Loaded with config:", config);
})();
