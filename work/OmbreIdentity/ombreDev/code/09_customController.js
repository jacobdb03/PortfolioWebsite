/* ---- Document Variables ---- */

// Width and height
let w = window.innerWidth;
let h = window.innerHeight;

// Halftone Scaling variables
let defScale = 15;
let circleScale = defScale;
let defSpace = 8;
let gridSpace = defSpace;
let defSample = 2;
let pixelSample = defSample;
let centreX, centreY, rows, cols;
let packagingImage;
let sliderValue = 0;

// Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

/* ---- Custom Functions ---- */
function centreImage() {
  if (!packagingImage) return;

  cols = packagingImage.width / pixelSample;
  rows = packagingImage.height / pixelSample;

  centreX = w / 2 - (cols * gridSpace) / 2;
  centreY = h / 2 - (rows * gridSpace) / 2;
}

function drawHalftone() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = alpha(packagingImage.get(i * pixelSample, j * pixelSample));

      // Set a threshold for alpha value (e.g., 50)
      if (a > 0) {
        let scaleFactor = map(a, 10, 255, 0, 1);

        // Draw the circle only if alpha exceeds the threshold
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * scaleFactor,
        );
      }
    }
  }
}

/* ---- p5 Functions ---- */
function preload() {
  packagingImage = loadImage("./assets/logoBlurNew.svg");
}

function setup() {
  createCanvas(w, h, SVG);

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
      packagingImage = loadImage("./assets/LogoBlur2.svg", () => {
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
    circleScale = map(slider.value, 0, 100, defScale * 0.1, defScale * 8);
    gridSpace = map(slider.value, 0, 100, defSpace * 2, defSpace * 8);
    pixelSample = map(slider.value, 0, 100, defSample * 2, defSample * 9.35);

    centreImage();
  });
}

let i = 0;
let animationProgress = 0.2; // goes from 0 to 1
let animationSpeed = 0.01; // lower = slower, smoother

function draw() {
  clear();

  if (!packagingImage) return;

  noStroke();
  fill(halftoneColour);

  drawHalftone();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
  redraw();
}
