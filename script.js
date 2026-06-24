/* Minimal vanilla JS: mobile nav, scroll-spy, scroll-reveal, metric count-up.
   No dependencies. Fully respects prefers-reduced-motion. */
(function () {
	"use strict";

	var reduceMotion = window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Current year in footer
	var yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Mobile nav toggle
	var toggle = document.getElementById("navToggle");
	var nav = document.getElementById("nav");
	if (toggle && nav) {
		toggle.addEventListener("click", function () {
			var open = nav.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		nav.addEventListener("click", function (e) {
			if (e.target.tagName === "A") {
				nav.classList.remove("open");
				toggle.setAttribute("aria-expanded", "false");
			}
		});
	}

	// Scroll-spy: highlight active nav link
	var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
	var sections = links
		.map(function (l) { return document.querySelector(l.getAttribute("href")); })
		.filter(Boolean);

	if ("IntersectionObserver" in window && sections.length) {
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					var id = entry.target.id;
					links.forEach(function (l) {
						l.classList.toggle("active", l.getAttribute("href") === "#" + id);
					});
				}
			});
		}, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
		sections.forEach(function (s) { spy.observe(s); });
	}

	// Count-up animation for a metric element
	function countUp(el) {
		var target = parseFloat(el.getAttribute("data-count-to"));
		var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
		var prefix = el.getAttribute("data-prefix") || "";
		var suffix = el.getAttribute("data-suffix") || "";
		if (isNaN(target)) return;
		if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }

		var duration = 1400, start = null;
		function frame(ts) {
			if (start === null) start = ts;
			var p = Math.min((ts - start) / duration, 1);
			var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
			el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
			if (p < 1) requestAnimationFrame(frame);
			else el.textContent = prefix + target.toFixed(decimals) + suffix;
		}
		requestAnimationFrame(frame);
	}

	// Scroll-reveal + trigger count-up when metrics enter view
	var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
	if (!("IntersectionObserver" in window)) {
		reveals.forEach(function (el) { el.classList.add("in"); });
		document.querySelectorAll(".metric-num[data-count-to]").forEach(function (n) { countUp(n); });
		return;
	}

	var revealObs = new IntersectionObserver(function (entries, obs) {
		entries.forEach(function (entry) {
			if (!entry.isIntersecting) return;
			var el = entry.target;
			el.classList.add("in");
			var num = el.querySelector(".metric-num[data-count-to]");
			if (num) countUp(num);
			obs.unobserve(el);
		});
	}, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

	reveals.forEach(function (el) { revealObs.observe(el); });
})();
