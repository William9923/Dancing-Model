import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

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
    const leftLegRotation = obj.ll.getTransformation("rotate");
    const rightLegRotation = obj.rl.getTransformation("rotate");

    const [x_leg_left, y_leg_left, z_leg_left] = leftLegRotation;
    const [x_leg_right, y_leg_right, z_leg_right] = rightLegRotation;

    const leftHipRotation = obj.lh.getTransformation("rotate");
    const rightHipRotation = obj.rh.getTransformation("rotate");

    const [x_left_hip, y_left_hip, z_left_hip] = leftHipRotation;
    const [x_right_hip, y_right_hip, z_right_hip] = rightHipRotation;

    const leftShoulderRotation = obj.ls.getTransformation("rotate");
    const rightShoulderRotation = obj.rs.getTransformation("rotate");

    const [x_left_shoulder, y_left_shoulder, z_left_shoulder] = leftShoulderRotation;
    const [x_right_shoulder, y_right_shoulder, z_right_shoulder] = rightShoulderRotation;

    const headRotation = obj.head.getTransformation("rotate");
    const [x_head, y_head, z_head] = headRotation;

    // Check direction
    this.updateDirection(x_left_hip, delta);

    const direction = this._reverse ? -1 : 1;

    // Calculate new angle
    const newAngleLeft = x_leg_left + this._walkingSpeed * delta * direction;
    const newAngleRight = x_leg_right + this._walkingSpeed * delta * direction * -1;

    const newHipAngleLeft = x_left_hip + this._walkingSpeed * delta * direction;
    const newHipAngleRight = x_right_hip + this._walkingSpeed * delta * direction * -1;

    const newShoulderAngleLeft = x_left_shoulder + this._handSpeed * delta * direction;
    const newShoulderAngleRigth = x_right_shoulder + this._handSpeed * delta * direction * -1;

    const newHeadAngle = y_head + this._headSpeed * delta * direction;

    // Apply new angle
    obj.moveLeftShoulder(newShoulderAngleLeft);
    obj.moveRightShoulder(newShoulderAngleRigth);

    obj.moveLeftHips(newHipAngleLeft);
    obj.moveRightHips(newHipAngleRight);

    obj.moveLeftLeg(Math.max(0, newAngleLeft));
    obj.moveRightLeg(Math.max(0, newAngleRight));

    obj.moveHead(newHeadAngle);
  }

  private updateDirection(footAngle: number, delta: number) {
    if (footAngle >= 30 && delta != this._lastCheck) {
      this._reverse = true;
    } else if (footAngle <= -30 && delta != this._lastCheck) {
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
}

export default WalkMirrorManAnimation;
