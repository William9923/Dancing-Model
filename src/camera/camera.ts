import { toCartesian } from "../util/convert";
import { mat4 } from "../util/matrix";

class Camera {
  // Camera properties
  // Position represented in spherical coordinate, target and up in cartesian
  private _position: Point;
  private _target: Point = [0, 0, 0];
  private _up: Point = [0, 1, 0];

  // Callback to be called when camera position changed
  private _positionChangedCallback: (viewMatrix: number[]) => void;

  // View matrix associated with this camera
  private _viewMatrix: number[] = mat4.identity();


  /*
   * Constructor
   */

  constructor(positionChangedCallback?: (viewMatrix: number[]) => void, position?: Point) {
    if (!!positionChangedCallback)
      this._positionChangedCallback = positionChangedCallback;
    this._position = position || [0, 0, 0];

    this._viewMatrix = mat4.lookAt(toCartesian(this._position) as Point, this._target, this._up);
  }


  /*
   * Property getter and setter
   */

  public set positionChangedCallback(callback: (viewMatrix: number[]) => void) {
    this._positionChangedCallback = callback;
  }

  public get position() {
    return this._position;
  }

  public setRadius(radius: number) {
    this._position[0] = radius;
    this.calculateViewMatrix();
  }

  public setTheta(theta: number) {
    this._position[1] = theta;
    this.calculateViewMatrix();
  }

  public setPhi(phi: number) {
    this._position[2] = phi;
    this.calculateViewMatrix();
  }

  public get viewMatrix() {
    return this._viewMatrix;
  }


  /*
   * Calculate view matrix
   */

  private calculateViewMatrix() {
    this._viewMatrix = mat4.lookAt(toCartesian(this._position) as Point, this._target, this._up);
    if (this._positionChangedCallback)
      this._positionChangedCallback(this._viewMatrix);
  }
}

export default Camera;
