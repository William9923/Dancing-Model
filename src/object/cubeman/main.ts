import Node from "../node";
import {mat4} from "../../util/matrix";
import SliderManager from "../../SliderManager";

import {
  Head,
  LeftArm,
  LeftLeg,
  RightArm,
  RightLeg,
  Chest,
  LeftEar,
  RightEar,
  Stomach,
  LeftShoulder,
  RightShoulder,
  LeftHip,
  RightHip,
} from "./parts";

import {IMirrorManAnimation} from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class MirrorManMovement {
  // Main Body Parts
  public head: number;
  // Leg Parts
  public ll: number;
  public rl: number;
  // Arm Parts
  public la: number;
  public ra: number;
  // Shoulder Parts
  public rs: number;
  public ls: number;
  // Hip Parts
  public lh: number;
  public rh: number;
}

class MirrorMan extends Node {
  // Main Body Parts
  public head: Node;
  public chest: Node;
  public stomach: Node;

  // Leg Parts
  public ll: Node;
  public rl: Node;

  // Arm Parts
  public la: Node;
  public ra: Node;

  // Shoulder Parts
  public rs: Node;
  public ls: Node;

  // Hip Parts
  public lh: Node;
  public rh: Node;

  // Animation clip
  private _animationClip: IMirrorManAnimation | null = null; // change the animationClip

  public get animation() {
    return this._animationClip;
  }

  public set animation(clip: IMirrorManAnimation | null) {
    this._animationClip = clip;
  }

  public setAnimationClip(clip: IMirrorManAnimation | null) {
    this._animationClip = clip;
  }

  public static build() {
    // Creational Process
    const mm = new MirrorMan();

    const ll = new LeftLeg();
    const la = new LeftArm();

    const ra = new RightArm();
    const rl = new RightLeg();

    const head = new Head();

    const chest = new Chest();

    const le = new LeftEar();
    const re = new RightEar();

    const ls = new LeftShoulder();
    const rs = new RightShoulder();

    const lh = new LeftHip();
    const rh = new RightHip();

    const stomach = new Stomach();

    // Inject Parts
    mm.head = head;
    mm.chest = chest;
    mm.stomach = stomach;

    mm.la = la;
    mm.ra = ra;

    mm.ll = ll;
    mm.rl = rl;

    mm.rs = rs;
    mm.ls = ls;

    mm.lh = lh;
    mm.rh = rh;

    // Constructing Object Parts
    mm.child = chest;

    chest.child = head;
    head.sibling = stomach;
    stomach.sibling = ls;
    ls.sibling = rs;

    ls.child = la;
    rs.child = ra;

    head.child = le;
    le.sibling = re;

    stomach.child = lh;
    lh.sibling = rh;

    lh.child = ll;
    rh.child = rl;

    return mm;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}

  public animate(delta: number) {
    if (!!this._animationClip) {
      this._animationClip.doAnimation(delta, this);
    }
  }

  /**
   * Movement Parts
   */

  // Head Component
  public moveHead(angle: number) {
    this.getAndSetRotation(this.head, Y, angle);
  }

  public moveStomach(angle: number) {
    this.getAndSetRotation(this.stomach, Y, angle);
  }

  // Shoulder Component

  public moveLeftShoulder(angle: number) {
    this.getAndSetRotation(this.ls, X, angle);
  }

  public moveRightShoulder(angle: number) {
    this.getAndSetRotation(this.rs, X, angle);
  }

  // Hips Component
  public moveLeftHips(angle: number) {
    this.getAndSetRotation(this.lh, X, angle);
  }

  public moveRightHips(angle: number) {
    this.getAndSetRotation(this.rh, X, angle);
  }

  // Arm Component

  // Range : -45, 45
  public moveLeftArm(angle: number) {
    this.getAndSetRotation(this.la, X, angle);
  }

  // Range : -45, 45
  public moveRightArm(angle: number) {
    this.getAndSetRotation(this.ra, X, angle);
  }

  // Leg Component

  public moveLeftLeg(angle: number) {
    this.getAndSetRotation(this.ll, X, angle);
  }

  public moveRightLeg(angle: number) {
    this.getAndSetRotation(this.rl, X, angle);
  }

  // Body

  public moveBodyUpDown(length: number) {
    this.getAndSetTranslation(this.chest, Y, length);
  }

  // Helper
  private getAndSetRotation(part: Node, index: number, angle: number) {
    let rotatePoint = part.getTransformation("rotate");
    rotatePoint[index] = angle;
    part.setTransformation("rotate", rotatePoint, true);
  }

  private getAndSetTranslation(part: Node, index: number, value: number) {
    let translatePoint = part.getTransformation("translate");
    translatePoint[index] = value;
    part.setTransformation("translate", translatePoint, true);
  }

  public reset() {
    SliderManager.resetMMSliderValue();
  }

  // override
  public traverse() {
    this._setTextureCallback!("environment");
    super.traverse();
    this._setTextureCallback!("none");
  }

  // override
  public saveMovement(): MirrorManMovement {
    const mmm = new MirrorManMovement();

    mmm.head = this.head.getTransformation("rotate")[Y];
    mmm.la = this.la.getTransformation("rotate")[X];
    mmm.lh = this.lh.getTransformation("rotate")[X];
    mmm.ll = this.ll.getTransformation("rotate")[X];
    mmm.ls = this.ls.getTransformation("rotate")[X];
    mmm.ra = this.ra.getTransformation("rotate")[X];
    mmm.rh = this.rh.getTransformation("rotate")[X];
    mmm.rl = this.rl.getTransformation("rotate")[X];
    mmm.rs = this.rs.getTransformation("rotate")[X];

    return mmm;
  }

  public loadMovement(mmm: MirrorManMovement) {
    this.moveHead(mmm.head);

    this.moveLeftArm(mmm.la);
    this.moveLeftHips(mmm.lh);
    this.moveLeftLeg(mmm.ll);
    this.moveLeftShoulder(mmm.ls);

    this.moveRightArm(mmm.ra);
    this.moveRightHips(mmm.rh);
    this.moveRightLeg(mmm.rl);
    this.moveRightShoulder(mmm.rs);
  }

  public load(data: string) {
    const [type, body] = data.split("\n");
    if (type != "MirrorMan") {
      throw "Failed to load mirror man";
    }
    this.loadMovement(JSON.parse(body));
    return this;
  }

  public save() {
    let data = "MirrorMan\n";
    data += JSON.stringify(this.saveMovement());
    return data;
  }
}

export default MirrorMan;
