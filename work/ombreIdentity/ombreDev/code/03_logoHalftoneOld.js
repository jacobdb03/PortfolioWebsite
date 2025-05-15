let w = window.innerWidth;
let h = window.innerHeight;

let circleScale = 5;
var circleMaxSize = 20;

var xGap = 7;
var yGap = 7;

var halftoneColour = "#000000";

let ombreLogo;
let ombreLogoVector = [];
let pixelSample = 1;

function preload() {
  ombreLogo = loadImage("./assets/LogoBlur.svg");
}

function setup() {
  canvas = createCanvas(w, h);
}

function mouseWheel(scroll) {
  if (scroll.delta > 0 && circleScale <= circleMaxSize) {
    circleScale += 1;
  } else if (scroll.delta < 0 && circleScale >= 1) {
    circleScale -= 1;
  }
}

function draw() {
  background("#ffffff");

  /*image(ombreLogo, w / 2 - ombreLogo.width / 2, h / 2 - ombreLogo.height / 2);*/

  for (let i = 0; i <= ombreLogo.width; i++) {
    for (let j = 0; j <= ombreLogo.height; j++) {
      let pixelCheck = ombreLogo.get(i, j);
      if (alpha(pixelCheck) >= 120) {
        circle(i * xGap, j * yGap, circleScale * 1);
      } else if (alpha(pixelCheck) >= 100) {
        circle(i * xGap, j * yGap, circleScale * 0.9);
      } else if (alpha(pixelCheck) >= 90) {
        circle(i * xGap, j * yGap, circleScale * 0.8);
      } else if (alpha(pixelCheck) >= 80) {
        circle(i * xGap, j * yGap, circleScale * 0.7);
      } else if (alpha(pixelCheck) >= 70) {
        circle(i * xGap, j * yGap, circleScale * 0.6);
      } else if (alpha(pixelCheck) >= 60) {
        circle(i * xGap, j * yGap, circleScale * 0.5);
      } else if (alpha(pixelCheck) >= 50) {
        circle(i * xGap, j * yGap, circleScale * 0.4);
      } else if (alpha(pixelCheck) >= 40) {
        circle(i * xGap, j * yGap, circleScale * 0.3);
      } else if (alpha(pixelCheck) >= 30) {
        circle(i * xGap, j * yGap, circleScale * 0.2);
      } else if (alpha(pixelCheck) >= 20) {
        circle(i * xGap, j * yGap, circleScale * 0.1);
      }
    }
  }
  // NEXT: Smaller circles on edges, bigger in middle
  // Learn to animate that
  // make less laggy

  fill(halftoneColour);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
}
