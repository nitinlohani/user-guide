/* Fyscal Website UI Kit — Frosted Columns background engine (vanilla JS, no deps).
   Renders the reference look: vertical frosted-blue columns rising from the
   bottom on a white field, each fading white(top)→brand-blue(bottom), with film
   grain and varying width/height. Animated like a slow equalizer — every column
   breathes its height + tint on its own phase. 2D canvas (no WebGL).
   Mount: FlutedGlass.mount(canvasEl, { ...dataAttrs }) → { destroy() }. */
(function () {
  function hexToRgb(h) {
    h = (h || '#000000').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }
  const num = (v, d) => (v == null || v === '' || isNaN(+v)) ? d : +v;
  const MAXW = 1100;
  const FPS = 30, MINDT = 1000 / FPS;
  // seeded RNG so the column layout is stable across resizes/reloads
  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  function mount(canvas, opts) {
    opts = opts || {};
    const cfg = {
      c1: hexToRgb(opts.colorOne || '#352EFF'),   // saturated brand blue (bottom)
      c2: hexToRgb(opts.colorTwo || '#6B8CFF'),   // lighter blue (variety)
      bg: opts.bgColor || '#ffffff',
      count: Math.max(4, Math.round(num(opts.columns, 8))),
      noise: num(opts.noise, 0.40),
      gloss: num(opts.gloss, 0.4),
      widthVar: num(opts.widthVariation, 1.6),
      hover: opts.hover !== false && opts.hover !== 'false',
      hoverIntensity: num(opts.hoverIntensity, 2.0),
      mode: opts.mode || 'columns',
      bandFloor: num(opts.bandFloor, 0.18),   // bands mode: top of the band zone (e.g. 0.67 = bottom 33%)
      bandAlpha: num(opts.bandAlpha, 1),       // bands mode: opacity multiplier (lower = lighter)
      reduced: !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    };
    const ctx = canvas.getContext('2d', { alpha: false });
    let W = 0, H = 0, grainC, grainPat, cols = [], raf = 0, last = 0;
    const ptr = { x: 0.7, a: 0, ta: 0 };

    function makeGrain() {
      const s = 110; grainC = document.createElement('canvas'); grainC.width = s; grainC.height = s;
      const g = grainC.getContext('2d'); const id = g.createImageData(s, s);
      for (let i = 0; i < id.data.length; i += 4) {
        const v = 120 + Math.random() * 135;
        id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255;
      }
      g.putImageData(id, 0, 0);
      grainPat = ctx.createPattern(grainC, 'repeat');
    }

    function buildColumns() {
      const r = rng(20260603);
      cols = [];
      const gapMode = cfg.mode === 'bands';   // bands = zero gap, contiguous, full-bleed
      let x = gapMode ? 0 : (-0.04 + r() * 0.03);
      while (x < 1.02) {
        const w = gapMode
          ? (0.05 + r() * 0.06) * cfg.widthVar / 1.6
          : (0.07 + r() * 0.09) * cfg.widthVar / 1.6;
        const baseTop = 0.18 + r() * 0.6;                       // resting top (0=tall,1=short)
        const amp = 0.05 + r() * 0.13;                          // breathe amplitude
        const spd = 0.12 + r() * 0.32;                          // breathe speed
        const ph = r() * Math.PI * 2;                           // phase offset
        const light = r();                                      // tint blend c1↔c2
        const alpha = gapMode ? (0.82 + r() * 0.18) : (0.72 + r() * 0.28);
        cols.push({ x, w, baseTop, amp, spd, ph, light, alpha });
        x += gapMode ? w : w + (0.005 + r() * 0.05);            // bands touch; columns gap
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scale = Math.min(1, MAXW / rect.width);
      W = Math.max(2, Math.round(rect.width * scale));
      H = Math.max(2, Math.round(rect.height * scale));
      canvas.width = W; canvas.height = H;
    }

    function paintGrain(t) {
      if (cfg.noise > 0 && grainPat) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = cfg.noise * 0.5;
        const ox = (t * 7) % grainC.width, oy = (t * 5) % grainC.height;
        ctx.save(); ctx.translate(-ox, -oy); ctx.fillStyle = grainPat;
        ctx.fillRect(0, 0, W + grainC.width, H + grainC.height); ctx.restore();
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      }
    }

    function colTint(c) {
      return [
        Math.round(cfg.c1[0] + (cfg.c2[0] - cfg.c1[0]) * c.light),
        Math.round(cfg.c1[1] + (cfg.c2[1] - cfg.c1[1]) * c.light),
        Math.round(cfg.c1[2] + (cfg.c2[2] - cfg.c1[2]) * c.light),
      ];
    }

    /* columns — rising blue bars with gaps (default) */
    function renderColumns(t) {
      ctx.fillStyle = cfg.bg; ctx.fillRect(0, 0, W, H);
      for (const c of cols) {
        const breathe = Math.sin(t * c.spd + c.ph) * c.amp;
        let top = (c.baseTop + breathe) * H;
        if (cfg.hover && ptr.a > 0.01) {
          const d = Math.abs((c.x + c.w / 2) - ptr.x);
          top -= Math.max(0, 1 - d / 0.22) * ptr.a * 0.16 * Math.min(1.5, cfg.hoverIntensity / 2) * H;
        }
        top = Math.max(0.02 * H, Math.min(0.95 * H, top));
        const cx = c.x * W, cw = c.w * W, [R, G, B] = colTint(c);
        const grd = ctx.createLinearGradient(0, top, 0, H);
        grd.addColorStop(0, 'rgba(' + R + ',' + G + ',' + B + ',0)');
        grd.addColorStop(0.5, 'rgba(' + R + ',' + G + ',' + B + ',' + (c.alpha * 0.42) + ')');
        grd.addColorStop(1, 'rgba(' + R + ',' + G + ',' + B + ',' + c.alpha + ')');
        ctx.fillStyle = grd; ctx.fillRect(cx, top, cw + 0.6, H - top);
        if (cfg.gloss > 0) { ctx.fillStyle = 'rgba(255,255,255,' + (cfg.gloss * 0.18) + ')'; ctx.fillRect(cx, top, Math.max(1, cw * 0.06), H - top); }
      }
      paintGrain(t);
    }

    /* VARIATION A — bands: contiguous full-bleed vertical bands, ZERO gaps,
       sharp seams, each band's blue rises/falls like a seamless equalizer wall. */
    function renderBands(t) {
      ctx.fillStyle = cfg.bg; ctx.fillRect(0, 0, W, H);
      const floor = cfg.bandFloor, zone = 1 - floor;   // bands live in the bottom `zone` of the section
      for (const c of cols) {
        const n = Math.max(0, Math.min(1, (c.baseTop - 0.18) / 0.60));   // 0=tall .. 1=short, within zone
        let top = floor + (0.95 - floor) * n + Math.sin(t * c.spd + c.ph) * c.amp * zone;
        if (cfg.hover && ptr.a > 0.01) {
          const d = Math.abs((c.x + c.w / 2) - ptr.x);
          top -= Math.max(0, 1 - d / 0.25) * ptr.a * 0.12 * zone * Math.min(1.5, cfg.hoverIntensity / 2);
        }
        top = Math.max(floor * H, Math.min(0.97 * H, top * H));
        const cx = Math.round(c.x * W), cw = Math.ceil(c.w * W) + 1, [R, G, B] = colTint(c);
        const a = c.alpha * cfg.bandAlpha;
        const grd = ctx.createLinearGradient(0, top, 0, H);
        grd.addColorStop(0, 'rgba(' + R + ',' + G + ',' + B + ',0)');
        grd.addColorStop(0.45, 'rgba(' + R + ',' + G + ',' + B + ',' + (a * 0.4) + ')');
        grd.addColorStop(1, 'rgba(' + R + ',' + G + ',' + B + ',' + a + ')');
        ctx.fillStyle = grd; ctx.fillRect(cx, top, cw, H - top);
        // sharp seam: thin dark line on the right edge + bright catch on the left
        ctx.fillStyle = 'rgba(10,16,40,' + (0.07 * cfg.bandAlpha) + ')'; ctx.fillRect(cx + cw - 1, top, 1, H - top);
        ctx.fillStyle = 'rgba(255,255,255,' + (0.10 + cfg.gloss * 0.22) + ')'; ctx.fillRect(cx, top, 1, H - top);
      }
      paintGrain(t);
    }

    /* VARIATION B — mesh: continuous flowing blue aurora, no bands/edges at all,
       built from drifting radial blobs over white. Fully gap-free by nature. */
    let meshBlobs = null;
    function renderMesh(t) {
      if (!meshBlobs) {
        const r = rng(77); meshBlobs = [];
        for (let i = 0; i < 6; i++) meshBlobs.push({ bx: r(), by: 0.5 + r() * 0.6, rr: 0.5 + r() * 0.5, sx: 0.04 + r() * 0.07, sy: 0.03 + r() * 0.06, px: r() * 6.28, py: r() * 6.28, light: r(), a: 0.5 + r() * 0.45 });
      }
      ctx.fillStyle = cfg.bg; ctx.fillRect(0, 0, W, H);
      const mx = Math.max(W, H);
      for (const b of meshBlobs) {
        const cx = (b.bx + Math.sin(t * b.sx + b.px) * 0.18) * W;
        const cy = (b.by + Math.cos(t * b.sy + b.py) * 0.14) * H;
        const R = Math.round(cfg.c1[0] + (cfg.c2[0] - cfg.c1[0]) * b.light);
        const G = Math.round(cfg.c1[1] + (cfg.c2[1] - cfg.c1[1]) * b.light);
        const B = Math.round(cfg.c1[2] + (cfg.c2[2] - cfg.c1[2]) * b.light);
        const rr = b.rr * mx;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, 'rgba(' + R + ',' + G + ',' + B + ',' + b.a + ')');
        g.addColorStop(1, 'rgba(' + R + ',' + G + ',' + B + ',0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      // fade toward white at the very top so headline stays crisp
      const top = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      top.addColorStop(0, 'rgba(255,255,255,0.7)'); top.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = top; ctx.fillRect(0, 0, W, H * 0.5);
      paintGrain(t);
    }

    function render(t) {
      if (cfg.mode === 'bands') return renderBands(t);
      if (cfg.mode === 'mesh') return renderMesh(t);
      return renderColumns(t);
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - last < MINDT) return;
      last = now;
      if (W < 2 || H < 2) { resize(); if (W < 2) return; }   // self-heal if layout wasn't ready at mount
      ptr.x += (ptr.tx != null ? (ptr.tx - ptr.x) * 0.06 : 0);
      ptr.a += (ptr.ta - ptr.a) * 0.05;
      render(now / 1000);
    }

    function onMove(e) { const r = canvas.getBoundingClientRect(); ptr.tx = (e.clientX - r.left) / r.width; ptr.ta = 1; }
    function onLeave() { ptr.ta = 0; }
    function onResize() { resize(); if (cfg.reduced) render(6); }

    makeGrain(); buildColumns(); resize();
    let host = null;
    if (cfg.hover && !cfg.reduced) { host = canvas.parentElement || canvas; host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave); }
    window.addEventListener('resize', onResize);
    if (cfg.reduced) render(6); else raf = requestAnimationFrame(loop);

    return { destroy() { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); if (host) { host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); } } };
  }

  function autoMount(root) {
    (root || document).querySelectorAll('canvas.fluted-glass-canvas[data-fluted-glass]').forEach(cv => {
      if (cv._fg) return; const d = cv.dataset;
      cv._fg = mount(cv, { colorOne: d.colorOne, colorTwo: d.colorTwo, colorThree: d.colorThree, bgColor: d.bgColor, columns: d.columns, distortion: d.distortion, noise: d.noise, gloss: d.gloss, widthVariation: d.widthVariation, hover: d.hover, hoverIntensity: d.hoverIntensity });
    });
  }
  window.FlutedGlass = { mount, autoMount };
})();
