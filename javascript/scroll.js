let lastScrollY = window.scrollY;

const navbar = document.querySelector("nav");
const expandContent = document.querySelector(".expandableFooter");
const pageContent = document.querySelectorAll(
  "body > *:not(.expandableFooter):not(nav):not(.cursorClickBlob)",
);

function handleScroll() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;

  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  // Apply navbar width change based on scroll position
  if (scrollTop >= window.innerHeight * 0.8) {
    navbar.classList.add("nav-shrink");
    navbar.classList.remove("nav-expand");
  } else {
    navbar.classList.add("nav-expand");
    navbar.classList.remove("nav-shrink");
  }

  if (atBottom) {
    navbar.classList.add("expandedFooter");
    expandContent.style.pointerEvents = "auto";
    document.body.classList.add("addBlur");
    navbar.classList.add("nav-expand");
    navbar.classList.remove("nav-shrink");
  } else {
    navbar.classList.remove("expandedFooter");
    expandContent.style.pointerEvents = "none";
    document.body.classList.remove("addBlur");
  }

  lastScrollY = scrollTop;
}

// Attach event listeners
window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", handleScroll);
