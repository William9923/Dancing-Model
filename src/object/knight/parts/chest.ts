import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "./util";

class Chest extends Node {
  constructor() {
    super(mat4.translation(0, -0.3, 0));
    this.setupPoints();
  }

  // override
  public setupPoints() {
    // empty the normals array
    this.normals = [];

    // constants used as reference
    //   1       2
    //  6         3
    //    5     4
    const p1 = [-0.35, 0.7];
    const p2 = [0.35, 0.7];
    const p3 = [0.4, 0.4];
    const p4 = [0.3, 0];
    const p5 = [-0.3, 0];
    const p6 = [-0.4, 0.4];
    const ht1 = 0.2;
    const ht2 = 0.25;

    // prettier-ignore
    this.points = [
      // hexagon front
      ...buildQuad(
        [...p1, ht1],
        [...p6, ht2],
        [...p3, ht2],
        [...p2, ht1],
        this.normals
      ),
      ...buildQuad(
        [...p6, ht2],
        [...p5, ht1],
        [...p4, ht1],
        [...p3, ht2],
        this.normals
      ),
      // hexagon back
      ...buildQuad(
        [...p1, -ht1],
        [...p6, -ht2],
        [...p3, -ht2],
        [...p2, -ht1],
        this.normals,
        true
      ),
      ...buildQuad(
        [...p6, -ht2],
        [...p5, -ht1],
        [...p4, -ht1],
        [...p3, -ht2],
        this.normals,
        true
      ),
      // connector, top then clocwise
      ...buildQuad(
        [...p1, -ht1],
        [...p1,  ht1],
        [...p2,  ht1],
        [...p2, -ht1],
        this.normals
      ),
      ...buildQuad(
        [...p2, -ht1],
        [...p2,  ht1],
        [...p3,  ht2],
        [...p3, -ht2],
        this.normals
      ),
      ...buildQuad(
        [...p3, -ht2],
        [...p3,  ht2],
        [...p4,  ht1],
        [...p4, -ht1],
        this.normals
      ),
      ...buildQuad(
        [...p4, -ht1],
        [...p4,  ht1],
        [...p5,  ht1],
        [...p5, -ht1],
        this.normals
      ),
      ...buildQuad(
        [...p5, -ht1],
        [...p5,  ht1],
        [...p6,  ht2],
        [...p6, -ht2],
        this.normals
      ),
      ...buildQuad(
        [...p6, -ht2],
        [...p6,  ht2],
        [...p1,  ht1],
        [...p1, -ht1],
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

export default Chest;
