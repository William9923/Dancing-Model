import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";

class Hip extends Node {
  constructor() {
    super();

    this.setTransformation("scale", [0.5, 0.5, 0.5], true);

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
    const p1 = [0, 0];
    const p2 = [0.3, 0];
    const p3 = [0.5, -0.3];
    const p4 = [0, -0.5];
    const p5 = [-0.5, -0.3];
    const p6 = [-0.3, 0];
    const ht = 0.2;

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
      // connector, from top then clocwise
      ...buildQuad(
        [...p6, -ht],
        [...p6, ht],
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
    ];
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

export default Hip;
