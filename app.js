(function () {
  const S = SITE;
  const fill = (s) => String(s ?? "")
    .replaceAll("{price}", S.course.price)
    .replaceAll("{free}", S.course.freeLessons);
  const wa = (msg) => `https://wa.me/${S.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
  const buyHref = S.course.buyUrl || wa(S.course.buyMessage);
  const map = (arr, fn) => (arr || []).map(fn).join("");
  const head = (eyebrow, title, intro) => `
    ${eyebrow ? `<p class="eyebrow reveal-block">${fill(eyebrow)}</p>` : ""}
    <h2 class="reveal">${fill(title)}</h2>
    ${intro ? `<p class="intro reveal-block">${fill(intro)}</p>` : ""}`;
  const ctaButtons = () => `
    <a class="btn btn-accent" href="#signup">${fill(S.buttons.free)}</a>
    <a class="btn btn-outline" href="${buyHref}" target="_blank">${fill(S.buttons.buy)}</a>`;
  const imgOr = (src, placeholder, cls = "") =>
    src ? `<img class="${cls}" src="${src}" alt="">` : `<div class="placeholder ${cls}">${placeholder}</div>`;

  // الألوان والعنوان
  for (const [k, v] of Object.entries(S.theme)) document.documentElement.style.setProperty(`--${k}`, v);
  document.title = fill(S.meta.title);

  const H = S.hero, P = S.pricing, C = S.curriculum, O = S.outcomes, A = S.audience,
        CE = S.certificate, HT = S.howTo, I = S.instructor, T = S.testimonials,
        F = S.signup, Q = S.faq, FC = S.finalCta, PC = S.pace || {};

  const tick = map(PC.ticker, t => `<span>${t}</span>`);
  const V = S.videoIntro || {
    eyebrow: "شاهد قبل أن تبدأ",
    title: "تعرّف على الدورة في أقل من دقيقة",
    text: "جولة سريعة على ما ستتعلّمه: من أول رسم ثنائي الأبعاد حتى التجميع والرسم الفني، وكيف تنهي الدورة بمشروع حقيقي يُقيَّم شخصياً.",
    points: ["شرح بالعربية خطوة بخطوة", "مشاريع تطبيقية في كل وحدة", "شهادة من Autodesk عند الإتمام"]
  };

  document.getElementById("app").innerHTML = `
  <header class="site-header"><div class="container nav">
    <a href="#top" class="logo"><img src="${S.brand.logo}" alt="${S.brand.name}"></a>
    <nav>${map(S.nav, n => `<a href="${n.href}">${n.label}</a>`)}</nav>
        <button type="button" class="theme-btn" id="themeBtn" aria-label="تبديل الوضع الليلي">
      <svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>
      <svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    </button>
    <a class="btn btn-accent btn-sm" href="#signup">${fill(S.buttons.free)}</a>
  </div></header>

  <section class="hero" id="top">
    <div class="container hero-grid">
      <div>
        <div class="badges">${map(H.badges, b => `<span class="badge">${b}</span>`)}</div>
        <h1>${fill(H.title)}</h1>
        <p class="lead">${fill(H.subtitle)}</p>
        <div class="cta hero-cta">
          <a class="btn btn-accent btn-glow" href="#signup">${fill(S.buttons.freeHero || S.buttons.free)}<span class="orbit" aria-hidden="true"></span></a>
          <a class="btn btn-outline" href="${buyHref}" target="_blank">${fill(S.buttons.buy)}</a>
        </div>
        <p class="small muted">${fill(H.note)}</p>
      </div>
      <figure class="hero-art" id="heroArt">
        <canvas id="part3d" width="420" height="300" role="img" aria-label="رسم تقني لمحرك مبسّط يُبنى من مسقط ثنائي الأبعاد إلى مجسّم ثلاثي الأبعاد"></canvas>
        ${H.artCaption ? `<figcaption>${H.artCaption}</figcaption>` : ""}
      </figure>
    </div>
  </section>

  <section class="pace" id="pace"><div class="container">
    ${head(PC.eyebrow, PC.title)}
    <div class="pace-stage" id="stage" aria-live="polite">${map(S.stats, s => `
      <article class="pace-card" data-kind="${s.kind || "num"}" data-to="${s.to}">
        <b class="pace-num">${s.to}</b><span class="pace-lbl">${s.label}</span><i class="bar"></i>
      </article>`)}</div>
    <div class="pace-dots" id="dots">${map(S.stats, (s, i) => `<button type="button" aria-label="البطاقة ${i + 1}"></button>`)}</div>
  </div>
  ${tick ? `<div class="ticker" aria-hidden="true"><div class="track">${tick}${tick}</div></div>` : ""}
  </section>

  ${H.video ? `<section class="video-section"><div class="container video-split">
    <div class="video-text">
      ${head(V.eyebrow, V.title)}
      <p class="muted reveal-block">${fill(V.text)}</p>
      <ul class="checklist" data-stagger>${map(V.points, p => `<li>${fill(p)}</li>`)}</ul>
      <div class="cta reveal-block"><a class="btn btn-accent" href="#signup">${fill(S.buttons.free)}</a></div>
    </div>
    <div class="video reveal-block"><iframe src="${H.video}" title="فيديو تعريفي" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  </div></section>` : ""}

  <section id="price" class="section alt"><div class="container price-grid">
    <div>${head(P.eyebrow, P.title)}
      <ul class="checklist" data-stagger>${map(P.features, f => `<li>${fill(f)}</li>`)}</ul></div>
    <div class="price-card reveal-block">
      <p class="muted">${P.cardTitle}</p>
      <div class="price"><strong>${S.course.price}</strong> <span>${P.priceUnit}</span></div>
      <p class="small">${fill(P.priceNote)}</p>
      <div class="stack">
        <a class="btn btn-accent" href="${buyHref}" target="_blank">${fill(S.buttons.buy)}</a>
        <a class="btn btn-outline" href="#signup">${fill(S.buttons.free)}</a>
      </div>
      <p class="muted small">${P.paymentsTitle}</p>
      <div class="chips">${map(P.payments, p => {
        const label = p.label || p;
        const url = p.online ? buyHref : wa(`مرحباً، أريد شراء دورة Fusion 360 والدفع عبر ${label}`);
        return `<a class="chip chip-link" href="${url}" target="_blank">${label}</a>`;
      })}</div>
      <p class="small muted">${P.paymentsNote}</p>
    </div>
  </div></section>

  <section id="curriculum" class="section"><div class="container">
    ${head(C.eyebrow, C.title, C.intro)}
    <div class="list curr" id="curr"><div class="curr-fill" id="currFill"></div>${map(C.modules, m => `
      <details class="module">
        <summary>
          <span class="num">${m.num}</span>
          <span class="m-title">${m.title}<small>${m.meta}</small></span>
          ${m.free ? `<span class="tag">${C.freeLabel}</span>` : ""}
        </summary>
        <ol class="lessons">${m.lessons && m.lessons.length
          ? map(m.lessons, l => `<li><span>${l.title} ${l.free ? `<em class="tag">مجاني</em>` : ""}</span><span class="muted">${l.duration || ""}</span></li>`)
          : `<li class="muted">${C.emptyLessons}</li>`}</ol>
      </details>`)}</div>
  </div></section>

  <section class="section alt"><div class="container">
    ${head(O.eyebrow, O.title)}
    <div class="grid" data-stagger>${map(O.items, (o, i) => `
      <div class="card"><span class="n">${String(i + 1).padStart(2, "0")}</span>
      <h3>${o.title}</h3><p class="muted">${o.text}</p></div>`)}</div>
  </div></section>

  <section class="section"><div class="container">
    ${head(A.eyebrow, A.title)}
    <div class="grid" data-stagger>${map(A.items, a => `<div class="card"><h3>${a.title}</h3><p class="muted">${a.text}</p></div>`)}</div>
  </div></section>

  <section id="certificate" class="section alt"><div class="container split">
    <div>${head(CE.eyebrow, CE.title)}
      <ol class="steps" data-stagger>${map(CE.steps, s => `<li><div><h3>${s.title}</h3><p class="muted">${s.text}</p></div></li>`)}</ol></div>
    ${imgOr(CE.image, CE.imagePlaceholder, "photo reveal-block")}
  </div></section>

  <section class="section howto"><div class="container">
    ${head("", HT.title)}
    <div class="grid" data-stagger>${map(HT.steps, (s, i) => `
      <div class="card"><p class="eyebrow">الخطوة ${i + 1}</p><h3>${s.title}</h3><p class="muted">${s.text}</p></div>`)}</div>
  </div></section>

  <section id="instructor" class="section alt"><div class="container split">
    ${imgOr(I.photo, "صورة المدرّب", "photo reveal-block")}
    <div><p class="eyebrow reveal-block">${I.eyebrow}</p><h2 class="reveal">${I.name}</h2>
      <div class="reveal-block"><p class="muted">${I.role}</p>${map(I.bio, p => `<p class="bio">${p}</p>`)}</div>
      <ul class="checklist" data-stagger>${map(I.bullets, b => `<li>${b}</li>`)}</ul></div>
  </div></section>

  <section class="section"><div class="container">
    ${head("", T.title, T.subtitle)}
        <div class="grid t-grid" data-stagger>${map(T.items, t => {
      const [name, stars] = String(t.author).split(" · ");
      return `
      <figure class="card t-card">
        <div class="t-stars" aria-label="تقييم ٥ من ٥">${stars || "★★★★★"}</div>
        ${t.highlight ? `<h3 class="t-high">${t.highlight}</h3>` : ""}
        ${t.image ? `<img class="t-img" src="${t.image}" alt="">` : ""}
        ${t.quote ? `<blockquote class="t-quote">${t.quote}</blockquote>` : ""}
        <button type="button" class="t-more" hidden>اقرأ المزيد</button>
        <figcaption class="t-author">
          <span class="t-avatar" aria-hidden="true">${name.trim().charAt(0)}</span>
          <span>${name.trim()}</span>
        </figcaption>
      </figure>`;
    })}</div></section>

  <section id="signup" class="section dark"><div class="container narrow">
    ${head(F.eyebrow, F.title)}<p class="intro reveal-block">${fill(F.text)}</p>
    <form id="signup-form" class="form reveal-block" novalidate>
      <input name="name" type="text" required autocomplete="name" maxlength="60" placeholder="${F.namePlaceholder}">
      <input name="email" type="email" required autocomplete="email" inputmode="email" maxlength="100" placeholder="${F.emailPlaceholder}">
      <input name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="${F.phonePlaceholder}">
      <select name="role" required><option value="">${F.rolePlaceholder}</option>
        ${map(F.roles, r => `<option>${r}</option>`)}</select>
      <button class="btn btn-accent" type="submit">${F.button}</button>
      <p id="form-msg" class="form-error"></p>
      <p class="small muted">${F.privacy}</p>
    </form>
  </div></section>

    <section id="faq" class="section"><div class="container">
    ${head("", Q.title)}
    <div class="faq-cols reveal-block">${(() => {
      const half = Math.ceil(Q.items.length / 2);
      return [Q.items.slice(0, half), Q.items.slice(half)].map(col => `
        <div class="list">${map(col, f => `<details><summary>${f.q}</summary><p class="faq-a">${f.a}</p></details>`)}</div>`).join("");
    })()}</div>
    <p class="center">${Q.moreText} <a class="link" href="${wa(Q.moreMessage)}" target="_blank">${Q.moreLink}</a></p>
  </div></section>

  <section class="section alt center"><div class="container narrow reveal-block">
    <h2>${fill(FC.title)}</h2><p class="intro">${fill(FC.text)}</p>
    <div class="cta center-flex">${ctaButtons()}</div>
    <a class="link" href="${wa(FC.groupMessage)}" target="_blank">${FC.groupLink}</a>
  </div></section>

  <footer class="site-footer">
    <div class="container foot-grid">

      <div class="foot-card foot-brand">
        <img src="${S.brand.logoWhite}" alt="${S.brand.name}">
        <p>${S.footerText || ""}</p>
        <span class="foot-badge">${S.contact.partner}</span>
      </div>

      <div class="foot-card">
        <details class="foot-drop">
          <summary>روابط سريعة
            <span class="foot-chev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span>
          </summary>
          <ul>${map(S.nav, n => `<li><a href="${n.href}">${n.label}</a></li>`)}</ul>
        </details>
        <p class="foot-hint">اضغط على السهم لعرض أقسام الصفحة.</p>
      </div>

      <div class="foot-card foot-contact">
        <h4>تواصل معنا</h4>
        <ul>
          <li><a href="${wa("")}" target="_blank">
            <span class="foot-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg></span>
            <span><small>اتصال أو WhatsApp</small><bdi dir="ltr">${S.contact.phoneDisplay}</bdi></span></a></li>
          <li><a href="mailto:${S.contact.email}">
            <span class="foot-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z M3 7l9 6 9-6"/></svg></span>
            <span><small>البريد الإلكتروني</small><bdi dir="ltr">${S.contact.email}</bdi></span></a></li>
        </ul>
      </div>

      <div class="foot-card foot-cta">
        <h4>جاهز تبدأ؟</h4>
        <p>أول ${S.course.freeLessons} دروس مجاناً، بلا بطاقة ولا التزام.</p>
        <a class="btn btn-accent" href="#signup">${fill(S.buttons.free)}</a>
      </div>

    </div>

    <div class="container foot-bottom">
      <span>© ${new Date().getFullYear()} ${S.brand.name}. جميع الحقوق محفوظة.</span>
      <a href="#top">العودة للأعلى ↑</a>
    </div>
  </footer>

  <div class="mobile-bar">
    <a class="btn btn-accent" href="#signup">${fill(S.buttons.free)}</a>
    <a class="btn btn-outline" href="${buyHref}" target="_blank">اشترِ · ${S.course.price}$</a>
  </div>`;

  // ===== نموذج التسجيل: قيود الحقول ثم الإرسال =====
    // ===== التعليقات: «اقرأ المزيد» يظهر فقط للنص الطويل =====
  const fitMore = () => document.querySelectorAll(".t-card").forEach(c => {
    if (c.classList.contains("open")) return;
    const q = c.querySelector(".t-quote"), b = c.querySelector(".t-more");
    if (q && b) b.hidden = q.scrollHeight <= q.clientHeight + 2;
  });
  document.querySelectorAll(".t-more").forEach(b => b.addEventListener("click", () => {
    const c = b.closest(".t-card");
    c.classList.toggle("open");
    b.textContent = c.classList.contains("open") ? "عرض أقل" : "اقرأ المزيد";
  }));
  fitMore();
  window.addEventListener("load", fitMore);
  window.addEventListener("resize", fitMore);
  const form = document.getElementById("signup-form");
  const msg = document.getElementById("form-msg");

  // الأرقام العربية والفارسية إلى أرقام عادية
  const toEnDigits = v => v
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632)
    .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 1776);

  // الحرف العربي إلى الحرف الإنجليزي الموجود على المفتاح نفسه
  const AR_KEYS = {
    "ض":"q","ص":"w","ث":"e","ق":"r","ف":"t","غ":"y","ع":"u","ه":"i","خ":"o","ح":"p",
    "ش":"a","س":"s","ي":"d","ب":"f","ل":"g","ا":"h","ت":"j","ن":"k","م":"l",
    "ئ":"z","ء":"x","ؤ":"c","ر":"v","ى":"n","ة":"m","ز":".","أ":"h","إ":"h","آ":"h"
  };
  const hasArabic = v => /[\u0600-\u06FF]/.test(v);
  const arToEn = (v, typed) => {
    if (typed === "لا") v = v.replace(/لا(?!.*لا)/, "b"); // مفتاح B على اللوحة العربية يكتب «لا»
    return toEnDigits(v).replace(/[\u0600-\u06FF]/g, ch => AR_KEYS[ch] || "");
  };

  const rules = {
    // الاسم: أحرف عربية أو إنجليزية ومسافات فقط
    name: {
      clean: v => v.replace(/[^\p{L}\p{M}\s'.-]/gu, ""),
      ok: v => /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,59}$/u.test(v.trim()),
      error: F.nameError
    },
    // الإيميل: يحوّل ما يُكتب بالعربية إلى الإنجليزية، ثم يُبقي الأحرف المسموحة فقط
    email: {
      clean: (v, typed) => arToEn(v, typed).replace(/[^A-Za-z0-9._%+@-]/g, ""),
      ok: v => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v.trim()),
      error: F.emailError
    },
    // الرقم: أرقام فقط، مع + اختيارية في البداية
    phone: {
      clean: v => toEnDigits(v).replace(/[^\d+]/g, "").replace(/(?!^)\+/g, ""),
      ok: v => v.trim() === "" || /^\+?\d{7,15}$/.test(v.trim()),
      error: F.phoneError
    }
  };

  // ينظّف الخانة أثناء الكتابة
  for (const [field, r] of Object.entries(rules)) {
    const el = form.elements[field];
    el.addEventListener("input", (e) => {
      const wasArabic = field === "email" && hasArabic(el.value);
      const cleaned = r.clean(el.value, e.data);
      if (cleaned !== el.value) el.value = cleaned;
      el.classList.remove("invalid");
      msg.textContent = wasArabic
        ? (F.emailHint || "لوحة المفاتيح على العربية، فحوّلنا ما كتبته إلى الإنجليزية. يُكتب البريد بالأحرف الإنجليزية فقط.")
        : "";
    });
  }
  form.elements.role.addEventListener("change", () => {
    form.elements.role.classList.remove("invalid");
    msg.textContent = "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // التحقق من كل خانة
    for (const [field, r] of Object.entries(rules)) {
      const el = form.elements[field];
      if (!r.ok(el.value)) {
        el.classList.add("invalid");
        el.focus();
        msg.textContent = r.error;
        return;
      }
    }
    if (!form.elements.role.value) {
      form.elements.role.classList.add("invalid");
      form.elements.role.focus();
      msg.textContent = F.rolePlaceholder.replace("...", "") + "؟ اختر من القائمة.";
      return;
    }

    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = F.sending;
    try {
      await fetch(F.scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(new FormData(form))
      });
      form.innerHTML = `<div class="form-success">✓ ${F.success}</div>`;
    } catch (err) {
      btn.disabled = false;
      btn.textContent = F.button;
      msg.textContent = F.error;
    }
  });
})();
