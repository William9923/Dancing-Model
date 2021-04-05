import Node from "../node";
import { buildTriangularPrismDatas } from "./initialPoints";
import DrawMode from "../../util/drawMode";
import { mat4 } from "../../util/matrix";

class TriangularPrism extends Node {
  constructor(gl: WebGL2RenderingContext, program: WebGLProgram, baseTransformMatrix: number[]) {
    super(gl, program);
    this.setupPoints();
  }

  // override
  public setupPoints() {
    const triangularPrismDatas = buildTriangularPrismDatas();
    this.points = triangularPrismDatas.points;
    this.normals = triangularPrismDatas.normals;
  }

  // override
  public render(baseTransformMatrix: number[] = null) {
    const btMatrix = baseTransformMatrix || this.baseTransformMatrix;

    const vertexData = this.points;
    const normalData = this.normals;

    this.setPhongProperties();
    this.changePosition(vertexData);
    this.changeNormal(normalData);
    this._transformMatrixChangedCallback(mat4.multiply(this.transformMatrix, btMatrix));

    // render each rectangle separately
    for (let i = 0; i < this.points.length / (this.dimension * 4); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }

  // override
  public sibling() {
    return null;
  }

  // override
  public child() {
    return null;
  }
}

export default TriangularPrism;
