import { Coordinate } from "./Canvas.js";
import { Color } from "./Colors.js";

export class Sphere {
  origin: Coordinate;
  r: number;
  color: Color;
  constructor(position: Coordinate, radius: number, color: Color) {
    this.origin = position; 
    this.r = radius;
    this.color = color;
  }
  getCenter() {
    return this.origin;
  }
  getRadius() {
    return this.r;
  }

}