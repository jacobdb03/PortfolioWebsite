/* ---- Document Variables ---- */

// Width and height
let w = window.innerWidth;
let h = window.innerHeight;

// Halftone Scaling variables
let defScale = 5;
let circleScale = defScale;
let defSpace = 10;
let gridSpace = defSpace;
let defSample = 12;
let pixelSample = defSample;
let centreX, centreY, rows, cols;
let packagingImage;
let sliderValue = 0;

// Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

/* ---- Custom Functions ---- */
function centreImage() {
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
      if (a > 15) {
        let scaleFactor = map(a, 20, 255, 0, 1);

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
  packagingImage = loadImage("./assets/wordmark.svg");
}

function setup() {
  createCanvas(w, h, SVG);

  // Compute layout once image is loaded
  if (packagingImage) {
    centreImage();
  }

  // SVG export button
  const exportLabel = document.getElementById("exportSVG");
  exportLabel.addEventListener("click", () => {
    draw();
    save("OmbreExport.svg");
  });

  // Pick image button
  const fileInput = document.querySelector("#getImgButton");
  fileInput.addEventListener("input", (e) => {
    if (!e.target.files.length) {
      packagingImage = loadImage("./assets/wordmark.svg", () => {
        centreImage();
        draw();
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      loadImage(reader.result, (img) => {
        packagingImage = img;
        centreImage();
        draw();
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  // Pixel grid control slider
  const slider = document.getElementById("sizeSlider");
  slider.addEventListener("input", () => {
    circleScale = map(slider.value, 0, 100, defScale * 1, defScale * 5);
    gridSpace = map(slider.value, 0, 100, defSpace * 1, defSpace * 2);

    centreImage();
    draw(); // Update view immediately
  });
  draw();
}

function draw() {
  background(backgroundColour);
  noStroke();
  fill(halftoneColour);
  drawHalftone();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
  draw();
}
