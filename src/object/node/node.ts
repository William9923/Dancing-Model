import { mat4 } from "../../util/matrix";
import { AttributeVector } from "../../scene/webglWrapper";

type materialChangedCallbackType = (object: Node) => void;
type transformMatrixChangedCallbackType = (transformMatrix: number[]) => void;
type drawCallbackType = (mode: number, startingIdx: number, size: number) => void;
type applyAttrCallbackType = (label: AttributeVector, vectorData: number[], dimension: number) => void;

abstract class Node {
  // Node properties
  protected dimension: number = 3;
  protected points: number[] = [];
  protected normals: number[] = [];

  // Material properties
  protected Kd: number[] = [1.0, 1.0, 1.0];
  protected Ks: number[] = [1.0, 1.0, 1.0];
  protected Ka: number[] = [0.25, 0.25, 0.25];
  protected shininess: number = 100;

  // Object transformations
  protected translate: Point = [0, 0, 0];
  protected rotate: Point = [0, 0, 0];
  protected scale: Point = [1, 1, 1];

  // Transformation matrices used
  protected baseTransformMatrix: number[] = mat4.identity();
  protected transformMatrix: number[] = mat4.identity();

  // Callback methods
  private _materialChangedCallback: materialChangedCallbackType = null;
  private _transformMatrixChangedCallback: transformMatrixChangedCallbackType = null;
  private _drawCallback: drawCallbackType = null;
  private _applyAttrCallback: applyAttrCallbackType = null;

  constructor(program: WebGLProgram, baseTransformMatrix: number[]) {
    this.baseTransformMatrix = baseTransformMatrix || mat4.identity();
  }

  public setTransformation(transformationType: Transformation, newArr: Point) {
    switch (transformationType) {
      case "rotate":
        this.rotate = newArr;
        break;
      case "scale":
        this.scale = newArr;
        break;
      case "translate":
        this.translate = newArr;
        break;
      default:
        throw `shape.setTransformation: invalid transformation type '${transformationType}'`;
    }
    this.calculateTransformMatrix();
  }

  public getTransformation(transformationType: Transformation) {
    switch (transformationType) {
      case "rotate":
        return this.rotate;
      case "scale":
        return this.scale;
      case "translate":
        return this.translate;
      default:
        throw `shape.getTransformation: invalid transformation type '${transformationType}'`;
    }
  }

  protected calculateTransformMatrix() {
    this.transformMatrix = mat4.mMult(
      mat4.xRotation(this.rotate[0]),
      mat4.yRotation(this.rotate[1]),
      mat4.zRotation(this.rotate[2]),
      mat4.scale(...this.scale),
      mat4.translation(...this.translate),
    );

    if (this._transformMatrixChangedCallback)
      this._transformMatrixChangedCallback(this.transformMatrix);
  }

  public setPhongProperties() {
    if (this._materialChangedCallback)
      this._materialChangedCallback(this);
  }

  public setPoints(...points: number[]) {
    this.points = points;
  }

  public setNormals(...normals: number[]) {
    this.normals = normals;
  }

  public changePosition(vertexData: number[]) {
    if (this._applyAttrCallback)
      this._applyAttrCallback(AttributeVector.POSITION, vertexData, this.dimension);
  }

  public changeNormal(normalData: number[]) {
    if (this._applyAttrCallback)
      this._applyAttrCallback(AttributeVector.NORMAL, normalData, this.dimension);
  }

  public draw(mode: number, startingIdx: number, size: number) {
    if (this._drawCallback)
      this._drawCallback(mode, startingIdx, size);
  }


  /*
   * Setter and getter
   */

  public set materialChangedCallback(callback: materialChangedCallbackType) {
    this._materialChangedCallback = callback;
  }

  public set transformMatrixChangedCallback(callback: transformMatrixChangedCallbackType) {
    this._transformMatrixChangedCallback = callback;
  }

  public set drawCallback(callback: drawCallbackType) {
    this._drawCallback = callback;
  }

  public set applyAttrCallback(callback: applyAttrCallbackType) {
    this._applyAttrCallback = callback;
  }


  /*
   * Abstract methods
   */

  public abstract setupPoints(): void;

  public abstract render(): void;

  public abstract sibling(): Node | null;  // next sibling

  public abstract child(): Node | null;  // child of this node
}

export default Node;
