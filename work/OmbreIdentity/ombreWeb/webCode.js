let w = window.innerWidth;
let h = window.innerHeight;

let scaleDef = 3;
let circleScale = scaleDef;
let circleGap = 10;

let halftoneColour = "#0d0c1d";
let bgColour = "#f8eee6";

let t = 0; // time for breathing animation
let offsets = []; // store a random offset for each dot

function preload() {}

function setup() {
  canvas = createCanvas(w, h);

  canvas.style.position = "fixed";
  canvas.style.top = "0px"; // Align at the top of the page
  canvas.style.left = "0px"; // Align at the left of the page

  for (let i = 0; i < w / circleGap + 1; i++) {
    offsets[i] = [];
    for (let j = 0; j < h / circleGap + 1; j++) {
      offsets[i][j] = random(TWO_PI); // random phase between 0 and TWO_PI
    }
  }
}

function draw() {
  background(bgColour); // your background

  // Get the scroll position
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  let maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Map the scroll position to scale (1x to 3x)
  let scaleFactor = 1 + (scrollTop / maxScroll) * 5; // scale from 1x to 3x

  // Cap the maximum size of circles to 20px
  scaleFactor = Math.min(scaleFactor, 20 / circleScale); // cap to a maximum size of 20px

  for (let i = 0; i < w / circleGap + 1; i++) {
    for (let j = 0; j < h / circleGap + 1; j++) {
      let x = i * circleGap;
      let y = j * circleGap;

      fill(halftoneColour);
      noStroke();

      let d = dist(mouseX, mouseY, x, y);
      let maxDistance = 300;

      if (d < maxDistance) {
        // Dot is close enough to the mouse
        let mouseScale = map(d, 0, maxDistance, 0, 0.8);
        mouseScale = constrain(mouseScale, 0, 0.8);

        // Breathing effect with random offset for each dot
        let breathing = map((sin(t + offsets[i][j]) + 1) / 2, 0, 1, 0.8, 1.5);

        // Apply scroll-based scale to the final circle size, capped at 20px max size
        let finalScale = circleScale * mouseScale * breathing * scaleFactor;

        circle(x, y, finalScale);
      } else {
        // Far dots don't breathe, just apply scroll-based scale
        let finalScale = circleScale * scaleFactor;

        circle(x, y, finalScale);
      }
    }
  }

  t += 0.03; // adjust breathing speed
}

function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
}
