import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";
import { buildCubePoints } from "../../utils/cubePoints";

class RightLowerArm extends Node {
  constructor() {
    super();

    this.setInstanceMatrix(mat4.mMult(
      mat4.scale(0.18, 0.55, 0.18),
      // mat4.zRotation(0),
      // mat4.yRotation(0),
      // mat4.xRotation(0),
      mat4.translation(-0.45, 0, 0),
    ));

    // 0.25 = xtranslation
    // -0.25 = ytranslation + 1 / 2 * height
    this.centralPoint = [-0.45, 0.20, 0];

    this.setTransformation("rotate", [0, 0, 0], true);

    this.setupPoints();
  }

  // override
  public setupPoints() {
    // empty the normals array
    this.normals = [];
    this.points = buildCubePoints(this.normals);
    this.euy = 0;
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this.setTransformation("rotate", [0.75 * this.euy, this.euy, 0], true);
    this.euy = (this.euy - 1) % 90;

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

export default RightLowerArm;
