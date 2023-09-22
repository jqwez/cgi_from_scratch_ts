import { Coordinate } from "./Canvas.js";
import { Vector } from "./RayTrace.js";
import Scene from "./Scene.js";
import { difference, dot } from "./util.js";



export enum LightType {
  Ambient,
  Point,
  Directional
};

export type LightSource = [_type: LightType, intensity: number, direction: Vector | Coordinate];

export function computeLighting(scene: Scene, P: Vector | Coordinate, N: Vector) {
  let intensity = 0.0;
  const lights = scene.getLights();
  for (let i=0; i<lights.length; i++) {
    let L: LightSource[2] = [9999, 0, 0];
    const light = lights[i]
    if (light[0] == LightType.Ambient) {
      intensity += light[1];
    } else {
      if (light[0] == LightType.Directional) {
      L = light[2]; 
      }
      if (light[0] == LightType.Point) {
      L = difference(light[2], P);
      }
      const n_dot_l = dot(N, L);
      if (n_dot_l > 0) {
        intensity += light[1] * n_dot_l / (dot(N, N) * dot(L, L))
      }
    }
  }

  return intensity;
  
}