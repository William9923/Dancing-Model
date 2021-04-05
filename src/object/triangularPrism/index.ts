import Base from "../base";
import { buildTriangularPrismDatas } from "./initialPoints";

class TriangularPrism extends Base {
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
  public render() {
    const vertexData = this.points;
    const normalData = this.normals;

    this.setPhongProperties();
    this.changePosition(vertexData);
    this.changeNormal(normalData);

    // render each rectangle separately
    for (let i = 0; i < this.points.length / (this.dimension * 4); i++) {
      this.gl.drawArrays(this.gl.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default TriangularPrism;
