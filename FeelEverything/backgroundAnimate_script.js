const container = document.getElementById("gradient_Div");
const hoverText = document.getElementById("gradient_Hover");
const gradientOverlay = document.getElementById("gradient_Bg");
const textContent = document.getElementById("gradient_Text");
let isHovered = false;

hoverText.addEventListener("mouseenter", () => {
  if (!isHovered) {
    container.classList.add("active");
    textContent.textContent = "To Feel Everything.";
    isHovered = true;
  }
});

hoverText.addEventListener("mouseleave", () => {
  container.classList.remove("active");
  textContent.textContent = "Feel Nothing.";
  isHovered = false;
});
