import { Coordinate } from "./Canvas.js";
import { Color, rgbColor } from "./Colors.js";
import { Sphere } from "./Shape.js";

const BACKGROUND_COLOR = rgbColor(255, 255, 255);

export type Vector = [x:number, y:number, z:number]; 

function difference(p1: Coordinate, p2: Coordinate): Vector {
  return [p1[0]-p2[0], p1[1]-p2[1], p1[2]-p2[2]];
}

function dot(p1: Vector, p2: Vector): number { 
  return p1[0]*p2[0] + p1[1]*p2[1] + p1[2]*p2[2]; 
}

function intersectRaySphere(O: Coordinate, D: Vector, sphere: Sphere) {
  const r = sphere.getRadius();
  const CO = difference(O, sphere.getCenter());
  const a = dot(D, D);
  const b = 2*dot(CO, D);
  const c = dot(CO, CO) - r * r; 

  const discriminant = b*b - 4*a*c;
  if (discriminant < 0) {
    return [Infinity, Infinity];
  }
  const t1 = (-b + Math.sqrt(discriminant)) / (2*a);
  const t2 = (-b - Math.sqrt(discriminant)) / (2*a);
  return [t1, t2];
}
export function traceRay(shapes: Sphere[], O: Coordinate, D: Vector, tMin: number, tMax: number): Color {
  let closest_t = Infinity;
  let closest_sphere: null | Sphere = null;
  for (let i=0; i<shapes.length; i++) {
    const shape = shapes[i];
    const [t1, t2] = intersectRaySphere(O, D, shape);
    if (t1 > tMin && t1 < tMax && t1 < closest_t) {
      closest_t = t1;
      closest_sphere = shape;
    }
    if (t2 > tMin && t2 < tMax && t2 <closest_t) {
      closest_t = t2;
      closest_sphere = shape;
    } 
  }
  if (closest_sphere == null) {
      return BACKGROUND_COLOR;
    }
  return closest_sphere.color;
}