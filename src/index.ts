import cv from "opencv.js";
import "./styles.css";

let myApp = document.getElementById("app");
myApp.innerHTML = `
<h1>OpenCV.ts</h1>
<div>
  <p>
  Load an image, display it on canvas1, detect countours, detect squares.
</div>
<div id="flexContainer" class="container">
  <div id="viewPort1">
    <h3>ViewPort1</h3>
  </div>    
  <div id="viewPort2">
    <h3>ViewPort2</h3>
  </div>
</div>
`;
let source_canvas = document.createElement("canvas");
source_canvas.setAttribute("id", "sourceCanvas");
source_canvas.setAttribute("width", "450");
source_canvas.setAttribute("height", "600");

let ctx = source_canvas.getContext("2d");
const drawImage = (url) => {
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };
};
let image_path: string = "img/shapes.png";

drawImage(image_path);

let viewPort1 = document.getElementById("viewPort1");

viewPort1?.appendChild(source_canvas);

let dst_canvas = document.createElement("canvas");
dst_canvas.setAttribute("id", "dstCanvas");
dst_canvas.setAttribute("width", "450");
dst_canvas.setAttribute("height", "600");
let viewPort2 = document.getElementById("viewPort2");
viewPort2?.appendChild(dst_canvas);

let src = cv.imread("sourceCanvas");
let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
// You can try more different parameters
cv.findContours(
  src,
  contours,
  hierarchy,
  cv.RETR_CCOMP,
  cv.CHAIN_APPROX_SIMPLE
);
// draw contours with random Scalar
for (let i = 0; i < contours.size(); ++i) {
  let color = new cv.Scalar(
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255)
  );
  cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
}

cv.imshow("dstCanvas", dst);
// src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
