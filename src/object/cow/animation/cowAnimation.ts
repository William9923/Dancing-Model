import Node from "../../node";
import Cow from "../cow";
import ICowAnimation from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

type KeyframesType = { index: number, position: { [key: string]: number } }[];
type DeltaKeyframesType = { [key: string]: number }[];
type CallbackMapType = { [key: string]: (arg0: number) => void };
type TargetMapType = { [key: string]: { part: Node, idx: number } };

class CowAnimation implements ICowAnimation {
  private _started: boolean;

  private readonly _keyframes: KeyframesType;
  private _deltaKeyframes: DeltaKeyframesType = [];
  private readonly _duration: number;  // in 1/10 second
  private _callbackMap: CallbackMapType = {};
  private _targetMap: TargetMapType = {};
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

      let deltaKf: { [key: string]: number } = {};
      for (const k of deltaKfKeys) {
        const deltaPos = kfTo.position[k] - kfFrom.position[k];
        if (deltaPos == 0) continue;
        const deltaT = ((kfTo.index - kfFrom.index) * this._duration) / 100;
        deltaKf[k] = deltaPos / deltaT;
      }

      this._deltaKeyframes.push(deltaKf);
    }
  }

  private generateCallbackMap(obj: Cow) {
    this._callbackMap["body"] = obj.moveBody.bind(obj);
    this._callbackMap["head"] = obj.moveHead.bind(obj);
    this._callbackMap["lbl"] = obj.moveLeftBackLeg.bind(obj);
    this._callbackMap["lfl"] = obj.moveLeftFrontLeg.bind(obj);
    this._callbackMap["rbl"] = obj.moveRightBackLeg.bind(obj);
    this._callbackMap["rfl"] = obj.moveRightFrontLeg.bind(obj);
  }

  private generateTargetMap(obj: Cow) {
    this._targetMap["body"] = { part: obj.body, idx: X };
    this._targetMap["head"] = { part: obj.head, idx: Y };
    this._targetMap["lbl"] = { part: obj.lbl, idx: Z };
    this._targetMap["lfl"] = { part: obj.lfl, idx: Z };
    this._targetMap["rbl"] = { part: obj.rbl, idx: Z };
    this._targetMap["rfl"] = { part: obj.rfl, idx: Z };
  }

  public doAnimation(delta: number, obj: Cow) {

    if (this._keyframes.length <= 1) return;
    console.log("Lewat sini");
    // Reset for first time
    this.validateAndReset(obj);

    // Run the keyframes
    let doIncrementKf = false;
    const deltaKf = this._deltaKeyframes[this._currKeyframe] || {};
    console.debug("Check delta:")
    console.debug(deltaKf);
    for (const k in deltaKf) {
      const target = this._targetMap[k];
      const callback = this._callbackMap[k];
      if (!target || !callback) continue;

      let newVal;
      if (k == "translateHipY") {
        const translationPoint = target.part.getTransformation("translate");
        const currPos = translationPoint[target.idx];
        const newPos = newVal = currPos + delta * deltaKf[k];
        callback(newPos);
      } else {
        const rotationPoint = target.part.getTransformation("rotate");
        const currRot = rotationPoint[target.idx];
        const newRot = newVal = currRot + delta * deltaKf[k];
        callback(newRot);
      }

      // Check any movement limit
      if (!doIncrementKf) {
        if (deltaKf[k] < 0 && newVal <= this._keyframes[this._currKeyframe+1].position[k]) {
          doIncrementKf = true;
        } else if (deltaKf[k] > 0 && newVal >= this._keyframes[this._currKeyframe+1].position[k]) {
          doIncrementKf = true;
        } else if (deltaKf[k] == 0) {
          throw "CowAnimation.doAnimation: should not be here";
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

  private validateAndReset(obj: Cow) {
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

export default CowAnimation;
