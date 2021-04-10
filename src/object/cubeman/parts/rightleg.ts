import Node from "../../node";
import DrawMode from "../../../util/drawMode";
import {mat4} from "../../../util/matrix";
import {buildCubePoints} from "../../utils/cubePoints";

class RightLeg extends Node {
  constructor() {
    
    super();
    this.setupPoints();

    // this.setTransformation("rotate", [0, 0, 45]);  // y-rotate : 0-45, z-rotate : -45, 45
    this.setTransformation("scale", [0.35, 0.5, 0.5]);
    this.setTransformation("translate", [0.15, -0.3, 0]);
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

export default RightLeg;
