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
let images = []; // Array to store multiple images
let imageConfigs = []; // Array to store animation configurations for each image

// Colour variables
const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

// Timeline control variables
let timeline = [];
let globalFrame = 0;
let isPlaying = false; // Added definition for isPlaying
let animationProgress = 0; // Added definition for animationProgress
let currentTimelineTime = 0; // Added definition for currentTimelineTime

/* ---- p5 Functions ---- */

function preload() {
  // Load multiple images
  images.push(loadImage("./assets/animationDraft2/SVG/Breath1.svg"));
  images.push(loadImage("./assets/animationDraft2/SVG/Breath2.svg"));
  images.push(loadImage("./assets/animationDraft2/SVG/Breath3.svg"));

  // Process each image
  images.forEach((img, index) => {
    let cols = floor(img.width / pixelSample);
    let rows = floor(img.height / pixelSample);
    let imgPixels = [];

    img.loadPixels();
    for (let i = 0; i < cols; i++) {
      imgPixels[i] = [];
      for (let j = 0; j < rows; j++) {
        // Get alpha value of the pixel at (i * pixelSample, j * pixelSample)
        let pxIndex = (i * pixelSample + j * pixelSample * img.width) * 4;
        let alphaValue = img.pixels[pxIndex + 3]; // RGBA, so alpha is at index 3
        imgPixels[i][j] = alphaValue;
      }
    }

    // Store the image configuration in the array
    imageConfigs.push({ img, imgPixels, cols, rows });
  });
}

function setup() {
  createCanvas(1920, 1080);
  frameRate(60);

  originX = w / 2;
  originY = h / 2;

  // Add timeline animations for each image
  addHalftoneAnimation({
    imgIndex: 0,
    start: 0,
    duration: 100,
    maxSize: 60,
    easing: easeInOut,
    x: w / 4,
    y: h / 4,
  });

  addHalftoneAnimation({
    imgIndex: 1,
    start: 120,
    duration: 120,
    maxSize: 80,
    easing: easeInOut,
    x: w / 2,
    y: h / 2,
  });

  addHalftoneAnimation({
    imgIndex: 2,
    start: 240,
    duration: 80,
    maxSize: 100,
    easing: easeInOut,
    x: (w * 3) / 4,
    y: h / 2,
  });

  // Add event listeners for buttons and slider
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

  // Update the animation with the global frame
  if (isPlaying) {
    globalFrame++;
  }

  // Draw all animations in the timeline for each image
  for (let anim of timeline) {
    drawHalftoneAnimation(anim);
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

// Timeline animation setup
function addHalftoneAnimation(config) {
  timeline.push({ ...config });
}

// Draw the halftone based on alpha values and timeline animation settings
function drawHalftone() {
  imageConfigs.forEach((config, imgIndex) => {
    const { img, imgPixels, cols, rows } = config;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let a = imgPixels[i][j];
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
  });
}

// Function to control the scaling of the circle and animation behavior
function drawHalftoneAnimation(anim) {
  let localFrame = globalFrame - anim.start;

  // If the animation is outside its time range, skip it
  if (localFrame < 0 || localFrame > anim.duration * 2) return;

  let t = localFrame / anim.duration;
  if (t > 1) t = 2 - t; // Ping-pong effect
  t = constrain(t, 0, 1);

  const eased = anim.easing(t);
  circleScale = eased * anim.maxSize;

  // Draw the image's halftone pattern
  const { imgIndex } = anim;
  const config = imageConfigs[imgIndex];
  const { img, imgPixels, cols, rows } = config;

  const centreX = Math.round(anim.x - (cols * gridSpace) / 2);
  const centreY = Math.round(anim.y - (rows * gridSpace) / 2);

  fill(halftoneColour);
  noStroke();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const c = img.get(i * pixelSample, j * pixelSample);
      const darkness = 1 - brightness(c) / 100;

      if (darkness > 0.1) {
        const scaleFactor = map(darkness, 0.1, 1, 0.15, 0.42, true);
        const size = circleScale * scaleFactor;
        circle(i * gridSpace + centreX, j * gridSpace + centreY, size);
      }
    }
  }
}

// ————— EASING FUNCTIONS —————

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}

// Looping function for animating the timeline
function updateTimeline() {
  if (isPlaying) {
    currentTimelineTime += animationSpeed;
    if (currentTimelineTime >= 1) {
      currentTimelineTime = 1;
      // Loop back to start
      isPlaying = false;
    }
  }
}

/* ---- HTML Button Controls ---- */

// Function to start/pause the animation
function togglePlayPause() {
  isPlaying = !isPlaying;
  const playPauseButton = document.querySelector("#playPauseButton");
  playPauseButton.textContent = isPlaying ? "Pause" : "Play";
}

// Function to manually control the animation progress via slider
function updateSlider() {
  const animationSlider = document.querySelector("#animationSlider");
  if (!isPlaying) {
    animationProgress = animationSlider.value / 100;
  }
}
