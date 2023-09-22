import { Sphere } from "./Shape.js";
import { Coordinate } from "./Canvas.js";
import { rgbColor } from "./Colors.js";
import { LightSource, LightType } from "./Light.js";



export default class Scene {
  _shapes: Sphere[];
  _lights: LightSource[];
  constructor() {
    this._shapes = [];
    this._lights = [];
  }
  addShape(sphere: Sphere) {
    this._shapes.push(sphere);
  }
  getShapes() {
    return this._shapes;
  }
  addLight(light: LightSource) {
    this._lights.push(light);
  }
  getLights() {
    return this._lights;
  }

  public static SampleScene(): Scene {
    const scene = new Scene();
    scene.addShape(new Sphere([0, -1, 3, 0] as Coordinate, 1, rgbColor(256, 0, 0)));
    scene.addShape(new Sphere([2, 0, 4, 0] as Coordinate, 1, rgbColor(0, 0, 255)));
    scene.addShape(new Sphere([-2, 0, 4, 0] as Coordinate, 1, rgbColor(0, 255, 0)));
    scene.addShape(new Sphere([0, 40, 400, 0], 50, rgbColor(255, 255, 0)));
    scene.addLight([LightType.Ambient, 0.2, [0, 0, 0]]);
    scene.addLight([LightType.Point, 1.2, [2, 1, 0]]);
    scene.addLight([LightType.Directional, 0.2, [1, 4, 4]]);
    return scene;
  }
}