const buttons = document.querySelectorAll(".viewModeButton");
const targetElements = document.querySelectorAll("#timelineView"); // Selects all elements with the ID

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("viewModeActive"));
    button.classList.add("viewModeActive");

    targetElements.forEach((element) => {
      if (element.classList.contains("timelineHidden")) {
        element.classList.remove("timelineHidden"); // Remove class
      } else {
        element.classList.add("timelineHidden"); // Add class
      }
    });
  });
});
