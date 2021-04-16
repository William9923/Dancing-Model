import { vec } from "../../util/vector";
import { mat4 } from "../../util/matrix";
import { AttributeVector } from "../../scene/webglWrapper";

type materialChangedCallbackType = (object: Node) => void;
type transformMatrixChangedCallbackType = (transformMatrix: number[]) => void;
type drawCallbackType = (mode: number, startingIdx: number, size: number) => void;
type applyAttrCallbackType = (label: AttributeVector, vectorData: number[], dimension: number) => void;
type useNormalMapCallbackType = (useNormalMap: boolean) => void;
type setTextureCallbackType = (textureType: string) => void;

abstract class Node {
  // Node properties
  protected dimension: number = 3;
  protected points: number[] = [];
  protected normals: number[] = [];

  // Material properties
  public Kd: number[] = [1.0, 1.0, 1.0];
  public Ks: number[] = [1.0, 1.0, 1.0];
  public Ka: number[] = [0.25, 0.25, 0.25];
  public shininess: number = 100;

  // Object transformations
  protected translate: Point = [0, 0, 0];
  protected rotate: Point = [0, 0, 0];
  protected scale: Point = [1, 1, 1];

  // Transformation matrices used
  protected instanceMatrix: number[] = mat4.identity();
  protected transformMatrix: number[];
  protected centralPoint: Point = [0, 0, 0];

  // Tree properties
  protected _sibling: Node;
  protected _child: Node;

  // Callback methods
  protected _materialChangedCallback: materialChangedCallbackType | null = null;
  protected _transformMatrixChangedCallback: transformMatrixChangedCallbackType | null = null;
  protected _drawCallback: drawCallbackType | null = null;
  protected _applyAttrCallback: applyAttrCallbackType | null = null;
  protected _useNormalMapCallback: useNormalMapCallbackType | null = null;
  protected _setTextureCallback: setTextureCallbackType | null = null;


  /*
   * Constructor
   */

  constructor(transformMatrix: number[] = mat4.identity(), sibling: Node | null = null,
              child: Node | null = null) {
    this.transformMatrix = transformMatrix;

    if (!!sibling)
      this._sibling = sibling;

    if (!!child)
      this._child = child;
  }

  /*
   * Transformation methods
   */

  public setTransformation(transformationType: Transformation, newArr: Point,
                           useCustomCentral: boolean = false) {
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
    this.calculateTransformMatrix(useCustomCentral);
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

  protected calculateTransformMatrix(useCustomCentral: boolean = false) {
    if (useCustomCentral) {
      this.transformMatrix = mat4.mMult(
        mat4.translation(...vec.mul(-1, this.centralPoint)),
        mat4.scale(...this.scale),
        mat4.zRotation(this.rotate[2]),
        mat4.yRotation(this.rotate[1]),
        mat4.xRotation(this.rotate[0]),
        mat4.translation(...this.translate),
        mat4.translation(...this.centralPoint),
      );
    } else {
      this.transformMatrix = mat4.mMult(
        mat4.scale(...this.scale),
        mat4.zRotation(this.rotate[2]),
        mat4.yRotation(this.rotate[1]),
        mat4.xRotation(this.rotate[0]),
        mat4.translation(...this.translate),
      );
    }
  }


  /*
   * Setter and getter
   */

  public setPoints(...points: number[]) {
    this.points = points;
  }

  public setNormals(...normals: number[]) {
    this.normals = normals;
  }

  public setInstanceMatrix(instanceMatrix: number[]) {
    this.instanceMatrix = instanceMatrix;
  }

  public setCentralPoint(centralPoint: Point) {
    this.centralPoint = centralPoint;
  }

  public get sibling() {
    return this._sibling;
  }

  public set sibling(sibling: Node) {
    this._sibling = sibling;
  }

  public get child() {
    return this._child;
  }

  public set child(child: Node) {
    this._child = child;
  }

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

  public set useNormalMapCallback(callback: useNormalMapCallbackType) {
    this._useNormalMapCallback = callback;
  }

  public set setTextureCallback(callback: setTextureCallbackType) {
    this._setTextureCallback = callback;
  }


  /*
   * Webgl apply helpers
   */

  public applyMaterialProperties() {
    if (this._materialChangedCallback)
      this._materialChangedCallback(this);
  }

  public applyPosition() {
    if (this._applyAttrCallback)
      this._applyAttrCallback(AttributeVector.POSITION, this.points, this.dimension);
  }

  public applyNormal() {
    if (this._applyAttrCallback)
      this._applyAttrCallback(AttributeVector.NORMAL, this.normals, this.dimension);
  }


  /*
   * gl.drawArrays wrapper
   */

  public draw(mode: number, startingIdx: number, size: number) {
    if (this._drawCallback)
      this._drawCallback(mode, startingIdx, size);
  }


  /*
   * Traverse tree and render each node
   */

  public traverse(baseTransformMatrix: number[] = mat4.identity()) {
    // TODO: fully migrate to new order
    // const transformMatrix = mat4.multiply(baseTransformMatrix, this.transformMatrix);
    const transformMatrix = mat4.multiply(this.transformMatrix, baseTransformMatrix);

    this.render(transformMatrix);
    this.child?.traverse(transformMatrix);
    this.sibling?.traverse(baseTransformMatrix);
  }


  /*
   * Abstract methods
   */

  public abstract setupPoints(): void;

  public abstract render(baseTransformMatrix: number[]): void;

}

export default Node;
