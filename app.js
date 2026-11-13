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
        <path class="dimline" d="M60 60 H240 M60 52
