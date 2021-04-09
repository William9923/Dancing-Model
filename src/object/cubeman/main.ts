import Node from "../node";
import {mat4} from "../../util/matrix";

import {Body, Head, LeftArm, LeftLeg, RightArm, RightLeg, Chest} from "./parts";

class MirrorMan extends Node {
  public static build() {
    
    const mm = new MirrorMan();

    const ll = new LeftLeg();
    const la = new LeftArm();

    const ra = new RightArm();
    const rl = new RightLeg();

    const head = new Head();

    const chest = new Chest();

    mm.child = chest;
    
    chest.child = head;

    head.sibling = la;
    la.sibling = ra;

    ra.sibling = ll;
    ll.sibling = rl;

    return mm;
  }

  public setupPoints() {}
  public render(baseTransformMatrix: number[] = mat4.identity()) {}
}

export default MirrorMan;
