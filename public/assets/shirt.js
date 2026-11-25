// So Good — draws realistic flat-lay shirt "photos" in code.
// window.drawShirt(shirt, colorName, options) returns an <svg> string.
// options: { view: "front" | "detail", bg: true/false }
(function () {
  var n = 0;

  function hexToRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    var v = parseInt(h, 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  function lum(h) {
    var c = hexToRgb(h);
    return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
  }
  function shade(h, amt) {
    var c = hexToRgb(h).map(function (x) { return Math.max(0, Math.min(255, Math.round(x + amt * 255))); });
    return "rgb(" + c.join(",") + ")";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  // Shapes (viewBox 0 0 600 660)
  var TEE =
    "M238 62 C212 70 186 78 160 86 C124 100 88 126 54 156 L110 248 C133 236 151 228 170 220 " +
    "C171 340 169 480 172 600 C250 610 350 610 428 600 C431 480 429 340 430 220 " +
    "C449 228 467 236 490 248 L546 156 C512 126 476 100 440 86 C414 78 388 70 362 62 " +
    "C344 98 256 98 238 62 Z";
  var TEE_NECK_BACK = "M238 62 C258 44 342 44 362 62 C344 98 256 98 238 62 Z";
  var TEE_SEAMS = "M160 86 C164 132 167 176 170 220 M440 86 C436 132 433 176 430 220";
  var TEE_STITCH = "M176 588 C252 598 348 598 424 588 M66 166 L118 252 M534 166 L482 252";
  var TEE_FOLDS = [
    // [path, light?]
    ["M190 260 C230 300 250 360 236 440", 1],
    ["M206 270 C246 312 264 372 250 452", 0],
    ["M410 300 C380 360 382 420 404 500", 1],
    ["M396 306 C366 366 368 426 390 506", 0],
    ["M150 120 C180 150 200 170 210 200", 0],
    ["M450 120 C420 150 400 170 390 200", 0],
  ];

  var CREW =
    "M240 64 C214 72 190 80 166 88 C120 104 96 140 86 210 L50 524 L114 534 L160 300 " +
    "C162 380 164 460 168 556 C250 566 350 566 432 556 C436 460 438 380 440 300 " +
    "L486 534 L550 524 L514 210 C504 140 480 104 434 88 C410 80 386 72 360 64 " +
    "C342 96 258 96 240 64 Z";
  var CREW_NECK_BACK = "M240 64 C258 46 342 46 360 64 C342 96 258 96 240 64 Z";
  var CREW_HEM = "M168 556 C250 566 350 566 432 556 L433 606 C350 616 250 616 167 606 Z";
  var CREW_CUFF_L = "M50 524 L114 534 L106 590 L42 580 Z";
  var CREW_CUFF_R = "M550 524 L486 534 L494 590 L558 580 Z";
  var CREW_SEAMS = "M166 88 C162 160 160 230 160 300 M434 88 C438 160 440 230 440 300";
  var CREW_FOLDS = [
    ["M196 250 C232 300 246 370 232 450", 1],
    ["M212 258 C248 310 262 380 248 460", 0],
    ["M404 290 C376 350 378 420 400 500", 1],
    ["M100 260 C96 340 88 420 80 500", 1],
    ["M500 260 C504 340 512 420 520 500", 0],
  ];

  function ribLines(x1, y1, x2, y2, x3, y3, count) {
    // vertical-ish rib lines across a band from edge (x1,y1)-(x2,y2) down by (x3,y3)
    var d = "";
    for (var i = 1; i < count; i++) {
      var t = i / count;
      var ax = x1 + (x2 - x1) * t, ay = y1 + (y2 - y1) * t;
      d += "M" + ax.toFixed(1) + " " + ay.toFixed(1) + " l" + x3 + " " + y3 + " ";
    }
    return d;
  }

  window.drawShirt = function (shirt, colorName, opts) {
    opts = opts || {};
    var colors = (window.SOGOOD && window.SOGOOD.colors) || {};
    var col = colors[colorName] || colors[shirt.colors && shirt.colors[0]] || ["#F4F2EC", "#1F1E1B"];
    var fabric = col[0], ink = col[1];
    var L = lum(fabric);
    var dark = L < 0.35;
    var id = "s" + (++n);
    var crew = shirt.kind === "crew";
    var body = crew ? CREW : TEE;
    var words = String(shirt.saying || "").toLowerCase();
    var printFont = shirt.printFont === "sans" ? "Archivo, Helvetica Neue, Arial, sans-serif" : "'Libre Caslon Text', Georgia, serif";
    var placement = shirt.print || "center";
    var fs, tx = 300, ty;
    if (placement === "chest") {
      fs = Math.min(26, 120 / Math.max(words.length * 0.5, 1));
      tx = 362; ty = crew ? 200 : 196;
    } else {
      fs = Math.min(crew ? 58 : 62, 230 / Math.max(words.length * 0.5, 1));
      ty = crew ? 236 : 232;
    }

    var hiA = dark ? 0.10 : 0.32;   // highlight strength
    var loA = dark ? 0.40 : 0.10;   // shadow strength

    var vb = opts.view === "detail"
      ? (placement === "chest" ? "282 120 160 200" : "160 110 280 350")
      : "0 0 600 660";

    var folds = (crew ? CREW_FOLDS : TEE_FOLDS).map(function (f) {
      return '<path d="' + f[0] + '" stroke="' + (f[1] ? "#fff" : "#000") + '" stroke-opacity="' + (f[1] ? hiA : loA) +
        '" stroke-width="' + (f[1] ? 34 : 18) + '" fill="none" stroke-linecap="round" filter="url(#' + id + 'b)"/>';
    }).join("");

    var extras = "";
    if (crew) {
      extras +=
        '<path d="' + CREW_HEM + '" fill="' + shade(fabric, -0.03) + '"/>' +
        '<path d="' + CREW_CUFF_L + '" fill="' + shade(fabric, -0.03) + '"/>' +
        '<path d="' + CREW_CUFF_R + '" fill="' + shade(fabric, -0.03) + '"/>' +
        '<path d="' + ribLines(168, 558, 432, 558, 0, 48, 70) + ribLines(50, 526, 114, 536, -8, 54, 14) + ribLines(486, 536, 550, 526, 8, 54, 14) +
        '" stroke="#000" stroke-opacity="' + (dark ? 0.35 : 0.09) + '" stroke-width="1.2"/>' +
        '<path d="M168 556 C250 566 350 566 432 556 M50 524 L114 534 M550 524 L486 534" stroke="#000" stroke-opacity="' + (dark ? 0.4 : 0.12) + '" stroke-width="2" fill="none"/>';
    } else {
      extras += '<path d="' + TEE_STITCH + '" stroke="#000" stroke-opacity="' + (dark ? 0.4 : 0.14) + '" stroke-width="1.3" stroke-dasharray="3 3" fill="none"/>';
    }

    var neckBack = crew ? CREW_NECK_BACK : TEE_NECK_BACK;
    var neckFront = crew ? "M240 64 C258 96 342 96 360 64" : "M238 62 C256 98 344 98 362 62";

    return (
      '<svg class="shirt-img" viewBox="' + vb + '" preserveAspectRatio="xMidYMid ' + (opts.view === "detail" ? "slice" : "meet") + '" role="img" aria-label="' + esc(shirt.name + " in " + colorName) + '">' +
      "<defs>" +
      '<clipPath id="' + id + 'c"><path d="' + body + '"/></clipPath>' +
      '<filter id="' + id + 'b" filterUnits="userSpaceOnUse" x="-50" y="-50" width="700" height="760"><feGaussianBlur stdDeviation="14"/></filter>' +
      '<filter id="' + id + 'sh" filterUnits="userSpaceOnUse" x="-50" y="-50" width="700" height="760"><feGaussianBlur stdDeviation="12"/></filter>' +
      '<filter id="' + id + 'n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0"/></filter>' +
      '<filter id="' + id + 'ink"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="8" result="t"/><feColorMatrix in="t" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.08" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>' +
      '<linearGradient id="' + id + 'v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="' + (dark ? 0.06 : 0.18) + '"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="' + (dark ? 0.25 : 0.08) + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="' + (dark ? 0.35 : 0.1) + '"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".82" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="' + (dark ? 0.35 : 0.1) + '"/></linearGradient>' +
      "</defs>" +
      // soft contact shadow
      '<path d="' + body + '" transform="translate(6 14)" fill="#3a2f22" opacity="' + (opts.noShadow ? 0 : 0.28) + '" filter="url(#' + id + 'sh)"/>' +
      // inside of the back collar
      '<path d="' + neckBack + '" fill="' + shade(fabric, dark ? -0.06 : -0.12) + '"/>' +
      // garment
      '<path d="' + body + '" fill="' + fabric + '"/>' +
      '<g clip-path="url(#' + id + 'c)">' +
      extras +
      '<rect width="600" height="660" fill="url(#' + id + 'v)"/>' +
      '<rect width="600" height="660" fill="url(#' + id + 'h)"/>' +
      folds +
      '<path d="' + (crew ? CREW_SEAMS : TEE_SEAMS) + '" stroke="#000" stroke-opacity="' + (dark ? 0.45 : 0.13) + '" stroke-width="1.6" fill="none"/>' +
      '<rect width="600" height="660" filter="url(#' + id + 'n)" opacity="' + (dark ? 0.3 : 0.1) + '" style="mix-blend-mode:multiply"/>' +
      "</g>" +
      // collar rib
      '<path d="' + neckFront + '" stroke="' + shade(fabric, dark ? 0.05 : -0.05) + '" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      '<path d="' + neckFront + '" stroke="#000" stroke-opacity="' + (dark ? 0.4 : 0.12) + '" stroke-width="1.2" fill="none" transform="translate(0 6)"/>' +
      // print
      '<text x="' + tx + '" y="' + ty + '" text-anchor="middle" font-family="' + printFont + '" font-size="' + fs.toFixed(1) + '"' +
      (shirt.printFont === "sans" ? ' font-weight="700" letter-spacing="-1"' : "") +
      ' fill="' + ink + '" fill-opacity=".93" filter="url(#' + id + 'ink)">' + esc(words) + "</text>" +
      "</svg>"
    );
  };
})();
