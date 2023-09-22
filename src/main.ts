import { Viewport, canvasToViewportCoord } from "./Camera.js";
import Canvas, { Coordinate, CoordinateType } from "./Canvas.js";
import { colorToString } from "./Colors.js";
import { traceRay } from "./RayTrace.js";
import Scene from "./Scene.js";

const canvas = new Canvas();
  const [cw, ch] = [canvas.getCanvas().width, canvas.getCanvas().height]
const viewport: Viewport = { width: cw, height: ch, distance: 1}


let offset = 0.1;
const camera_rotation = [[0.7071+offset, -0, -0.7071+offset],
[     0, 1,       0.1],
[0.7071, 0,  0.7071]];
function multiplymv(mat, vec){
var result = [0, 0, 0];

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    result[i] += vec[j]*mat[i][j];
  }
}
return result;
}



const scene = Scene.SampleScene();

function main() {
  canvas.Context().clearRect(0, 0, canvas.getCanvas().width, canvas.getCanvas().height);
  const O = [0, 0, -1, CoordinateType.World] as Coordinate;
  for (let x = -cw/2; x<cw/2; x++) {
    for (let y = -ch/2; y<ch/2; y++) {
     // const D = multiplymv(camera_rotation, canvasToViewportCoord(x, y));  
      const D = canvasToViewportCoord(x, y);  
      const color = traceRay(scene, O, D, 1, Infinity);
      canvas.putPixel(x, y, colorToString(color));

    }
  }

}


main();
//const buff = canvas.Context().getImageData(0, 0, cw, ch);
//canvas.Context().putImageData(buff, 0, 0)
