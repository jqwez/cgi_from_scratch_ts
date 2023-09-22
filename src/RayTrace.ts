import { Coordinate } from "./Canvas.js";
import { Color, rgbColor } from "./Colors.js";
import { computeLighting } from "./Light.js";
import Scene from "./Scene.js";
import { Sphere } from "./Shape.js";
import { add, difference, dot, multiply } from "./util.js";

const BACKGROUND_COLOR = rgbColor(0, 0, 0);

export type Vector = [x:number, y:number, z:number]; 



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
export function traceRay(scene: Scene, O: Coordinate, D: Vector, tMin: number, tMax: number): Color {
  const shapes = scene.getShapes()
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

  const P = add(O, multiply(closest_t, D));
  let N = difference(P, closest_sphere.getCenter());
  N = multiply((1 / dot(N, N)), N);
  const intensity = computeLighting(scene, P, N);
  const __type = closest_sphere.color[0]
  const output = closest_sphere.color.map(n=>intensity*n) as Color;
  output[0] = __type;
  return output;
}