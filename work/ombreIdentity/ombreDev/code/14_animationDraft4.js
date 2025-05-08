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
let originX, originY;
let animatedImg;
let animatedImgPixels = [];

// Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

// Animation variables
let animationProgress = 0;
let animationSpeed = 0.005;
let expanding = true;
let isPlaying = false;
let currentTimelineTime = 0;

/* ---- p5 Functions ---- */

function preload() {
  animatedImg = loadImage("./assets/WordmarkAnimation1.svg", () => {
    // Once the image is loaded, calculate rows and cols, then process the pixels
    cols = floor(animatedImg.width / pixelSample);
    rows = floor(animatedImg.height / pixelSample);

    animatedImg.loadPixels();
    for (let i = 0; i < cols; i++) {
      animatedImgPixels[i] = [];
      for (let j = 0; j < rows; j++) {
        // Get alpha value of the pixel at (i * pixelSample, j * pixelSample)
        let pxIndex =
          (i * pixelSample + j * pixelSample * animatedImg.width) * 4;
        let alphaValue = animatedImg.pixels[pxIndex + 3]; // RGBA, so alpha is at index 3
        animatedImgPixels[i][j] = alphaValue;
      }
    }
  });
}

function setup() {
  createCanvas(w, h);
  frameRate(60);

  originX = w / 2;
  originY = h / 2;

  const playPauseButton = document.querySelector("#playPauseButton");
  playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? "Pause" : "Play";
  });

  const animationSlider = document.querySelector("#animationSlider");
  animationSlider.addEventListener("input", () => {
    if (!isPlaying) {
      animationProgress = animationSlider.value / 100;
    }
  });
}

function draw() {
  // P5 setup
  background(backgroundColour);

  // Shape style setup
  noStroke();
  fill(halftoneColour);

  // Drawing the animation setup
  centreImage();
  drawHalftone();

  if (isPlaying) {
    updateAnimation();

    const animationSlider = document.querySelector("#animationSlider");
    animationSlider.value = animationProgress * 100;
  }
}

function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);

  originX = w / 2;
  originY = h / 2;
}

/* ---- Custom Functions ---- */

function centreImage() {
  if (!animatedImg) return;

  cols = animatedImg.width / pixelSample;
  rows = animatedImg.height / pixelSample;

  centreX = w / 2 - (cols * gridSpace) / 2;
  centreY = h / 2 - (rows * gridSpace) / 2;
}

function drawHalftone() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Sample based on animated pixelSample
      let px = floor(i * pixelSample);
      let py = floor(j * pixelSample);
      let a = alpha(animatedImg.get(px, py));

      if (a > 79) {
        let scaleFactor = map(a, 80, 255, 0, 1);

        // Position based on animated gridSpace
        let x = i * gridSpace + centreX;
        let y = j * gridSpace + centreY;

        // Circle stays centered
        circle(x, y, circleScale * scaleFactor);
      }
    }
  }
}

function updateAnimation() {
  if (expanding) {
    animationProgress += animationSpeed;
    if (animationProgress >= 1) {
      animationProgress = 1;
      expanding = false;
    }
  } else {
    animationProgress -= animationSpeed;
    if (animationProgress <= 0) {
      animationProgress = 0;
      expanding = true;
    }
  }

  let t = animationProgress;
  let easedT = easeInOutCubic(animationProgress);
  let easedTOffset = easedT * 0.9; // scaled version

  // Update circle size and grid spacing
  // circleScale = map(easedT, 0, 1, defScale * 0, defScale * 2.5);
  // gridSpace = map(easedT, 0, 1, defSpace, defSpace * 1.8);

  circleScale = map(easedTOffset, 0, 1, defScale * 0, defScale * 1.3);
  gridSpace = map(easedT, 0, 1, defSpace * 1.3, defSpace * 1.5);
  pixelSample = map(easedT, 0, 1, defSample * 1, defSample * 1);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}
