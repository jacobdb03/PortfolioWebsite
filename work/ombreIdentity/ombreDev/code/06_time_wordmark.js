let w = window.innerWidth;
let h = window.innerHeight;

let circleScale = 0;
var circleMaxSize = 80;
var gridSpace = 10;

let centreX;
let centreY;
let rows;
let cols;

var halftoneColour = "#ffffff";
let backgroundColour = "#000000";

let ombreLogo;

let pixelSample = 3;

let progress = 0;
let easingSpeed = 0.005; // Controls how fast the animation moves through the easing function
let pauseDuration = 1500; // Pause duration in milliseconds (e.g., 3 seconds)
let lastPauseTime = 0;
let isPaused = false; // Flag to track if we're in the pause state

// Easing function for smooth progress transitions
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function speedControl() {
  background(backgroundColour);

  // Check if we are in the pause state
  if (isPaused) {
    if (millis() - lastPauseTime >= pauseDuration) {
      isPaused = false; // End the pause after the duration has passed
    } else {
      // Ensure that at the start (circleScale = 5) and end (circleScale = circleMaxSize) the size is set correctly
      if (progress === 0 || progress === 1) {
        circleScale = progress === 0 ? 0 : circleMaxSize; // Min size at start, max size at end
      }
      return; // Skip the rest of the animation while paused
    }
  }

  // Oscillating progress: going forward and backward between 0 and 1
  progress += easingSpeed;

  // If progress reaches 1 or 0, reverse the direction (this will be the point where the pause occurs)
  if (progress >= 1 || progress <= 0) {
    easingSpeed *= -1; // Change direction to make the animation go back and forth
    isPaused = true; // Pause the animation at the end of the cycle
    lastPauseTime = millis(); // Start the pause timer
  }

  // Apply easing function to the progress
  let easedProgress = easeInOut(progress);

  // Map the eased progress to the range of circle sizes (5 to circleMaxSize)
  circleScale = map(easedProgress, 0, 1, 0, circleMaxSize);
}

function preload() {
  ombreLogo = loadImage("./assets/fullLogo.svg");
}

function setup() {
  canvas = createCanvas(w, h);

  cols = Math.floor(ombreLogo.width / pixelSample);
  rows = Math.floor(ombreLogo.height / pixelSample);

  let gridWidth = cols * gridSpace;
  let gridHeight = rows * gridSpace;

  centreX = Math.round(w / 2 - gridWidth / 2);
  centreY = Math.round(h / 2 - gridHeight / 2);
}

function draw() {
  background(backgroundColour);

  speedControl();

  // Loop through logo pixels to draw halftone circles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let pixelCheck = ombreLogo.get(i * pixelSample, j * pixelSample);

      if (alpha(pixelCheck) >= 100) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.42,
        );
      } else if (alpha(pixelCheck) >= 90) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.41,
        );
      } else if (alpha(pixelCheck) >= 80) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.4,
        );
      } else if (alpha(pixelCheck) >= 70) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.375,
        );
      } else if (alpha(pixelCheck) >= 60) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.35,
        );
      } else if (alpha(pixelCheck) >= 50) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.3,
        );
      } else if (alpha(pixelCheck) >= 40) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.25,
        );
      } else if (alpha(pixelCheck) >= 30) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.2,
        );
      } else if (alpha(pixelCheck) >= 20) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.175,
        );
      } else if (alpha(pixelCheck) >= 10) {
        circle(
          i * gridSpace + centreX,
          j * gridSpace + centreY,
          circleScale * 0.15,
        );
      }
    }
  }

  fill(halftoneColour);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
  setup();
}
