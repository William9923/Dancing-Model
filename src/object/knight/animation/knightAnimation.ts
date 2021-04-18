import Knight from "../knight";
import IKnightAnimation from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class KnightAnimation implements IKnightAnimation {
  private _started: boolean;

  private _keyframes: any;
  private _deltaKeyframes: any = [];
  private _duration: number;  // in 1/10 second
  private _callbackMap: object = {};
  private _targetMap: object = {};
  private _currKeyframe: number = 0;

  constructor(keyframes: any, duration: number) {
    this._started = false;

    this._keyframes = keyframes;
    // input in second, adjust to match the delta which is 1/10 second
    this._duration = duration * 10;
    this.generateDeltaKeyframes();
  }

  private generateDeltaKeyframes() {
    for (let i = 0; i < this._keyframes.length - 1; i++) {
      const kfFrom = this._keyframes[i];
      const kfTo = this._keyframes[i+1];
      const kfFromKeys = Object.keys(kfFrom.position);
      const kfToKeys = Object.keys(kfTo.position);

      const deltaKfKeys = kfFromKeys.filter(el => {
        return kfToKeys.indexOf(el) !== -1;
      });

      let deltaKf = {};
      for (const k of deltaKfKeys) {
        const deltaPos = kfTo.position[k] - kfFrom.position[k];
        if (deltaPos == 0) continue;
        const deltaT = ((kfTo.index - kfFrom.index) * this._duration) / 100;
        deltaKf[k] = deltaPos / deltaT;
      }

      this._deltaKeyframes.push(deltaKf);
    }
  }

  private generateCallbackMap(obj: Knight) {
    this._callbackMap["hip"] = obj.moveHip.bind(obj);
    this._callbackMap["chest"] = obj.moveChest.bind(obj);
    this._callbackMap["head"] = obj.moveHead.bind(obj);
    this._callbackMap["luaX"] = obj.moveLeftUpperArmX.bind(obj);
    this._callbackMap["luaY"] = obj.moveLeftUpperArmY.bind(obj);
    this._callbackMap["luaZ"] = obj.moveLeftUpperArmZ.bind(obj);
    this._callbackMap["ruaX"] = obj.moveRightUpperArmX.bind(obj);
    this._callbackMap["ruaY"] = obj.moveRightUpperArmY.bind(obj);
    this._callbackMap["ruaZ"] = obj.moveRightUpperArmZ.bind(obj);
    this._callbackMap["llaBend"] = obj.bendLeftLowerArm.bind(obj);
    this._callbackMap["llaTwist"] = obj.twistLeftLowerArm.bind(obj);
    this._callbackMap["rlaBend"] = obj.bendRightLowerArm.bind(obj);
    this._callbackMap["rlaTwist"] = obj.twistRightLowerArm.bind(obj);
    this._callbackMap["lulX"] = obj.moveLeftUpperLegX.bind(obj);
    this._callbackMap["lulZ"] = obj.moveLeftUpperLegZ.bind(obj);
    this._callbackMap["rulX"] = obj.moveRightUpperLegX.bind(obj);
    this._callbackMap["rulZ"] = obj.moveRightUpperLegZ.bind(obj);
    this._callbackMap["lllBend"] = obj.bendLeftLowerLeg.bind(obj);
    this._callbackMap["rllBend"] = obj.bendRightLowerLeg.bind(obj);
  }

  private generateTargetMap(obj: Knight) {
    this._targetMap["hip"] = { part: obj.hip, idx: Y };
    this._targetMap["chest"] = { part: obj.chest, idx: Y };
    this._targetMap["head"] = { part: obj.head, idx: Y };
    this._targetMap["luaX"] = { part: obj.lua, idx: X };
    this._targetMap["luaY"] = { part: obj.lua, idx: Y };
    this._targetMap["luaZ"] = { part: obj.lua, idx: Z };
    this._targetMap["ruaX"] = { part: obj.rua, idx: X };
    this._targetMap["ruaY"] = { part: obj.rua, idx: Y };
    this._targetMap["ruaZ"] = { part: obj.rua, idx: Z };
    this._targetMap["llaBend"] = { part: obj.lla, idx: X };
    this._targetMap["llaTwist"] = { part: obj.lla, idx: Y };
    this._targetMap["rlaBend"] = { part: obj.rla, idx: X };
    this._targetMap["rlaTwist"] = { part: obj.rla, idx: Y };
    this._targetMap["lulX"] = { part: obj.lul, idx: X };
    this._targetMap["lulZ"] = { part: obj.lul, idx: Z };
    this._targetMap["rulX"] = { part: obj.rul, idx: X };
    this._targetMap["rulZ"] = { part: obj.rul, idx: Z };
    this._targetMap["lllBend"] = { part: obj.lll, idx: X };
    this._targetMap["rllBend"] = { part: obj.rll, idx: X };
  }

  public doAnimation(delta: number, obj: Knight) {
    if (this._keyframes.length <= 1) return;

    // Reset for first time
    this.validateAndReset(obj);

    // Run the keyframes
    let doIncrementKf = false;
    const deltaKf = this._deltaKeyframes[this._currKeyframe] || {};
    for (const k in deltaKf) {
      const target = this._targetMap[k];
      const callback = this._callbackMap[k];
      if (!target || !callback) continue;

      const rotationPoint = target.part.getTransformation("rotate");
      const currRot = rotationPoint[target.idx];
      const newRot = currRot + delta * deltaKf[k];
      callback(newRot);

      // Check any movement limit
      if (!doIncrementKf) {
        if (deltaKf[k] < 0 && newRot <= this._keyframes[this._currKeyframe+1].position[k]) {
          doIncrementKf = true;
        } else if (deltaKf[k] > 0 && newRot >= this._keyframes[this._currKeyframe+1].position[k]) {
          doIncrementKf = true;
        } else if (deltaKf[k] == 0) {
          throw "KnightAnimation.doAnimation: should not be here";
        }
      }
    }

    if (doIncrementKf) {
      this._currKeyframe = (this._currKeyframe + 1) % this._deltaKeyframes.length;
      // Fix position
      const targetPos = this._keyframes[this._currKeyframe].position;
      for (const k in targetPos) {
        if (this._callbackMap[k])
          this._callbackMap[k](targetPos[k]);
      }
    }
  }

  private validateAndReset(obj: Knight) {
    if (!this._started) {
      // Generate callback and target map
      this.generateCallbackMap(obj);
      this.generateTargetMap(obj);

      // Reset object
      // At this point keyframes length is > 1
      const initialPos = this._keyframes[0].position;
      for (const k in initialPos) {
        if (this._callbackMap[k])
          this._callbackMap[k](initialPos[k]);
      }

      this._started = !this._started;
    }
  }
}

export default KnightAnimation;
