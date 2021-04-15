import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildCubePoints } from "../../utils/cubePoints";

class LeftBackLeg extends Node {
  constructor() {
    super();
    this.setupPoints();
    this.setTransformation("scale", [0.3, 0.8, 0.2]);
    this.setTransformation("translate", [0.1, -0.25, -0.15]);
  }

  public setupPoints() {
    this.normals = [];
    this.points = buildCubePoints(this.normals);
  }

  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(baseTransformMatrix);

    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default LeftBackLeg;
