import WebGLWrapper, { UniformMatrix } from "./webglWrapper";
import Camera from "../camera";
import Light from "../light";
import { toCartesian } from "../util/convert";
import { mat4 } from "../util/matrix";

class Scene extends WebGLWrapper {
  // Object, camera, and light used
  private _objects: Object[] = new Array();
  private _camera: Camera;
  private _light: Light;

  // Matrices used
  private transformMatrix: number[] = mat4.identity();
  private viewMatrix: number[] = mat4.identity();
  private projMatrix: number[] = mat4.orthographicProj();
  private worldMatrix: number[] = mat4.identity();

  // Use shading
  private useShading: 0 | 1;


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

  private setProjMatrix(projMatrix: number[]) {
    this.projMatrix = projMatrix;
    this.applyProjMatrix();
  }

  private setViewMatrix(viewMatrix: number[]) {
    this.viewMatrix = viewMatrix;
    this.applyViewMatrix();
  }

  private setWorldMatrix(worldMatrix: number[]) {
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
   * Add object
   */

  public add(object: Object) {
    const { gl, program } = this;
    object.setGl(gl);
    object.setProgram(program);
    this._objects.push(object);
  }


  /*
   * Draw scene
   */

  public render() {
    const gl = this.gl;

    // TODO: traverse objects to be drawn
    this._objects[0].render();
  }
}

export default Scene;
