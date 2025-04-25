let mainCircle = {
  x: 400,
  y: 300,
  r: 200,
};

function setup() {
  createCanvas(800, 600);
  noStroke();
  ellipseMode(RADIUS);
}

function draw() {
  background(0);

  // Optional: visualise the boundary circle
  stroke(100);
  noFill();
  ellipse(mainCircle.x, mainCircle.y, mainCircle.r, mainCircle.r);
  noStroke();

  // Grid spacing
  let spacing = 20;

  // Loop through grid
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      // Check if the center is within the main circle
      let d = dist(x, y, mainCircle.x, mainCircle.y);
      if (d < mainCircle.r) {
        let waveSize = 5 + sin(frameCount * 0.1 + x * 0.05 + y * 0.05) * 3;
        fill(255, 100, 200);
        ellipse(x, y, waveSize, waveSize);
      }
    }
  }
}
