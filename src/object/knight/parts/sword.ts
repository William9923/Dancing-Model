import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import { mat4 } from "../../../util/matrix";
import { buildQuad } from "../../utils/util";
import { buildCubePoints } from "../../utils/cubePoints";

const buildWrapper = (points: number[][], ht: number, normalArray: number[]) => {
  const out = [];
  for (let i = 0; i < points.length; i++) {
    out.push(...buildQuad(
      [...points[i], -ht],
      [...points[i], ht],
      [...points[(i + 1) % points.length], ht],
      [...points[(i + 1) % points.length], -ht],
      normalArray
    ));
  }
  return out;
}

class Sword extends Node {
  constructor() {
    super();

    // this.setTransformation("rotate", [0, 0, 0], true);

    // this.setInstanceMatrix(mat4.mMult(
      // mat4.scale(0.25, 0.5, 0.25),
      // mat4.zRotation(0),
      // mat4.yRotation(0),
      // mat4.xRotation(0),
      // mat4.translation(0.25, -1, 0),
    // ));

    // 0.25 = xtranslation
    // -0.25 = ytranslation + 1 / 2 * height
    // this.centralPoint = [0.25, -0.75, 0];

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
    // const pf4 = [];
    // const pf5 = [];
    // const pf6 = [];
    // const pf7 = [];

    // prettier-ignore
    this.points = [
      // F front-back
      ...buildQuad(
        [...pf4, ht3],
        [...pf7, ht3],
        [...pf6, ht3],
        [...pf5, ht3],
        this.normals
      ),
      ...buildQuad(
        [...pf4, -ht3],
        [...pf7, -ht3],
        [...pf6, -ht3],
        [...pf5, -ht3],
        this.normals,
        true
      ),
      // F connector front
      ...buildQuad(
        [...pf0, 0], [...pf4, ht3], [...pf5, ht3], [...pf1, 0],
        this.normals
      ),
      ...buildQuad(
        [...pf1, 0], [...pf5, ht3], [...pf6, ht3], [...pf2, 0],
        this.normals
      ),
      ...buildQuad(
        [...pf2, 0], [...pf6, ht3], [...pf7, ht3], [...pf3, 0],
        this.normals
      ),
      ...buildQuad(
        [...pf3, 0], [...pf7, ht3], [...pf4, ht3], [...pf0, 0],
        this.normals
      ),
      // F connector back
      ...buildQuad(
        [...pf0, 0], [...pf4, -ht3], [...pf5, -ht3], [...pf1, 0],
        this.normals, true
      ),
      ...buildQuad(
        [...pf1, 0], [...pf5, -ht3], [...pf6, -ht3], [...pf2, 0],
        this.normals, true
      ),
      ...buildQuad(
        [...pf2, 0], [...pf6, -ht3], [...pf7, -ht3], [...pf3, 0],
        this.normals, true
      ),
      ...buildQuad(
        [...pf3, 0], [...pf7, -ht3], [...pf4, -ht3], [...pf0, 0],
        this.normals, true
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
      // A front
      ...buildQuad(
        [...pa8, ht1],
        [...pa7, ht1],
        [...pa6, ht1],
        [...pa9, ht1],
        this.normals
      ),
      ...buildQuad(
        [...pa9, ht1],
        [...pa6, ht1],
        [...pa5, ht1],
        [...pa0, ht1],
        this.normals
      ),
      ...buildQuad(
        [...pa0, ht1],
        [...pa5, ht1],
        [...pa4, ht1],
        [...pa1, ht1],
        this.normals
      ),
      ...buildQuad(
        [...pa1, ht1],
        [...pa4, ht1],
        [...pa3, ht1],
        [...pa2, ht1],
        this.normals
      ),
      // A back
      ...buildQuad(
        [...pa8, -ht1],
        [...pa7, -ht1],
        [...pa6, -ht1],
        [...pa9, -ht1],
        this.normals,
        true
      ),
      ...buildQuad(
        [...pa9, -ht1],
        [...pa6, -ht1],
        [...pa5, -ht1],
        [...pa0, -ht1],
        this.normals,
        true
      ),
      ...buildQuad(
        [...pa0, -ht1],
        [...pa5, -ht1],
        [...pa4, -ht1],
        [...pa1, -ht1],
        this.normals,
        true
      ),
      ...buildQuad(
        [...pa1, -ht1],
        [...pa4, -ht1],
        [...pa3, -ht1],
        [...pa2, -ht1],
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
        [...pb0, ht2],
        [...pb3, ht2],
        [...pb2, ht2],
        [...pb1, ht2],
        this.normals
      ),
      // B back
      ...buildQuad(
        [...pb0, -ht2],
        [...pb3, -ht2],
        [...pb2, -ht2],
        [...pb1, -ht2],
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
        [...pd0, ht1],
        [...pd3, ht1],
        [...pd2, ht1],
        [...pd1, ht1],
        this.normals
      ),
      // D back
      ...buildQuad(
        [...pd0, -ht1],
        [...pd3, -ht1],
        [...pd2, -ht1],
        [...pd1, -ht1],
        this.normals,
        true
      ),
      // D connector
      ...buildWrapper(
        [pd0, pd1, pd2, pd3],
        ht1,
        this.normals
      ),
    ];

    this.euy = 0;
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    // this.setTransformation("rotate", [0, 0, this.euy], true);
    this.euy = (this.euy - 1) % 90;

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
