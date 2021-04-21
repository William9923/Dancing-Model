import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";

const buildWrapper = (points: number[][], ht: number, normalArray: number[]) => {
  const out = [];
  for (let i = 0; i < points.length; i++) {
    out.push(...buildQuad(
      [...points[i], -ht] as Point,
      [...points[i], ht] as Point,
      [...points[(i + 1) % points.length], ht] as Point,
      [...points[(i + 1) % points.length], -ht] as Point,
      normalArray
    ));
  }
  return out;
}

class Sword extends Node {
  constructor() {
    super();

    this.setInstanceMatrix(mat4.mMult(
      mat4.scale(0.8, 0.8, 0.8),
      // mat4.zRotation(0),
      mat4.yRotation(90),
      mat4.xRotation(90),
      mat4.translation(-0.45, -0.2, 0.51),
    ));

    this.setupPoints();
  }

  // override
  public setupPoints() {
    // empty the normals array
    this.normals = [];

    // constants used as reference

    // half thickness
    const ht1 = 0.05;
    const ht2 = 0.035;
    const ht3 = 0.0275;

    // A
    //         0
    //   8   /   \   2
    // 7   9   5   1   3
    //   \   /   \   /
    //     6       4
    const pa0 = [0, -0.176];
    const pa1 = [0.188, -0.36];
    const pa2 = [0.24, -0.312];
    const pa3 = [0.296, -0.36];
    const pa4 = [0.188, -0.472];
    const pa5 = [0, -0.288];
    const pa6 = [-0.188, -0.472];
    const pa7 = [-0.296, -0.36];
    const pa8 = [-0.24, -0.312];
    const pa9 = [-0.188, -0.36];

    // B
    //   0
    // 3   1
    //   2
    const pb0 = [0, -0.288];
    const pb1 = [0.136, -0.416];
    const pb2 = [0, -0.552];
    const pb3 = [-0.136, -0.416];

    // C
    // handle (x, z)
    // from front edge
    const pc0 = [0, 0.035];
    const pc1 = [0.05, 0];
    const pc2 = [0, -0.035];
    const pc3 = [-0.05, 0];
    const pcyt = -0.416;
    const pcyb = -0.800;

    // D
    //   0
    // 3   1
    //   2
    const pd0 = [0, -0.737];
    const pd1 = [0.108, -0.840];
    const pd2 = [0, -0.952];
    const pd3 = [-0.108, -0.840];

    // E
    // blade (x, z)
    // (top view, 0 is back)
    //   0  1
    // 5      2
    //   4  3
    const pe0 = [-0.056, -ht3];
    const pe1 = [0.056, -ht3];
    const pe2 = [0.096, 0];
    const pe3 = [0.056, ht3];
    const pe4 = [-0.056, ht3];
    const pe5 = [-0.096, 0];
    const peyt = 0.768;
    const peyb = -0.288;

    // F
    // blade tip
    //     0
    //   / 4 \
    // 3 7   5 1
    //   \ 6 /
    //     2
    const pf0 = [0, 0.981];
    const pf1 = [0.130, 0.808];
    const pf2 = [0, 0.635];
    const pf3 = [-0.130, 0.808];
    const pf4 = [0, 0.928];
    const pf5 = [0.090, 0.808];
    const pf6 = [0, 0.688];
    const pf7 = [-0.090, 0.808];

    // prettier-ignore
    this.points = [
      // A front
      ...buildQuad(
        [...pa8, ht1] as Point,
        [...pa7, ht1] as Point,
        [...pa6, ht1] as Point,
        [...pa9, ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pa9, ht1] as Point,
        [...pa6, ht1] as Point,
        [...pa5, ht1] as Point,
        [...pa0, ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pa0, ht1] as Point,
        [...pa5, ht1] as Point,
        [...pa4, ht1] as Point,
        [...pa1, ht1] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pa1, ht1] as Point,
        [...pa4, ht1] as Point,
        [...pa3, ht1] as Point,
        [...pa2, ht1] as Point,
        this.normals
      ),
      // A back
      ...buildQuad(
        [...pa8, -ht1] as Point,
        [...pa7, -ht1] as Point,
        [...pa6, -ht1] as Point,
        [...pa9, -ht1] as Point,
        this.normals,
        true
      ),
      ...buildQuad(
        [...pa9, -ht1] as Point,
        [...pa6, -ht1] as Point,
        [...pa5, -ht1] as Point,
        [...pa0, -ht1] as Point,
        this.normals,
        true
      ),
      ...buildQuad(
        [...pa0, -ht1] as Point,
        [...pa5, -ht1] as Point,
        [...pa4, -ht1] as Point,
        [...pa1, -ht1] as Point,
        this.normals,
        true
      ),
      ...buildQuad(
        [...pa1, -ht1] as Point,
        [...pa4, -ht1] as Point,
        [...pa3, -ht1] as Point,
        [...pa2, -ht1] as Point,
        this.normals,
        true
      ),
      // A connector
      ...buildWrapper(
        [pa0, pa1, pa2, pa3, pa4, pa5, pa6, pa7, pa8, pa9],
        ht1,
        this.normals
      ),
      // B front
      ...buildQuad(
        [...pb0, ht2] as Point,
        [...pb3, ht2] as Point,
        [...pb2, ht2] as Point,
        [...pb1, ht2] as Point,
        this.normals
      ),
      // B back
      ...buildQuad(
        [...pb0, -ht2] as Point,
        [...pb3, -ht2] as Point,
        [...pb2, -ht2] as Point,
        [...pb1, -ht2] as Point,
        this.normals,
        true
      ),
      // B connector
      ...buildWrapper(
        [pb0, pb1, pb2, pb3],
        ht2,
        this.normals
      ),
      // C
      ...buildQuad(
        [pc0[0], pcyt, pc0[1]],
        [pc0[0], pcyb, pc0[1]],
        [pc1[0], pcyb, pc1[1]],
        [pc1[0], pcyt, pc1[1]],
        this.normals
      ),
      ...buildQuad(
        [pc1[0], pcyt, pc1[1]],
        [pc1[0], pcyb, pc1[1]],
        [pc2[0], pcyb, pc2[1]],
        [pc2[0], pcyt, pc2[1]],
        this.normals
      ),
      ...buildQuad(
        [pc2[0], pcyt, pc2[1]],
        [pc2[0], pcyb, pc2[1]],
        [pc3[0], pcyb, pc3[1]],
        [pc3[0], pcyt, pc3[1]],
        this.normals
      ),
      ...buildQuad(
        [pc3[0], pcyt, pc3[1]],
        [pc3[0], pcyb, pc3[1]],
        [pc0[0], pcyb, pc0[1]],
        [pc0[0], pcyt, pc0[1]],
        this.normals
      ),
      // D front
      ...buildQuad(
        [...pd0, ht1] as Point,
        [...pd3, ht1] as Point,
        [...pd2, ht1] as Point,
        [...pd1, ht1] as Point,
        this.normals
      ),
      // D back
      ...buildQuad(
        [...pd0, -ht1] as Point,
        [...pd3, -ht1] as Point,
        [...pd2, -ht1] as Point,
        [...pd1, -ht1] as Point,
        this.normals,
        true
      ),
      // D connector
      ...buildWrapper(
        [pd0, pd1, pd2, pd3],
        ht1,
        this.normals
      ),
      // E
      ...buildQuad(
        [pe0[0], peyt, pe0[1]],
        [pe1[0], peyt, pe1[1]],
        [pe1[0], peyb, pe1[1]],
        [pe0[0], peyb, pe0[1]],
        this.normals
      ),
      ...buildQuad(
        [pe1[0], peyt, pe1[1]],
        [pe2[0], peyt, pe2[1]],
        [pe2[0], peyb, pe2[1]],
        [pe1[0], peyb, pe1[1]],
        this.normals
      ),
      ...buildQuad(
        [pe2[0], peyt, pe2[1]],
        [pe3[0], peyt, pe3[1]],
        [pe3[0], peyb, pe3[1]],
        [pe2[0], peyb, pe2[1]],
        this.normals
      ),
      ...buildQuad(
        [pe3[0], peyt, pe3[1]],
        [pe4[0], peyt, pe4[1]],
        [pe4[0], peyb, pe4[1]],
        [pe3[0], peyb, pe3[1]],
        this.normals
      ),
      ...buildQuad(
        [pe4[0], peyt, pe4[1]],
        [pe5[0], peyt, pe5[1]],
        [pe5[0], peyb, pe5[1]],
        [pe4[0], peyb, pe4[1]],
        this.normals
      ),
      ...buildQuad(
        [pe5[0], peyt, pe5[1]],
        [pe0[0], peyt, pe0[1]],
        [pe0[0], peyb, pe0[1]],
        [pe5[0], peyb, pe5[1]],
        this.normals
      ),
      // F front-back
      ...buildQuad(
        [...pf4, ht3] as Point,
        [...pf7, ht3] as Point,
        [...pf6, ht3] as Point,
        [...pf5, ht3] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pf4, -ht3] as Point,
        [...pf7, -ht3] as Point,
        [...pf6, -ht3] as Point,
        [...pf5, -ht3] as Point,
        this.normals,
        true
      ),
      // F connector front
      ...buildQuad(
        [...pf0, 0] as Point,
        [...pf4, ht3] as Point,
        [...pf5, ht3] as Point,
        [...pf1, 0] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pf1, 0] as Point,
        [...pf5, ht3] as Point,
        [...pf6, ht3] as Point,
        [...pf2, 0] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pf2, 0] as Point,
        [...pf6, ht3] as Point,
        [...pf7, ht3] as Point,
        [...pf3, 0] as Point,
        this.normals
      ),
      ...buildQuad(
        [...pf3, 0] as Point,
        [...pf7, ht3] as Point,
        [...pf4, ht3] as Point,
        [...pf0, 0] as Point,
        this.normals
      ),
      // F connector back
      ...buildQuad(
        [...pf0, 0] as Point,
        [...pf4, -ht3] as Point,
        [...pf5, -ht3] as Point,
        [...pf1, 0] as Point,
        this.normals, true
      ),
      ...buildQuad(
        [...pf1, 0] as Point,
        [...pf5, -ht3] as Point,
        [...pf6, -ht3] as Point,
        [...pf2, 0] as Point,
        this.normals, true
      ),
      ...buildQuad(
        [...pf2, 0] as Point,
        [...pf6, -ht3] as Point,
        [...pf7, -ht3] as Point,
        [...pf3, 0] as Point,
        this.normals, true
      ),
      ...buildQuad(
        [...pf3, 0] as Point,
        [...pf7, -ht3] as Point,
        [...pf4, -ht3] as Point,
        [...pf0, 0] as Point,
        this.normals, true
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

export default Sword;
