import Node from "../node";
import { Head, Hip, Chest, Shield, LeftUpperLeg, RightUpperLeg, LeftLowerLeg, RightLowerLeg } from "./parts";
import { mat4 } from "../../util/matrix";

class Knight extends Node {
  public static build() {
    const hip = new Hip();
    const chest = new Chest();
    const head = new Head();
    const shield = new Shield();
    const lul = new LeftUpperLeg();
    const rul = new RightUpperLeg();
    const lll = new LeftLowerLeg();
    const rll = new RightLowerLeg();

    const knight = new Knight();

    knight.child = hip;
    hip.child = chest;
    chest.child = head;
    head.sibling = shield;

    chest.sibling = lul;
    lul.sibling = rul;

    lul.child = lll;
    rul.child = rll;

    // knight.child = lul;

    return knight;
  }

  // override
  public traverse() {
    this._setTextureCallback("bump");
    super.traverse(mat4.identity(), true);
    this._setTextureCallback("none");
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}
}

export default Knight;
