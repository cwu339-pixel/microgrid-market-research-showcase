const navLinks = Array.from(document.querySelectorAll(".rail-nav a"));
const sections = navLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sections.forEach(({ link, target }) => {
      link.classList.toggle("active", target === visible.target);
    });
  },
  {
    rootMargin: "-18% 0px -58% 0px",
    threshold: [0.2, 0.4, 0.6],
  },
);

sections.forEach(({ target }) => observer.observe(target));
