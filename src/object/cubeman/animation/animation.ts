import MirrorMan from "../main";

export default interface IMirrorManAnimation {
  doAnimation(delta: number, obj: MirrorMan): void;
}

/**
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
 */
