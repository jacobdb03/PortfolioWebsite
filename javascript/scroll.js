var size = document.querySelector(":root");
let winYPos = 0;
let scroll = 0;

window.addEventListener("scroll", () => {
  winYPos = window.scrollY;
  console.log(winYPos);
  size.style.setProperty("--sizeH1", "winYPos");
});
