window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const navbar = document.querySelector("nav");
  const expandContent = document.querySelector(".expandableFooter");
  const pageContent = document.querySelectorAll(
    "body > *:not(.expandableFooter):not(nav):not(.cursorClickBlob)",
  ); // Exclude footer & navbar

  if (scrollPosition >= documentHeight) {
    navbar.classList.add("expandedFooter");
    expandContent.style.pointerEvents = "auto"; // Enable footer buttons

    // Apply blur effect only to elements that are NOT expandableFooter
    pageContent.forEach((element) => {
      element.style.filter = "blur(3px)";
    });
  }

  if (
    navbar.classList.contains("expandedFooter") &&
    window.scrollY < lastScrollY
  ) {
    navbar.classList.remove("expandedFooter");
    expandContent.style.pointerEvents = "none"; // Disable footer buttons

    // Remove blur effect
    pageContent.forEach((element) => {
      element.style.filter = "none";
    });
  }

  lastScrollY = window.scrollY;
});

let lastScrollY = window.scrollY;

function checkScroll() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const navbar = document.querySelector("nav");
  const expandContent = document.querySelector(".expandableFooter");
  const pageContent = document.querySelectorAll(
    "body > *:not(.expandableFooter):not(nav):not(.cursorClickBlob)",
  );

  if (scrollPosition >= documentHeight) {
    navbar.classList.add("expandedFooter");
    expandContent.style.pointerEvents = "auto"; // Enable footer buttons

    // Apply blur effect only to elements that are NOT expandableFooter
    pageContent.forEach((element) => {
      element.style.filter = "blur(3px)";
    });
  } else {
    // Ensure the footer retracts if the user is no longer at the bottom
    navbar.classList.remove("expandedFooter");
    expandContent.style.pointerEvents = "none";

    // Remove blur effect
    pageContent.forEach((element) => {
      element.style.filter = "none";
    });
  }

  lastScrollY = window.scrollY;
}

// Attach the scroll event listener
window.addEventListener("scroll", checkScroll);

// Run the function immediately in case the page is reloaded while at the bottom
document.addEventListener("DOMContentLoaded", checkScroll);
