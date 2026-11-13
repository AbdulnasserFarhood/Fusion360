// ================================================
//  كل الحركات والأنيميشن. الألوان تُقرأ من theme في data.js
// ================================================
(function () {
  var root = document.documentElement;
  root.classList.add("anim");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var css = getComputedStyle(root);
  var PRIMARY = (css.getPropertyValue("--primary") || "").trim() || "#0f2a4a";
  var ACCENT = (css.getPropertyValue("--accent") || "").trim() || "#f26b1d";
  function rgba(hex, a) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }
  function clamp(v) { return Math.min(1, Math.max(0, v)); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* 1. عنوان الـHero يظهر كلمة بعد كلمة */
  (function () {
    var h1 = $(".hero h1");
    if (!h1 || reduce) return;
    var label = h1.textContent.replace(/\s+/g, " ").trim();
    var nodes = Array.prototype.slice.call(h1.childNodes);
    var i = 0;
    h1.textContent = "";
    function wrap(n) {
      var w = document.createElement("span"); w.className = "word";
      var s = document.createElement("span");
      s.style.animationDelay = (0.05 + i++ * 0.07).toFixed(2) + "s";
      s.appendChild(n); w.appendChild(s);
      s.addEventListener("animationend", function () { w.classList.add("done"); });
      return w;
    }
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) h1.appendChild(document.createTextNode(" "));
          else h1.appendChild(wrap(document.createTextNode(p)));
        });
      } else h1.appendChild(wrap(n));
    });
    h1.setAttribute("aria-label", label);
  })();

  /* 2. ظهور العناصر عند التمرير، والبطاقات بالتتابع */
  (function () {
    $$("[data-stagger]").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (it, k) {
        it.classList.add("reveal-block");
        if (!reduce) it.style.transitionDelay = (k * 90) + "ms";
      });
    });
    function show(el) {
      el.classList.add("in");
      var d = parseInt(el.style.transitionDelay, 10) || 0;
      setTimeout(function () { el.style.transitionDelay = ""; }, 1000 + d);
    }
    var all = $$(".reveal, .reveal-block");
    if (reduce || !("IntersectionObserver" in window)) { all.forEach(show); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    all.filter(function (el) { return !el.parentElement.hasAttribute("data-stagger"); })
       .forEach(function (el) { io.observe(el); });
    $$("[data-stagger]").forEach(function (g) {
      var o = new IntersectionObserver(function (es) {
        if (es.some(function (e) { return e.isIntersecting; })) {
          Array.prototype.forEach.call(g.children, show); o.disconnect();
        }
      }, { threshold: 0.1 });
      o.observe(g);
    });
  })();

  /* 3. وحدات المنهج تُضاء عند فتحها */
  $$("#curr details").forEach(function (d) {
    d.addEventListener("toggle", function () { d.classList.toggle("on", d.open); });
  });

  /* 4. كل ما يتبع التمرير */
  (function () {
    var header = $(".site-header"), bar = $(".progress"), mobile = $(".mobile-bar"), tape = $("#tape"),
        hero = $(".hero"), story = $("#story"), curr = $("#curr"), currFill = $("#currFill"),
        art = $("#heroArt"), pace = $("#pace"), days = $$("#days i");
    var stages = story ? $$(".stage", story) : [], bars = story ? $$(".story-progress i", story) : [],
        layers = story ? $$(".layer", story) : [];
    var lastStage = -1, lastY = window.scrollY, ticking = false;
    var cssScroll = window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()");

    function setStage(idx) {
      if (idx === lastStage) return;
      lastStage = idx;
      stages.forEach(function (s, i) { s.classList.toggle("on", i === idx); });
      bars.forEach(function (b, i) { b.classList.toggle("on", i <= idx); });
      layers.forEach(function (l, i) { l.classList.toggle("on", i <= idx); });
    }

    function onScroll() {
      var y = window.scrollY, vh = window.innerHeight;
      if (header) header.classList.toggle("hide", !reduce && y > lastY && y > 200);
      lastY = y;
      if (bar && !cssScroll) {
        var max = document.documentElement.scrollHeight - vh;
        bar.style.setProperty("--p", (max > 0 ? y / max : 0).toFixed(4));
      }
      if (mobile && hero) mobile.classList.toggle("show", hero.getBoundingClientRect().bottom < 0);
      if (tape) tape.classList.toggle("show", y > 320);
      if (story && stages.length) {
        var range = story.offsetHeight - vh;
        if (range > 0) {
          var sp = clamp(-story.getBoundingClientRect().top / range);
          setStage(Math.min(stages.length - 1, Math.floor(sp * stages.length * 0.999)));
        } else setStage(stages.length - 1);
      }
      if (curr && currFill) {
        var cr = curr.getBoundingClientRect();
        currFill.style.setProperty("--cp", reduce ? 1 : clamp((vh * 0.6 - cr.top) / cr.height).toFixed(4));
      }
      if (pace && days.length) {
        if (reduce) days.forEach(function (d) { d.classList.add("on"); });
        else {
          var r = pace.getBoundingClientRect();
          var p = clamp((vh * 0.85 - r.top) / (r.height * 0.7));
          var lit = Math.round(p * days.length);
          days.forEach(function (d, i) { d.classList.toggle("on", i < lit); });
        }
      }
      if (art && !reduce) art.style.transform = "translateY(" + (Math.min(y, 600) * -0.08).toFixed(1) + "px)";
      ticking = false;
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    onScroll();
  })();

  /* 5. بطاقات الأرقام: بطاقة واحدة في كل مرة مع عدّاد */
  (function () {
    var stage = $("#stage");
    if (!stage) return;
    var cards = $$(".pace-card", stage);
    var dots = $$("#dots button");
    var DWELL = 2800, idx = -1, timer = null, visible = false;

    function plural(n, one, two, few) { return n === 1 ? one : n === 2 ? two : few; }
    function fmtDur(total) {
      var h = Math.floor(total / 60), m = total % 60, parts = [];
      if (h > 0) parts.push(h + " " + plural(h, "ساعة", "ساعتان", "ساعات"));
      if (m > 0 || h === 0) parts.push(m + " " + plural(m, "دقيقة", "دقيقتان", "دقائق"));
      return parts.join(" و");
    }
    function setValue(card, v) {
      var el = $(".pace-num", card);
      el.textContent = card.getAttribute("data-kind") === "dur" ? fmtDur(Math.round(v)) : Math.round(v);
    }
    function countUp(card) {
      var to = parseFloat(card.getAttribute("data-to")), start = null, len = 1500;
      function step(t) {
        if (!start) start = t;
        var p = Math.min(1, (t - start) / len);
        setValue(card, to * (1 - Math.pow(1 - p, 3)));
        if (p < 1 && card.classList.contains("on")) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function show(i) {
      idx = (i + cards.length) % cards.length;
      cards.forEach(function (c, k) {
        if (k === idx) { c.classList.remove("out"); c.classList.add("on"); countUp(c); }
        else if (c.classList.contains("on")) {
          c.classList.remove("on"); c.classList.add("out");
          setTimeout(function () { c.classList.remove("out"); }, 1000);
        }
      });
      dots.forEach(function (d, k) {
        d.classList.toggle("on", k === idx);
        d.setAttribute("aria-current", k === idx ? "true" : "false");
      });
    }
    function schedule() {
      clearTimeout(timer);
      if (!visible) return;
      timer = setTimeout(function () { show(idx + 1); schedule(); }, DWELL);
    }

    if (reduce) {
      stage.classList.add("static");
      cards.forEach(function (c) { setValue(c, parseFloat(c.getAttribute("data-to"))); });
      return;
    }
    cards.forEach(function (c) { setValue(c, 0); });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); schedule(); }); });
    if (!("IntersectionObserver" in window)) { visible = true; show(0); schedule(); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible) { if (idx < 0) show(0); schedule(); } else clearTimeout(timer);
      });
    }, { threshold: 0.4 }).observe(stage);
  })();

  /* 6. زرّا الـHero يتبادلان اللون، ونقطة برتقالية تدور حولهما */
  (function () {
    var cta = $(".hero-cta");
    if (!cta || reduce) return;
    var A = $(".btn-glow", cta), B = $(".btn-outline", cta);
    var dot = A && $(".orbit", A);
    if (!A || !B || !dot) return;

    cta.style.position = "relative";
    var layer = document.createElement("span");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:5;";
    cta.appendChild(layer);
    layer.appendChild(dot);
    dot.style.cssText = "position:absolute;left:0;top:0;width:10px;height:10px;margin:0;border-radius:50%;display:block;" +
      "background:" + ACCENT + ";box-shadow:0 0 10px 3px " + rgba(ACCENT, .9) + ",0 0 22px 6px " + rgba(ACCENT, .45) + ";";

    var LAP = 3600, TR = 1200, CYCLE = 2 * (LAP + TR);
    var start = performance.now(), lastOrange = null;

    function box(b) { return { x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight }; }
    function perim(b) { var R = b.h / 2, L = Math.max(0, b.w - 2 * R); return { R: R, L: L, P: 2 * L + 2 * Math.PI * R }; }
    function outline(b, s) {
      var g = perim(b), R = g.R, L = g.L, px, py;
      s = ((s % g.P) + g.P) % g.P;
      if (s < L) { px = R + s; py = 0; }
      else {
        s -= L;
        if (s < Math.PI * R) { var a = -Math.PI / 2 + s / R; px = R + L + R * Math.cos(a); py = R + R * Math.sin(a); }
        else {
          s -= Math.PI * R;
          if (s < L) { px = R + L - s; py = b.h; }
          else { s -= L; var c = Math.PI / 2 + s / R; px = R + R * Math.cos(c); py = R + R * Math.sin(c); }
        }
      }
      return [b.x + px, b.y + py];
    }
    function smooth(u) { return u * u * (3 - 2 * u); }
    function glide(p0, p1, u) {
      var e = smooth(clamp(u));
      var mx = (p0[0] + p1[0]) / 2, my = Math.min(p0[1], p1[1]) - 46;
      return [
        (1 - e) * (1 - e) * p0[0] + 2 * (1 - e) * e * mx + e * e * p1[0],
        (1 - e) * (1 - e) * p0[1] + 2 * (1 - e) * e * my + e * e * p1[1]
      ];
    }
    function setOrange(btn, on) {
      if (on) { btn.classList.remove("btn-outline"); btn.classList.add("btn-accent", "btn-glow"); }
      else { btn.classList.remove("btn-accent", "btn-glow"); btn.classList.add("btn-outline"); }
    }
    function frame(now) {
      var t = (now - start) % CYCLE, bA = box(A), bB = box(B), p, orangeNow;
      if (t < LAP) { orangeNow = A; p = outline(bA, t / LAP * perim(bA).P); }
      else if (t < LAP + TR) { orangeNow = B; p = glide(outline(bA, 0), outline(bB, 0), (t - LAP) / TR); }
      else if (t < 2 * LAP + TR) { orangeNow = B; p = outline(bB, (t - LAP - TR) / LAP * perim(bB).P); }
      else { orangeNow = A; p = glide(outline(bB, 0), outline(bA, 0), (t - 2 * LAP - TR) / TR); }
      if (orangeNow !== lastOrange) {
        setOrange(orangeNow, true);
        setOrange(orangeNow === A ? B : A, false);
        lastOrange = orangeNow;
      }
      dot.style.left = (p[0] - 5).toFixed(2) + "px";
      dot.style.top = (p[1] - 5).toFixed(2) + "px";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* 7. الشريط البرتقالي السفلي: نص يتحرك بلا توقف */
  (function () {
    var tape = $("#tape");
    if (!tape) return;
    var track = $(".tape-track", tape);
    var unitHTML = track.firstElementChild.outerHTML;
    var unitW = 0, x = 0, last = null, SPEED = reduce ? 0 : 70;
    function build() {
      var vw = tape.offsetWidth || window.innerWidth;
      track.innerHTML = unitHTML;
      unitW = track.firstElementChild.offsetWidth || 1;
      var count = Math.ceil(vw / unitW) + 3;
      for (var i = 0; i < count; i++) track.insertAdjacentHTML("beforeend", unitHTML);
    }
    function frame(now) {
      if (last === null) last = now;
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      x -= SPEED * dt;
      if (-x >= unitW) x += unitW;
      track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
      requestAnimationFrame(frame);
    }
    build();
    window.addEventListener("resize", build);
    requestAnimationFrame(frame);
  })();

  /* 8. خلفية هندسية متحركة خلف الموقع */
  (function () {
    var cv = document.getElementById("cad-bg");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var W = 0, H = 0, dpr = 1, t = 0, last = 0, running = false;
    var scrollY = window.scrollY, items = [];
    var labels = ["52", "120", "Ø 18", "R 9", "30°", "64", "Ø 26", "140"];
    var types = ["circle", "dim", "arc", "line", "dim", "circle", "line", "arc"];

    function seed() {
      items = [];
      for (var i = 0; i < 16; i++) {
        items.push({
          type: types[i % types.length], x: Math.random(), y: Math.random(),
          s: 0.6 + Math.random() * 0.9, sp: 0.03 + Math.random() * 0.14,
          ph: Math.random() * Math.PI * 2, ang: Math.random() * Math.PI * 2,
          label: labels[i % labels.length]
        });
      }
    }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.direction = "ltr";
      if (!items.length) seed();
      draw();
    }
    function arrow(x, y, dir) {
      ctx.beginPath(); ctx.moveTo(x, y);
      ctx.lineTo(x + 6 * dir, y - 3); ctx.lineTo(x + 6 * dir, y + 3);
      ctx.closePath(); ctx.fill();
    }
    function drawItem(it, px, py, time) {
      var r = 46 * it.s;
      if (it.type === "circle") {
        ctx.strokeStyle = rgba(PRIMARY, 0.1);
        ctx.setLineDash([4, 6]);
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py);
        ctx.moveTo(px, py - 8); ctx.lineTo(px, py + 8);
        ctx.stroke();
      } else if (it.type === "arc") {
        ctx.strokeStyle = rgba(PRIMARY, 0.1);
        ctx.beginPath();
        ctx.arc(px, py, r * 1.2, it.ang + time * 0.2, it.ang + time * 0.2 + 1.4);
        ctx.stroke();
      } else if (it.type === "dim") {
        var L = 150 * it.s, off = Math.sin(time + it.ph) * 6;
        var x1 = px - L / 2 + off, x2 = px + L / 2 + off;
        ctx.strokeStyle = rgba(ACCENT, 0.22);
        ctx.fillStyle = rgba(ACCENT, 0.25);
        ctx.beginPath();
        ctx.moveTo(x1, py); ctx.lineTo(x2, py);
        ctx.moveTo(x1 - 4, py - 4); ctx.lineTo(x1 + 4, py + 4);
        ctx.moveTo(x2 - 4, py - 4); ctx.lineTo(x2 + 4, py + 4);
        ctx.moveTo(x1, py - 6); ctx.lineTo(x1, py + 6);
        ctx.moveTo(x2, py - 6); ctx.lineTo(x2, py + 6);
        ctx.stroke();
        arrow(x1, py, 1); arrow(x2, py, -1);
        ctx.font = '12px "IBM Plex Sans Arabic", sans-serif';
        ctx.fillStyle = rgba(ACCENT, 0.35);
        ctx.textAlign = "center";
        ctx.fillText(it.label, (x1 + x2) / 2, py - 8);
      } else {
        var len = 130 * it.s;
        var a = it.ang + Math.sin(time * 0.5 + it.ph) * 0.15;
        var ex = px + Math.cos(a) * len, ey = py + Math.sin(a) * len;
        ctx.strokeStyle = rgba(PRIMARY, 0.09);
        ctx.setLineDash([2, 5]);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = rgba(PRIMARY, 0.16);
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex, ey, 2.2, 0, Math.PI * 2); ctx.fill();
      }
    }
    function drawBox(time, cx, cy) {
      var S = Math.min(W, H) * 0.11;
      var ay = time * 0.25, ax = 0.45 + Math.sin(time * 0.15) * 0.1, f = 4.5, pts = [];
      for (var i = 0; i < 8; i++) {
        var x = (i & 1 ? 1 : -1) * S, y = (i & 2 ? 1 : -1) * S, z = (i & 4 ? 1 : -1) * S;
        var cY = Math.cos(ay), sY = Math.sin(ay);
        var x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
        var cX = Math.cos(ax), sX = Math.sin(ax);
        var y2 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
        var k = f / (f + z2 / S);
        pts.push([cx + x1 * k, cy + y2 * k]);
      }
      ctx.strokeStyle = rgba(ACCENT, 0.2);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (var a = 0; a < 8; a++) for (var b = a + 1; b < 8; b++) {
        var diff = a ^ b;
        if (diff === 1 || diff === 2 || diff === 4) { ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); }
      }
      ctx.stroke();
      ctx.lineWidth = 1;
    }
    function drawGrid(offset) {
      var gap = 32, oy = ((offset % gap) + gap) % gap;
      ctx.fillStyle = rgba(PRIMARY, 0.07);
      for (var x = gap / 2; x < W; x += gap) for (var y = oy; y < H; y += gap) ctx.fillRect(x, y, 1.2, 1.2);
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawGrid(-scrollY * 0.3);
      var span = H * 1.4;
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var py = (((it.y * span - scrollY * it.sp) % span) + span) % span - H * 0.2;
        drawItem(it, it.x * W, py, t + i);
      }
      if (W > 700) drawBox(t, W * 0.82, H * 0.42 - scrollY * 0.12);
    }
    function frame(now) {
      if (!running) return;
      var dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now; t += dt;
      draw();
      requestAnimationFrame(frame);
    }
    function start() { if (reduce || running) return; running = true; last = 0; requestAnimationFrame(frame); }
    function stop() { running = false; }
    window.addEventListener("scroll", function () { scrollY = window.scrollY; if (reduce) draw(); }, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    resize();
    start();
  })();

  /* 9. المحرك ثلاثي الأبعاد في الـHero */
  (function () {
    var cv = document.getElementById("part3d");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var W = 420, H = 300, CX = 210, CYc = 150, S = 1.9, PERIOD = 34, dpr = 1;
    function fit() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.direction = "ltr";
    }

    var CYLX = [-36, -12, 12, 36], YC = -22, RC = 9, LR = 30;
    var PHASE = [0, Math.PI, Math.PI, 0];

    function boxQ(x0, x1, y0, y1, z0, z1) {
      return [
        { pts: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], nrm: [0, 0, 1] },
        { pts: [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], nrm: [0, 0, -1] },
        { pts: [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], nrm: [1, 0, 0] },
        { pts: [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], nrm: [-1, 0, 0] },
        { pts: [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], nrm: [0, 1, 0] },
        { pts: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], nrm: [0, -1, 0] }
      ];
    }
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function norm(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
    function cylQ(c, a, L, r) {
      var N = 12, out = [];
      var ref = Math.abs(a[0]) > 0.9 ? [0, 1, 0] : [1, 0, 0];
      var u = norm(cross(a, ref)), v = cross(a, u);
      function P(t, th) {
        var ct = Math.cos(th), st = Math.sin(th);
        return [c[0] + a[0] * t + r * (ct * u[0] + st * v[0]),
                c[1] + a[1] * t + r * (ct * u[1] + st * v[1]),
                c[2] + a[2] * t + r * (ct * u[2] + st * v[2])];
      }
      var bottom = [], top = [];
      for (var j = 0; j < N; j++) {
        var t0 = j / N * Math.PI * 2, t1 = (j + 1) / N * Math.PI * 2, tm = (t0 + t1) / 2;
        var nm = [Math.cos(tm) * u[0] + Math.sin(tm) * v[0], Math.cos(tm) * u[1] + Math.sin(tm) * v[1], Math.cos(tm) * u[2] + Math.sin(tm) * v[2]];
        out.push({ pts: [P(0, t0), P(0, t1), P(L, t1), P(L, t0)], nrm: nm });
        bottom.push(P(0, t0)); top.push(P(L, t0));
      }
      out.push({ pts: bottom, nrm: [-a[0], -a[1], -a[2]] });
      out.push({ pts: top, nrm: [a[0], a[1], a[2]] });
      return out;
    }
    function barQ(A, B, w) {
      var d = norm([B[0] - A[0], B[1] - A[1], B[2] - A[2]]);
      var ref = Math.abs(d[0]) > 0.9 ? [0, 1, 0] : [1, 0, 0];
      var u = norm(cross(d, ref)), v = cross(d, u);
      var c = [
        [-w * u[0] - w * v[0], -w * u[1] - w * v[1], -w * u[2] - w * v[2]],
        [w * u[0] - w * v[0], w * u[1] - w * v[1], w * u[2] - w * v[2]],
        [w * u[0] + w * v[0], w * u[1] + w * v[1], w * u[2] + w * v[2]],
        [-w * u[0] + w * v[0], -w * u[1] + w * v[1], -w * u[2] + w * v[2]]
      ];
      var nrms = [[-v[0], -v[1], -v[2]], [u[0], u[1], u[2]], [v[0], v[1], v[2]], [-u[0], -u[1], -u[2]]];
      var out = [];
      for (var i = 0; i < 4; i++) {
        var j = (i + 1) % 4;
        out.push({ pts: [
          [A[0] + c[i][0], A[1] + c[i][1], A[2] + c[i][2]],
          [A[0] + c[j][0], A[1] + c[j][1], A[2] + c[j][2]],
          [B[0] + c[j][0], B[1] + c[j][1], B[2] + c[j][2]],
          [B[0] + c[i][0], B[1] + c[i][1], B[2] + c[i][2]]
        ], nrm: nrms[i] });
      }
      out.push({ pts: c.map(function (q) { return [A[0] + q[0], A[1] + q[1], A[2] + q[2]]; }), nrm: [-d[0], -d[1], -d[2]] });
      out.push({ pts: c.map(function (q) { return [B[0] + q[0], B[1] + q[1], B[2] + q[2]]; }), nrm: [d[0], d[1], d[2]] });
      return out;
    }
    function concat(lists) { var out = []; lists.forEach(function (l) { for (var i = 0; i < l.length; i++) out.push(l[i]); }); return out; }
    function cached(fn) { var c = null; return function () { if (!c) c = fn(); return c; }; }
    function pinY(a) { return YC + RC * Math.cos(a); }
    function pinZ(a) { return RC * Math.sin(a); }
    function wristY(a) { return YC + RC * Math.cos(a) + Math.sqrt(LR * LR - RC * RC * Math.sin(a) * Math.sin(a)); }

    var parts = [
      { col: "#3b4048", alpha: 0.95, fn: cached(function () { return boxQ(-44, 44, -44, -30, -20, 20); }) },
      { col: "#5a6170", alpha: 0.6, fn: cached(function () { return boxQ(-50, 50, -30, 0, -22, 22); }) },
      { col: "#8d96a6", alpha: 0.32, fn: cached(function () { return concat(CYLX.map(function (x) { return cylQ([x, 0, 0], [0, 1, 0], 22, 9); })); }) },
      { col: "#6b7384", alpha: 0.55, fn: cached(function () { return boxQ(-48, 48, 22, 34, -20, 20); }) },
      { col: "#b3322b", alpha: 0.5, fn: cached(function () { return boxQ(-46, 46, 34, 42, -18, 18); }) },
      { col: "#1f2227", alpha: 1, fn: cached(function () { return concat(CYLX.map(function (x) { return cylQ([x, 42, 0], [0, 1, 0], 6, 2.6); })); }) },
      { col: "#9aa3b2", alpha: 0.95, fn: cached(function () { return boxQ(-40, 40, 14, 30, 22, 36); }) },
      { col: "#2f3238", alpha: 1, fn: cached(function () { return cylQ([-40, -36, -26], [1, 0, 0], 96, 5); }) },
      { col: "#c9ced8", alpha: 1, fn: cached(function () { return cylQ([-30, -26, -34], [0, 1, 0], 22, 9); }) },
      { col: "#1f2227", alpha: 1, fn: function (st) {
          var out = cylQ([-64, YC, 0], [1, 0, 0], 9, 14);
          for (var k = 0; k < 3; k++) {
            var b = st.alpha + k * Math.PI * 2 / 3;
            out = out.concat(barQ([-59.5, YC, 0], [-59.5, YC + 11 * Math.cos(b), 11 * Math.sin(b)], 1.4));
          }
          return out;
        } },
      { col: "#8a6d3b", alpha: 1, fn: function (st) {
          var out = cylQ([-50, YC, 0], [1, 0, 0], 100, 3);
          CYLX.forEach(function (x, i) {
            var a = st.alpha + PHASE[i];
            out = out.concat(barQ([x, YC, 0], [x, pinY(a), pinZ(a)], 3.5));
          });
          return out;
        } },
      { col: "#c9ced8", alpha: 1, fn: function (st) {
          var out = [];
          CYLX.forEach(function (x, i) {
            var crown = wristY(st.alpha + PHASE[i]);
            out = out.concat(cylQ([x, crown - 8, 0], [0, 1, 0], 8, 7));
          });
          return out;
        } },
      { col: "#d8dde5", alpha: 1, fn: function (st) {
          var out = [];
          CYLX.forEach(function (x, i) {
            var a = st.alpha + PHASE[i];
            out = out.concat(barQ([x, pinY(a), pinZ(a)], [x, wristY(a), 0], 2.2));
          });
          return out;
        } }
    ];

    function fv(x, y) { return [CX + x * S, CYc - y * S]; }
    function rectLoop(x0, x1, y0, y1) { return [fv(x0, y0), fv(x1, y0), fv(x1, y1), fv(x0, y1)]; }
    var sketchLoops = [];
    sketchLoops.push(rectLoop(-44, 44, -44, -30));
    sketchLoops.push(rectLoop(-50, 50, -30, 0));
    CYLX.forEach(function (x) { sketchLoops.push(rectLoop(x - 9, x + 9, 0, 22)); });
    sketchLoops.push(rectLoop(-48, 48, 22, 34));
    sketchLoops.push(rectLoop(-46, 46, 34, 42));
    CYLX.forEach(function (x) { sketchLoops.push(rectLoop(x - 2.6, x + 2.6, 42, 48)); });
    sketchLoops.push(rectLoop(-40, 40, 14, 30));
    sketchLoops.push(rectLoop(-40, 56, -41, -31));
    sketchLoops.push(rectLoop(-64, -55, -36, -8));
    sketchLoops.push(rectLoop(-39, -21, -35, -17));

    function dense(pts, step) {
      var out = [], n = pts.length;
      for (var i = 0; i < n; i++) {
        var a = pts[i], b = pts[(i + 1) % n];
        var k = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
        for (var j = 0; j < k; j++) out.push([a[0] + (b[0] - a[0]) * j / k, a[1] + (b[1] - a[1]) * j / k]);
      }
      out.push(out[0]);
      return out;
    }
    var loops = sketchLoops.map(function (l) { return dense(l, 2.5); });
    var lens = loops.map(function (lp) {
      var L = 0;
      for (var i = 0; i < lp.length - 1; i++) L += Math.hypot(lp[i + 1][0] - lp[i][0], lp[i + 1][1] - lp[i][1]);
      return L;
    });
    var total = lens.reduce(function (a, b) { return a + b; }, 0);

    function strokePartial(lp, take) {
      ctx.beginPath(); ctx.moveTo(lp[0][0], lp[0][1]);
      var end = lp[0], rem = take;
      for (var i = 0; i < lp.length - 1 && rem > 0; i++) {
        var a = lp[i], b = lp[i + 1], sl = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (rem >= sl) { ctx.lineTo(b[0], b[1]); end = b; rem -= sl; }
        else {
          var q = [a[0] + (b[0] - a[0]) * rem / sl, a[1] + (b[1] - a[1]) * rem / sl];
          ctx.lineTo(q[0], q[1]); end = q; rem = 0;
        }
      }
      ctx.stroke();
      return end;
    }
    function drawSketch(f, op) {
      if (op <= 0.001 || f <= 0) return;
      ctx.globalAlpha = op;
      ctx.strokeStyle = PRIMARY;
      ctx.lineWidth = 1.6; ctx.lineJoin = "round"; ctx.lineCap = "round";
      var rem = f * total, cursorPt = null;
      for (var i = 0; i < loops.length && rem > 0; i++) {
        cursorPt = strokePartial(loops[i], Math.min(rem, lens[i]));
        rem -= lens[i];
      }
      if (cursorPt && f < 1) {
        ctx.fillStyle = ACCENT;
        ctx.shadowColor = rgba(ACCENT, 0.9); ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(cursorPt[0], cursorPt[1], 3.6, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    }

    function xf(p, spin, th) {
      var cp = Math.cos(spin), sp = Math.sin(spin);
      var x1 = p[0] * cp + p[2] * sp, z1 = -p[0] * sp + p[2] * cp;
      var ct = Math.cos(th), st = Math.sin(th);
      return [x1, p[1] * ct - z1 * st, p[1] * st + z1 * ct];
    }
    function sc(p) { return [CX + p[0] * S, CYc - p[1] * S]; }
    var LX = -0.45, LY = 0.65, LZ = 0.62, LL = Math.sqrt(LX * LX + LY * LY + LZ * LZ);
    function shadeHex(col, k) {
      var r0 = parseInt(col.substr(1, 2), 16), g0 = parseInt(col.substr(3, 2), 16), b0 = parseInt(col.substr(5, 2), 16);
      return "rgb(" + Math.min(255, Math.round(r0 * k)) + "," + Math.min(255, Math.round(g0 * k)) + "," + Math.min(255, Math.round(b0 * k)) + ")";
    }
    function seg(t, a, b) { return clamp((t - a) / (b - a)); }
    function ease(x) { return x * x * (3 - 2 * x); }

    var DIMS = [
      { a: fv(-64, -56), b: fv(56, -56), label: "120 mm", lx: 0, ly: 16, align: "center" },
      { a: fv(-70, -44), b: fv(-70, 48), label: "92 mm", lx: -8, ly: 0, align: "end" },
      { a: fv(27, 26), b: fv(45, 26), label: "Ø 18", lx: 0, ly: -8, align: "center" }
    ];
    function drawDim(d, prog, fade) {
      if (prog <= 0.001 || fade <= 0.001) return;
      var ax = d.a[0], ay = d.a[1], bx = d.b[0], by = d.b[1];
      var len = Math.hypot(bx - ax, by - ay) || 1;
      var ux = (bx - ax) / len, uy = (by - ay) / len, px = -uy, py = ux;
      ctx.globalAlpha = fade;
      ctx.strokeStyle = ACCENT; ctx.fillStyle = ACCENT; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + (bx - ax) * prog, ay + (by - ay) * prog); ctx.stroke();
      if (prog > 0.08) {
        ctx.beginPath(); ctx.moveTo(ax, ay);
        ctx.lineTo(ax + ux * 7 + px * 3.5, ay + uy * 7 + py * 3.5);
        ctx.lineTo(ax + ux * 7 - px * 3.5, ay + uy * 7 - py * 3.5);
        ctx.closePath(); ctx.fill();
      }
      if (prog > 0.98) {
        ctx.beginPath(); ctx.moveTo(bx, by);
        ctx.lineTo(bx - ux * 7 + px * 3.5, by - uy * 7 + py * 3.5);
        ctx.lineTo(bx - ux * 7 - px * 3.5, by - uy * 7 - py * 3.5);
        ctx.closePath(); ctx.fill();
      }
      var lab = clamp((prog - 0.6) / 0.4);
      if (lab > 0) {
        ctx.globalAlpha = fade * lab;
        ctx.font = '13px "IBM Plex Sans Arabic", sans-serif';
        ctx.textAlign = d.align; ctx.textBaseline = "middle";
        ctx.fillText(d.label, (ax + bx) / 2 + d.lx, (ay + by) / 2 + d.ly);
      }
      ctx.globalAlpha = 1;
    }

    function frame(st) {
      ctx.clearRect(0, 0, W, H);
      drawSketch(st.sk, st.sketchOp);
      for (var i = 0; i < DIMS.length; i++) drawDim(DIMS[i], st.dims[i], st.dimFade);
      if (st.e <= 0.001) return;
      var draws = [];
      parts.forEach(function (p, pi) {
        var g = st.g[pi];
        if (g <= 0.001) return;
        var quads = p.fn(st);
        for (var q = 0; q < quads.length; q++) {
          var Qd = quads[q], n = xf(Qd.nrm, st.spin, st.th);
          if (n[2] <= 0) continue;
          var pts = Qd.pts.map(function (v) { return xf([v[0], v[1], v[2] * g], st.spin, st.th); });
          var I = Math.max(0, (n[0] * LX + n[1] * LY + n[2] * LZ) / LL);
          var z = 0, sp = [];
          for (var k2 = 0; k2 < pts.length; k2++) { z += pts[k2][2]; sp.push(sc(pts[k2])); }
          draws.push({ p: sp, col: shadeHex(p.col, 0.3 + 0.7 * I), z: z / pts.length, a: p.alpha });
        }
      });
      draws.sort(function (a, b) { return a.z - b.z; });
      for (var d = 0; d < draws.length; d++) {
        var dr = draws[d];
        ctx.globalAlpha = dr.a * st.e;
        ctx.beginPath(); ctx.moveTo(dr.p[0][0], dr.p[0][1]);
        for (var m = 1; m < dr.p.length; m++) ctx.lineTo(dr.p[m][0], dr.p[m][1]);
        ctx.closePath();
        ctx.fillStyle = dr.col; ctx.strokeStyle = dr.col; ctx.lineWidth = 0.6;
        ctx.fill(); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    var TH_3D = 0.62;
    function state(tt) {
      var sk = seg(tt, 0, 6.0);
      var sketchOp = 1 - seg(tt, 6.0, 6.8);
      var out = 1 - ease(seg(tt, 31.5, 32.5));
      var e = ease(seg(tt, 6.6, 7.2)) * out;
      var g = parts.map(function (p, i) { var a = 7.0 + i * 0.7; return ease(seg(tt, a, a + 1.2)) * out; });
      var s = Math.max(0, tt - 17);
      var alpha = 2.5 * s + 0.04 * s * s;
      var tiltAmt = ease(seg(tt, 20, 24)) * (1 - ease(seg(tt, 30, 32)));
      var spinBase = 0.9 * ease(seg(tt, 20, 24)) * (1 - ease(seg(tt, 30, 32)));
      var swing = 0.3 * Math.sin((tt - 24) * 0.9) * seg(tt, 24, 25.5) * (1 - seg(tt, 29, 30.5));
      var dims = [seg(tt, 4.2, 5.0), seg(tt, 4.8, 5.6), seg(tt, 5.2, 6.0)];
      var dimFade = (1 - seg(tt, 6.4, 7.0)) * (1 - seg(tt, 31.5, 32.5)) * (tt < 32.5 ? 1 : 0);
      return { sk: sk, sketchOp: sketchOp, e: e, g: g, th: TH_3D * tiltAmt, spin: spinBase + swing, alpha: alpha, dims: dims, dimFade: dimFade };
    }

    fit();
    window.addEventListener("resize", fit);

    if (reduce) {
      var fin = state(26);
      fin.e = 1; fin.g = parts.map(function () { return 1; });
      fin.sk = 1; fin.sketchOp = 0; fin.dimFade = 0; fin.th = TH_3D; fin.spin = 0.5;
      frame(fin);
      return;
    }
    var start = performance.now();
    function loop(now) {
      frame(state(((now - start) / 1000) % PERIOD));
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();
})();