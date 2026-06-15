// year
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll(".section").forEach((s) => obs.observe(s));

// slide-up reveal for each job block
const jobObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); jobObs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".job").forEach((j) => jobObs.observe(j));

// count-up animation for the metrics (e.g. "300+" counts 0 → 300)
const counters = document.querySelectorAll(".stat b");
if (counters.length && !reduceMotion) {
  counters.forEach((el) => {
    const m = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (m) { el.dataset.target = m[1]; el.dataset.suffix = m[2]; el.textContent = "0" + m[2]; }
  });
  const runCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const suffix = el.dataset.suffix || "";
    const dur = 1300;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = (p < 1 ? Math.round(eased * target) : target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsEl = document.querySelector(".stats");
  if (statsEl) {
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".stat b").forEach(runCount);
          statObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    statObs.observe(statsEl);
  }
}

// scrollspy — highlight the nav link of the section in view
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const spyTargets = [...navLinks]
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)
      );
    }
  });
}, { rootMargin: "-55% 0px -35% 0px", threshold: 0 });
spyTargets.forEach((s) => spy.observe(s));
