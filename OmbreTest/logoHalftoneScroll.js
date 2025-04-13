let w = window.innerWidth;
let h = window.innerHeight;

let circleScale = 5;
var circleMaxSize = 80;
var gridSpace = 10;

let centreX;
let centreY;
let rows;
let cols;

var halftoneColour = "#ffffff";
let backgroundColour = "#000000";

let ombreLogo;
let ombreLogoOld;

let pixelSample = 3;

let halftoneMiddle;

function preload() {
  ombreLogo = loadImage("./assets/LogoBlurNew.svg");
  ombreLogoOld = loadImage("./assets/LogoBlur.svg");
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

function mouseWheel(scroll) {
  if (scroll.delta > 0 && circleScale <= circleMaxSize) {
    circleScale += 0.5;
  } else if (scroll.delta < 0 && circleScale >= 0) {
    circleScale -= 0.5;
  }
}

function draw() {
  background(backgroundColour);

  //image(ombreLogo, w / 2 - ombreLogo.width / 2, h / 2 - ombreLogo.height / 2);

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
