import { Viewport, canvasToViewportCoord } from "./Camera.js";
import Canvas, { Coordinate, CoordinateType } from "./Canvas.js";
import { colorToString } from "./Colors.js";
import { traceRay } from "./RayTrace.js";
import Scene from "./Scene.js";

const canvas = new Canvas();
  const [cw, ch] = [canvas.getCanvas().width, canvas.getCanvas().height]
const viewport: Viewport = { width: cw, height: ch, distance: 1}
//let yellow = colorToString(rgbColor(255, 255, 0));
//for (let i=0; i<500; i++) {
//  for (let j=0; j<500; j++) {
//    canvas.putPixel(i, j, yellow);
//  }
//}

const scene = Scene.SampleScene();
const shapes = scene.getShapes();

function mainLoop() {
  const O = [0, 0, 0, CoordinateType.World] as Coordinate;
  for (let x = -cw/2; x<cw/2; x++) {
    for (let y = -ch/2; y<ch/2; y++) {
      const D = canvasToViewportCoord(x, y);
      const color = traceRay(shapes, O, D, 1, Infinity);
      canvas.putPixel(x, y, colorToString(color));

    }
  }
}

mainLoop();
//const buff = canvas.Context().getImageData(0, 0, cw, ch);
//canvas.Context().putImageData(buff, 0, 0)
