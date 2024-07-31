window.addEventListener("DOMContentLoaded", (event) => {
  let floatingHeader = document.getElementById("hoverNonFloat");

  floatingHeader.addEventListener("animationend", () => {
    console.log(floatingHeader);

    floatingHeader.id = "hoverFloat";
  });
});
