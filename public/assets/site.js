// So Good — builds the header, footer and every section from content.js.
// You shouldn't need to edit this file. Change words in /content.js instead.
(function () {
  var C = window.SOGOOD || {};
  var draw = window.drawShirt;
  var KIND = { tee: "Tees", crew: "Crewnecks" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function hex(name) { return ((C.colors || {})[name] || ["#F1EDE5"])[0]; }
  function money(n) { return "$" + (Math.round(n * 100) % 100 ? Number(n).toFixed(2) : n); }
  function shirts(kind) { return (C.shirts || []).filter(function (s) { return !kind || s.kind === kind; }); }
  function byId(id) { return shirts().filter(function (s) { return s.id === id; })[0]; }
  function pname() { return (C.person && C.person.name) || ""; }
  function params() { return new URLSearchParams(location.search); }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var path = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (path.length > 1) path = path.replace(/\/$/, "");
  var cat = params().get("cat");

  /* ---------- announcement, header, drawer ---------- */
  var ann = $("#announce");
  if (ann && C.announcement) { ann.className = "announce"; ann.textContent = C.announcement; }

  function navLink(href, label, current) {
    return '<a href="' + href + '"' + (current ? ' aria-current="page"' : "") + ">" + label + "</a>";
  }
  var header = $("#site-header");
  if (header) {
    var onShop = path === "/shop";
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap header-inner">' +
      '<div class="nav-left"><button class="menu-btn" aria-expanded="false" aria-controls="drawer"><span class="bar"></span><span class="bar"></span><span class="sr-only">Menu</span></button>' +
      navLink("/shop", "Shop all", onShop && !cat) + navLink("/shop?cat=tee", "Tees", onShop && cat === "tee") + navLink("/shop?cat=crew", "Crewnecks", onShop && cat === "crew") + "</div>" +
      '<a class="wordmark" href="/">' + esc(C.brand) + "</a>" +
      '<div class="nav-right">' + navLink("/story", "Our story", path === "/story") + navLink("/faq", "FAQ", path === "/faq") +
      '<a class="notify-link" href="#newsletter">Notify me</a></div>' +
      "</div>";
    var drawer = document.createElement("nav");
    drawer.id = "drawer"; drawer.className = "drawer"; drawer.setAttribute("aria-label", "Menu");
    drawer.innerHTML = '<a href="/shop">Shop all</a><a href="/shop?cat=tee">Tees</a><a href="/shop?cat=crew">Crewnecks</a><a href="/story">Our story</a><a href="/faq">FAQ</a><p>' + esc(C.tagline) + "</p>";
    header.appendChild(drawer);
    var btn = $(".menu-btn", header);
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.style.setProperty("--drawer-top", header.getBoundingClientRect().bottom + "px");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  /* ---------- footer ---------- */
  var footer = $("#site-footer");
  if (footer) {
    var socials = [["Instagram", C.instagram], ["TikTok", C.tiktok], ["Facebook", C.facebook]].filter(function (s) { return s[1]; });
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap footer-grid">' +
      '<div class="footer-brand"><a class="wordmark" href="/">' + esc(C.brand) + "</a><p>" + esc(C.tagline) + " Part of every piece supports " + esc(pname()) + " and others recovering from brain injuries.</p></div>" +
      '<div><h4>Shop</h4><a href="/shop">Shop all</a><a href="/shop?cat=tee">Tees</a><a href="/shop?cat=crew">Crewnecks</a></div>' +
      '<div><h4>About</h4><a href="/story">Our story</a><a href="/story#money">Where the money goes</a></div>' +
      '<div><h4>Help</h4><a href="/faq">FAQ</a><a href="/faq#sizes">Size chart</a><a href="mailto:' + esc(C.contactEmail) + '">Contact us</a>' +
      socials.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + s[0] + "</a>"; }).join("") + "</div>" +
      '</div><div class="wrap footer-bottom"><span>&copy; ' + new Date().getFullYear() + " " + esc(C.brand) + "</span><span>Made for " + esc(pname()) + ".</span></div>";
  }

  /* ---------- simple text slots: data-text="purposeStatement.headline" ---------- */
  each("[data-text]", function (el) {
    var v = el.getAttribute("data-text").split(".").reduce(function (o, k) { return o && o[k]; }, C);
    if (v != null) el.textContent = v;
  });

  /* ---------- home hero: flat-lay composition ---------- */
  var lay = $("#flatlay");
  if (lay && draw) {
    var tees = shirts("tee"), crews = shirts("crew");
    var picks = [
      [tees[0], tees[0] && tees[0].colors[0], "p1"],
      [crews[0] || tees[1], (crews[0] || tees[1]) && (crews[0] || tees[1]).colors[1] || "navy", "p2"],
      [tees[2] || tees[1], (tees[2] || tees[1]) && (tees[2] || tees[1]).colors[0], "p3"],
    ].filter(function (p) { return p[0]; });
    lay.innerHTML = picks.map(function (p) { return draw(p[0], p[1]).replace('class="shirt-img"', 'class="shirt-img ' + p[2] + '"'); }).join("") +
      '<span class="saying-tag">“' + esc((C.sayings || ["So good"])[0]) + ".”</span>";
  }

  /* ---------- product cards ---------- */
  function card(s) {
    return (
      '<a class="card" href="/product?id=' + encodeURIComponent(s.id) + '">' +
      '<div class="card-media">' +
      (s.shopLink ? "" : '<span class="tag">Coming soon</span>') +
      draw(s, s.colors[0]).replace('class="shirt-img"', 'class="shirt-img main"') +
      draw(s, s.colors[0], { view: "detail" }).replace('class="shirt-img"', 'class="shirt-img alt"') +
      "</div>" +
      '<div class="card-info"><h3>' + esc(s.name) + '</h3><span class="price">' + money(s.price) + "</span></div>" +
      '<div class="card-sub"><span>' + s.colors.length + " colors</span>" +
      '<span class="swatch-dots">' + s.colors.map(function (c) { return '<span style="background:' + hex(c) + '" title="' + esc(c) + '"></span>'; }).join("") + "</span></div>" +
      "</a>"
    );
  }

  each("[data-grid]", function (el) {
    var limit = parseInt(el.getAttribute("data-grid"), 10) || 0;
    var withTabs = el.hasAttribute("data-tabs");
    var current = withTabs ? (cat && KIND[cat] ? cat : "") : "";
    function render() {
      var list = shirts(current);
      if (limit) list = list.slice(0, limit);
      grid.innerHTML = list.map(card).join("");
    }
    var grid = document.createElement("div");
    grid.className = "grid" + (el.hasAttribute("data-three") ? " three" : "");
    if (withTabs) {
      var tabs = document.createElement("div");
      tabs.className = "tabs"; tabs.setAttribute("role", "group"); tabs.setAttribute("aria-label", "Filter");
      var opts = [["", "All"]].concat(Object.keys(KIND).map(function (k) { return [k, KIND[k]]; }));
      tabs.innerHTML = opts.map(function (o) {
        return '<button class="tab" type="button" data-cat="' + o[0] + '" aria-pressed="' + (o[0] === current) + '">' + o[1] + '<span class="count">' + shirts(o[0]).length + "</span></button>";
      }).join("");
      tabs.addEventListener("click", function (e) {
        var b = e.target.closest(".tab"); if (!b) return;
        current = b.getAttribute("data-cat");
        Array.prototype.forEach.call(tabs.children, function (t) { t.setAttribute("aria-pressed", t === b ? "true" : "false"); });
        var t = $("#shop-title"); if (t) t.textContent = current ? KIND[current] : "Shop all";
        history.replaceState(null, "", current ? "?cat=" + current : location.pathname);
        render();
      });
      el.appendChild(tabs);
      var t = $("#shop-title"); if (t && current) t.textContent = KIND[current];
    }
    el.appendChild(grid);
    render();
  });

  /* ---------- category tiles ---------- */
  each("[data-cats]", function (el) {
    el.className = "cats";
    el.innerHTML = Object.keys(KIND).filter(function (k) { return shirts(k).length; }).map(function (k) {
      var s = shirts(k)[0];
      return '<a class="cat" href="/shop?cat=' + k + '">' + draw(s, s.colors[k === "crew" ? 0 : 1] || s.colors[0]) +
        '<div class="cat-label"><h3>' + KIND[k] + '</h3><span class="u-link">Shop ' + KIND[k].toLowerCase() + "</span></div></a>";
    }).join("");
  });

  /* ---------- the quote band: cycles his sayings ---------- */
  each("[data-cycle]", function (el) {
    var list = C.sayings || [];
    if (!list.length) return;
    var i = 0;
    el.textContent = list[0] + ".";
    if (reduceMotion || list.length < 2) return;
    setInterval(function () {
      el.classList.add("out");
      setTimeout(function () { i = (i + 1) % list.length; el.textContent = list[i] + "."; el.classList.remove("out"); }, 500);
    }, 2800);
  });

  /* ---------- newsletter / notify (opens an email until a real list is connected) ---------- */
  function mailto(about, email) {
    return "mailto:" + C.contactEmail + "?subject=" + encodeURIComponent("Notify me: " + (about || C.brand)) +
      "&body=" + encodeURIComponent("Please let me know when " + (about || "So Good") + " is available." + (email ? "\n\nMy email: " + email : ""));
  }
  each("form[data-notify]", function (f) {
    f.addEventListener("submit", function (e) { e.preventDefault(); location.href = mailto("", f.querySelector("input").value); });
  });
  each("[data-mailto]", function (a) { a.href = "mailto:" + C.contactEmail; });

  /* ---------- story page ---------- */
  each("[data-photo]", function (el) {
    var p = C.person || {};
    el.className = "photo";
    el.innerHTML = p.photo
      ? '<img src="/' + esc(p.photo.replace(/^\//, "")) + '" alt="' + esc(p.name) + '">'
      : '<div class="photo-ph"><div><svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="17" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 90c4-19 17-28 32-28s28 9 32 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Photo of ' + esc(p.name) + "</div></div>";
  });
  each("[data-paras]", function (el) {
    var v = el.getAttribute("data-paras").split(".").reduce(function (o, k) { return o && o[k]; }, C) || [];
    el.insertAdjacentHTML("beforeend", v.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join(""));
  });
  each("[data-points]", function (el) {
    el.className = "points";
    el.innerHTML = ((C.purpose && C.purpose.points) || []).map(function (p) { return "<div><h3>" + esc(p.title) + "</h3><p>" + esc(p.text) + "</p></div>"; }).join("");
  });
  each("[data-quotes]", function (el) {
    el.className = "quotes";
    el.innerHTML = (C.quotes || []).map(function (q) { return "<figure><blockquote>" + esc(q.text) + "</blockquote><figcaption>" + esc(q.who) + "</figcaption></figure>"; }).join("");
  });
  each("[data-money]", function (el) {
    var parts = (C.money && C.money.parts) || [];
    var total = parts.reduce(function (a, p) { return a + Number(p.amount || 0); }, 0) || 1;
    el.innerHTML = '<div class="money-bar" role="img" aria-label="How ' + money(total) + ' is split">' +
      parts.map(function (p) { return '<span style="flex:' + p.amount + ";background:" + hex(p.color) + '"></span>'; }).join("") + "</div>" +
      '<ul class="legend">' + parts.map(function (p) {
        return '<li><i style="background:' + hex(p.color) + '"></i>' + esc(p.label) + "<b>" + money(p.amount) + "<em>" + Math.round(p.amount / total * 100) + "%</em></b></li>";
      }).join("") + "</ul>";
  });
  each("[data-updates]", function (el) {
    var u = (C.money && C.money.updates) || [];
    el.innerHTML = u.length
      ? '<ul class="updates">' + u.map(function (x) { return "<li><strong>" + esc(x.date) + "</strong><span>" + esc(x.text) + "</span></li>"; }).join("") + "</ul>"
      : '<p class="note">No updates yet. The first one goes up after the first pieces sell.</p>';
  });

  /* ---------- faq & sizes ---------- */
  function sizeTable() {
    return '<table class="sizes-table"><thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead><tbody>' +
      (C.sizes || []).map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") + "</tbody></table>";
  }
  each("[data-size-table]", function (el) { el.innerHTML = sizeTable(); });
  each("[data-faq]", function (el) {
    el.className = "acc faq";
    el.innerHTML = (C.faq || []).map(function (f) { return '<details><summary>' + esc(f.q) + '</summary><div class="body"><p>' + esc(f.a) + "</p></div></details>"; }).join("");
  });

  /* ---------- product page ---------- */
  var pdp = $("#pdp");
  if (pdp) {
    var s = byId(params().get("id")) || shirts()[0];
    if (!s) return;
    document.title = s.name + " | " + C.brand;
    var st = { color: params().get("color") && s.colors.indexOf(params().get("color")) > -1 ? params().get("color") : s.colors[0], size: null };
    var heart = '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';

    pdp.innerHTML =
      '<div class="gallery" id="gallery"></div>' +
      '<div class="buybox">' +
      '<div class="crumbs"><a href="/shop">Shop</a> / <a href="/shop?cat=' + s.kind + '">' + KIND[s.kind] + "</a></div>" +
      "<h1>" + esc(s.name) + '</h1><div class="price">' + money(s.price) + (s.shopLink ? "" : ' <span class="muted">&middot; Coming soon</span>') + "</div>" +
      '<p class="desc">' + esc(s.description) + "</p>" +
      '<div class="opt"><div class="opt-label"><span>Color: <span class="val" id="cname"></span></span></div><div class="swatches">' +
      s.colors.map(function (c) { return '<button class="swatch" type="button" data-color="' + esc(c) + '" style="background:' + hex(c) + '" aria-label="' + esc(c) + '" aria-pressed="false"></button>'; }).join("") + "</div></div>" +
      '<div class="opt"><div class="opt-label"><span>Size</span><button type="button" id="size-guide">Size guide</button></div><div class="sizes">' +
      (C.sizes || []).map(function (r) { return '<button class="size" type="button" data-size="' + esc(r[0]) + '" aria-pressed="false">' + esc(r[0]) + "</button>"; }).join("") + "</div></div>" +
      '<div class="buy"><a class="btn" href="#" id="buy">' + (s.shopLink ? "Add to bag" : "Notify me when it drops") + '</a><div class="buy-msg" id="msg" aria-live="polite"></div></div>' +
      '<div class="giveback">' + heart + "<span>Part of every " + esc(s.name) + " supports " + esc(pname()) + ' and others recovering from brain injuries. <a href="/story#money">Where the money goes</a></span></div>' +
      '<div class="acc">' +
      '<details open><summary>Details</summary><div class="body"><ul>' + (s.details || []).map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div></details>" +
      '<details id="fit"><summary>Size &amp; fit</summary><div class="body"><p>' + esc(C.fitNote) + "</p>" + sizeTable() + "</div></details>" +
      '<details><summary>Shipping &amp; returns</summary><div class="body"><p>' + esc(C.shippingNote) + "</p></div></details>" +
      "</div></div>";

    var paint = function () {
      $("#gallery").innerHTML =
        '<div class="g front">' + draw(s, st.color, { noShadow: false }) + "</div>" +
        '<div class="g">' + draw(s, st.color, { view: "detail" }) + "</div>" +
        '<div class="g front">' + draw(s, s.colors[(s.colors.indexOf(st.color) + 1) % s.colors.length]) + "</div>";
      $("#cname").textContent = st.color;
      each(".swatch", function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-color") === st.color)); });
      each(".size", function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-size") === st.size)); });
    };
    pdp.addEventListener("click", function (e) {
      var sw = e.target.closest(".swatch"), sz = e.target.closest(".size");
      if (sw) { st.color = sw.getAttribute("data-color"); paint(); }
      if (sz) { st.size = sz.getAttribute("data-size"); $("#msg").textContent = ""; paint(); }
      if (e.target.id === "size-guide") { var f = $("#fit"); f.open = true; f.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }); }
    });
    $("#buy").addEventListener("click", function (e) {
      e.preventDefault();
      if (!st.size) { $("#msg").textContent = "Choose a size first."; return; }
      location.href = s.shopLink || mailto(s.name + " (" + st.color + ", " + st.size + ")");
    });
    paint();

    var more = $("#more");
    if (more) {
      more.className = "grid";
      more.innerHTML = shirts().filter(function (x) { return x.id !== s.id; }).slice(0, 4).map(card).join("");
    }
  }
})();
