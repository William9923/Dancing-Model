import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

class JumpMirrorManAnimation implements IMirrorManAnimation {
  private _jumpSpeed : number;
  private _handSpeed: number;
  private _legSpeed: number;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck:number;

  constructor(speed: number) {
    this._legSpeed = speed * 2;
    this._handSpeed = speed * 4;
    this._jumpSpeed = speed * 0.005;

    this._started = false;
    this._lastCheck = 0;
  }

  public set speed(speed: number) {
    this._legSpeed = speed * 2;
    this._handSpeed = speed * 4;
    this._jumpSpeed = speed * 0.01;
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
    const rightArmRotation = obj.ra.getTransformation("rotate");

    const [x_arm_left, y_arm_left, z_arm_left] = leftArmRotation;
    const [x_arm_right, y_arm_right, z_arm_right] = rightArmRotation;

    const [x,y,z] = obj.getTransformation("translate");
    
    // Check direction
    this.updateDirection(z_arm_left, delta);

    const direction = this._reverse ? -1 : 1;

    // Calculate new angle
    const newLegAngleLeft = z_leg_left + this._legSpeed * delta * direction ;
    const newLegAngleRight = z_leg_right + this._legSpeed * delta * direction* -1;

    const newArmAngleLeft = z_arm_left + this._handSpeed * delta * direction ;
    const newArmAngleRight = z_arm_right + this._handSpeed * delta * direction * -1;

    // Apply new angle & translation

    obj.ll.setTransformation("rotate", [x_leg_left, y_leg_left, newLegAngleLeft]);
    obj.rl.setTransformation("rotate", [x_leg_right, y_leg_right, newLegAngleRight]);

    obj.la.setTransformation("rotate", [x_arm_left, y_arm_left, newArmAngleLeft]);
    obj.ra.setTransformation("rotate", [x_arm_right, y_arm_right, newArmAngleRight]);
  
    obj.setTransformation("translate", [x, y + this._jumpSpeed * delta * direction, z]);
  }

  private updateDirection(handAngle: number, delta: number) {

    if (handAngle >= 45 && delta != this._lastCheck) {
      this._reverse = true;
    } else if (handAngle <= -45 && delta != this._lastCheck) {
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {

      obj.head.setTransformation("rotate", [0,0,0]);
      obj.chest.setTransformation("rotate", [0, 0, 0]);

      obj.la.setTransformation("rotate", [0, 0, 45]);
      obj.ra.setTransformation("rotate", [0, 0, -45]);

      obj.ll.setTransformation("rotate", [0, 0, 0]);
      obj.rl.setTransformation("rotate", [0, 0, 0]);
      this._started = !this._started;
    }
  }
}

export default JumpMirrorManAnimation;
