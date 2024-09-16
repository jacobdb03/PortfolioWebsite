const imgContainer = document.getElementById("imgPlace");

var canvas = document.createElement("canvas");
const canvasStyle = canvas.getContext("2d");

var img = new Image();

var blurImg = 0;

function getHash(imgHash, imgWidth, imgHeight) {
  blurImg = blurhash.decode(imgHash, imgWidth, imgHeight);
  return blurImg;
}

function getImgString(imgString) {
  img.src = imgString;
}

function drawHashImg() {
  canvas = blurhash.drawImageDataOnNewCanvas(blurImg, 1920, 1080);
  imgContainer.appendChild(canvas);
  img.onload = () => {
    imgContainer.replaceWith(img);
  };
}
