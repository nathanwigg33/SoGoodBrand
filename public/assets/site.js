// So Good — builds the header, footer and every section from content.js.
// You shouldn't need to edit this file. Change words in /content.js instead.
(function () {
  var C = window.SOGOOD || {};
  var NAV = [
    { href: "/shop", label: "Shop" },
    { href: "/purpose", label: "Our Purpose" },
    { href: "/money", label: "Where the Money Goes" },
    { href: "/faq", label: "FAQ" },
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel) { return document.querySelector(sel); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function color(name) { return (C.colors && C.colors[name]) || ["#FFFFFF", "#000000"]; }
  function money(n) { return "$" + (Math.round(n * 100) % 100 ? Number(n).toFixed(2) : n); }
  function shirts() { return C.shirts || []; }
  function shirtById(id) { return shirts().filter(function (s) { return s.id === id; })[0]; }
  function norm(t) { return String(t || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim(); }
  function name() { return (C.person && C.person.name) || ""; }

  var path = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (path.length > 1) path = path.replace(/\/$/, "");

  /* ---------- the shirt drawing ---------- */
  var TEE = "M104 22 L64 36 L14 80 L44 126 L74 110 L74 304 Q150 312 226 304 L226 110 L256 126 L286 80 L236 36 L196 22 Q150 56 104 22 Z";
  var CREW = "M106 22 L68 33 Q42 42 33 108 L18 276 L54 281 L76 152 L76 300 Q150 309 224 300 L224 152 L246 281 L282 276 L267 108 Q258 42 232 33 L194 22 Q150 52 106 22 Z";
  var LIGHT = { "#FFFFFF": 1, "#E6E3DC": 1, "#C9C9C5": 1 };

  function shirtSVG(shirt, colorName, cls) {
    var c = color(colorName || shirt.colors[0]);
    var words = norm(shirt.saying) || String(shirt.saying).toLowerCase();
    var crew = shirt.kind === "crew";
    var size = Math.min(words.length <= 4 ? 40 : 26, 118 / (words.length * 0.7));
    var light = LIGHT[c[0].toUpperCase()];
    return (
      '<svg class="tee ' + (cls || "") + '" viewBox="0 0 300 320" role="img" aria-label="' + esc(shirt.name) + " in " + esc(colorName || shirt.colors[0]) + '">' +
      '<defs><linearGradient id="fab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#000" stop-opacity=".09"/></linearGradient></defs>' +
      '<path d="' + (crew ? CREW : TEE) + '" fill="' + c[0] + '"' + (light ? ' stroke="rgba(0,0,0,.14)" stroke-width="1.5"' : "") + ' stroke-linejoin="round"/>' +
      '<path d="' + (crew ? CREW : TEE) + '" fill="url(#fab)"/>' +
      '<path d="M104 22 Q150 56 196 22 L204 25 Q150 66 96 25 Z" fill="#000" opacity=".1"/>' +
      '<path d="' + (crew ? "M76 152 L76 112 M224 152 L224 112" : "M74 110 L82 92 M226 110 L218 92") + '" stroke="#000" stroke-opacity=".08" stroke-width="1.5" fill="none"/>' +
      (crew ? '<path d="M76 292 Q150 301 224 292 M18 266 L54 271 M246 271 L282 266" stroke="#000" stroke-opacity=".12" stroke-width="1.5" fill="none"/>' : "") +
      '<text x="150" y="' + (crew ? 136 : 128) + '" text-anchor="middle" style="font-family:Archivo,Helvetica Neue,Arial,sans-serif;font-weight:800;font-stretch:125%;letter-spacing:-0.04em" font-size="' + size.toFixed(1) + '" fill="' + c[1] + '">' + esc(words) + "</text>" +
      "</svg>"
    );
  }

  /* ---------- header & footer ---------- */
  var MARK = '<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M5 2.5h16a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H11l-5 5v-5H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  function logo() {
    return '<a class="brand" href="/" aria-label="' + esc(C.brand) + ' home">' + MARK + "<span>" + esc((C.brand || "").toLowerCase()) + "</span></a>";
  }
  function isActive(href) { return path === href || path.indexOf(href + "/") === 0; }

  var header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap header-inner">' + logo() +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav"><span class="bar"></span><span class="bar"></span><span class="sr-only">Menu</span></button>' +
      '<nav id="site-nav" class="site-nav" aria-label="Main">' +
      NAV.map(function (n) { return '<a href="' + n.href + '"' + (isActive(n.href) ? ' aria-current="page"' : "") + ">" + n.label + "</a>"; }).join("") +
      '<a class="btn" href="/shop">Shop shirts</a></nav></div>';
    var toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  var footer = $("#site-footer");
  if (footer) {
    var socials = [["Instagram", C.instagram], ["TikTok", C.tiktok], ["Facebook", C.facebook]].filter(function (s) { return s[1]; });
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap"><p class="footer-word" aria-hidden="true">' + esc((C.brand || "").toLowerCase()) + "</p></div>" +
      '<div class="wrap footer-grid">' +
      '<div class="footer-brand"><p>' + esc(C.tagline) + " Every shirt helps " + esc(name()) + " and people like him.</p></div>" +
      '<div><h4>Shop</h4><a href="/shop">All shirts</a><a href="/faq#sizes">Size chart</a><a href="/faq">FAQ</a></div>' +
      '<div><h4>About</h4><a href="/purpose">Our purpose</a><a href="/money">Where the money goes</a><a href="mailto:' + esc(C.contactEmail) + '">Email us</a>' +
      socials.map(function (s) { return '<a href="' + esc(s[1]) + '" rel="noopener" target="_blank">' + s[0] + "</a>"; }).join("") + "</div>" +
      '</div><div class="wrap footer-bottom"><span>&copy; ' + new Date().getFullYear() + " " + esc(C.brand) + "</span><span>Made for " + esc(name()) + ".</span></div>";
  }

  /* ---------- text slots: <span data-text="person.name"></span> ---------- */
  each("[data-text]", function (el) {
    var v = el.getAttribute("data-text").split(".").reduce(function (o, k) { return o && o[k]; }, C);
    if (v != null) el.textContent = v;
  });

  /* ---------- home: the speech bubble + matching shirt ---------- */
  function drawBubble(btn) {
    var svg = btn.querySelector(".say-outline");
    var w = btn.offsetWidth, h = btn.offsetHeight;
    var r = Math.min(h * 0.3, 56), tx = Math.max(r + 8, w * 0.1), tail = Math.max(22, h * 0.16);
    svg.setAttribute("viewBox", "0 0 " + w + " " + (h + tail));
    svg.style.height = h + tail + "px";
    svg.innerHTML = '<path d="M' + r + ",0 H" + (w - r) + " Q" + w + ",0 " + w + "," + r + " V" + (h - r) + " Q" + w + "," + h + " " + (w - r) + "," + h +
      " H" + (tx + tail * 1.5) + " L" + (tx + 2) + "," + (h + tail) + " L" + (tx + tail * 0.4) + "," + h + " H" + r + " Q0," + h + " 0," + (h - r) + " V" + r + " Q0,0 " + r + ',0 Z"/>';
  }
  function heroShirtFor(saying) {
    var match = shirts().filter(function (s) { return norm(s.saying) === norm(saying) && s.kind !== "crew"; })[0] ||
                shirts().filter(function (s) { return norm(s.saying) === norm(saying); })[0];
    return match || { id: "", saying: saying, name: "“" + saying + "”", kind: "tee", colors: ["white"] };
  }
  var say = $("#say");
  if (say && C.sayings && C.sayings.length) {
    var word = say.querySelector(".say-word");
    var fig = $("#hero-shirt");
    var i = 0;
    var show = function (animate) {
      var text = C.sayings[i];
      word.textContent = text.toLowerCase();
      if (animate) { word.classList.remove("swap"); void word.offsetWidth; word.classList.add("swap"); }
      drawBubble(say);
      if (fig) {
        var s = heroShirtFor(text);
        fig.innerHTML = shirtSVG(s, s.colors[0], animate ? "swap" : "") +
          "<figcaption><span>" + esc(s.name) + (s.price ? " &middot; " + money(s.price) : "") + "</span>" +
          (s.id ? '<a href="/shirt?id=' + encodeURIComponent(s.id) + '">View</a>' : "<span>Coming soon</span>") + "</figcaption>";
      }
    };
    say.addEventListener("click", function () { i = (i + 1) % C.sayings.length; show(true); });
    window.addEventListener("resize", function () { drawBubble(say); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { drawBubble(say); });
    show(false);
  }

  /* ---------- shirt cards ---------- */
  function card(s) {
    var alt = s.colors[1];
    return (
      '<a class="shirt-card" href="/shirt?id=' + encodeURIComponent(s.id) + '">' +
      '<div class="shirt-frame">' + shirtSVG(s, s.colors[0], "main" + (alt ? " has-alt" : "")) + (alt ? shirtSVG(s, alt, "alt") : "") +
      (s.shopLink ? "" : '<span class="badge">Coming soon</span>') + "</div>" +
      '<div class="shirt-meta"><b>' + esc(s.name) + "</b><span>" + money(s.price) + "</span></div>" +
      '<div class="dots" aria-label="' + s.colors.length + ' colors">' + s.colors.map(function (c) { return '<span style="background:' + color(c)[0] + '"></span>'; }).join("") + "</div></a>"
    );
  }
  each("[data-shirts]", function (el) {
    var limit = parseInt(el.getAttribute("data-shirts"), 10) || 99;
    el.className = "shirt-grid";
    el.innerHTML = shirts().slice(0, limit).map(card).join("");
  });

  /* ---------- quotes ---------- */
  each("[data-quotes]", function (el) {
    el.className = "quotes";
    el.innerHTML = (C.quotes || []).map(function (q) {
      return '<figure class="quote"><blockquote>' + esc(q.text) + "</blockquote><figcaption>" + esc(q.who) + "</figcaption></figure>";
    }).join("");
  });

  /* ---------- purpose points ---------- */
  each("[data-points]", function (el) {
    el.className = "points";
    el.innerHTML = ((C.purpose && C.purpose.points) || []).map(function (p) {
      return "<li><strong>" + esc(p.title) + "</strong><span>" + esc(p.text) + "</span></li>";
    }).join("");
  });

  /* ---------- photo & story ---------- */
  each("[data-photo]", function (el) {
    var p = C.person || {};
    el.className = "photo";
    el.innerHTML = p.photo
      ? '<img src="/' + esc(p.photo.replace(/^\//, "")) + '" alt="' + esc(p.name) + '">'
      : '<div class="photo-placeholder"><div><svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="17" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 90c4-19 17-28 32-28s28 9 32 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Photo of ' + esc(p.name) + "</div></div>";
  });
  each("[data-story]", function (el) {
    el.innerHTML = ((C.person && C.person.story) || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  });

  /* ---------- money ---------- */
  each("[data-money]", function (el) {
    var parts = (C.money && C.money.parts) || [];
    var total = parts.reduce(function (a, p) { return a + Number(p.amount || 0); }, 0) || 1;
    el.innerHTML =
      '<div class="money-bar" role="img" aria-label="How ' + money(total) + ' is split">' +
      parts.map(function (p) { return '<span style="flex:' + p.amount + ";background:" + color(p.color)[0] + '"></span>'; }).join("") + "</div>" +
      '<ul class="legend">' + parts.map(function (p) {
        return '<li><i style="background:' + color(p.color)[0] + '"></i>' + esc(p.label) + "<b>" + money(p.amount) + "<em>" + Math.round((p.amount / total) * 100) + "%</em></b></li>";
      }).join("") + "</ul>";
  });
  each("[data-updates]", function (el) {
    var u = (C.money && C.money.updates) || [];
    el.innerHTML = u.length
      ? '<ul class="updates">' + u.map(function (x) { return "<li><strong>" + esc(x.date) + "</strong><span>" + esc(x.text) + "</span></li>"; }).join("") + "</ul>"
      : '<p class="note">No updates yet. The first one goes up after the first shirts sell.</p>';
  });

  /* ---------- faq & sizes ---------- */
  each("[data-faq]", function (el) {
    el.className = "faq";
    el.innerHTML = (C.faq || []).map(function (f) {
      return "<details><summary>" + esc(f.q) + "</summary><div><p>" + esc(f.a) + "</p></div></details>";
    }).join("");
  });
  function sizeTable() {
    return '<table class="size-table"><thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead><tbody>' +
      (C.sizes || []).map(function (r) { return "<tr><td><b>" + esc(r[0]) + "</b></td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") +
      "</tbody></table>";
  }
  each("[data-size-table]", function (el) { el.innerHTML = sizeTable(); });

  /* ---------- notify (opens an email until a real signup list is connected) ---------- */
  function notifyHref(email, about) {
    return "mailto:" + C.contactEmail + "?subject=" + encodeURIComponent("Notify me: " + (about || C.brand)) +
      "&body=" + encodeURIComponent("Please let me know when " + (about || "So Good shirts") + " are available." + (email ? "\n\nMy email: " + email : ""));
  }
  each("form[data-notify]", function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      location.href = notifyHref(form.querySelector("input").value);
    });
  });
  each("[data-mailto]", function (a) { a.href = "mailto:" + C.contactEmail; });

  /* ---------- single shirt page ---------- */
  var detail = $("#shirt-detail");
  if (detail) {
    var s = shirtById(new URLSearchParams(location.search).get("id")) || shirts()[0];
    if (!s) return;
    document.title = s.name + " | " + C.brand;
    var state = { color: s.colors[0], size: null };
    var others = shirts().filter(function (x) { return x.id !== s.id; });

    detail.innerHTML =
      '<div class="detail">' +
      '<div class="detail-stage" id="stage"></div>' +
      '<div><div class="crumbs"><a href="/shop">Shop</a> / ' + esc(s.name) + "</div>" +
      "<h1>" + esc(s.name) + '</h1><div class="price">' + money(s.price) + "</div>" +
      '<p class="desc">' + esc(s.description) + "</p>" +
      '<div class="option-label"><span>Color <span class="val" id="color-name"></span></span></div>' +
      '<div class="swatches" role="group" aria-label="Color">' + s.colors.map(function (c) {
        return '<button class="swatch" type="button" data-color="' + esc(c) + '" style="background:' + color(c)[0] + '" aria-label="' + esc(c) + '" aria-pressed="false"></button>';
      }).join("") + "</div>" +
      '<div class="option-label"><span>Size</span><a href="#size-chart">Size chart</a></div>' +
      '<div class="sizes" role="group" aria-label="Size">' + (C.sizes || []).map(function (r) {
        return '<button class="size" type="button" data-size="' + esc(r[0]) + '" aria-pressed="false">' + esc(r[0]) + "</button>";
      }).join("") + "</div>" +
      '<p class="fit">' + esc(C.fitNote) + "</p>" +
      '<div class="buy"><a class="btn" id="buy-btn" href="#">' + (s.shopLink ? "Add to cart" : "Get notified when it's ready") + '</a><div class="buy-msg" id="buy-msg" aria-live="polite"></div></div>' +
      '<div class="give">Part of every ' + esc(s.name) + " supports " + esc(name()) + ' and other brain injury survivors. <a href="/money">Where the money goes</a></div>' +
      '<h3 id="size-chart">Size chart</h3>' + sizeTable() +
      "</div></div>";

    if (others.length) {
      var more = document.createElement("section");
      more.className = "section section-line";
      more.innerHTML = '<div class="wrap"><div class="section-head"><h2>more shirts</h2><a class="text-link" href="/shop">See all</a></div><div class="shirt-grid">' +
        others.slice(0, 4).map(card).join("") + "</div></div>";
      detail.closest("section").after(more);
    }

    var stage = $("#stage");
    var paint = function () {
      stage.innerHTML = shirtSVG(s, state.color);
      $("#color-name").textContent = state.color;
      each(".swatch", function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-color") === state.color ? "true" : "false"); });
      each(".size", function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-size") === state.size ? "true" : "false"); });
    };
    each(".swatch", function (b) { b.addEventListener("click", function () { state.color = b.getAttribute("data-color"); paint(); }); });
    each(".size", function (b) { b.addEventListener("click", function () { state.size = b.getAttribute("data-size"); $("#buy-msg").textContent = ""; paint(); }); });
    $("#buy-btn").addEventListener("click", function (e) {
      e.preventDefault();
      if (!state.size) { $("#buy-msg").textContent = "Choose a size first."; return; }
      location.href = s.shopLink ? s.shopLink : notifyHref("", s.name + " (" + state.color + ", " + state.size + ")");
    });
    paint();
  }
})();
