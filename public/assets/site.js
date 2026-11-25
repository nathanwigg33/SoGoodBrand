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
  function color(name) { return (C.colors && C.colors[name]) || ["#FFFFFF", "#1B1F5E"]; }
  function money(n) { return "$" + (Math.round(n * 100) % 100 ? n.toFixed(2) : n); }
  function shirtById(id) { return (C.shirts || []).filter(function (s) { return s.id === id; })[0]; }

  // Page path, so the current nav link is highlighted.
  var path = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (path.length > 1) path = path.replace(/\/$/, "");

  /* ---------- the shirt drawing ---------- */
  var TEE = "M104 22 L64 36 L12 82 L44 130 L74 112 L74 306 Q150 314 226 306 L226 112 L256 130 L288 82 L236 36 L196 22 Q150 58 104 22 Z";
  var CREW = "M106 22 L66 34 Q40 44 30 110 L14 276 L52 282 L76 150 L76 300 Q150 310 224 300 L224 150 L248 282 L286 276 L270 110 Q260 44 234 34 L194 22 Q150 52 106 22 Z";

  function shirtSVG(shirt, colorName, label) {
    var c = color(colorName || shirt.colors[0]);
    var words = shirt.saying;
    var size = Math.min(words.length <= 4 ? 64 : 46, Math.round(250 / Math.max(words.length, 4)));
    var crew = shirt.kind === "crew";
    return (
      '<svg class="tee" viewBox="0 0 300 320" role="img" aria-label="' + esc(label || shirt.name) + '">' +
      '<path d="' + (crew ? CREW : TEE) + '" fill="' + c[0] + '" stroke="#1B1F5E" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M104 22 Q150 58 196 22" fill="none" stroke="#1B1F5E" stroke-width="5"/>' +
      '<path d="M114 26 Q150 50 186 26" fill="none" stroke="#1B1F5E" stroke-width="3" opacity=".5"/>' +
      (crew ? '<path d="M76 288 Q150 298 224 288" fill="none" stroke="#1B1F5E" stroke-width="3" opacity=".5"/>' : "") +
      '<text x="150" y="' + (crew ? 158 : 150) + '" text-anchor="middle" font-family="Bagel Fat One, Arial Rounded MT Bold, sans-serif" font-size="' + size + '" fill="' + c[1] + '">' + esc(words.toLowerCase()) + "</text>" +
      '<path d="M134 ' + (crew ? 176 : 168) + ' Q150 ' + (crew ? 188 : 180) + ' 166 ' + (crew ? 176 : 168) + '" fill="none" stroke="' + c[1] + '" stroke-width="4" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  /* ---------- header & footer ---------- */
  function logo() {
    return '<a class="brand" href="/" aria-label="' + esc(C.brand) + ' home"><span class="brand-bubble">' + esc((C.brand || "").toLowerCase()) + "</span></a>";
  }
  function isActive(href) { return path === href || path.indexOf(href + "/") === 0; }

  var header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap header-inner">' + logo() +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Menu</span></button>' +
      '<nav id="site-nav" class="site-nav" aria-label="Main">' +
      NAV.map(function (n) { return '<a href="' + n.href + '"' + (isActive(n.href) ? ' aria-current="page"' : "") + ">" + n.label + "</a>"; }).join("") +
      '<a class="btn btn-sun" href="/shop">Shop shirts</a></nav></div>';
    var toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var footer = $("#site-footer");
  if (footer) {
    var socials = [["Instagram", C.instagram], ["TikTok", C.tiktok], ["Facebook", C.facebook]].filter(function (s) { return s[1]; });
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap footer-grid">' +
      '<div class="footer-brand">' + logo() + "<p>" + esc(C.tagline) + " Every shirt helps " + esc(C.person && C.person.name) + " and people like him.</p></div>" +
      '<div><h4>Shop</h4><a href="/shop">All shirts</a><a href="/faq#sizes">Size chart</a><a href="/faq">FAQ</a></div>' +
      '<div><h4>About</h4><a href="/purpose">Our purpose</a><a href="/money">Where the money goes</a><a href="mailto:' + esc(C.contactEmail) + '">Email us</a>' +
      socials.map(function (s) { return '<a href="' + esc(s[1]) + '" rel="noopener" target="_blank">' + s[0] + "</a>"; }).join("") + "</div>" +
      '</div><div class="wrap footer-bottom"><span>&copy; ' + new Date().getFullYear() + " " + esc(C.brand) + "</span><span>Made with love for " + esc(C.person && C.person.name) + ".</span></div>";
  }

  /* ---------- text slots: <span data-text="person.name"></span> ---------- */
  each("[data-text]", function (el) {
    var v = el.getAttribute("data-text").split(".").reduce(function (o, k) { return o && o[k]; }, C);
    if (v != null) el.textContent = v;
  });

  /* ---------- home: the speech bubble ---------- */
  var say = $("#say");
  if (say && C.sayings && C.sayings.length) {
    var word = say.querySelector(".say-word");
    var i = 0;
    word.textContent = C.sayings[0];
    say.addEventListener("click", function () {
      i = (i + 1) % C.sayings.length;
      word.textContent = C.sayings[i];
      word.classList.remove("pop"); void word.offsetWidth; word.classList.add("pop");
    });
  }
  var heroShirts = $("#hero-shirts");
  if (heroShirts && C.shirts) {
    heroShirts.innerHTML = C.shirts.slice(0, 2).map(function (s, n) { return shirtSVG(s, s.colors[n === 0 ? 0 : 0]); }).join("");
  }

  /* ---------- shirt cards ---------- */
  each("[data-shirts]", function (el) {
    var limit = parseInt(el.getAttribute("data-shirts"), 10) || 99;
    el.className = "shirt-grid";
    el.innerHTML = (C.shirts || []).slice(0, limit).map(function (s, n) {
      var bg = ["var(--sky-soft)", "var(--sun-soft)", "#FFE3F1", "#DDF6E8"][n % 4];
      return (
        '<a class="shirt-card" href="/shirt?id=' + encodeURIComponent(s.id) + '">' +
        '<div class="shirt-frame" style="background:' + bg + '">' + shirtSVG(s, s.colors[0]) + "</div>" +
        "<h3>" + esc(s.name) + '</h3><div class="price">' + money(s.price) + (s.shopLink ? "" : " &middot; coming soon") + "</div>" +
        '<div class="dots" aria-label="' + s.colors.length + ' colors">' + s.colors.map(function (c) { return '<span style="background:' + color(c)[0] + '"></span>'; }).join("") + "</div></a>"
      );
    }).join("");
  });

  /* ---------- quotes ---------- */
  each("[data-quotes]", function (el) {
    el.className = "quotes";
    el.innerHTML = (C.quotes || []).map(function (q) {
      return '<figure class="quote"><blockquote>' + esc(q.text) + "</blockquote><figcaption>" + esc(q.who) + "</figcaption></figure>";
    }).join("");
  });

  /* ---------- purpose points ---------- */
  var ICONS = [
    '<svg viewBox="0 0 24 24" width="22"><path d="M4 5h16v10H9l-5 4z" fill="none" stroke="#1B1F5E" stroke-width="2.5" stroke-linejoin="round"/></svg>',
    '<svg viewBox="0 0 24 24" width="22"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="#1B1F5E" stroke-width="2.5" stroke-linejoin="round"/></svg>',
    '<svg viewBox="0 0 24 24" width="22"><circle cx="8" cy="8" r="3" fill="none" stroke="#1B1F5E" stroke-width="2.5"/><circle cx="16" cy="8" r="3" fill="none" stroke="#1B1F5E" stroke-width="2.5"/><path d="M3 19c0-3 2.5-5 5-5s5 2 5 5M11 19c0-3 2.5-5 5-5s5 2 5 5" fill="none" stroke="#1B1F5E" stroke-width="2.5"/></svg>',
  ];
  var ICON_BG = ["var(--sun)", "var(--bubblegum)", "var(--sky)"];
  each("[data-points]", function (el) {
    el.className = "points";
    el.innerHTML = ((C.purpose && C.purpose.points) || []).map(function (p, n) {
      return '<li><span class="icon" style="background:' + ICON_BG[n % 3] + '">' + ICONS[n % 3] + "</span><div><strong>" + esc(p.title) + "</strong>" + esc(p.text) + "</div></li>";
    }).join("");
  });

  /* ---------- photo ---------- */
  each("[data-photo]", function (el) {
    var p = C.person || {};
    el.className = "photo";
    el.innerHTML = p.photo
      ? '<img src="/' + esc(p.photo.replace(/^\//, "")) + '" alt="' + esc(p.name) + '">'
      : '<div class="photo-placeholder"><div><svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="18" fill="none" stroke="#1B1F5E" stroke-width="6"/><path d="M16 92c4-20 18-30 34-30s30 10 34 30" fill="none" stroke="#1B1F5E" stroke-width="6" stroke-linecap="round"/></svg>Photo of ' + esc(p.name) + " goes here</div></div>";
  });

  /* ---------- story ---------- */
  each("[data-story]", function (el) {
    el.innerHTML = ((C.person && C.person.story) || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  });

  /* ---------- money ---------- */
  each("[data-money]", function (el) {
    var m = C.money || {};
    var parts = m.parts || [];
    var total = parts.reduce(function (a, p) { return a + Number(p.amount || 0); }, 0) || 1;
    el.innerHTML =
      '<div class="money-bar" role="img" aria-label="Breakdown of ' + money(total) + '">' +
      parts.map(function (p) {
        var hex = color(p.color)[0];
        return '<span style="flex:' + p.amount + ";background:" + hex + '">' + money(p.amount) + "</span>";
      }).join("") + "</div>" +
      '<ul class="legend">' + parts.map(function (p) {
        return '<li><i style="background:' + color(p.color)[0] + '"></i>' + esc(p.label) + "<b>" + money(p.amount) + " (" + Math.round((p.amount / total) * 100) + "%)</b></li>";
      }).join("") + "</ul>";
  });
  each("[data-updates]", function (el) {
    var u = (C.money && C.money.updates) || [];
    el.innerHTML = u.length
      ? '<ul class="updates">' + u.map(function (x) { return "<li><strong>" + esc(x.date) + "</strong>" + esc(x.text) + "</li>"; }).join("") + "</ul>"
      : '<p class="note">No updates yet. The first one will be posted after our first shirts sell.</p>';
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

  /* ---------- notify forms (opens an email until a real signup is connected) ---------- */
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

  /* ---------- single shirt page ---------- */
  var detail = $("#shirt-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id");
    var s = shirtById(id) || (C.shirts || [])[0];
    if (!s) return;
    document.title = s.name + " | " + C.brand;
    var state = { color: s.colors[0], size: null };
    var others = (C.shirts || []).filter(function (x) { return x.id !== s.id; });

    detail.innerHTML =
      '<div class="detail">' +
      '<div class="detail-stage" id="stage"></div>' +
      "<div><h1>" + esc(s.name) + '</h1><div class="price">' + money(s.price) + "</div>" +
      '<p class="lead">' + esc(s.description) + "</p>" +
      '<div class="option-label"><span>Color: <span id="color-name"></span></span></div>' +
      '<div class="swatches" role="group" aria-label="Color">' + s.colors.map(function (c) {
        return '<button class="swatch" type="button" data-color="' + esc(c) + '" style="background:' + color(c)[0] + '" aria-label="' + esc(c) + '" aria-pressed="false"></button>';
      }).join("") + "</div>" +
      '<div class="option-label"><span>Size</span><a href="#size-chart">Size chart</a></div>' +
      '<div class="sizes" role="group" aria-label="Size">' + (C.sizes || []).map(function (r) {
        return '<button class="size" type="button" data-size="' + esc(r[0]) + '" aria-pressed="false">' + esc(r[0]) + "</button>";
      }).join("") + "</div>" +
      '<p class="fit">' + esc(C.fitNote) + "</p>" +
      '<div class="buy"><a class="btn" id="buy-btn" href="#">' + (s.shopLink ? "Buy now" : "Get notified when it's ready") + '</a><div class="buy-msg" id="buy-msg" aria-live="polite"></div></div>' +
      '<div class="give">Part of every ' + esc(s.name) + " supports " + esc(C.person && C.person.name) + ' and other brain injury survivors. <a href="/money">See where the money goes</a></div>' +
      '<h3 id="size-chart" style="margin-top:2.4rem">Size chart</h3>' + sizeTable() +
      "</div></div>" +
      (others.length ? '<section class="section"><div class="section-head"><h2>More shirts</h2></div><div id="more"></div></section>' : "");

    var stage = $("#stage");
    function paint() {
      stage.innerHTML = shirtSVG(s, state.color, s.name + " in " + state.color);
      stage.style.background = state.color === "white" ? "var(--sky-soft)" : "var(--white)";
      $("#color-name").textContent = state.color;
      each(".swatch", function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-color") === state.color ? "true" : "false"); });
      each(".size", function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-size") === state.size ? "true" : "false"); });
    }
    each(".swatch", function (b) { b.addEventListener("click", function () { state.color = b.getAttribute("data-color"); paint(); }); });
    each(".size", function (b) { b.addEventListener("click", function () { state.size = b.getAttribute("data-size"); $("#buy-msg").textContent = ""; paint(); }); });
    $("#buy-btn").addEventListener("click", function (e) {
      e.preventDefault();
      if (!state.size) { $("#buy-msg").textContent = "Pick a size first."; return; }
      var about = s.name + " (" + state.color + ", " + state.size + ")";
      location.href = s.shopLink ? s.shopLink : notifyHref("", about);
    });
    paint();

    var more = $("#more");
    if (more) {
      more.className = "shirt-grid";
      more.innerHTML = others.slice(0, 4).map(function (o, n) {
        var bg = ["var(--sky-soft)", "var(--sun-soft)", "#FFE3F1", "#DDF6E8"][n % 4];
        return '<a class="shirt-card" href="/shirt?id=' + encodeURIComponent(o.id) + '"><div class="shirt-frame" style="background:' + bg + '">' + shirtSVG(o, o.colors[0]) + "</div><h3>" + esc(o.name) + '</h3><div class="price">' + money(o.price) + "</div></a>";
      }).join("");
    }
  }
})();
