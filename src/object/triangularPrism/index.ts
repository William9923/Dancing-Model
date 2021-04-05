import Node from "../node";
import { buildTriangularPrismDatas } from "./initialPoints";
import DrawMode from "../../util/drawMode";
import { mat4 } from "../../util/matrix";

class TriangularPrism extends Node {
  constructor() {
    super();
    this.setupPoints();
  }

  // override
  public setupPoints() {
    const triangularPrismDatas = buildTriangularPrismDatas();
    this.points = triangularPrismDatas.points;
    this.normals = triangularPrismDatas.normals;
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    const vertexData = this.points;
    const normalData = this.normals;

    this.applyMaterialProperties();
    this.applyPosition(vertexData);
    this.applyNormal(normalData);
    this._transformMatrixChangedCallback(mat4.multiply(this.transformMatrix, baseTransformMatrix));

    // render each rectangle separately
    for (let i = 0; i < this.points.length / (this.dimension * 4); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default TriangularPrism;
