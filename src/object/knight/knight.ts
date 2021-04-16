import Node from "../node";
import * as parts from "./parts";
import { mat4 } from "../../util/matrix";

class Knight extends Node {
  public static build() {
    const hip = new parts.Hip();
    const chest = new parts.Chest();
    const head = new parts.Head();
    const shield = new parts.Shield();
    const sword = new parts.Sword();
    const lua = new parts.LeftUpperArm();
    const rua = new parts.RightUpperArm();
    const lla = new parts.LeftLowerArm();
    const rla = new parts.RightLowerArm();
    const lul = new parts.LeftUpperLeg();
    const rul = new parts.RightUpperLeg();
    const lll = new parts.LeftLowerLeg();
    const rll = new parts.RightLowerLeg();

    const knight = new Knight();

    knight.child = hip;

    hip.child = chest;

    chest.child = head;
    head.sibling = lua;
    lua.sibling = rua;

    chest.sibling = lul;
    lul.sibling = rul;

    lul.child = lll;
    rul.child = rll;

    lua.child = lla;
    lla.child = shield;

    rua.child = rla;

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
