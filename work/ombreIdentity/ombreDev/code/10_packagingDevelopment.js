/* ---- Document Variables ---- */

// Width and height
let w = window.innerWidth;
let h = window.innerHeight;

// Halftone Scaling variables
let defaultScale = 10;
let circleScale = defaultScale;
let defaultSpace = 8;
let gridSpace = defaultSpace;
const pixelSample = 2;
let centreX, centreY, rows, cols;
let packagingImage;
let sliderValue = 0;

// Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

/* ---- Custom Functions ---- */
function centreImage() {
  if (!packagingImage) return;

  cols = floor(packagingImage.width / pixelSample);
  rows = floor(packagingImage.height / pixelSample);

  centreX = round(w / 2 - (cols * gridSpace) / 2);
  centreY = round(h / 2 - (rows * gridSpace) / 2);
}

function drawHalftone() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = alpha(packagingImage.get(i * pixelSample, j * pixelSample));

      let scaleFactor = map(a, 0, 255, 0, 1);

      circle(
        i * gridSpace + centreX,
        j * gridSpace + centreY,
        circleScale * scaleFactor,
      );
    }
  }
}

/* ---- p5 Functions ---- */
function preload() {
  packagingImage = loadImage("./assets/packaging/Asset 21.svg");
}

function setup() {
  createCanvas(w, h, SVG);
  noLoop(); // prevent continuous drawing unless updated

  // SVG export button
  const exportLabel = document.getElementById("exportSVG");
  exportLabel.addEventListener("click", () => {
    redraw();
    save("Export.svg");
  });

  // Pick image button
  const fileInput = document.querySelector("#getImgButton");
  fileInput.addEventListener("input", (e) => {
    if (!e.target.files.length) {
      packagingImage = loadImage("./assets/fullLogo.svg", () => {
        redraw();
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      loadImage(reader.result, (img) => {
        packagingImage = img;
        redraw();
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  // Pixel grid control slider
  const slider = document.getElementById("sizeSlider");
  slider.addEventListener("input", () => {
    circleScale = map(
      slider.value,
      0,
      100,
      defaultScale * 1,
      defaultScale * 2.5,
    );
    gridSpace = map(slider.value, 0, 100, defaultSpace * 1, defaultSpace * 2);

    redraw();
  });
}

function draw() {
  clear();

  if (!packagingImage) return;

  noStroke();
  fill(halftoneColour);

  centreImage();
  drawHalftone();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
  redraw();
}
