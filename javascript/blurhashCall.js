/*const blurImg = blurhash.decode(
  "UBGuwJ0000^*0*4nF2-;_2Mw~qSjtn9aMcxa",
  1920,
  1080,
);

const canvas = document.createElement("canvas");
const canvasStyle = canvas.getContext("2d");

console.log(canvas.width);

const imgData = canvasStyle.createImageData(1920, 1080);
imgData.data.set(blurImg);

canvasStyle.putImageData(imgData, 0, 0);
console.log(canvas);
document.body.appendChild(canvas);
*/

const imgContainer = document.getElementById("imgPlace");
var canvas = document.createElement("canvas");
const canvasStyle = canvas.getContext("2d");

const blurImg = blurhash.decode(
  "UBGuwJ0000^*0*4nF2-;_2Mw~qSjtn9aMcxa",
  1920,
  1080,
);

canvas = blurhash.drawImageDataOnNewCanvas(blurImg, 1920, 1080);
imgContainer.appendChild(canvas);

/*const imgData = canvasStyle.createImageData(1920, 1080);
imgData.data.set(blurImg);

canvasStyle.putImageData(imgData, 0, 0);
canvas.style.width = "100%";
canvas.style.height = "auto";*/
