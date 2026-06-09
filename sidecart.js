/* ============================================================
   Innogen Research — Side Cart drawer
   Self-contained: injects its own styles + markup + behavior.
   Include with <script src="sidecart.js"></script> on any page.
   ============================================================ */
(function () {
  "use strict";

  // --- Sample cart data (mockup) ---
  var items = [
    { name: "SNAP-8", cat: "Anti-Aging Peptide", price: 90.0, qty: 1,
      img: "https://innogenresearch.ca/wp-content/uploads/elementor/thumbs/SNAP-8-IR-rlr92g9wo14lnr9mmqcjg2tzmzo7p2jpc8779kb5hk.jpeg" },
    { name: "SS-31", cat: "Energy Peptide", price: 105.0, qty: 1,
      img: "https://innogenresearch.ca/wp-content/uploads/elementor/thumbs/SS-31-IR-rlr8xxnttoxzv7tu0a22ypv8vbxppfm51vc78p09e0.jpeg" }
  ];

  var money = function (n) { return "$" + n.toFixed(2); };

  // --- Inject styles ---
  var css = [
    "#sc-overlay{position:fixed;inset:0;background:rgba(7,25,43,.55);opacity:0;visibility:hidden;transition:opacity .3s ease;z-index:99998;}",
    "#sc-overlay.is-open{opacity:1;visibility:visible;}",
    "#sc-drawer{position:fixed;top:0;right:0;height:100%;width:390px;max-width:90vw;background:#fff;box-shadow:-12px 0 40px rgba(7,25,43,.18);transform:translateX(100%);transition:transform .32s cubic-bezier(.4,0,.2,1);z-index:99999;display:flex;flex-direction:column;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    "#sc-drawer.is-open{transform:translateX(0);}",
    "#sc-drawer .sc-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid #e2eaf4;}",
    "#sc-drawer .sc-head h3{margin:0;font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#07192b;font-weight:700;}",
    "#sc-drawer .sc-close{background:none;border:none;font-size:26px;line-height:1;color:#8a98a8;cursor:pointer;padding:0 4px;}",
    "#sc-drawer .sc-close:hover{color:#07192b;}",
    "#sc-drawer .sc-body{flex:1;overflow-y:auto;padding:8px 22px;}",
    "#sc-drawer .sc-item{display:flex;gap:14px;padding:18px 0;border-bottom:1px solid #e2eaf4;}",
    "#sc-drawer .sc-item img{width:64px;height:64px;border-radius:10px;object-fit:cover;border:1px solid #e2eaf4;background:#fff;flex-shrink:0;}",
    "#sc-drawer .sc-item .sc-cat{font-size:11px;letter-spacing:.6px;text-transform:uppercase;color:#1a7fc1;font-weight:600;}",
    "#sc-drawer .sc-item .sc-name{font-family:'Playfair Display',Georgia,serif;font-size:16px;color:#07192b;font-weight:700;line-height:1.2;margin:2px 0 8px;}",
    "#sc-drawer .sc-row{display:flex;align-items:center;justify-content:space-between;gap:10px;}",
    "#sc-drawer .sc-qty{display:inline-flex;align-items:center;border:1px solid #e2eaf4;border-radius:9999px;overflow:hidden;}",
    "#sc-drawer .sc-qty button{width:28px;height:30px;border:none;background:#fff;font-size:15px;cursor:pointer;color:#0a0a0a;}",
    "#sc-drawer .sc-qty span{width:30px;text-align:center;font-size:13px;}",
    "#sc-drawer .sc-price{font-weight:700;color:#0a4b78;font-size:14px;}",
    "#sc-drawer .sc-remove{background:none;border:none;color:#8a98a8;cursor:pointer;font-size:13px;text-decoration:underline;padding:0;}",
    "#sc-drawer .sc-remove:hover{color:#c0392b;}",
    "#sc-drawer .sc-empty{padding:48px 22px;text-align:center;color:#8a98a8;font-size:14px;}",
    "#sc-drawer .sc-foot{border-top:1px solid #e2eaf4;padding:20px 22px;background:#f7fafd;}",
    "#sc-drawer .sc-sub{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;}",
    "#sc-drawer .sc-sub strong{font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#07192b;}",
    "#sc-drawer .sc-note{font-size:12px;color:#8a98a8;margin-bottom:16px;}",
    "#sc-drawer .sc-actions{display:flex;flex-direction:column;gap:10px;}",
    "#sc-drawer .sc-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:14px;font-weight:600;padding:13px 20px;border-radius:9999px;border:1.5px solid transparent;cursor:pointer;text-decoration:none;transition:all .2s;}",
    "#sc-drawer .sc-btn--primary{background:#0a4b78;color:#fff;}",
    "#sc-drawer .sc-btn--primary:hover{background:#0a3a5c;}",
    "#sc-drawer .sc-btn--outline{background:#fff;border-color:#e2eaf4;color:#0a4b78;}",
    "#sc-drawer .sc-btn--outline:hover{border-color:#0a4b78;}"
  ].join("");
  var style = document.createElement("style");
  style.id = "sc-styles";
  style.textContent = css;
  document.head.appendChild(style);

  // --- Build DOM ---
  var overlay = document.createElement("div");
  overlay.id = "sc-overlay";

  var drawer = document.createElement("aside");
  drawer.id = "sc-drawer";
  drawer.setAttribute("aria-label", "Shopping cart");
  drawer.innerHTML =
    '<div class="sc-head"><h3>Your Cart (<span id="sc-count">0</span>)</h3>' +
    '<button class="sc-close" aria-label="Close cart">&times;</button></div>' +
    '<div class="sc-body" id="sc-body"></div>' +
    '<div class="sc-foot">' +
      '<div class="sc-sub"><span>Subtotal</span><strong id="sc-subtotal">$0.00</strong></div>' +
      '<div class="sc-note">Shipping &amp; taxes calculated at checkout. Free shipping over $150.</div>' +
      '<div class="sc-actions">' +
        '<a href="checkout.html" class="sc-btn sc-btn--primary">Checkout &rarr;</a>' +
        '<a href="cart.html" class="sc-btn sc-btn--outline">View Cart</a>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  var bodyEl = drawer.querySelector("#sc-body");
  var countEl = drawer.querySelector("#sc-count");
  var subEl = drawer.querySelector("#sc-subtotal");

  // --- Render ---
  function render() {
    if (!items.length) {
      bodyEl.innerHTML = '<div class="sc-empty">Your cart is empty.<br><br><a href="shop.html" class="sc-btn sc-btn--outline">Browse Catalog</a></div>';
    } else {
      bodyEl.innerHTML = items.map(function (it, i) {
        return '<div class="sc-item">' +
            '<img src="' + it.img + '" alt="' + it.name + '" />' +
            '<div style="flex:1">' +
              '<div class="sc-cat">' + it.cat + '</div>' +
              '<div class="sc-name">' + it.name + '</div>' +
              '<div class="sc-row">' +
                '<div class="sc-qty">' +
                  '<button data-act="dec" data-i="' + i + '" aria-label="Decrease">&minus;</button>' +
                  '<span>' + it.qty + '</span>' +
                  '<button data-act="inc" data-i="' + i + '" aria-label="Increase">+</button>' +
                '</div>' +
                '<span class="sc-price">' + money(it.price * it.qty) + '</span>' +
              '</div>' +
              '<button class="sc-remove" data-act="rm" data-i="' + i + '">Remove</button>' +
            '</div>' +
          '</div>';
      }).join("");
    }
    var totalQty = items.reduce(function (s, it) { return s + it.qty; }, 0);
    var subtotal = items.reduce(function (s, it) { return s + it.price * it.qty; }, 0);
    countEl.textContent = totalQty;
    subEl.textContent = money(subtotal);
    // sync the nav badge(s)
    document.querySelectorAll(".cart-count").forEach(function (b) {
      b.textContent = totalQty;
      b.style.display = totalQty ? "" : "none";
    });
  }

  // --- Item interactions ---
  bodyEl.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var i = parseInt(btn.getAttribute("data-i"), 10);
    var act = btn.getAttribute("data-act");
    if (act === "inc") items[i].qty++;
    else if (act === "dec") items[i].qty = Math.max(1, items[i].qty - 1);
    else if (act === "rm") items.splice(i, 1);
    render();
  });

  // --- Open / close ---
  function open() { render(); overlay.classList.add("is-open"); drawer.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function close() { overlay.classList.remove("is-open"); drawer.classList.remove("is-open"); document.body.style.overflow = ""; }

  overlay.addEventListener("click", close);
  drawer.querySelector(".sc-close").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  // Hook every cart icon (links to cart.html) to open the drawer instead
  document.querySelectorAll('a[href$="cart.html"].nav__cart, a[aria-label="Cart"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(); });
  });

  render();
})();
