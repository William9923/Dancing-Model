import Node from "../node";
import { Head, Hip, Chest } from "./parts";
import { mat4 } from "../../util/matrix";

class Knight extends Node {
  public static build() {
    const hip = new Hip();
    const chest = new Chest();
    const head = new Head();

    const knight = new Knight();

    knight.child = hip;
    hip.child = chest;
    chest.child = head;

    return knight;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}
}

export default Knight;