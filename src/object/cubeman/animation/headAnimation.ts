import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class HeadMirrorManAnimation implements IMirrorManAnimation {
  private _headSpeed: number;
  private _shoulderSpeed: number;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck: number;

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
    const rotation = obj.head.getTransformation("rotate")[Y];
    const shoulderRotation = obj.ls.getTransformation("rotate")[X];

    // Check Direction

    this.updateDirection(obj, rotation, delta);
    const direction = this._reverse ? -1 : 1;

    // Calculate New Angle
    const newAngle = rotation + this._headSpeed * delta * direction;
    const shoulderNewAngle = shoulderRotation + this._shoulderSpeed * delta * direction;

    // Implement Angle
    obj.moveHead(newAngle);
    obj.moveLeftShoulder(shoulderNewAngle);
    obj.moveRightShoulder(-1 * shoulderNewAngle);
  }

  private updateDirection(obj: MirrorMan, headAngle: number, delta: number) {
    if (headAngle > 30 && delta != this._lastCheck && !this._reverse) {
      this.resetDirection(obj, this._reverse);
      this._reverse = true;
    } else if (headAngle < -30 && delta != this._lastCheck && this._reverse) {
      this.resetDirection(obj, this._reverse);
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      // Reset current movement
      obj.moveHead(0);
      obj.moveLeftArm(-60);
      obj.moveRightArm(-60);
      this._started = !this._started;
    }
  }

  private resetDirection(obj: MirrorMan, reversed: boolean) {
    if (reversed) {
      obj.moveHead(30);
      obj.moveLeftShoulder(30);
      obj.moveRightShoulder(-1 * 30);
    } else {
      obj.moveHead(-30);
      obj.moveLeftShoulder(-30);
      obj.moveRightShoulder(-1 * -30);
    }
  }
}

export default HeadMirrorManAnimation;
