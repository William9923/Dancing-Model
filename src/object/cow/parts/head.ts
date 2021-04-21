import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildCubePoints } from "../../utils/cubePoints";

class Head extends Node {
  constructor() {
    super();

    this.Kd = [0.1953125, 0.50390625, 0.65625];
    this.Ks = [0.6171875, 0.87109375, 0.99609375];
    this.Ka = [0.1953125, 0.50390625, 0.65625];

    this.setInstanceMatrix(
      mat4.mMult(
        mat4.scale(0.2, 0.2, 0.16),
        mat4.translation(0, 0.16, 0.34)
      )
    );

    this.centralPoint = [0.3, -0.25, 0.15];

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

    // render each rectangle separately
    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
    this._setTextureCallback!("image");
  }
}

export default Head;
