import Node, {ISaveableNode} from "../node";
import * as parts from "./parts";
import { IKnightAnimation } from "./animation";
import SliderManager from "../../SliderManager";
import { mat4 } from "../../util/matrix";

const X = 0;
const Y = 1;
const Z = 2;

class KnightMovement {
  public hip: number;
  public chest: number;
  public head: number;
  public luaX: number;
  public luaY: number;
  public luaZ: number;
  public ruaX: number;
  public ruaY: number;
  public ruaZ: number;
  public llaBend: number;
  public llaTwist: number;
  public rlaBend: number;
  public rlaTwist: number;
  public lulX: number;
  public lulZ: number;
  public rulX: number;
  public rulZ: number;
  public lllBend: number;
  public rllBend: number;
  public translateHipY: number;
  public shieldX: number;
}

class Knight extends Node implements ISaveableNode {
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

  // Additional method for animation
  public translateHipY(angle: number) {
    this.getAndSetTranslation(this.hip, Y, angle);
  }

  public moveShieldX(angle: number) {
    this.getAndSetRotation(this.shield, X, angle);
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
    SliderManager.resetKSliderValue();
  }

  /*
   * Save and load
   */

  public saveMovement(): KnightMovement {
    const km = new KnightMovement();
    km.hip = this.hip.getTransformation("rotate")[Y];
    km.chest = this.chest.getTransformation("rotate")[Y];
    km.head = this.head.getTransformation("rotate")[Y];
    km.luaX = this.lua.getTransformation("rotate")[X];
    km.luaY = this.lua.getTransformation("rotate")[Y];
    km.luaZ = this.lua.getTransformation("rotate")[Z];
    km.ruaX = this.rua.getTransformation("rotate")[X];
    km.ruaY = this.rua.getTransformation("rotate")[Y];
    km.ruaZ = this.rua.getTransformation("rotate")[Z];
    km.llaBend = this.lla.getTransformation("rotate")[X];
    km.llaTwist = this.lla.getTransformation("rotate")[Y];
    km.rlaBend = this.rla.getTransformation("rotate")[X];
    km.rlaTwist = this.rla.getTransformation("rotate")[Y];
    km.lulX = this.lul.getTransformation("rotate")[X];
    km.lulZ = this.lul.getTransformation("rotate")[Z];
    km.rulX = this.rul.getTransformation("rotate")[X];
    km.rulZ = this.rul.getTransformation("rotate")[Z];
    km.lllBend = this.lll.getTransformation("rotate")[X];
    km.rllBend = this.rll.getTransformation("rotate")[X];
    km.translateHipY = this.hip.getTransformation("translate")[Y];
    km.shieldX = this.shield.getTransformation("rotate")[Z];
    return km;
  }

  public loadMovement(km: KnightMovement) {
    this.moveHip(km.hip);
    this.moveChest(km.chest);
    this.moveHead(km.head);
    this.moveLeftUpperArmX(km.luaX);
    this.moveLeftUpperArmY(km.luaY);
    this.moveLeftUpperArmZ(km.luaZ);
    this.moveRightUpperArmX(km.ruaX);
    this.moveRightUpperArmY(km.ruaY);
    this.moveRightUpperArmZ(km.ruaZ);
    this.bendLeftLowerArm(km.llaBend);
    this.twistLeftLowerArm(km.llaTwist);
    this.bendRightLowerArm(km.rlaBend);
    this.twistRightLowerArm(km.rlaTwist);
    this.moveLeftUpperLegX(km.lulX);
    this.moveLeftUpperLegZ(km.lulZ);
    this.moveRightUpperLegX(km.rulX);
    this.moveRightUpperLegZ(km.rulZ);
    this.bendLeftLowerLeg(km.lllBend);
    this.bendRightLowerLeg(km.rllBend);
    this.translateHipY(km.translateHipY);
    this.moveShieldX(km.shieldX);
  }

  public save() {
    let data = "Knight\n";
    data += JSON.stringify(this.saveMovement());
    return data;
  }

  public load(data: string) {
    const [type, body] = data.split("\n");
    if (type != "Knight") {
      throw "Failed to load knight";
    }
    this.loadMovement(JSON.parse(body));
    return this;
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
