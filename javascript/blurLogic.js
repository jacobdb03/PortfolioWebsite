function newCanvas() {
  var canvas = document.createElement("canvas");
  return canvas;
}

/* Uses inputted image and returns ONLY file name */
function getContainerName() {
  var imgName = returnImgString.replace(/^.*[\\/]/, "");
  let split = imgName.split(".");
  split.pop();
  let finalName = split.join(".");
  return finalName;
}

/* Takes blurhash and returns a decoded image */
function getHash(imgHash, imgWidth, imgHeight) {
  const blurImg = blurhash.decode(imgHash, imgWidth, imgHeight);
  return blurImg;
}

/* Takes in the containerID and sets that as the container to use */
/* Important: the container ID must be the same name as the file */
function getContainerID(containerID) {
  imgContainer = document.getElementById(containerID);
  return imgContainer;
}

/* USABLE FUNCTIONS */

/* Input the path of an image to set that image and returns it */
function getImgSrc(imgString) {
  returnImgString = imgString;

  getContainerName();
}

/* Creates a canvas that draws the decoded blurhash on it while waiting for image  */
function drawHashImg(hashVal, hashW, hashH) {
  newCanvas(getContainerName());
  canvas = blurhash.drawImageDataOnNewCanvas(
    getHash(hashVal, hashW, hashH),
    hashW,
    hashH,
  );

  getContainerID(getContainerName()).appendChild(canvas);
}
