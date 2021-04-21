import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";

class Shield extends Node {
  constructor() {
    super();

    this.setInstanceMatrix(mat4.mMult(
      mat4.scale(0.8, 0.8, 0.8),
      mat4.zRotation(90),
      mat4.yRotation(90),
      mat4.translation(0.6, -0.1, -0.2)
    ));

    this.centralPoint = [0, 0, 0];

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
        [...p1, ht] as Point,
        [...p4, ht] as Point,
        [...p3, ht] as Point,
        [...p2, ht] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p1, ht] as Point,
        [...p6, ht] as Point,
        [...p5, ht] as Point,
        [...p4, ht] as Point,
        this.normals
      ),
      // pentagon back
      ...buildQuad(
        [...p1, -ht] as Point,
        [...p4, -ht] as Point,
        [...p3, -ht] as Point,
        [...p2, -ht] as Point,
        this.normals,
        true
      ),
      ...buildQuad(
        [...p1, -ht] as Point,
        [...p6, -ht] as Point,
        [...p5, -ht] as Point,
        [...p4, -ht] as Point,
        this.normals,
        true
      ),
      // connector, from p1 then clocwise
      ...buildQuad(
        [...p1, -ht] as Point,
        [...p1, ht] as Point,
        [...p2, ht] as Point,
        [...p2, -ht] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p2, -ht] as Point,
        [...p2, ht] as Point,
        [...p3, ht] as Point,
        [...p3, -ht] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p3, -ht] as Point,
        [...p3, ht] as Point,
        [...p4, ht] as Point,
        [...p4, -ht] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p4, -ht] as Point,
        [...p4, ht] as Point,
        [...p5, ht] as Point,
        [...p5, -ht] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p5, -ht] as Point,
        [...p5, ht] as Point,
        [...p6, ht] as Point,
        [...p6, -ht] as Point,
        this.normals
      ),
      ...buildQuad(
        [...p6, -ht] as Point,
        [...p6, ht] as Point,
        [...p1, ht] as Point,
        [...p1, -ht] as Point,
        this.normals
      ),
    ];
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this._useNormalMapCallback!(true);

    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(mat4.multiply(this.instanceMatrix, baseTransformMatrix));

    // render each rectangle separately
    // front shield
    for (let i = 0; i < 2; i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }

    this._useNormalMapCallback!(false);

    // other parts
    for (let i = 2; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default Shield;
