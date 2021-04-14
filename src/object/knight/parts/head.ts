import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";

class Head extends Node {
  constructor() {
    super();

    this.setTransformation("translate", [0, 0.475, 0.05]);

    this.setupPoints();
  }

  // override
  public setupPoints() {
    // empty the normals array
    this.normals = [];

    // constants used as reference
    // top view, 4 is front
    //    6  1  2
    //  5         3
    //       4

    const [ bx1, bx2, bx3, bx4, bx5, bx6 ] = [0, 0.15, 0.25, 0, -0.25, -0.15];
    const [ bz1, bz2, bz3, bz4, bz5, bz6 ] = [-0.22, -0.22, 0, 0.25, 0, -0.22];

    const pt1 = [bx1 / 2, 0.15, bz1 / 2 - 0.09];
    const pt2 = [bx2 / 2, 0.15, bz2 / 2 - 0.09];
    const pt3 = [bx3 / 2, 0.15, bz3 / 2 - 0.09];
    const pt4 = [bx4 / 2, 0.15, bz4 / 2 - 0.09];
    const pt5 = [bx5 / 2, 0.15, bz5 / 2 - 0.09];
    const pt6 = [bx6 / 2, 0.15, bz6 / 2 - 0.09];

    // const pt1 = [0, 0.15, -0.15];
    // const pt2 = [0.075, 0.15, -0.15];
    // const pt3 = [0.1, 0.15, 0];
    // const pt4 = [0, 0.15, 0.1];
    // const pt5 = [-0.1, 0.15, 0];
    // const pt6 = [-0.075, 0.15, -0.15];

    const pm1 = [bx1, 0, bz1];
    const pm2 = [bx2, 0, bz2];
    const pm3 = [bx3, 0, bz3];
    const pm4 = [bx4, 0, bz4];
    const pm5 = [bx5, 0, bz5];
    const pm6 = [bx6, 0, bz6];

    const pb1 = [bx1 / 1.5, -0.25, bz1 / 1.5 - 0.05];
    const pb2 = [bx2 / 1.5, -0.25, bz2 / 1.5 - 0.05];
    const pb3 = [bx3 / 1.5, -0.25, bz3 / 1.5 - 0.05];
    const pb4 = [bx4 / 1.5, -0.25, bz4 / 1.5 - 0.05];
    const pb5 = [bx5 / 1.5, -0.25, bz5 / 1.5 - 0.05];
    const pb6 = [bx6 / 1.5, -0.25, bz6 / 1.5 - 0.05];

    // prettier-ignore
    this.points = [
      // pentagon top-bot
      ...buildQuad(pt1, pt4, pt3, pt2, this.normals),
      ...buildQuad(pt1, pt6, pt5, pt4, this.normals),
      ...buildQuad(pb1, pb4, pb3, pb2, this.normals),
      ...buildQuad(pb1, pb6, pb5, pb4, this.normals),
      // connector top, from back then clocwise (if viewed from top)
      ...buildQuad(pm6, pt6, pt2, pm2, this.normals),
      ...buildQuad(pm2, pt2, pt3, pm3, this.normals),
      ...buildQuad(pm3, pt3, pt4, pm4, this.normals),
      ...buildQuad(pm4, pt4, pt5, pm5, this.normals),
      ...buildQuad(pm5, pt5, pt6, pm6, this.normals),
      // connector top, from back then clocwise (if viewed from top)
      ...buildQuad(pb6, pm6, pm2, pb2, this.normals),
      ...buildQuad(pb2, pm2, pm3, pb3, this.normals),
      ...buildQuad(pb3, pm3, pm4, pb4, this.normals),
      ...buildQuad(pb4, pm4, pm5, pb5, this.normals),
      ...buildQuad(pb5, pm5, pm6, pb6, this.normals),
    ];
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(mat4.multiply(this.transformMatrix, baseTransformMatrix));

    // render each rectangle separately
    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default Head;
