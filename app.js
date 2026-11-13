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
        F = S.signup, Q = S.faq, FC = S.finalCta,
        PC = S.pace || {}, ST = S.story, TP = S.tape;

  const tick = map(PC.ticker, t => `<span>${t}</span>`);

  const storySvg = `
    <svg viewBox="0 0 300 300">
      <g class="layer on">
        <rect class="sk" x="60" y="80" width="180" height="140" rx="10"/>
        <circle class="sk" cx="120" cy="150" r="22"/>
        <circle class="sk" cx="190" cy="150" r="14"/>
      </g>
      <g class="layer">
        <rect class="solid" x="60" y="80" width="180" height="140" rx="10"/>
        <circle class="hole" cx="120" cy="150" r="22"/>
        <circle class="hole" cx="190" cy="150" r="14"/>
      </g>
      <g class="layer">
        <rect class="solid" x="60" y="80" width="180" height="140" rx="10" opacity=".35"/>
        <path class="dimline" d="M60 60 H240 M60 52 V68 M240 52 V68"/>
        <path class="dimline" d="M262 80 V220 M254 80 H270 M254 220 H270"/>
        <text class="dimtxt" x="150" y="48" text-anchor="middle">180</text>
        <text class="dimtxt" x="276" y="154">140</text>
      </g>
    </svg>`;

  document.getElementById("app").innerHTML = `
  <header class="site-header"><div class="container nav">
    <a href="#top" class="logo"><img src="${S.brand.logo}" alt="${S.brand.name}"></a>
    <nav>${map(S.nav, n => `<a href="${n.href}">${n.label}</a>`)}</nav>
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
    ${PC.calc ? `<div class="pace-calc reveal-block"><p>${fill(PC.calc)}</p>
      <div class="days" id="days" aria-hidden="true">${"<i></i>".repeat(30)}</div></div>` : ""}
  </div>
  ${tick ? `<div class="ticker" aria-hidden="true"><div class="track">${tick}${tick}</div></div>` : ""}
  </section>

  ${H.video ? `<section class="video-section"><div class="container">
    <div class="video reveal-block"><iframe src="${H.video}" title="فيديو تعريفي" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
  </div></section>` : ""}

  ${ST ? `<section class="story" id="story" aria-label="${ST.title}"><div class="container story-stick">
    <div>${head(ST.eyebrow, ST.title)}
      <div class="story-text">${map(ST.stages, (s, i) => `
        <div class="stage${i ? "" : " on"}"><span class="n">المرحلة ${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></div>`)}</div>
      <div class="story-progress" aria-hidden="true">${map(ST.stages, (s, i) => `<i${i ? "" : ` class="on"`}></i>`)}</div>
    </div>
    <div class="story-visual" aria-hidden="true">${storySvg}</div>
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
    <div class="grid" data-stagger>${map(T.items, t => `
      <figure class="card">
        ${t.image ? `<img class="t-img" src="${t.image}" alt="">` : ""}
        ${t.quote ? `<blockquote>“${t.quote}”</blockquote>` : ""}
        <figcaption class="muted small">${t.author}</figcaption>
      </figure>`)}</div>
  </div></section>

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

  <section id="faq" class="section"><div class="container narrow">
    ${head("", Q.title)}
    <div class="list reveal-block">${map(Q.items, f => `<details><summary>${f.q}</summary><p class="faq-a">${f.a}</p></details>`)}</div>
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
        <p>${S.footerText || "تعلّم Fusion 360 بالعربية من الصفر، وأنهِ الدورة بمشروع حقيقي وشهادة من Autodesk."}</p>
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
  </div>
  ${TP && TP.length ? `<div class="tape" id="tape" aria-hidden="true"><div class="tape-track"><span class="unit">${map(TP, t => `${t} &nbsp;•&nbsp; `)}</span></div></div>` : ""}`;

  // ===== نموذج التسجيل: قيود الحقول ثم الإرسال =====
  const form = document.getElementById("signup-form");
  const msg = document.getElementById("form-msg");

  const rules = {
    // الاسم: أحرف عربية أو إنجليزية ومسافات فقط
    name: {
      clean: v => v.replace(/[^\p{L}\p{M}\s'.-]/gu, ""),
      ok: v => /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,59}$/u.test(v.trim()),
      error: F.nameError
    },
    // الإيميل: أحرف إنجليزية وأرقام و @ . _ - + فقط
    email: {
      clean: v => v.replace(/[^A-Za-z0-9._%+@-]/g, ""),
      ok: v => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v.trim()),
      error: F.emailError
    },
    // الرقم: أرقام فقط، مع + اختيارية في البداية
    phone: {
      clean: v => v.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, ""),
      ok: v => v.trim() === "" || /^\+?\d{7,15}$/.test(v.trim()),
      error: F.phoneError
    }
  };

  // يمنع كتابة الأحرف غير المسموحة أثناء الكتابة
  for (const [field, r] of Object.entries(rules)) {
    const el = form.elements[field];
    el.addEventListener("input", () => {
      const cleaned = r.clean(el.value);
      if (cleaned !== el.value) el.value = cleaned;
      el.classList.remove("invalid");
      msg.textContent = "";
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
