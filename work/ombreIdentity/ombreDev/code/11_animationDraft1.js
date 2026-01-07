/* ---- Document Variables ---- */

// Width and height
let w = window.innerWidth;
let h = window.innerHeight;

// Halftone Scaling variables
let defScale = 10;
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
const halftoneColour = "#f8eee6";
const backgroundColour = "#0d0c1d";

// Animation variables
let animationProgress = 0;
let animationSpeed = 0.005;
let expanding = true;
let isPlaying = false;
let currentTimelineTime = 0;

/* ---- p5 Functions ---- */

function preload() {
  animatedImg = loadImage(
    "./assets/animationDraft1/BreathingDotFS1F1.svg",
    () => {
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
    },
  );
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
  let easedT = t * t * (3 - 2 * t);

  // Update circle size and grid spacing
  circleScale = map(easedT, 0, 1, defScale * 0, defScale * 2.5);
  gridSpace = map(easedT, 0, 1, defSpace, defSpace * 1.8);
}
