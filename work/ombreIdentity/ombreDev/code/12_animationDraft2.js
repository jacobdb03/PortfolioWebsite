/* ---- Document Variables ---- */

// Width and height
let w = window.innerWidth;
let h = window.innerHeight;

// Halftone Scaling variables
let defScale = 30;
let circleScale = defScale;
let scaleAmount = 0.3;
let defSpace = 8;
let gridSpace = defSpace;
let defSample = 1;
let pixelSample = defSample;

let centreX, centreY, rows, cols;
let originX, originY;
let animatedImg;
let animatedImgPixels = [];

// Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";
// let backgroundColour;

// Animation variables
let animationProgress = 0;
let animationSpeed = 0.005;
let expanding = true;
let isPlaying = false;
let currentTimelineTime = 0;

/* ---- p5 Functions ---- */

function preload() {
  animatedImg = loadImage("./assets/animationDraft2/SVG/logo.svg", () => {
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

  //backgroundColour = loadImage("./assets/animationDraft2/2x/bgPic1.png");
}

function setup() {
  createCanvas(1920, 1080);
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
  // clear();

  // Shape style setup
  noStroke();
  fill(halftoneColour);

  // Drawing the animation setup
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
function drawHalftone() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = animatedImgPixels[i][j];
      let scaleFactor = map(a, 0, 255, 0, 1);

      let x0 = i * defSpace;
      let y0 = j * defSpace;

      let dx = x0 - (cols * defSpace) / 2;
      let dy = y0 - (rows * defSpace) / 2;

      let x = originX + dx * (gridSpace / defSpace);
      let y = originY + dy * (gridSpace / defSpace);

      circle(x, y, circleScale * scaleFactor);
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

  // Choose easing function for the "in" phase (expanding)
  let easedTIn = (1 - Math.cos(Math.PI * t)) / 2;

  // Choose easing function for the "out" phase (contracting)
  let easedTOut = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Use different easing for "in" and "out"
  let easedT;
  if (expanding) {
    easedT = easedTIn; // Use the "in" easing when expanding
  } else {
    easedT = easedTOut; // Use the "out" easing when contracting
  }

  // Update circle size with the chosen easing function
  circleScale = map(easedT, 0, 1, defScale * 0, defScale * scaleAmount);
}

/* ---- Easing Functions ---- */
// 1. Cubic Ease-In and Ease-Out
// let easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 2. Quadratic Ease-In and Ease-Out
// let easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// 3. Quartic Ease-In and Ease-Out
// let easedT = t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

// 4. Quintic Ease-In and Ease-Out
// let easedT = t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

// 5. Exponential Ease-In and Ease-Out
// let easedT = t < 0.5 ? Math.pow(2, 10 * (2 * t - 1)) / 2 : (2 - Math.pow(2, -10 * (2 * t - 1))) / 2;

// 6. Sine Ease-In and Ease-Out
// let easedT = (1 - Math.cos(Math.PI * t)) / 2;
