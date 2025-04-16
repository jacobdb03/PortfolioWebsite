let w = window.innerWidth;
let h = window.innerHeight;

let circleScale = 0;
var circleMaxSize = 30;

var gridWidth = 125;
var gridHeight = 95;

var xGap = 10;
var yGap = 10;

var halftoneColour = "#000000";

function preload() {}

function setup() {
  canvas = createCanvas(w, h);
}

function mouseWheel(scroll) {
  if (scroll.delta > 0 && circleScale <= circleMaxSize) {
    // Circle Size Increase
    circleScale += 1;
  } else if (scroll.delta < 0 && circleScale >= 1) {
    // Circle Size Decrease
    circleScale -= 1;
  }
}

function draw() {
  background("#ffffff");

  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j <= gridHeight; j++) {
      circle(i * xGap, j * yGap, circleScale);
    }
  }

  fill(halftoneColour);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = window.innerWidth;
  h = window.innerHeight;
}
