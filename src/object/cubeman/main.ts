import Node from "../node";
import {mat4} from "../../util/matrix";

import {Head, LeftArm, LeftLeg, RightArm, RightLeg, Chest} from "./parts";
import { IMirrorManAnimation } from "./animation";

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

  // Object type
  private type: ObjMode = "obj1";

  // Animation clip
  private animationClip: IMirrorManAnimation | null = null; // change the animationClip

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

  public animate(delta:number) {
    // TODO : activate animation clip
  }

  

  // Range : -45, 45
  public moveLeftArm(angle: number) {
    const rotatePoint = this.la.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.la.setTransformation("rotate", [x, y, angle]);
  }

  // Range : -45, 45
  public moveRightArm(angle: number) {
    const rotatePoint = this.ra.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.ra.setTransformation("rotate", [x, y, angle]);
  }

  public moveLeftLeg(angle: number) {
    const rotatePoint = this.ll.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.ll.setTransformation("rotate", [x, y, angle]);
  }

  public moveRightLeg(angle: number) {
    const rotatePoint = this.rl.getTransformation("rotate");
    const [x, y, _] = rotatePoint;
    this.rl.setTransformation("rotate", [x, y, angle]);
  }

  public moveHead(angle: number) {
    const rotatePoint = this.head.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.head.setTransformation("rotate", [x, angle, z]);
  }

  public moveChest(angle: number) {
    const rotatePoint = this.chest.getTransformation("rotate");
    const [x, _, z] = rotatePoint;
    this.chest.setTransformation("rotate", [x, angle, z]);
  }

}

export default MirrorMan;
