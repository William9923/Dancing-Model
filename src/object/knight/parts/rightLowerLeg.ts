import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";
import { buildCubePoints } from "../../utils/cubePoints";

class RightLowerLeg extends Node {
  constructor() {
    super();

    this.setInstanceMatrix(mat4.multiply(
      mat4.scale(0.25, 0.65, 0.25),
      // mat4.zRotation(0),
      // mat4.yRotation(0),
      // mat4.xRotation(0),
      mat4.translation(-0.21, -0.975, 0),
    ));

    // 0.25 = xtranslation
    // -0.25 = ytranslation + 1 / 2 * height
    this.centralPoint = [-0.21, -0.7, 0];

    this.setTransformation("rotate", [16, 0, 0], true);

    this.setupPoints();
  }

  // override
  public setupPoints() {
    // empty the normals array
    this.normals = [];
    this.points = buildCubePoints(this.normals);
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(mat4.multiply(this.instanceMatrix, baseTransformMatrix));

    // render each rectangle separately
    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default RightLowerLeg;
