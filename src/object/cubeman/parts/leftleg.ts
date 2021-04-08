import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import {mat4} from "../../../util/matrix";
import {buildCubePoints} from "../../utils/cubePoints";

class LeftLeg extends Node {
  constructor() {

    const translation = mat4.translation(-2,-1,0);
    const scaling = mat4.scale(0.1, 0.5, 0.2);

    const xRotation = mat4.xRotation(0);
    const yRotation = mat4.yRotation(0);
    const zRotation = mat4.zRotation(-45);

    super(mat4.mMult(translation, scaling, xRotation, yRotation, zRotation));
    this.setupPoints();


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
