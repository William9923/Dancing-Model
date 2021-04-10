import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

class WalkMirrorManAnimation implements IMirrorManAnimation {
  private _walkingSpeed: number;
  private _bodySpeed:number;
  private _headSpeed:number;
  private _handSpeed: number;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck:number;

  constructor(speed: number) {
    this._walkingSpeed = speed;
    this._bodySpeed = speed * 0.1;
    this._headSpeed = speed * 0.2;
    this._handSpeed = speed * 0.75;

    this._started = false;
    this._lastCheck = 0;
  }

  public set speed(speed: number) {
    this._walkingSpeed = speed;
    this._bodySpeed = speed * 0.2;
    this._headSpeed = speed * 0.4;
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

    const leftArmRotation = obj.la.getTransformation("rotate");
    const rightArmRotation = obj.la.getTransformation("rotate");

    const [x_arm_left, y_arm_left, z_arm_left] = leftArmRotation;
    const [x_arm_right, y_arm_right, z_arm_right] = rightArmRotation;

    const bodyRotation = obj.chest.getTransformation("rotate");
    const [x_chest, y_chest, z_chest] = bodyRotation;

    const headRotation = obj.head.getTransformation("rotate");
    const [x_head, y_head, z_head] = headRotation;
    
    // Check direction
    this.updateDirection(x_leg_left, delta);

    const direction = this._reverse ? -1 : 1;

    // Calculate new angle
    const newAngleLeft = x_leg_left + this._walkingSpeed * delta * direction;
    const newAngleRight = x_leg_right + this._walkingSpeed * delta * direction * -1;

    const newArmAngleLeft = y_arm_left + this._handSpeed * delta * direction ;
    const newArmAngleRigth = y_arm_right + this._handSpeed * delta * direction * -1;

    const newChestAngleZ = z_chest + this._bodySpeed * delta * direction * -0.5 ;
    const newChestAngleY = y_chest + this._bodySpeed * delta * direction;

    const newHeadAngle = y_head + this._headSpeed * delta * direction;

    // Apply new angle
    obj.ll.setTransformation("rotate", [newAngleLeft, y_leg_left, z_leg_left]);
    obj.rl.setTransformation("rotate", [newAngleRight, y_leg_right, z_leg_right]);

    obj.la.setTransformation("rotate", [x_arm_left, newArmAngleLeft, z_arm_left]);
    obj.ra.setTransformation("rotate", [x_arm_right, newArmAngleRigth, z_arm_right]);

    obj.chest.setTransformation("rotate", [x_chest, newChestAngleY, newChestAngleZ]);

    obj.head.setTransformation("rotate", [x_head, newHeadAngle, z_head]);
  }

  private updateDirection(footAngle: number, delta: number) {

    if (footAngle >= 45 && delta != this._lastCheck) {
      console.log("hid?");
      this._reverse = true;
    }

    else if (footAngle <= -45 && delta != this._lastCheck) {
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      obj.ll.setTransformation("rotate", [0, 0, 0]);
      obj.rl.setTransformation("rotate", [0, 0, 0]);
      this._started = !this._started;
    }
  }
}

export default WalkMirrorManAnimation;
