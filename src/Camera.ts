import { Coordinate } from "./Canvas.js";
import { Sphere } from "./Shape.js";
import { Vector } from "./RayTrace.js";


export type Viewport = {
  width: number;
  height: number;
  distance: number
}

/*
export function canvasToViewportCoord(cCoord: CanvasCoordinate, canvas: HTMLCanvasElement, viewport: Viewport): ViewportCoordinate {
 const vCoord: ViewportCoordinate = { 
  vx: cCoord.cx * viewport.width / canvas.width,
  vy: cCoord.cy * viewport.height / canvas.height,
  vz: viewport.distance
}
return vCoord;
}
*/

export function canvasToViewportCoord(x: number, y:number): Vector {
  return [x/1080, y/1080, 1];
}