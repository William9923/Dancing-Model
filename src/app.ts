import Scene from "./scene";
import SliderManager from "./SliderManager";

import {isMirrorMan} from "./object/cubeman";

const X = 0;
const Y = 1;
const Z = 2;

class App {
  private scene: Scene | null = null;

  private then: number;

  constructor(scene: Scene) {
    this.scene = scene;
    this.then = 0; // init animation frame
  }

  public initSliders() {
    if (!this.scene) {
      return;
    }

    /**
     * Camera Event Listener
     */

    SliderManager.assignInputEvent("cam-radius", (val: number) => {
      this.scene?.camera?.setRadius(val);
    });
    SliderManager.assignInputEvent("cam-theta", (val: number) => {
      this.scene?.camera?.setTheta(val);
    });
    SliderManager.assignInputEvent("cam-phi", (val: number) => {
      this.scene?.camera?.setPhi(val);
    });

    /**
     * Mirror Man Event Listener
     */

    // Head
    SliderManager.assignInputEvent("head-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveHead(val));
    });

    // Body
    SliderManager.assignInputEvent("body-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveChest(val));
    });

    // Stomach
    SliderManager.assignInputEvent("stomach-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveStomach(val));
    });

    // Left Shoulder
    SliderManager.assignInputEvent("ls-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveLeftShoulder(val));
    });

    // Right Shoulder
    SliderManager.assignInputEvent("rs-slider", (val: number) => {
      this.scene?.objects.forEach(
        (object) => isMirrorMan(object) && object.moveRightShoulder(-1 * val),
      );
    });

    // Left Arm
    SliderManager.assignInputEvent("la-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveLeftArm(val));
    });

    // Right Arm
    SliderManager.assignInputEvent("ra-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveRightArm(-1 * val));
    });

    // Left Hip
    SliderManager.assignInputEvent("lh-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveLeftHips(-1 * val));
    });

    // Right Hip
    SliderManager.assignInputEvent("rh-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveRightHips(val));
    });

    // Left Leg
    SliderManager.assignInputEvent("ll-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveLeftLeg(val));
    });

    // Right Leg
    SliderManager.assignInputEvent("rl-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveRightLeg(-1 * val));
    });
  }

  public setScene(scene: Scene) {
    this.scene = scene;
  }

  public setSceneProjection(projectionType: Projection) {
    this.scene?.setProjection(projectionType);
  }

  public toggleShading(useShading: boolean) {
    this.scene?.setUseShading(useShading);
  }

  public toggleTexture(useTexture: boolean) {
    this.scene?.setUseTexture(useTexture);
  }

  public start() {
    if (!this.scene) {
      throw "No scene defined!";
    }
    this.initSliders();
    const loop = (time: number) => {
      const now = time * 0.001; // time in milliseconds

      this.scene?.animate(now - this.then);

      this.scene?.render();
      this.then = now;

      // Draw next scene
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }
}

export default App;
