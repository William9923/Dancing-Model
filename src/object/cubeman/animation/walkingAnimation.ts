import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class WalkMirrorManAnimation implements IMirrorManAnimation {
  private _walkingSpeed: number;
  private _headSpeed: number;
  private _handSpeed: number;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck: number;

  constructor(speed: number) {
    this._walkingSpeed = speed;
    this._headSpeed = speed * 0.2;
    this._handSpeed = speed * 0.75;
    this._started = false;
    this._lastCheck = 0;
  }

  public set speed(speed: number) {
    this._walkingSpeed = speed;
    this._headSpeed = speed * 0.2;
    this._handSpeed = speed * 0.75;
  }

  public doAnimation(delta: number, obj: MirrorMan) {
    // Reset for first time
    this.validateAndReset(obj);

    // Get data
    const leftLegRotation = obj.ll.getTransformation("rotate")[X];
    const rightLegRotation = obj.rl.getTransformation("rotate")[X];

    const leftHipRotation = obj.lh.getTransformation("rotate")[X];
    const rightHipRotation = obj.rh.getTransformation("rotate")[X];

    const leftShoulderRotation = obj.ls.getTransformation("rotate")[X];
    const rightShoulderRotation = obj.rs.getTransformation("rotate")[X];

    const headRotation = obj.head.getTransformation("rotate")[Y];

    // Check direction
    this.updateDirection(obj, leftHipRotation, delta);

    const direction = this._reverse ? -1 : 1;

    // Calculate new angle
    const newAngleLeft = leftLegRotation + this._walkingSpeed * delta * direction;
    const newAngleRight = rightLegRotation + this._walkingSpeed * delta * direction * -1;

    const newHipAngleLeft = leftHipRotation + this._walkingSpeed * delta * direction;
    const newHipAngleRight = rightHipRotation + this._walkingSpeed * delta * direction * -1;

    const newShoulderAngleLeft = leftShoulderRotation + this._handSpeed * delta * direction;
    const newShoulderAngleRigth = rightShoulderRotation + this._handSpeed * delta * direction * -1;

    const newHeadAngle = headRotation + this._headSpeed * delta * direction;

    // Apply new angle
    obj.moveLeftShoulder(newShoulderAngleLeft);
    obj.moveRightShoulder(newShoulderAngleRigth);

    obj.moveLeftHips(newHipAngleLeft);
    obj.moveRightHips(newHipAngleRight);

    obj.moveLeftLeg(Math.max(0, newAngleLeft));
    obj.moveRightLeg(Math.max(0, newAngleRight));

    obj.moveHead(newHeadAngle);
  }

  private updateDirection(obj: MirrorMan, footAngle: number, delta: number) {
    if (footAngle > 30 && delta != this._lastCheck && !this._reverse) {
      this.resetDirection(obj, this._reverse);
      this._reverse = true;
    } else if (footAngle < -30 && delta != this._lastCheck && this._reverse) {
      this.resetDirection(obj, this._reverse);
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      obj.moveLeftShoulder(0);
      obj.moveRightShoulder(0);
      obj.moveLeftHips(0);
      obj.moveRightHips(0);
      obj.moveLeftLeg(0);
      obj.moveRightLeg(0);
      this._started = !this._started;
    }
  }

  private resetDirection(obj: MirrorMan, reversed: boolean) {
    if (reversed) {
      obj.moveLeftShoulder(-22.5);
      obj.moveRightShoulder(-22.5);
      obj.moveLeftHips(-30);
      obj.moveRightHips(-30);
      obj.moveLeftLeg(0);
      obj.moveRightLeg(0);
      obj.moveHead(-6);
    } else {
      obj.moveLeftShoulder(22.5);
      obj.moveRightShoulder(22.5);
      obj.moveLeftHips(30);
      obj.moveRightHips(30);
      obj.moveLeftLeg(0);
      obj.moveRightLeg(0);
      obj.moveHead(6);
    }
  }
}

export default WalkMirrorManAnimation;
