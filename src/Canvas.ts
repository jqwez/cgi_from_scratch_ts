import { rgbColor } from "./Colors";

// CONSTANTS & DEBUGGING 
const CANVAS_WIDTH = 1960;
const CANVAS_HEIGHT = 1080;
const DEBUG_BORDER = true;


export enum CoordinateType {
  World,
  Local,
  Canvas
}

export type Coordinate = [
  x: number,
  y: number,
  z: number, 
  _type: CoordinateType
]

export default class Canvas {
  private __canvas: HTMLCanvasElement;
  private __context: CanvasRenderingContext2D;
  constructor() {
    [this.__canvas, this.__context] = this.__initCanvas();
    
  }

private __initCanvas() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  if (DEBUG_BORDER) {
  canvas.style.border = "2px solid red"
  canvas.style.backgroundColor = "black";
  }
  return [canvas, context] as [HTMLCanvasElement, CanvasRenderingContext2D];
}
public getCanvas() {
  return this.__canvas;
}
public Context() {
  return this.__context;
}
public static canvasToLocalCoordinate(coord: Coordinate, canvas: HTMLCanvasElement): Coordinate {
  if (coord[3] !== CoordinateType.Canvas) {
    throw new Error("This is not a canvas coordinate"); 
  }
  const [cx, cy] = [coord[0], coord[1]];
  const [cw, ch] = [canvas.width, canvas.height];
  const x = (cw / 2) + cx;
  const y = (ch / 2) - cy;
  return [x, y, 0, CoordinateType.Local];
}
public static LocalToCanvasCoordinate(coord: Coordinate, canvas: HTMLCanvasElement): Coordinate {
  const [x,y] = [coord[0], coord[1]];
  const [cw, ch] = [canvas.width, canvas.height];
  const cx = x - (cw / 2);
  const cy = (ch / 2) - y;
  return [cx, cy, 0, CoordinateType.Canvas]
}
public myCanvastoLocalCoordinate(cx: number, cy: number) : Coordinate {
  const canvas = this.getCanvas(); 
  const x = (canvas.width / 2) + cx;
  const y = (canvas.height / 2) + cy;
  return [x, y, 0, CoordinateType.Local];
}
public myLocalToCanvasCoordinate(x: number, y: number): Coordinate {
  const canvas = this.getCanvas(); 
  const cx = (canvas.width / 2) + x;
  const cy = (canvas.height / 2) - y;
  return [cx, cy, 0, CoordinateType.Canvas]
}
public putPixel(x: number, y: number, color: string): void {
  const ctx = this.Context();
  const coord = this.myLocalToCanvasCoordinate(x, y);
  if (coord[0] < 0 || coord[0] >= this.__canvas.width || coord[1] < 0 || coord[1] > this.__canvas.height) {
    return;
  }
  const [cx, cy] = [coord[0], coord[1]];
  ctx.fillStyle = color;
  ctx.fillRect(cx, cy, 1, 1);
}
}