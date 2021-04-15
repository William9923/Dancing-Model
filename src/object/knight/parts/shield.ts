import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";

class Shield extends Node {
  constructor() {
    super();

    this.setTransformation("translate", [0.2, -0.2, 0.3]);
    this.setTransformation("rotate", [-7.5, 10, 0]);

    this.setupPoints();
  }

  // override
  public setupPoints() {
    // empty the normals array
    this.normals = [];

    // constants used as reference
    //    6  1  2
    //  5         3
    //       4
    const p1 = [0, 0.78];
    const p2 = [0.60, 0.40];
    const p3 = [0.44, -0.35];
    const p4 = [0, -0.78];
    const p5 = [-0.44, -0.35];
    const p6 = [-0.60, 0.40];
    const ht = 0.05;

    // prettier-ignore
    this.points = [
      // pentagon front
      ...buildQuad(
        [...p1, ht],
        [...p4, ht],
        [...p3, ht],
        [...p2, ht],
        this.normals
      ),
      ...buildQuad(
        [...p1, ht],
        [...p6, ht],
        [...p5, ht],
        [...p4, ht],
        this.normals
      ),
      // pentagon back
      ...buildQuad(
        [...p1, -ht],
        [...p4, -ht],
        [...p3, -ht],
        [...p2, -ht],
        this.normals,
        true
      ),
      ...buildQuad(
        [...p1, -ht],
        [...p6, -ht],
        [...p5, -ht],
        [...p4, -ht],
        this.normals,
        true
      ),
      // connector, from p1 then clocwise
      ...buildQuad(
        [...p1, -ht],
        [...p1, ht],
        [...p2, ht],
        [...p2, -ht],
        this.normals
      ),
      ...buildQuad(
        [...p2, -ht],
        [...p2, ht],
        [...p3, ht],
        [...p3, -ht],
        this.normals
      ),
      ...buildQuad(
        [...p3, -ht],
        [...p3, ht],
        [...p4, ht],
        [...p4, -ht],
        this.normals
      ),
      ...buildQuad(
        [...p4, -ht],
        [...p4, ht],
        [...p5, ht],
        [...p5, -ht],
        this.normals
      ),
      ...buildQuad(
        [...p5, -ht],
        [...p5, ht],
        [...p6, ht],
        [...p6, -ht],
        this.normals
      ),
      ...buildQuad(
        [...p6, -ht],
        [...p6, ht],
        [...p1, ht],
        [...p1, -ht],
        this.normals
      ),
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

export default Shield;
