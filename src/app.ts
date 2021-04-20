import Scene from "./scene";
import SliderManager from "./SliderManager";

import {isMirrorMan} from "./object/cubeman";
import {isKnight} from "./object/knight";
import {isCow} from "./object/cow";

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
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveLeftArm(-1 * val));
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
      this.scene?.objects.forEach((object) => isMirrorMan(object) && object.moveRightLeg(val));
    });

    /**
     * Knight Event Listener
     */

    // Head
    SliderManager.assignInputEvent("k-head-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveHead(val));
    });

    // Chest
    SliderManager.assignInputEvent("k-chest-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveChest(val));
    });

    // Hip
    SliderManager.assignInputEvent("k-hip-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveHip(val));
    });

    // Left arm
    SliderManager.assignInputEvent("k-lua-x-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveLeftUpperArmX(val));
    });

    SliderManager.assignInputEvent("k-lua-y-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveLeftUpperArmY(val));
    });

    SliderManager.assignInputEvent("k-lua-z-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveLeftUpperArmZ(val));
    });

    SliderManager.assignInputEvent("k-bend-lla-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.bendLeftLowerArm(val));
    });

    SliderManager.assignInputEvent("k-twist-lla-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.twistLeftLowerArm(val));
    });

    // Right arm
    SliderManager.assignInputEvent("k-rua-x-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveRightUpperArmX(val));
    });

    SliderManager.assignInputEvent("k-rua-y-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveRightUpperArmY(val));
    });

    SliderManager.assignInputEvent("k-rua-z-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveRightUpperArmZ(val));
    });

    SliderManager.assignInputEvent("k-bend-rla-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.bendRightLowerArm(val));
    });

    SliderManager.assignInputEvent("k-twist-rla-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.twistRightLowerArm(val));
    });

    // Left leg
    SliderManager.assignInputEvent("k-lul-x-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveLeftUpperLegX(val));
    });

    SliderManager.assignInputEvent("k-lul-z-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveLeftUpperLegZ(val));
    });

    SliderManager.assignInputEvent("k-bend-lll-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.bendLeftLowerLeg(val));
    });

    // Right leg
    SliderManager.assignInputEvent("k-rul-x-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveRightUpperLegX(val));
    });

    SliderManager.assignInputEvent("k-rul-z-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.moveRightUpperLegZ(val));
    });

    SliderManager.assignInputEvent("k-bend-rll-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isKnight(object) && object.bendRightLowerLeg(val));
    });

    // /**
    //  * Cow Event Listener
    // */

    SliderManager.assignInputEvent("cow-head-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isCow(object) && object.moveHead(val));
    });
    SliderManager.assignInputEvent("cow-body-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isCow(object) && object.moveBody(val));
    });
    SliderManager.assignInputEvent("cow-lfl-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isCow(object) && object.moveLeftFrontLeg(val));
    });
    SliderManager.assignInputEvent("cow-rfl-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isCow(object) && object.moveRightFrontLeg(val));
    });
    SliderManager.assignInputEvent("cow-lbl-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isCow(object) && object.moveLeftBackLeg(val));
    });
    SliderManager.assignInputEvent("cow-rbl-slider", (val: number) => {
      this.scene?.objects.forEach((object) => isCow(object) && object.moveRightBackLeg(val));
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

  public resetCamera() {
    SliderManager.resetCameraSliderValue();
  }

  public start() {
    if (!this.scene) {
      throw "No scene defined!";
    }
    this.initSliders();
    const loop = (time: number) => {
      const now = time * 0.01; // time in milliseconds * 0.1

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
