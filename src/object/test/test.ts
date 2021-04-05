import Node from "../node";
import { Lower, Upper } from "./parts";

class Test extends Node {
  public static build() {
    const l = new Lower()
    const u = new Upper()

    const t = new Test();

    t.child = l;
    l.child = u;

    return t;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}
}

export default Test;
