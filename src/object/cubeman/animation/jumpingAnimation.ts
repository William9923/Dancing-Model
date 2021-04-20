import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class JumpMirrorManAnimation implements IMirrorManAnimation {
  private _jumpSpeed: number;
  private _handSpeed: number;
  private _legSpeed: number;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck: number;

  constructor(speed: number) {
    this._legSpeed = speed;
    this._handSpeed = speed * 2;
    this._jumpSpeed = speed * 0.125;

    this._started = false;
    this._lastCheck = 0;
  }

  public set speed(speed: number) {
    this._legSpeed = speed;
    this._handSpeed = speed * 2;
    this._jumpSpeed = speed * 0.125;
  }

  public doAnimation(delta: number, obj: MirrorMan) {
    // Reset for first time
    this.validateAndReset(obj);

    // Get data
    const leftLegRotation = obj.ll.getTransformation("rotate")[X];
    const rightLegRotation = obj.rl.getTransformation("rotate")[X];

    const leftHipRotation = obj.lh.getTransformation("rotate")[X];
    const rightHipRotation = obj.rh.getTransformation("rotate")[X];

    const leftArmRotation = obj.la.getTransformation("rotate")[X];
    const rightArmRotation = obj.ra.getTransformation("rotate")[X];

    const bodyTranslation = obj.getTransformation("translate")[Y];

    // Check direction
    this.updateDirection(obj, leftArmRotation, delta);

    const direction = this._reverse ? -1 : 1;

    // Calculate new angle
    const newLegAngleLeft = leftLegRotation + this._legSpeed * delta * direction;
    const newLegAngleRight = rightLegRotation + this._legSpeed * delta * direction;

    const newHipAngleLeft = leftHipRotation + this._legSpeed * delta * direction;
    const newHipAngleRight = rightHipRotation + this._legSpeed * delta * direction;

    const newArmAngleLeft = leftArmRotation + this._handSpeed * delta * direction;
    const newArmAngleRight = rightArmRotation + this._handSpeed * delta * direction;

    const newBodyTranslation = bodyTranslation + this._jumpSpeed * delta * direction;

    // Apply new angle & translation

    obj.moveLeftHips(newHipAngleLeft);
    obj.moveRightHips(newHipAngleRight);

    obj.moveLeftLeg(newLegAngleLeft);
    obj.moveRightLeg(newLegAngleRight);

    obj.moveLeftArm(newArmAngleLeft);
    obj.moveRightArm(newArmAngleRight);

    obj.moveBodyUpDown(newBodyTranslation);
  }

  private updateDirection(obj: MirrorMan, handAngle: number, delta: number) {
    if (handAngle > 0 && delta != this._lastCheck && !this._reverse) {
      this.resetDirection(obj, this._reverse);
      this._reverse = true;
    } else if (handAngle < -60 && delta != this._lastCheck && this._reverse) {
      this.resetDirection(obj, this._reverse);
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      obj.moveLeftShoulder(0);
      obj.moveRightShoulder(0);
      obj.moveLeftArm(-60);
      obj.moveRightArm(-60);
      obj.moveLeftHips(0);
      obj.moveRightHips(0);
      obj.moveLeftLeg(0);
      obj.moveRightLeg(0);
      this._started = !this._started;
    }
  }

  private resetDirection(obj: MirrorMan, reversed: boolean) {
    if (reversed) {
      obj.moveLeftArm(0);
      obj.moveRightArm(0);
      obj.moveLeftHips(30);
      obj.moveRightHips(30);
      obj.moveLeftLeg(30);
      obj.moveRightLeg(30);
    } else {
      obj.moveLeftArm(-60);
      obj.moveRightArm(-60);
      obj.moveLeftHips(0);
      obj.moveRightHips(0);
      obj.moveLeftLeg(0);
      obj.moveRightLeg(0);
    }
  }
}

export default JumpMirrorManAnimation;
