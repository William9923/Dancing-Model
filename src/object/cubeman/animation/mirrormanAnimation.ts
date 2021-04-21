import MirrorMan from "../main";
import IMirrorManAnimation from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class MirrorManAnimation implements IMirrorManAnimation {
  private _started: boolean;

  private _keyframes: any;
  private _deltaKeyframes: any = [];
  private _duration: number; // in 1/10 second
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
      const kfTo = this._keyframes[i + 1];
      const kfFromKeys = Object.keys(kfFrom.position);
      const kfToKeys = Object.keys(kfTo.position);

      const deltaKfKeys = kfFromKeys.filter((el) => {
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

  private generateCallbackMap(obj: MirrorMan) {
    this._callbackMap["ll"] = obj.moveLeftLeg.bind(obj);
    this._callbackMap["la"] = obj.moveLeftArm.bind(obj);
    this._callbackMap["ra"] = obj.moveRightArm.bind(obj);
    this._callbackMap["rl"] = obj.moveRightLeg.bind(obj);
    this._callbackMap["head"] = obj.moveHead.bind(obj);
    this._callbackMap["stomach"] = obj.moveStomach.bind(obj);
    this._callbackMap["ls"] = obj.moveLeftShoulder.bind(obj);
    this._callbackMap["rs"] = obj.moveRightShoulder.bind(obj);
    this._callbackMap["lh"] = obj.moveLeftHips.bind(obj);
    this._callbackMap["rh"] = obj.moveRightHips.bind(obj);
    this._callbackMap["translateBodyY"] = obj.moveBodyUpDown.bind(obj);
  }

  private generateTargetMap(obj: MirrorMan) {
    this._targetMap["ll"] = {part: obj.ll, idx: X};
    this._targetMap["la"] = {part: obj.la, idx: X};
    this._targetMap["ra"] = {part: obj.ra, idx: X};
    this._targetMap["rl"] = {part: obj.rl, idx: X};
    this._targetMap["head"] = {part: obj.head, idx: Y};
    this._targetMap["stomach"] = {part: obj.stomach, idx: Y};
    this._targetMap["ls"] = {part: obj.ls, idx: X};
    this._targetMap["rs"] = {part: obj.rs, idx: X};
    this._targetMap["lh"] = {part: obj.lh, idx: X};
    this._targetMap["rh"] = {part: obj.rh, idx: X};

    this._targetMap["translateBodyY"] = {part: obj.chest, idx: Y};
  }

  public doAnimation(delta: number, obj: MirrorMan) {
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

      let newVal;
      if (k == "translateBodyY") {
        const translationPoint = target.part.getTransformation("translate");
        const currPos = translationPoint[target.idx];
        const newPos = (newVal = currPos + delta * deltaKf[k]);
        callback(newPos);
      } else {
        const rotationPoint = target.part.getTransformation("rotate");
        const currRot = rotationPoint[target.idx];
        const newRot = (newVal = currRot + delta * deltaKf[k]);
        callback(newRot);
      }

      // Check any movement limit
      if (!doIncrementKf) {
        if (deltaKf[k] < 0 && newVal <= this._keyframes[this._currKeyframe + 1].position[k]) {
          doIncrementKf = true;
        } else if (
          deltaKf[k] > 0 &&
          newVal >= this._keyframes[this._currKeyframe + 1].position[k]
        ) {
          doIncrementKf = true;
        } else if (deltaKf[k] == 0) {
          throw "MirrorMan.doAnimation: should not be here";
        }
      }
    }

    if (doIncrementKf) {
      this._currKeyframe = (this._currKeyframe + 1) % this._deltaKeyframes.length;
      // Fix position
      const targetPos = this._keyframes[this._currKeyframe].position;
      for (const k in targetPos) {
        if (this._callbackMap[k]) this._callbackMap[k](targetPos[k]);
      }
    }
  }

  private validateAndReset(obj: MirrorMan) {
    if (!this._started) {
      // Generate callback and target map
      this.generateCallbackMap(obj);
      this.generateTargetMap(obj);

      // Reset object
      // At this point keyframes length is > 1
      const initialPos = this._keyframes[0].position;
      for (const k in initialPos) {
        if (this._callbackMap[k]) this._callbackMap[k](initialPos[k]);
      }

      this._started = !this._started;
    }
  }
}

export default MirrorManAnimation;
