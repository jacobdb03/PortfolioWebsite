let w = window.innerWidth;
let h = window.innerHeight;

let circleScale = 0;
const circleMaxSize = 80;
const gridSpace = 20;
const pixelSample = 10;

let centreX, centreY, rows, cols;
let ombreLogo;
let isPlaying = true;
let sliderControlled = false;
let direction = 1;
let progress = 0;
let speedFactor = 0.5;

const halftoneColour = "#152229";
const backgroundColour = "#eff1f3";

function preload() {
  ombreLogo = loadImage("./assets/fullLogo.svg");
}

function setup() {
  createCanvas(w, h);

  const slider = document.getElementById("animationSlider");
  slider.addEventListener("input", () => {
    sliderControlled = true;
    progress = Math.floor((slider.value / 100) * 60);
  });
  slider.addEventListener("change", () => {
    sliderControlled = false;
  });

  const playPauseInput = document.getElementById("playPauseButton");
  playPauseInput.addEventListener("change", () => {
    isPlaying = playPauseInput.checked;
  });

  document.getElementById("playPauseButton").checked = true;

  document.querySelector("#getImgButton").addEventListener("input", (event) => {
    if (event.target.files.length === 0) {
      ombreLogo = loadImage("./assets/fullLogo.svg");
    } else {
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        loadImage(reader.result, (img) => {
          ombreLogo = img;
        });
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  });
}

function draw() {
  background(backgroundColour);

  if (isPlaying || sliderControlled) {
    updateAnimationProgress();
  }

  if (!sliderControlled) {
    document.getElementById("animationSlider").value = Math.floor(
      (progress / 60) * 100,
    );
  }

  updateImageMetrics();
  drawHalftone();
}

function updateAnimationProgress() {
  if (!sliderControlled && isPlaying) {
    progress += speedFactor * direction;

    if (progress >= 60 || progress <= 0) {
      direction *= -1;
      progress = constrain(progress, 0, 60);
    }
  }

  const eased = easeInOut(progress / 60);
  circleScale = eased * circleMaxSize;
}

function updateImageMetrics() {
  cols = Math.floor(ombreLogo.width / pixelSample);
  rows = Math.floor(ombreLogo.height / pixelSample);
  centreX = Math.round(w / 2 - (cols * gridSpace) / 2);
  centreY = Math.round(h / 2 - (rows * gridSpace) / 2);
}

function drawHalftone() {
  fill(halftoneColour);
  noStroke();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const pixelAlpha = alpha(ombreLogo.get(i * pixelSample, j * pixelSample));

      if (pixelAlpha > 10) {
        const scaleFactor = map(pixelAlpha, 10, 100, 0.15, 0.42, true);
        const size = circleScale * scaleFactor;
        circle(i * gridSpace + centreX, j * gridSpace + centreY, size);
      }
    }
  }
}

function easeInOut(t) {
  return t < 0.5
    ? 4 * t * t * t // ease-in cubic
    : 1 - pow(-2 * t + 2, 3) / 2; // ease-out cubic
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
}
