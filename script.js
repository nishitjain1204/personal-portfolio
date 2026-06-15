// year
document.getElementById("year").textContent = new Date().getFullYear();

// reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll(".section").forEach((s) => obs.observe(s));

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
