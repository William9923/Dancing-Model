import Node from "../node";
import { mat4 } from "../../util/matrix";
import SliderManager from "../../SliderManager";

import { Body, Head, LeftBackLeg, LeftFrontLeg, RightBackLeg, RightFrontLeg} from "./parts";
// import {IMirrorManAnimation} from "./animation";

class Cow extends Node {
  // Main Body Parts
  public head: Node;
  public body: Node;

  // Leg Parts
  public lbl: Node;
  public lfl: Node;
  public rbl: Node;
  public rfl: Node;

  // Object type
  // private type: ObjMode = "obj2";

  // Animation clip
  // private _animationClip: IMirrorManAnimation | null = null; // change the animationClip

  // public get animation() {
  //   return this._animationClip;
  // }

  // public set animation(clip: IMirrorManAnimation | null) {
  //   this._animationClip = clip;
  // }

  // public setAnimationClip(clip: IMirrorManAnimation | null) {
  //   this._animationClip = clip;
  // }

  public static build() {
    const cow = new Cow();
    const lbl = new LeftBackLeg();
    const lfl = new LeftFrontLeg();
    const rbl = new RightBackLeg();
    const rfl = new RightFrontLeg();
    const head = new Head();
    const body = new Body();

    cow.head = head;
    cow.body = body;
    cow.lbl = lbl;
    cow.lfl =lfl;
    cow.rbl = rbl;
    cow.rfl = rfl;

    // Building Parts
    cow.child = body;
    body.child = head;

    head.sibling = lfl;
    lfl.sibling = rfl;
    rfl.sibling = lbl;
    lbl.sibling = rbl;

    return cow;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}

  // public animate(delta: number) {
  //   if (!!this._animationClip) {
  //     this._animationClip.doAnimation(delta, this);
  //   } 
  // }

  // Range : -45, 45
  public moveLeftFrontLeg(angle: number) {
    const rotatePoint = this.lfl.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.lfl.setTransformation("rotate", [x, y, angle]);
  }

  // Range : -45, 45
  public moveRightFrontLeg(angle: number) {
    const rotatePoint = this.rfl.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.rfl.setTransformation("rotate", [x, y, angle]);
  }

  public moveLeftBackLeg(angle: number) {
    const rotatePoint = this.lbl.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.lbl.setTransformation("rotate", [x, y, angle]);
  }

  public moveRightBackLeg(angle: number) {
    const rotatePoint = this.rbl.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.rbl.setTransformation("rotate", [x, y, angle]);
  }

  public moveHead(angle: number) {
    const rotatePoint = this.head.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.head.setTransformation("rotate", [x, angle, z]);
  }

  public moveBody(angle: number) {
    const rotatePoint = this.body.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.body.setTransformation("rotate", [x, angle, z]);
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

export default Cow;
