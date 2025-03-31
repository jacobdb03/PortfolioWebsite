const cursor = document.querySelector(".cursorClickBlob");
const links = document.querySelectorAll("a:not(#timelineView)");
const alt = document.querySelectorAll(".blueBg, .titleDiv, nav");

// Update cursor position
window.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Add hover effect for all anchor tags
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.classList.add("interactableLink");
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("interactableLink");
  });
});

alt.forEach((alt) => {
  alt.addEventListener("mouseenter", () => {
    cursor.classList.add("interactableAlt");
  });

  alt.addEventListener("mouseleave", () => {
    cursor.classList.remove("interactableAlt");
  });
});
