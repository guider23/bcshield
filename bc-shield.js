/**
 * bc-shield.js
 * Version: 2025-locked-enhanced
 * All-in-one self-contained protection script (BC Shield)
 */

(function () {
  // ─── Domain Lock ────────────────────────────────────────────────
  const allowedDomains = ['bcworks.in.net'];
  const currentDomain = window.location.hostname;

  if (!allowedDomains.some(domain => currentDomain.endsWith(domain))) {
    document.body.innerHTML = `
      <div style="font-family: sans-serif; text-align: center; padding: 5rem;">
        <h1 style="color: red;">❌ Access Denied</h1>
        <p>This copy of <strong>BC Shield</strong> is restricted to <code>bcworks.in.net</code></p>
      </div>
    `;
    throw new Error("BC Shield: Unauthorized domain");
  }

  // ─── Config ──────────────────────────────────────────────────────
  const config = Object.assign({
    devtools: true,
    iframe: true,
    trap: true,
    antiCopy: true,
    sanitizer: true,
    consoleBlock: true,
    cspMeta: true,
    strictEvalBlock: true,  // NEW: strict eval/function block
    freezeGlobals: true,    // NEW: freeze critical globals
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

  // ─── Inject CSP Header (Meta-based) ──────────────────────────────
  if (config.cspMeta) {
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!existingCSP) {
      const meta = document.createElement('meta');
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; frame-ancestors 'none'";
      document.head.appendChild(meta);
    }
  }

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

  // ─── Console Lockdown ────────────────────────────────────────────
  if (config.consoleBlock) {
    try {
      Object.defineProperty(window, "console", {
        get() {
          throw new Error("Console access is blocked by BC SHIELD.");
        },
        configurable: false
      });

      setInterval(() => {
        const start = performance.now();
        debugger;
        const duration = performance.now() - start;
        if (duration > 100) {
          location.reload();
        }
      }, 1000);
    } catch (e) {
      // Can't log to console here because console is locked down
      // fallback: do nothing or maybe alert in debug mode
    }
  }

  // ─── Strict Eval and Function Block ──────────────────────────────
  if (config.strictEvalBlock) {
    window.eval = function () {
      throw new Error("Eval is blocked by BC SHIELD.");
    };
    window.Function = function () {
      throw new Error("Function constructor is blocked by BC SHIELD.");
    };
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay, ...args) {
      if (typeof fn === 'string') {
        throw new Error("String-based setTimeout is blocked by BC SHIELD.");
      }
      return originalSetTimeout(fn, delay, ...args);
    };
  }

  // ─── Freeze Critical Globals ──────────────────────────────────────
  if (config.freezeGlobals) {
    try {
      Object.freeze(window.console);
    } catch (e) {
      // Fail silently
    }
    try {
      Object.freeze(window.document);
    } catch (e) {
      // Fail silently
    }
  }

  // ─── Sanitizer Exposure (with DOMPurify) ─────────────────────────
  if (config.sanitizer) {
    // Load DOMPurify dynamically
    function loadDOMPurify(callback) {
      if (window.DOMPurify) {
        callback();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/dompurify@3.0.2/dist/purify.min.js';
      script.onload = () => callback();
      script.onerror = () => {
        console.warn("BC SHIELD: Failed to load DOMPurify, falling back to basic sanitizer.");
        // fallback sanitizer
        window.BCShield = {
          sanitize: str => str.replace(/[<>"']/g, '')
        };
      };
      document.head.appendChild(script);
    }

    loadDOMPurify(() => {
      window.BCShield = {
        sanitize: str => window.DOMPurify.sanitize(str)
      };
      if (isDebug) console.log("[BC Shield] DOMPurify loaded, sanitizer ready.");
    });
  } else {
    window.BCShield = {
      sanitize: str => str.replace(/[<>"']/g, '')
    };
  }

  if (isDebug) console.log("[BC Shield] Loaded with config:", config);
})();
