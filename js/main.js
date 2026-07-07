/* Shared rendering + theme toggle. Depends on js/data.js loaded first.
   NOTE: the initial theme is set by a tiny inline <head> script on each
   page (before the stylesheet) to avoid a flash on navigation. */

function toggleTheme() {
  const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = cur;
  localStorage.setItem("theme", cur);
  syncToggleIcon();
}

function syncToggleIcon() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const dark = document.documentElement.dataset.theme === "dark";
  btn.textContent = dark ? "☀" : "☾";
  btn.setAttribute("aria-pressed", String(dark));
  btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

// ---------- helpers ----------
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// Venues highlighted in the publication list (visual prominence, no badge).
const TOP_VENUES = [
  "Nature Communications",
  "Energy & Environmental Science",
  "Advanced Materials",
  "Advanced Energy Materials",
  "Materials Today",
  "Applied Catalysis B: Environment and Energy",
  "Applied Catalysis B: Environmental and Energy",
];

// Bold the author only on an EXACT comma-delimited token match, so
// "S. J. Kim" / "J. H. Kim" are never mistaken for "J. Kim".
function boldMe(authors) {
  if (!HIGHLIGHT_AUTHOR) return authors;
  return authors
    .split(", ")
    .map((t) => (t === HIGHLIGHT_AUTHOR ? '<span class="me">' + t + "</span>" : t))
    .join(", ");
}

// ---------- renderers ----------
function renderMetrics(containerId) {
  const root = document.getElementById(containerId);
  if (!root || typeof METRICS === "undefined") return;
  METRICS.forEach((m) => {
    const cell = el("div", "metric");
    cell.appendChild(el("div", "mval", m.value));
    cell.appendChild(el("div", "mlabel", m.label));
    if (m.sub) cell.appendChild(el("div", "msub", m.sub));
    root.appendChild(cell);
  });
  // Optional affiliations strip directly under the metrics.
  if (typeof PROFILE !== "undefined" && PROFILE.affiliations) {
    const strip = document.getElementById("affiliations-strip");
    if (strip) strip.textContent = PROFILE.affiliations;
  }
}

const SVGNS = "http://www.w3.org/2000/svg";
function svg(tag, attrs) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}
function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

// Signature "closed loop" identity graphic: a ring of 5 stages, color-coded
// computation (teal) vs experiment (warm), run by one person (center).
function renderLoopGraphic(containerId, noteId) {
  const root = document.getElementById(containerId);
  if (!root || typeof LOOP === "undefined") return;
  root.innerHTML = "";
  const note = noteId && document.getElementById(noteId);
  if (note) note.setAttribute("aria-live", "polite");
  const setNote = (txt) => { if (note) note.textContent = txt; };
  const isTouch = window.matchMedia && window.matchMedia("(hover: none)").matches;
  const defaultNote = isTouch
    ? "Tap each stage — one closed loop, from prediction to device."
    : (typeof LOOP_NOTE === "string" ? LOOP_NOTE : "");
  const W = 460, H = 360, cx = 230, cy = 176, R = 128;
  const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "idloop" });
  const titleEl = svg("title");
  titleEl.textContent =
    "Closed research loop: ML screening → DFT/MLIP/MD → synthesis → operando analysis → MEA device";
  s.appendChild(titleEl);

  // arrowhead marker
  const defs = svg("defs");
  const marker = svg("marker", { id: "idarrow", viewBox: "0 0 10 10", refX: "8", refY: "5",
    markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" });
  marker.appendChild(svg("path", { d: "M0,0 L10,5 L0,10 z", class: "idarrowhead" }));
  defs.appendChild(marker);
  s.appendChild(defs);

  const n = LOOP.length;
  const angles = LOOP.map((_, i) => -90 + (360 / n) * i);
  const pts = angles.map((a) => polar(cx, cy, R, a));

  // connecting arcs (clockwise) with arrowheads
  const gap = 24; // degrees of clearance around each node
  for (let i = 0; i < n; i++) {
    const a0 = angles[i] + gap;
    const a1 = angles[(i + 1) % n] - gap + (i === n - 1 ? 360 : 0);
    const [x0, y0] = polar(cx, cy, R, a0);
    const [x1, y1] = polar(cx, cy, R, a1);
    s.appendChild(svg("path", {
      d: `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`,
      class: "idarc", "marker-end": "url(#idarrow)",
    }));
  }

  // center label
  const c1 = svg("text", { x: cx, y: cy - 6, class: "idcenter", "text-anchor": "middle" });
  const c2 = svg("text", { x: cx, y: cy + 14, class: "idcenter", "text-anchor": "middle" });
  const cl = typeof LOOP_CENTER !== "undefined" ? LOOP_CENTER : ["One researcher", "full stack"];
  c1.textContent = cl[0] || "";
  c2.textContent = cl[1] || "";
  s.appendChild(c1); s.appendChild(c2);

  // Attach to the DOM now so text getBBox() below is measurable.
  root.appendChild(s);

  // nodes — accessible buttons; size the chip from the rendered text box
  const nodes = [];
  LOOP.forEach((step, i) => {
    const [x, y] = pts[i];
    const label = step.label || step;
    const h = 30;
    const g = svg("g", {
      class: "idnode " + (step.phase === "exp" ? "exp" : "comp"),
      tabindex: "0", role: "button",
      "aria-label": label + (step.detail ? ": " + step.detail : ""),
    });
    const rect = svg("rect", { x: 0, y: (y - h / 2).toFixed(1), width: 10, height: h, rx: 8 });
    const t = svg("text", { x: x.toFixed(1), y: (y + 4).toFixed(1), "text-anchor": "middle" });
    t.textContent = label;
    g.appendChild(rect);
    g.appendChild(t);
    s.appendChild(g);
    // width from actual text metrics (font-independent), then center it
    const tw = t.getBBox ? t.getBBox().width : label.length * 7.1;
    const w = Math.max(74, tw + 26);
    rect.setAttribute("width", w.toFixed(1));
    rect.setAttribute("x", (x - w / 2).toFixed(1));
    const show = () => {
      nodes.forEach((o) => o.classList.remove("active"));
      g.classList.add("active");
      setNote(step.detail || LOOP_NOTE);
    };
    g.addEventListener("mouseenter", show);
    g.addEventListener("click", show);
    g.addEventListener("focus", show);
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); }
    });
    nodes.push(g);
  });

  s.addEventListener("mouseleave", () => {
    nodes.forEach((o) => o.classList.remove("active"));
    setNote(defaultNote);
  });

  // legend
  const legend = el("div", "loop-legend");
  legend.innerHTML =
    '<span class="lg comp"><span class="dot"></span>Computation</span>' +
    '<span class="lg exp"><span class="dot"></span>Experiment</span>';
  root.appendChild(legend);

  setNote(defaultNote);
}

function renderPublications(containerId, mode, predicate) {
  // mode: "selected" (homepage) or "all" (grouped by year)
  // predicate: optional filter (p) => boolean
  const root = document.getElementById(containerId);
  if (!root) return;
  root.innerHTML = "";
  let pubs = mode === "selected" ? PUBLICATIONS.filter((p) => p.selected) : PUBLICATIONS.slice();
  if (predicate) pubs = pubs.filter(predicate);

  if (!pubs.length) {
    root.appendChild(el("p", "prose", "<span style='color:var(--text-faint)'>No entries.</span>"));
    return;
  }

  let lastYear = null;
  pubs.forEach((p) => {
    if (mode !== "selected" && p.year !== lastYear) {
      const yh = el("div", "pub-year", String(p.year));
      yh.dataset.year = p.year;
      root.appendChild(yh);
      lastYear = p.year;
    }
    const item = el("div", "pub-item");
    const title = el("div", "pub-title", p.title);
    if (p.first) {
      const b = el("span", "pub-first", "1st / co-1st");
      b.title = "First or co-first author";
      title.appendChild(b);
    }
    item.appendChild(title);
    item.appendChild(el("div", "pub-authors", boldMe(p.authors)));
    const topTier = TOP_VENUES.some((v) => p.venue === v);
    const venueClass = topTier ? "venue-top" : "";
    const venue =
      '<em class="' + venueClass + '">' + p.venue + "</em>" +
      (p.venueDetail ? " " + p.venueDetail : "") +
      (mode === "selected" ? " · " + p.year : "");
    item.appendChild(el("div", "pub-venue", venue));
    const links = el("div", "pub-links");
    Object.entries(p.links || {}).forEach(([k, url]) => {
      if (!url) return;
      const a = el("a", null, k.toUpperCase());
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    });
    if (links.children.length) item.appendChild(links);
    // Featured figure (homepage only)
    if (mode === "selected" && p.image) {
      const fig = el("figure", "pub-figure");
      const img = el("img");
      img.src = p.image;
      img.alt = p.title;
      img.loading = "lazy";
      fig.appendChild(img);
      if (p.imageCaption) fig.appendChild(el("figcaption", null, p.imageCaption));
      item.appendChild(fig);
    }
    root.appendChild(item);
  });
}

// Interactive "publications per year" bar chart. Real counts derived
// from PUBLICATIONS; clicking a bar resets to All and jumps to that year.
function renderPubTimeline(containerId, listContainerId, chipsId) {
  const root = document.getElementById(containerId);
  if (!root || typeof PUBLICATIONS === "undefined") return;
  root.innerHTML = "";
  const counts = {};
  PUBLICATIONS.forEach((p) => { counts[p.year] = (counts[p.year] || 0) + 1; });
  const years = Object.keys(counts).map(Number).sort((a, b) => a - b);
  if (!years.length) return;
  const max = Math.max(...years.map((y) => counts[y]));

  const chart = el("div", "tl-chart");
  years.forEach((y) => {
    const col = el("div", "tl-col");
    col.setAttribute("role", "button");
    col.setAttribute("tabindex", "0");
    col.setAttribute("aria-label", counts[y] + " publications in " + y + " — jump to " + y);
    col.appendChild(el("span", "tl-count", String(counts[y])));
    const track = el("div", "tl-track");
    const bar = el("div", "tl-bar");
    bar.style.height = Math.max(6, Math.round((counts[y] / max) * 100)) + "%";
    track.appendChild(bar);
    col.appendChild(track);
    col.appendChild(el("span", "tl-year", "’" + String(y).slice(2)));
    const go = () => {
      const chips = chipsId ? document.querySelectorAll("#" + chipsId + " .filter-chip") : [];
      chips.forEach((c) => c.classList.remove("active"));
      if (chips[0]) chips[0].classList.add("active");
      renderPublications(listContainerId, "all");
      const head = document.querySelector(
        "#" + listContainerId + ' .pub-year[data-year="' + y + '"]'
      );
      if (head) {
        const top = head.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        head.classList.add("tl-jumped");
        setTimeout(() => head.classList.remove("tl-jumped"), 1400);
      }
    };
    col.addEventListener("click", go);
    col.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
    chart.appendChild(col);
  });
  root.appendChild(chart);
  root.appendChild(el("div", "tl-caption", "Publications per year · click a year to jump"));
}

// Filter chips for the publications page
function setupPubFilter(chipsId, containerId) {
  const chips = document.getElementById(chipsId);
  if (!chips) return;
  const defs = [
    { key: "all", label: "All", fn: null },
    { key: "first", label: "First / co-first", fn: (p) => p.first },
    { key: "featured", label: "Featured", fn: (p) => p.selected },
  ];
  defs.forEach((d, i) => {
    const b = el("button", "filter-chip" + (i === 0 ? " active" : ""), d.label);
    b.addEventListener("click", () => {
      chips.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      b.classList.add("active");
      renderPublications(containerId, "all", d.fn);
    });
    chips.appendChild(b);
  });
}

function renderWorkWithMe(containerId) {
  const root = document.getElementById(containerId);
  if (!root || typeof WORKWITHME === "undefined") return;
  root.appendChild(el("p", "wwm-pitch", WORKWITHME.pitch));
  const ul = el("ul", "wwm-brings");
  WORKWITHME.brings.forEach((b) => ul.appendChild(el("li", null, b)));
  root.appendChild(ul);
  const cta = el("div", "wwm-cta");
  const btn = el("a", "btn", "Email me →");
  btn.href = "mailto:" + PROFILE.email;
  cta.appendChild(btn);
  cta.appendChild(el("span", "note", WORKWITHME.cta));
  root.appendChild(cta);
}

const NEWS_TAG_LABEL = { paper: "Paper", talk: "Talk", award: "Award", milestone: "Milestone" };
function renderNews(containerId, limit) {
  const root = document.getElementById(containerId);
  if (!root) return;
  (limit ? NEWS.slice(0, limit) : NEWS).forEach((n) => {
    const li = el("li");
    li.appendChild(el("span", "date", n.date));
    const what = el("span", "what");
    if (n.type && NEWS_TAG_LABEL[n.type]) {
      what.appendChild(el("span", "news-tag " + n.type, NEWS_TAG_LABEL[n.type]));
    }
    what.appendChild(el("span", null, n.html));
    li.appendChild(what);
    root.appendChild(li);
  });
}

function renderDirections(containerId) {
  const root = document.getElementById(containerId);
  if (!root) return;
  PROJECTS.forEach((p) => {
    const row = el("div", "direction");
    row.appendChild(el("div", "dnum", p.n || ""));
    row.appendChild(el("h3", null, p.title));
    row.appendChild(el("div", "ddesc", p.desc));
    const tags = el("div", "tags");
    (p.tags || []).forEach((t) => tags.appendChild(el("span", "tag", t)));
    row.appendChild(tags);
    root.appendChild(row);
  });
}

function renderCVList(containerId, entries) {
  const root = document.getElementById(containerId);
  if (!root || !entries) return;
  entries.forEach((e) => {
    const row = el("div", "cv-entry");
    row.appendChild(el("div", "period", e.period));
    row.appendChild(
      el("div", "what", "<strong>" + e.title + "</strong><span>" + e.where + "</span>")
    );
    root.appendChild(row);
  });
}

function renderBio(textId, copyBtnId) {
  const t = document.getElementById(textId);
  if (t && typeof BIO === "string") t.innerHTML = BIO;
  const btn = document.getElementById(copyBtnId);
  if (btn && typeof BIO_SHORT === "string") {
    const flash = () => {
      const o = "Copy short bio";
      btn.textContent = "Copied ✓";
      btn.classList.add("active");
      setTimeout(() => { btn.textContent = o; btn.classList.remove("active"); }, 1600);
    };
    const fallbackCopy = () => {
      const ta = document.createElement("textarea");
      ta.value = BIO_SHORT;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) flash(); else window.prompt("Copy the short bio:", BIO_SHORT);
    };
    btn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(BIO_SHORT).then(flash).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  }
}

function renderSkills(containerId) {
  const root = document.getElementById(containerId);
  if (!root) return;
  CV.skills.forEach((s) => {
    const row = el("div", "skill-row");
    row.appendChild(el("div", "skill-label", s.label));
    const tags = el("div", "skill-tags");
    s.items.split(", ").forEach((it) => tags.appendChild(el("span", "tag", it)));
    row.appendChild(tags);
    root.appendChild(row);
  });
}

// ---------- profile / static fill-in ----------
function setText(id, val) {
  const n = document.getElementById(id);
  if (n && val !== undefined) n.textContent = val;
}

function fillProfile() {
  // data-attribute text bindings
  document.querySelectorAll("[data-profile]").forEach((node) => {
    const key = node.dataset.profile;
    if (PROFILE[key] !== undefined) node.textContent = PROFILE[key];
  });
  document.querySelectorAll("[data-profile-href]").forEach((node) => {
    const key = node.dataset.profileHref;
    if (key === "email") node.href = "mailto:" + PROFILE.email;
    else if (PROFILE[key]) node.href = PROFILE[key];
    else node.remove(); // hide links with no URL set
  });

  // hero eyebrow: field / role
  const eb = document.getElementById("hero-eyebrow");
  if (eb) eb.textContent = PROFILE.role;

  // hero identity block — scannable, not prose
  const hiName = document.getElementById("hi-name");
  if (hiName) hiName.textContent = PROFILE.name;
  const hiRole = document.getElementById("hi-role");
  if (hiRole) hiRole.innerHTML = PROFILE.title + " · <strong>" + PROFILE.institution + "</strong>";
  const hiMeta = document.getElementById("hi-meta");
  if (hiMeta) {
    const bits = [];
    if (PROFILE.department) bits.push(PROFILE.department);
    if (PROFILE.advisor) bits.push("Advisor: " + PROFILE.advisor);
    hiMeta.textContent = bits.join(" · ");
  }

  // hero flagship credential (linked)
  const flag = document.getElementById("hero-flagship");
  if (flag && PROFILE.flagship) {
    flag.innerHTML = "";
    const a = el("a", null, PROFILE.flagship.text);
    if (PROFILE.flagship.url) { a.href = PROFILE.flagship.url; a.target = "_blank"; a.rel = "noopener"; }
    flag.appendChild(a);
  }

  const about = document.getElementById("about-text");
  if (about && typeof ABOUT === "string") about.textContent = ABOUT;

  const y = document.getElementById("footer-year");
  if (y) y.textContent = new Date().getFullYear();
}

// Sections are shown immediately (no fade). On the single-page layout a
// fade-until-scroll would hide anchor-jump targets, so we keep it off.
function setupReveal() {
  document.querySelectorAll("section.block").forEach((b) => b.classList.add("in"));
}

// Scroll-spy for the single-page nav: highlight the section in view.
function setupScrollSpy() {
  const links = [...document.querySelectorAll('nav.main-nav a[href^="#"]')];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const map = {};
  links.forEach((a) => {
    const s = document.getElementById(a.getAttribute("href").slice(1));
    if (s) map[s.id] = a;
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach((a) => a.classList.remove("active"));
          map[e.target.id].classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  Object.keys(map).forEach((id) => io.observe(document.getElementById(id)));
}

document.addEventListener("DOMContentLoaded", () => {
  fillProfile();
  syncToggleIcon();
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", toggleTheme);

  // multi-page fallback: mark active by filename (ignored when nav uses #anchors)
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('nav.main-nav a:not([href^="#"])').forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  setupReveal();
  setupScrollSpy();
});
