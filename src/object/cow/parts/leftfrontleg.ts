import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildCubePoints } from "../../utils/cubePoints";

class LeftFrontLeg extends Node {
  constructor() {
    super();

    this.setInstanceMatrix(
      mat4.mMult(
        mat4.scale(0.12, 0.4, 0.12),
        mat4.translation(0.08, -0.2, 0.14)
      )
    );

    this.centralPoint = [0.08, -0.2, 0.14];

    this.setupPoints();
  }

  public setupPoints() {
    this.normals = [];
    this.points = buildCubePoints(this.normals);
  }

  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this._setTextureCallback!("none");
    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(mat4.multiply(this.instanceMatrix, baseTransformMatrix));

    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
    this._setTextureCallback!("image");
  }
}

export default LeftFrontLeg;
