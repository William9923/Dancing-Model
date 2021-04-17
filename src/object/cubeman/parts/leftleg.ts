import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import {mat4} from "../../../util/matrix";
import {buildCubePoints} from "../../utils/cubePoints";

class LeftLeg extends Node {
  constructor() {
    super();

    // this.setTransformation("rotate", [0, 0, -45]);  // y-rotate : 0-45, z-rotate : -45, 45
    // this.setTransformation("scale", [0.5, 0.2, 0.2]);
    // this.setTransformation("translate", [-0.25, 0.1, 0]);

    this.setInstanceMatrix(
      mat4.mMult(
        mat4.scale(0.175, 0.2 , 0.175),
        mat4.zRotation(0),
        // mat4.yRotation(0),
        // mat4.xRotation(0),
        mat4.translation(-0.125, -0.5, 0),
      ),
    );

    this.centralPoint = [-0.125, -0.4,0];
    
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
    this._transformMatrixChangedCallback!(mat4.multiply(this.instanceMatrix, baseTransformMatrix));

    // render each rectangle separately
    for (let i = 0; i < Math.floor(this.points.length / (this.dimension * 4)); i++) {
      this.draw(DrawMode.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}

export default LeftLeg;
