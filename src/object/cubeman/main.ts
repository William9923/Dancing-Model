import Node from "../node";
import {mat4} from "../../util/matrix";

import {Body, Head, LeftArm, LeftLeg, RightArm, RightLeg, Hip, Chest} from "./parts";

class MirrorMan extends Node {
  public static build() {
    
    const ll = new LeftLeg();
    const la = new LeftArm();

    const ra = new RightArm();
    const rl = new RightLeg();

    const body = new Body();
    const head = new Head();

    const hip = new Hip();
    const chest = new Chest();

    body.child = hip;

    hip.sibling = chest;
    
    chest.child = head;

    head.sibling = la;
    la.sibling = ra;

    hip.child = ll;
    ll.sibling = rl;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}
}

export default MirrorMan;
