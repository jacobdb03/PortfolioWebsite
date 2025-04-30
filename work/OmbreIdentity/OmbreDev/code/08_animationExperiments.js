let w = window.innerWidth;
let h = window.innerHeight;

let frame1, frame2, frame3, frame4, frame5;
const backgroundColour = "#0d0c1d ";
const halftoneColour = "#f8eee6";

let timeline = [];
let globalFrame = 0;
let pause;

const pixelSample = 1;
const gridSpace = 15;

function preload() {
  frame1 = loadImage("./assets/animationDraft1/Frame1.svg");
  frame2 = loadImage("./assets/animationDraft1/Frame2.svg");
  frame3 = loadImage("./assets/animationDraft1/Frame3.svg");
  frame4 = loadImage("./assets/animationDraft1/Frame4.svg");
  frame5 = loadImage("./assets/animationDraft1/Frame5.svg");
}

function setup() {
  createCanvas(w, h);
  imageMode(CENTER);

  addHalftoneAnimation({
    img: frame1,
    x: width / 2,
    y: height / 2,
    start: 0,
    duration: 100,
    maxSize: 60,
    easing: easeInOut,
  });

  addHalftoneAnimation({
    img: frame2,
    x: width / 2,
    y: height / 2,
    start: 180,
    duration: 50,
    maxSize: 60,
    easing: easeInOut,
  });

  addHalftoneAnimation({
    img: frame3,
    x: width / 2,
    y: height / 2,
    start: 220,
    duration: 50,
    maxSize: 60,
    easing: easeInOut,
  });

  addHalftoneAnimation({
    img: frame4,
    x: width / 2,
    y: height / 2,
    start: 220,
    duration: 50,
    maxSize: 60,
    easing: easeInOut,
  });

  addHalftoneAnimation({
    img: frame2,
    x: width / 2,
    y: height / 2,
    start: 300,
    duration: 50,
    maxSize: 60,
    easing: easeInOut,
  });

  addHalftoneAnimation({
    img: frame5,
    x: width / 2,
    y: height / 2,
    start: 350,
    duration: 100,
    maxSize: 60,
    easing: easeInOut,
  });
}

function draw() {
  background(backgroundColour);

  pause = document.getElementById("playPauseButton").checked;

  if (pause == true) {
    globalFrame++;
  }

  for (let anim of timeline) {
    drawHalftoneAnimation(anim);
  }
}

function addHalftoneAnimation(config) {
  timeline.push({ ...config });
}

function drawHalftoneAnimation(anim) {
  let localFrame = globalFrame - anim.start;

  // Loop back out
  if (localFrame < 0 || localFrame > anim.duration * 2) return;

  let t = localFrame / anim.duration;
  if (t > 1) t = 2 - t; // ping-pong effect
  t = constrain(t, 0, 1);

  const eased = anim.easing(t);
  const circleScale = eased * anim.maxSize;

  const img = anim.img;
  const cols = Math.floor(img.width / pixelSample);
  const rows = Math.floor(img.height / pixelSample);

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

// ————— EASING —————
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}

function easeOutBounce(t) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  else return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

// ————— HANDLE RESIZE —————
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
}
