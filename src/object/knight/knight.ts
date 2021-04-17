import Node from "../node";
import * as parts from "./parts";
import { IKnightAnimation } from "./animation";
import SliderManager from "../../SliderManager";
import { mat4 } from "../../util/matrix";

const X = 0;
const Y = 1;
const Z = 2;

class Knight extends Node {
  // Body Parts
  // main
  public hip: Node;
  public chest: Node;
  public head: Node;
  // arm
  public lua: Node;
  public lla: Node;
  public rua: Node;
  public rla: Node;
  // leg
  public lul: Node;
  public lll: Node;
  public rul: Node;
  public rll: Node;
  // equipment
  public shield: Node;
  public sword: Node;

  // Animation clip
  private _animationClip: IKnightAnimation | null = null;

  public get animation() {
    return this._animationClip;
  }

  public set animation(clip: IKnightAnimation | null) {
    this._animationClip = clip;
  }

  public setAnimationClip(clip: IKnightAnimation | null) {
    this._animationClip = clip;
  }

  /*
   * Builder
   */

  public static build() {
    // New knight object
    const knight = new Knight();

    // Knight parts
    // main
    const hip = knight.hip = new parts.Hip();
    const chest = knight.chest = new parts.Chest();
    const head = knight.head = new parts.Head();
    // arm
    const lua = knight.lua = new parts.LeftUpperArm();
    const lla = knight.lla = new parts.LeftLowerArm();
    const rua = knight.rua = new parts.RightUpperArm();
    const rla = knight.rla = new parts.RightLowerArm();
    // leg
    const lul = knight.lul = new parts.LeftUpperLeg();
    const lll = knight.lll = new parts.LeftLowerLeg();
    const rul = knight.rul = new parts.RightUpperLeg();
    const rll = knight.rll = new parts.RightLowerLeg();
    // equipment
    const shield = knight.shield = new parts.Shield();
    const sword = knight.sword = new parts.Sword();

    // Tree structure
    //                    knight
    //                      |
    //            ________ hip ____
    //           /          |      \
    //      chest          lul      rul
    //     /  |  \          |        |
    // head  lua  rua      lll      rll
    //        |    |
    //       lla  rla
    //        |    |
    //    shield  sword
    // root
    knight.child = hip;
    // hip childs
    hip.child = chest;
    chest.sibling = lul;
    lul.sibling = rul;
    // chest childs
    chest.child = head;
    head.sibling = lua;
    lua.sibling = rua;
    // arm (lua, lla, rua, rla)
    lua.child = lla;
    lla.child = shield;
    rua.child = rla;
    rla.child = sword;
    // leg (lul, rul)
    lul.child = lll;
    rul.child = rll;

    // Return object built
    return knight;
  }

  /*
   * Node inheritted method
   */

  // override
  public traverse() {
    this._setTextureCallback!("bump");
    super.traverse(mat4.identity(), true);
    this._setTextureCallback!("none");
  }

  // implement
  public setupPoints() {}

  // implement
  public render(baseTransformMatrix: number[] = mat4.identity()) {}

  /*
   * Movement
   */

  // Hip
  public moveHip(angle: number) {
    this.getAndSetRotation(this.hip, Y, angle);
  }

  // Chest
  public moveChest(angle: number) {
    this.getAndSetRotation(this.chest, Y, angle);
  }

  // Head
  public moveHead(angle: number) {
    this.getAndSetRotation(this.head, Y, angle);
  }

  // Upper arm
  public moveLeftUpperArmX(angle: number) {
    this.getAndSetRotation(this.lua, X, angle);
  }

  public moveLeftUpperArmY(angle: number) {
    this.getAndSetRotation(this.lua, Y, angle);
  }

  public moveLeftUpperArmZ(angle: number) {
    this.getAndSetRotation(this.lua, Z, angle);
  }

  public moveRightUpperArmX(angle: number) {
    this.getAndSetRotation(this.rua, X, angle);
  }

  public moveRightUpperArmY(angle: number) {
    this.getAndSetRotation(this.rua, Y, angle);
  }

  public moveRightUpperArmZ(angle: number) {
    this.getAndSetRotation(this.rua, Z, angle);
  }

  // Lower arm
  public bendLeftLowerArm(angle: number) {
    this.getAndSetRotation(this.lla, X, angle);
  }

  public twistLeftLowerArm(angle: number) {
    this.getAndSetRotation(this.lla, Y, angle);
  }

  public bendRightLowerArm(angle: number) {
    this.getAndSetRotation(this.rla, X, angle);
  }

  public twistRightLowerArm(angle: number) {
    this.getAndSetRotation(this.rla, Y, angle);
  }

  // Upper leg
  public moveLeftUpperLegX(angle: number) {
    this.getAndSetRotation(this.lul, X, angle);
  }

  public moveLeftUpperLegZ(angle: number) {
    this.getAndSetRotation(this.lul, Z, angle);
  }

  public moveRightUpperLegX(angle: number) {
    this.getAndSetRotation(this.rul, X, angle);
  }

  public moveRightUpperLegZ(angle: number) {
    this.getAndSetRotation(this.rul, Z, angle);
  }

  // Lower leg
  public bendLeftLowerLeg(angle: number) {
    this.getAndSetRotation(this.lll, X, angle);
  }

  public bendRightLowerLeg(angle: number) {
    this.getAndSetRotation(this.rll, X, angle);
  }

  // Helper
  private getAndSetRotation(part: Node, index: number, angle: number) {
    let rotatePoint = part.getTransformation("rotate");
    rotatePoint[index] = angle;
    part.setTransformation("rotate", rotatePoint, true);
  }

  // public bendRight

  public reset() {
    SliderManager.resetKSliderValue();
  }

  /*
   * Animation
   */

  public animate(delta: number) {
    if (!!this._animationClip) {
      this._animationClip.doAnimation(delta, this);
    }
  }
}

export default Knight;
