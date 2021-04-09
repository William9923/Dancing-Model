import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import {mat4} from "../../../util/matrix";
import {buildCubePoints} from "../../utils/cubePoints";

class LeftLeg extends Node {
  constructor() {

    // const translation = mat4.translation(-0.15, 0.05, -0.05);
    // const xRotation = mat4.xRotation(-180);
    // const yRotation = mat4.yRotation(0);
    // const zRotation = mat4.zRotation(60);
    // const scale = mat4.scale(0.35, 0.5, 0.5);
    // super(mat4.mMult(scale, zRotation, yRotation,xRotation, translation));

    // this.setupPoints();

    super();
    this.setupPoints();

    this.setTransformation("rotate", [0, 0, -45]);  // y-rotate : 0-45, z-rotate : -45, 45
    this.setTransformation("scale", [0.35, 0.5, 0.5]);
    this.setTransformation("translate", [-0.15, -0.3, 0]);
  }

  // override
  public setupPoints() {
    this.normals = [];
    this.points = buildCubePoints(this.normals);
  }

  // override
  public render(baseTransformMatrix: number[] = mat4.identity()) {
    this.applyMaterialProperties();
    this.applyPosition();
    this.applyNormal();
    this._transformMatrixChangedCallback!(baseTransformMatrix);

    // render each rectangle separately
    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default LeftLeg;
