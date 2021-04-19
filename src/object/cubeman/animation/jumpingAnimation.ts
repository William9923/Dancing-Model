import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

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
    this._jumpSpeed = speed * 0.5;
  }

  public doAnimation(delta: number, obj: MirrorMan) {
    // Reset for first time
    this.validateAndReset(obj);

    // Get data
    const leftLegRotation = obj.ll.getTransformation("rotate");
    const rightLegRotation = obj.rl.getTransformation("rotate");

    const [x_leg_left, y_leg_left, z_leg_left] = leftLegRotation;
    const [x_leg_right, y_leg_right, z_leg_right] = rightLegRotation;

    const leftHipRotation = obj.lh.getTransformation("rotate");
    const rightHipRotation = obj.rh.getTransformation("rotate");

    const [x_left_hip, y_left_hip, z_left_hip] = leftHipRotation;
    const [x_right_hip, y_right_hip, z_right_hip] = rightHipRotation;

    const leftArmRotation = obj.la.getTransformation("rotate");
    const rightArmRotation = obj.ra.getTransformation("rotate");

    const [x_arm_left, y_arm_left, z_arm_left] = leftArmRotation;
    const [x_arm_right, y_arm_right, z_arm_right] = rightArmRotation;

    const [x, y, z] = obj.getTransformation("translate");

    // Check direction
    this.updateDirection(x_arm_left, delta);

    const direction = this._reverse ? -1 : 1;

    // Calculate new angle
    const newLegAngleLeft = x_leg_left + this._legSpeed * delta * direction ;
    const newLegAngleRight = x_leg_right + this._legSpeed * delta * direction ;

    const newHipAngleLeft = x_left_hip + this._legSpeed * delta * direction;
    const newHipAngleRight = x_right_hip + this._legSpeed * delta * direction;

    const newArmAngleLeft = x_arm_left + this._handSpeed * delta * direction;
    const newArmAngleRight = x_arm_right + this._handSpeed * delta * direction;


    // Apply new angle & translation

    obj.moveLeftHips(newHipAngleLeft);
    obj.moveRightHips(newHipAngleRight);

    obj.moveLeftLeg(newLegAngleLeft);
    obj.moveRightLeg(newLegAngleRight);

    obj.moveLeftArm(newArmAngleLeft);
    obj.moveRightArm(newArmAngleRight);
    obj.chest.setTransformation("translate", [x, y + this._jumpSpeed * delta * direction, z]);
  }

  private updateDirection(handAngle: number, delta: number) {
    if (handAngle >= 0 && delta != this._lastCheck) {
      this._reverse = true;
    } else if (handAngle <= -60 && delta != this._lastCheck) {
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
}

export default JumpMirrorManAnimation;
