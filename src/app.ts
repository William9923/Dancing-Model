import Scene from "./scene";
import SliderManager from "./SliderManager";

const X = 0;
const Y = 1;
const Z = 2;

class App {
  private scene: Scene | null = null;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public initSliders() {
    if (!this.scene) {
      return;
    }

    SliderManager.assignInputEvent("cam-radius", (val: number) => {
      this.scene?.camera?.setRadius(val);
    });
    SliderManager.assignInputEvent("cam-theta", (val: number) => {
      this.scene?.camera?.setTheta(val);
    });
    SliderManager.assignInputEvent("cam-phi", (val: number) => {
      this.scene?.camera?.setPhi(val);
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

  public start() {
    if (!this.scene) {
      throw "No scene defined!";
    }
    this.initSliders();
    const loop = (time: number) => {
      this.scene?.render();
      window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
  }
}

export default App;
