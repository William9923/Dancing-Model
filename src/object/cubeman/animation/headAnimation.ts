import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

class HeadMirrorManAnimation implements IMirrorManAnimation {
  private _headSpeed: number;
  private _shoulderSpeed:number;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck:number;

  constructor(speed: number) {
    this._headSpeed = speed;
    this._shoulderSpeed = speed;
    this._started = false;
    this._lastCheck = 0;
  }

  public set speed(speed: number) {
    this._headSpeed = speed;
    this._shoulderSpeed = speed;
  }

  public doAnimation(delta: number, obj: MirrorMan) {

    this.validateAndReset(obj);

    // Get Data
    const rotation = obj.head.getTransformation("rotate");
    const [x, y, z] = rotation;

    const shoulderRotation = obj.ls.getTransformation("rotate");
    const [x_shoulder, y_shoulder, z_shoulder] = shoulderRotation;
   
    // Check Direction
  
    this.updateDirection(y, delta);
    const direction = this._reverse ? -1 : 1;

    // Calculate New Angle
    const newAngle = y + this._headSpeed * delta * direction;
    const shoulderNewAngle = x_shoulder + this._shoulderSpeed * delta * direction;
    

    // Implement Angle
    obj.moveHead(newAngle);
    obj.moveLeftShoulder(shoulderNewAngle);
    obj.moveRightShoulder(-1 * shoulderNewAngle);
  }

  private updateDirection(headAngle: number, delta: number) {

    if (headAngle >= 30 && delta != this._lastCheck) {
      this._reverse = true;
    }

    else if (headAngle <= -30 && delta != this._lastCheck) {
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      // Reset current movement
      this._started = !this._started;
    }
  }
}

export default HeadMirrorManAnimation;
