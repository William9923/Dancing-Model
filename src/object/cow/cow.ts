import Node from "../node";
import { mat4 } from "../../util/matrix";
import SliderManager from "../../SliderManager";

import { Body, Head, LeftBackLeg, LeftFrontLeg, RightBackLeg, RightFrontLeg} from "./parts";
import { ICowAnimation } from "./animation";
// import {IMirrorManAnimation} from "./animation";

const X = 0;
const Y = 1;
const Z = 2;

class CowMovement {
  public head: number;
  public body: number;
  public lfl: number;
  public rfl: number;
  public lbl: number;
  public rbl: number;
}

class Cow extends Node {
  // Main Body Parts
  public head: Node;
  public body: Node;

  // Leg Parts
  public lbl: Node;
  public lfl: Node;
  public rbl: Node;
  public rfl: Node;

  // Animation clip
  private _animationClip: ICowAnimation | null = null; // change the animationClip

  public get animation() {
    return this._animationClip;
  }

  public set animation(clip: ICowAnimation | null) {
    this._animationClip = clip;
  }

  public setAnimationClip(clip: ICowAnimation | null) {
    this._animationClip = clip;
  }

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
    cow.lfl = lfl;
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

  public saveMovement(): CowMovement {
    const cm = new CowMovement();

    cm.head = this.head.getTransformation("rotate")[X];
    cm.body = this.body.getTransformation("rotate")[Y];
    cm.lfl = this.lfl.getTransformation("rotate")[X];
    cm.rfl = this.rfl.getTransformation("rotate")[X];
    cm.lbl = this.lbl.getTransformation("rotate")[X];
    cm.rbl = this.rbl.getTransformation("rotate")[X];
    return cm;
  }

  public loadMovement(cm: CowMovement) {
    this.moveHead(cm.head);
    this.moveBody(cm.body);
    this.moveLeftFrontLeg(cm.lfl);
    this.moveRightFrontLeg(cm.rfl);
    this.moveLeftBackLeg(cm.lbl);
    this.moveRightBackLeg(cm.rbl);
  }

  public save() {
    let data = "Cow\n";
    data += JSON.stringify(this.saveMovement());
    return data;
  }

  public load(data: string) {
    const [type, body] = data.split("\n");
    if (type != "Cow") {
      throw "Failed to load cow";
    }
    this.loadMovement(JSON.parse(body));
    return this;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}

  public animate(delta: number) {
    if (!!this._animationClip) {
      this._animationClip.doAnimation(delta, this);
    } 
  }

  // Range : -45, 45
  public moveLeftFrontLeg(angle: number) {
    const rotatePoint = this.lfl.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.lfl.setTransformation("rotate", [angle, y, z]);
  }

  // Range : -45, 45
  public moveRightFrontLeg(angle: number) {
    const rotatePoint = this.rfl.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.rfl.setTransformation("rotate", [angle, y, z]);
  }

  public moveLeftBackLeg(angle: number) {
    const rotatePoint = this.lbl.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.lbl.setTransformation("rotate", [angle, y, z]);
  }

  public moveRightBackLeg(angle: number) {
    const rotatePoint = this.rbl.getTransformation("rotate");
    const [_, y, z] = rotatePoint;
    this.rbl.setTransformation("rotate", [angle, y, z]);
  }

  public moveHead(angle: number) {
    this.getAndSetRotation(this.head, X, angle);
  }

  public moveBody(angle: number) {
    const rotatePoint = this.body.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.body.setTransformation("rotate", [x, angle, z]);
  }

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
    SliderManager.resetCowSliderValue();
  }

  // override
  public traverse() {
    this._setTextureCallback!("image");
    super.traverse();
    this._setTextureCallback!("none");
  }
}

export default Cow;
