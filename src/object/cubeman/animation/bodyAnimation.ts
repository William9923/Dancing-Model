import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

class BodyMirrorManAnimation implements IMirrorManAnimation {
  private _bodySpeed: number = 20;
  private _reverse: boolean = false;

  private _started: boolean;
  private _lastCheck:number;

  constructor(speed: number) {
    this._bodySpeed = speed;
    this._started = false;
    this._lastCheck = 0;
  }

  public set speed(speed: number) {
    this._bodySpeed = speed;
  }

  public doAnimation(delta: number, obj: MirrorMan) {
    // Reset for first time
    this.validateAndReset(obj);

    const rotation = obj.chest.getTransformation("rotate");
    const [x, y, z] = rotation;

    this.updateDirection(y, delta);

    const direction = this._reverse ? -1 : 1;

    const newAngle = y + this._bodySpeed * delta * direction;

    console.log("Angle:",newAngle);

    obj.chest.setTransformation("rotate", [x, newAngle, z]);
  }

  private updateDirection(bodyAngle: number, delta: number) {

    if (bodyAngle >= 30 && delta != this._lastCheck) {
      this._reverse = true;
    }

    else if (bodyAngle <= -30 && delta != this._lastCheck) {
      this._reverse = false;
    }

    this._lastCheck = delta;
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      obj.chest.setTransformation("rotate", [0, 0, 0]);
      this._started = !this._started;
    }
  }
}

export default BodyMirrorManAnimation;

