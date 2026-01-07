/* ---- Document Variables ---- */

//Width and height
let w = window.innerWidth;
let h = window.innerHeight;

//Halftone Ssaling variables
let defaultScale = 12;
let circleScale = defaultScale;
let defaultSpace = 15;
let gridSpace = defaultSpace;
const pixelSample = 2;
let centreX, centreY, rows, cols;
let ombreLogo;
let sliderValue = 0;

let runSave = 1;
let chosenLetter = "SINGLEQUOTE";
let saveValue = 1;

//Svg variable
let recordingSVG = false;

//Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

/* ---- Custom Functions ---- */

function centreImage() {
  //How many cols is being made based on the amount of pixels sampled
  cols = floor(ombreLogo.width / pixelSample);
  rows = floor(ombreLogo.height / pixelSample);

  //Put the grid in the centre of the screen
  centreX = round(w / 2 - (cols * gridSpace) / 2);
  centreY = round(h / 2 - (rows * gridSpace) / 2);
}

function drawHalftone() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = alpha(ombreLogo.get(i * pixelSample, j * pixelSample));

      if (a >= 10) {
        let scaleFactor =
          a >= 100
            ? 0.42
            : a >= 90
              ? 0.41
              : a >= 80
                ? 0.4
                : a >= 70
                  ? 0.375
                  : a >= 60
                    ? 0.35
                    : a >= 50
                      ? 0.3
                      : a >= 40
                        ? 0.25
                        : a >= 30
                          ? 0.2
                          : a >= 20
                            ? 0.175
                            : 0.15;

        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * scaleFactor,
        );
      }
    }
  }
}

function autoSave() {
  runSave = runSave + 0.5;

  circleScale = defaultScale;
  circleScale = circleScale * runSave;
  save("letter_" + chosenLetter + "_" + saveValue + ".svg");
  saveValue = saveValue + 1;
}

/* ---- p5 Functions ---- */

function preload() {
  //Default image to start with before user picks
  console.log("./assets/letters/" + chosenLetter + ".svg");
  ombreLogo = loadImage("./assets/letters/" + chosenLetter + ".svg");
}

function setup() {
  // P5 canvas
  createCanvas(w, h, SVG);

  // SVG export button
  const exportLabel = document.getElementById("exportLabel");
  exportLabel.addEventListener("click", () => {});

  // Pick image button
  const fileInput = document.querySelector("#getImgButton");
  fileInput.addEventListener("input", (e) => {
    if (!e.target.files.length) {
      ombreLogo = loadImage("./assets/fullLogo.svg");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      loadImage(reader.result, (img) => (ombreLogo = img));
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  // Pixel grid control slider
  const slider = document.getElementById("sizeSlider");
  slider.addEventListener("input", () => {
    circleScale = defaultScale;
    sliderValue = slider.value;

    if (sliderValue >= 100) {
      circleScale = circleScale * 3.5;
    } else if (sliderValue >= 80) {
      circleScale = circleScale * 3;
    } else if (sliderValue >= 60) {
      circleScale = circleScale * 2.5;
    } else if (sliderValue >= 40) {
      circleScale = circleScale * 2;
    } else if (sliderValue >= 20) {
      circleScale = circleScale * 1.5;
    } else {
      circleScale = circleScale * 1;
    }
  });
}

function draw() {
  clear();

  // How the shape should look
  noStroke();
  fill(halftoneColour);

  centreImage();

  drawHalftone();

  if (runSave < 4) {
    autoSave();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
}
