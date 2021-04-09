import Node from "../node";
import {mat4} from "../../util/matrix";

import {Body, Head, LeftArm, LeftLeg, RightArm, RightLeg, Chest} from "./parts";

class MirrorMan extends Node {

  // Main Body Parts
  private head:Node;
  private chest:Node;

  // Leg Parts
  private ll: Node;
  private rl: Node;

  // Arm Parts
  private la: Node;
  private ra:Node;

  public static build() {
    
    const mm = new MirrorMan();
    
    const ll = new LeftLeg();
    const la = new LeftArm();

    const ra = new RightArm();
    const rl = new RightLeg();

    const head = new Head();

    const chest = new Chest();

    mm.head = head;
    mm.chest = chest;
    
    mm.la = la;
    mm.ra = ra;

    mm.ll = ll;
    mm.rl = rl;

    // Building Parts
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

  public animate() {}

  public moveLeftArmFrontWay(angle: number) {
  }

  public moveLeftArmSideWay(angle: number) {}

  public moveRightArmFrontWay(angle: number) {}
}

export default MirrorMan;
