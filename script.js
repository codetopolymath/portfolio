/* Minimal vanilla JS: mobile nav, scroll-spy, current year. No dependencies. */
(function () {
	"use strict";

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
		// Close menu after choosing a link (mobile)
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
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					var id = entry.target.id;
					links.forEach(function (l) {
						l.classList.toggle("active", l.getAttribute("href") === "#" + id);
					});
				}
			});
		}, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
		sections.forEach(function (s) { observer.observe(s); });
	}
})();
