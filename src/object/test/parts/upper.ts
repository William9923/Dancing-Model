import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";

class Upper extends Node {
  constructor() {
    super();
    this.setupPoints();
  }

  // override
  public setupPoints() {
    // prettier-ignore
    this.points = [
      0, 0, 0,
      -1, 0, 0,
      0, -1, 0,
    ];
    // prettier-ignore
    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ];
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(mat4.multiply(this.transformMatrix, baseTransformMatrix));

    // render each rectangle separately
    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 3)); i++) {
      this.draw(DrawMode.TRIANGLES, 3 * i, 3);
    }
  }
}

export default Upper;
