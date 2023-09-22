import { Viewport } from "./Camera";
import { Coordinate } from "./Canvas";
import { Color } from "./Colors";
import { Vector } from "./RayTrace";

export function difference(p1: Coordinate | Vector, p2: Coordinate | Vector): Vector {
  return [p1[0]-p2[0], p1[1]-p2[1], p1[2]-p2[2]];
}

export function dot(p1: Coordinate | Vector, p2: Coordinate | Vector ): number { 
  return p1[0]*p2[0] + p1[1]*p2[1] + p1[2]*p2[2]; 
}

export function add(p1: Coordinate | Vector, p2: Coordinate | Vector) : Vector {
  return [p1[0]+p2[0], p1[1]+p2[1], p1[2]+p2[2]];
}

export function multiply(k: number, v: Vector | Color): Vector {
  return v.map(n=>n*k) as Vector;
}