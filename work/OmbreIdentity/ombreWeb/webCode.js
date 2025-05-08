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
  let scaleFactor = 1 + (scrollTop / maxScroll) * 10; // scale from 1x to 3x

  // Cap the maximum size of circles to 20px
  scaleFactor = Math.min(scaleFactor, 20 / circleScale); // cap to a maximum size of 20px

  for (let i = 0; i < w / circleGap + 1; i++) {
    for (let j = 0; j < h / circleGap + 1; j++) {
      let x = i * circleGap;
      let y = j * circleGap;

      fill(halftoneColour);
      noStroke();

      let d = dist(mouseX, mouseY, x, y);

      let halfwayScroll = maxScroll / 1.5;
      let clampedScroll = Math.min(scrollTop, halfwayScroll);

      // Shrink from 300 → 25 only in the first half
      let maxDistance = map(clampedScroll, 0, halfwayScroll, 300, 25);
      maxDistance = constrain(maxDistance, 25, 300);

      let proximityEffect = map(scrollTop, 0, maxScroll, 1, 0.2); // 1 = full effect, 0.2 = almost none
      proximityEffect = constrain(proximityEffect, 0.1, 1);

      let breathingEffect = map(scrollTop, 0, maxScroll, 1, 0);
      breathingEffect = constrain(breathingEffect, 0, 1);

      if (d < maxDistance) {
        // Dot is close enough to the mouse
        let mouseScale = map(d, 0, maxDistance, 0, 0.8 * proximityEffect);
        mouseScale = constrain(mouseScale, 0, 0.8);

        // Breathing effect with random offset for each dot
        let breathing = 1 + sin(t + offsets[i][j]) * 0.3 * breathingEffect;

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
