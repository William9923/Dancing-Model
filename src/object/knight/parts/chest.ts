import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";

class Chest extends Node {
  constructor() {
    super();

    this.setTransformation("translate", [0, 0, 0]);

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
        [...p1, ht1] as Point,
        [...p6, ht2] as Point,
        [...p3, ht2] as Point,
        [...p2, ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p6, ht2] as Point,
        [...p5, ht1] as Point,
        [...p4, ht1] as Point,
        [...p3, ht2] as Point,
        this.normals
      ),
      // hexagon back
      ...buildQuad(
        [...p1, -ht1] as Point,
        [...p6, -ht2] as Point,
        [...p3, -ht2] as Point,
        [...p2, -ht1] as Point,
        this.normals,
        true
      ),
      ...buildQuad(
        [...p6, -ht2] as Point,
        [...p5, -ht1] as Point,
        [...p4, -ht1] as Point,
        [...p3, -ht2] as Point,
        this.normals,
        true
      ),
      // connector, top then clocwise
      ...buildQuad(
        [...p1, -ht1] as Point,
        [...p1,  ht1] as Point,
        [...p2,  ht1] as Point,
        [...p2, -ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p2, -ht1] as Point,
        [...p2,  ht1] as Point,
        [...p3,  ht2] as Point,
        [...p3, -ht2] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p3, -ht2] as Point,
        [...p3,  ht2] as Point,
        [...p4,  ht1] as Point,
        [...p4, -ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p4, -ht1] as Point,
        [...p4,  ht1] as Point,
        [...p5,  ht1] as Point,
        [...p5, -ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p5, -ht1] as Point,
        [...p5,  ht1] as Point,
        [...p6,  ht2] as Point,
        [...p6, -ht2] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p6, -ht2] as Point,
        [...p6,  ht2] as Point,
        [...p1,  ht1] as Point,
        [...p1, -ht1] as Point,
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

export default Chest;
