import { Sphere } from "./Shape.js";
import { Coordinate } from "./Canvas.js";
import { rgbColor } from "./Colors.js";



export default class Scene {
  _shapes: Sphere[];
  constructor() {
    this._shapes = [];
  }
  add(sphere: Sphere) {
    this._shapes.push(sphere);
  }

  getShapes() {
    return this._shapes;
  }

  public static SampleScene(): Scene {
    const scene = new Scene();
    scene.add(new Sphere([0, -1, 3, 0] as Coordinate, 1, rgbColor(255, 0, 0)));
    scene.add(new Sphere([2, 0, 4, 0] as Coordinate, 1, rgbColor(0, 0, 255)));
    scene.add(new Sphere([-2, 0, 4, 0] as Coordinate, 1, rgbColor(0, 255, 0)));
    return scene;
  }
}