import WebGLWrapper, { UniformMatrix } from "./webglWrapper";
import Camera from "../camera";
import Light from "../light";
import { mat4 } from "../util/matrix";
import Node from "../object/index";

import {isMirrorMan} from "../object/cubeman";

class Scene extends WebGLWrapper {
  // Object, camera, and light used
  private _objects: Node[] = new Array();
  private _camera: Camera;
  private _light: Light;

  // Matrices used
  private transformMatrix: number[] = mat4.identity();
  private viewMatrix: number[] = mat4.identity();
  private projMatrix: number[] = mat4.orthographicProj();
  private worldMatrix: number[] = mat4.identity();

  // Use shading
  private useShading: 0 | 1;

  // Use texture
  private textureType: Texture;

  /*
   * Constructor
   */

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.applyTransformMatrix();
    this.applyViewMatrix();
    this.applyWorldMatrix();
    this.applyProjMatrix();

    this.setCamera(new Camera());
    this.setLight(new Light());
    this.setUseShading(true);

    this.setUseTexture(true);

    this.setProjection("perspective");
  }

  /*
   * Matrix helpers
   */

  public setProjection(projectionType: Projection) {
    switch (projectionType) {
      case "orthographic":
        this.projMatrix = mat4.orthographicProj();
        break;
      case "oblique":
        this.projMatrix = mat4.obliqueProj();
        break;
      case "perspective":
        this.projMatrix = mat4.perspectiveProj();
        break;
      default:
        throw `shape.setProjection: invalid projection type '${projectionType}'`;
    }
    this.applyProjMatrix();
  }

  public setProjMatrix(projMatrix: number[]) {
    this.projMatrix = projMatrix;
    this.applyProjMatrix();
  }

  public setViewMatrix(viewMatrix: number[]) {
    this.viewMatrix = viewMatrix;
    this.applyViewMatrix();
  }

  public setWorldMatrix(worldMatrix: number[]) {
    this.worldMatrix = worldMatrix;
    this.applyWorldMatrix();
  }

  private setTransformMatrix(transformMatrix: number[]) {
    this.transformMatrix = transformMatrix;
    this.applyTransformMatrix();
  }

  /*
   * Property getter and setter
   */

  public get camera() {
    return this._camera;
  }

  public setCamera(camera: Camera) {
    this._camera = camera;
    this._camera.positionChangedCallback = this.setViewMatrix.bind(this);
    this.viewMatrix = this._camera.viewMatrix;
    this.applyViewMatrix();
  }

  public get light() {
    return this._light;
  }

  public setLight(light: Light) {
    this._light = light;
    this._light.propertyChangedCallback = this.applyLightProperties.bind(this);
    this.applyLightProperties(this._light);
  }

  public setUseShading(useShading: boolean) {
    this.useShading = useShading ? 1 : 0;
    this.applyUseShading(useShading);
  }

  public setUseTexture(useTexture: boolean) {
    this.useTexture = useTexture ? 1 : 0;
    this.applyUseTexture(useTexture);
  }

  public get objects() {
    return this._objects;
  }

  public set objects(objects: Node[]) {
    this._objects = objects;
  }


  /*
   * Helper method to apply uniform matrix
   */

  private applyProjMatrix() {
    this.applyUniformMatrix4fv(UniformMatrix.PROJ, this.projMatrix);
  }

  private applyViewMatrix() {
    this.applyUniformMatrix4fv(UniformMatrix.VIEW, this.viewMatrix);
  }

  private applyWorldMatrix() {
    this.applyUniformMatrix4fv(UniformMatrix.WORLD, this.worldMatrix);
  }

  private applyTransformMatrix() {
    this.applyUniformMatrix4fv(UniformMatrix.TRANSFORM, this.transformMatrix);
  }


  /*
   * Add and clear object
   */

  private setCallbacks(object: Node) {
    object.materialChangedCallback = this.applyMaterialProperties.bind(this);
    object.transformMatrixChangedCallback = this.setTransformMatrix.bind(this);
    object.drawCallback = this.draw.bind(this);
    object.applyAttrCallback = this.applyAttributeVector.bind(this);
    object.useNormalMapCallback = this.applyUseNormalMap.bind(this);
    object.setTextureCallback = this.applyTexture.bind(this);

    if (object.child) this.setCallbacks(object.child);
    if (object.sibling) this.setCallbacks(object.sibling);
  }

  public add(object: Node, clearObjects: boolean = false) {
    if (clearObjects)
      this.clear();

    this.setCallbacks(object);
    this._objects.push(object);
  }

  public clear() {
    this._objects = new Array();
  }


  /*
   * Draw scene
   */

  public render() {
    // Draw all objects
    for (const object of this._objects) {
      // Traverse sibling and child of an object
      object.traverse();
    }
  }

  public animate(delta: number) {
    for (const object of this._objects) {
      // Animate each object
      if (isMirrorMan(object))
        object.animate(delta);
    }
  }
}

export default Scene;
