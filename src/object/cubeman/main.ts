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
    const rotatePoint = this.head.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.head.setTransformation("rotate", [x, angle, z], true);
  }

  // Chest Component
  public moveChest(angle: number) {
    const rotatePoint = this.chest.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.chest.setTransformation("rotate", [x, angle, z], true);
  }

  // Stomach Component
  public moveStomach(angle: number) {
    const rotatePoint = this.stomach.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.stomach.setTransformation("rotate", [x, angle, z], true);
  }

  // Shoulder Component

  public moveLeftShoulder(angle: number) {
    const rotatePoint = this.ls.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.ls.setTransformation("rotate", [angle, y, z], true);
  }

  public moveRightShoulder(angle: number) {
    const rotatePoint = this.rs.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.rs.setTransformation("rotate", [angle, y, z], true);
  }

  // Hips Component
  public moveLeftHips(angle: number) {
    const rotatePoint = this.lh.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.lh.setTransformation("rotate", [angle, y, z], true);
  }

  public moveRightHips(angle: number) {
    const rotatePoint = this.rh.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.rh.setTransformation("rotate", [angle, y, z], true);
  }

  // Arm Component

  // Range : -45, 45
  public moveLeftArm(angle: number) {
    const rotatePoint = this.la.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.la.setTransformation("rotate", [angle, y, z], true);
  }

  // Range : -45, 45
  public moveRightArm(angle: number) {
    const rotatePoint = this.ra.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.ra.setTransformation("rotate", [angle, y, z], true);
  }

  // Leg Component

  public moveLeftLeg(angle: number) {
    const rotatePoint = this.ll.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.ll.setTransformation("rotate", [angle, y, z], true);
  }

  public moveRightLeg(angle: number) {
    const rotatePoint = this.rl.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.rl.setTransformation("rotate", [angle, y, z], true);
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
}

export default MirrorMan;
