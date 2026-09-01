(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("cuYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scrolled state
  var navbar = document.getElementById("cuNavbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Product modal content population
  var productModal = document.getElementById("productModal");
  if (productModal) {
    productModal.addEventListener("show.bs.modal", function (event) {
      var trigger = event.relatedTarget;
      if (!trigger) return;

      var title = trigger.getAttribute("data-title") || "Design";
      var collection = trigger.getAttribute("data-collection") || "";
      var desc = trigger.getAttribute("data-desc") || "";
      var img = trigger.getAttribute("data-img") || "";
      var imgWebp = trigger.getAttribute("data-imgwebp") || "";

      productModal.querySelector("#productModalLabel").textContent = title;
      productModal.querySelector("#productModalCollection").textContent = collection;
      productModal.querySelector("#productModalDesc").textContent = desc;

      var imgEl = productModal.querySelector("#productModalImg");
      imgEl.src = img;
      imgEl.alt = title + " design artwork";

      var sourceEl = productModal.querySelector("#productModalImgWebp");
      sourceEl.srcset = imgWebp;
    });
  }

  // Scroll reveal (single, restrained pass — respects reduced motion)
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".cu-reveal");

  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }
})();
