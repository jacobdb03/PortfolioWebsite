const buttons = document.querySelectorAll(".viewModeButton");
const timelineElements = document.querySelectorAll("#timelineView");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("viewModeActive")) return;

    buttons.forEach((btn) => btn.classList.remove("viewModeActive"));
    button.classList.add("viewModeActive");

    if (button.id === "timelineButton") {
      timelineElements.forEach((el) => el.classList.remove("timelineHidden"));
    } else if (button.id === "selectButton") {
      timelineElements.forEach((el) => el.classList.add("timelineHidden"));
    }
  });
});
