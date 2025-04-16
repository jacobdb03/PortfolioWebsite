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

  // Check if scrolled to the bottom
  const atBottom = scrollPosition >= documentHeight;

  // Apply navbar width change based on scroll position
  if (scrollTop >= window.innerHeight * 0.8) {
    navbar.style.width = "50vw"; // Set width to 60vw if scrolled more than 20vh
  } else {
    navbar.style.width = "90vw"; // Reset to 90vw if at the top
  }

  if (atBottom) {
    navbar.classList.add("expandedFooter");
    navbar.style.width = "90vw"; // Reset navbar width back to 90vw when at the bottom
    expandContent.style.pointerEvents = "auto";
    applyBlurEffect(true); // Apply blur when at the bottom
  } else {
    navbar.classList.remove("expandedFooter");
    expandContent.style.pointerEvents = "none";
    applyBlurEffect(false); // Remove blur when not at the bottom
  }

  lastScrollY = scrollTop;
}

function applyBlurEffect(blur) {
  pageContent.forEach((element) => {
    element.style.filter = blur ? "blur(3px)" : "none";
  });
}

// Attach event listeners
window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", handleScroll);
