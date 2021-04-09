import App from "./app";
import Scene from "./scene";
import TriangularPrism from "./object/triangularPrism";
import Test from "./object/test";
import MirrorMan from "./object/cubeman"
import Body from "./object/cubeman/parts/body";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const scene = new Scene(canvas);

const app = new App(scene);

// Toggle shading event handler
const shadingToggle = document.getElementById("shading") as HTMLInputElement;
shadingToggle.addEventListener("change", () => {
  app.toggleShading(shadingToggle.checked);
});

// Toggle texture event handler
const textureToggle = document.getElementById("texture") as HTMLInputElement;
textureToggle.addEventListener("change", () => {
  app.toggleTexture(textureToggle.checked);
});

// Section document items
const obj1Section = document.getElementById("obj1-section") as HTMLElement;
const obj2Section = document.getElementById("obj2-section") as HTMLElement;
const obj3Section = document.getElementById("obj3-section") as HTMLElement;

// Default : Hide all
const resetDisplay = () => {
  obj1Section.style.display = "none";
  obj2Section.style.display = "none";
  obj3Section.style.display = "none";
}
resetDisplay();

// Object selector button event handler
const mirrorBtn = document.getElementById("mirror-man") as HTMLElement;
mirrorBtn.addEventListener("click", () => {
  resetDisplay();
  obj1Section.style.display = "block";
  // Build mirror man
  scene.add(MirrorMan.build());
});

// TODO : Update for 2 button for each object
const obj2Btn = document.getElementById("obj2") as HTMLElement;
obj2Btn.addEventListener("click", () => {
  resetDisplay();
  obj2Section.style.display = "block";
  // TODO : Build your model here
});

const obj3Btn = document.getElementById("obj3") as HTMLElement;
obj3Btn.addEventListener("click", () => {
  resetDisplay();
  obj3Section.style.display = "block";
  // TODO : Build your model here
});

app.start();

/**
 * Archive Old Application
 */

// Pick hollow object buttons event handler
// const prismBtn = document.getElementById("prism") as HTMLElement;
// prismBtn.addEventListener("click", () => {
//   app.resetAll();
//   app.setShape(initShape("prism"));
// });

// const cubeBtn = document.getElementById("cube") as HTMLElement;
// cubeBtn.addEventListener("click", () => {
//   app.resetAll();
//   app.setShape(initShape("cube"));
// });

// const blockBtn = document.getElementById("block") as HTMLElement;
// blockBtn.addEventListener("click", () => {
//   app.resetAll();
//   app.setShape(initShape("block"));
// });

// Perspective buttons event handler
// const orthographicBtn = document.getElementById("orthographic") as HTMLElement;
// orthographicBtn.addEventListener("click", () => {
//   app.setSceneProjection("orthographic");
// });

// const obliqueBtn = document.getElementById("oblique") as HTMLElement;
// obliqueBtn.addEventListener("click", () => {
//   app.setSceneProjection("oblique");
// });

// const perspectiveBtn = document.getElementById("perspective") as HTMLElement;
// perspectiveBtn.addEventListener("click", () => {
//   app.setSceneProjection("perspective");
// });

// // function for debugging block / cube as well
// function initShape(shapeName: ShapeType): Shape {
//   let obj: Shape;
//   switch (shapeName) {
//     case "prism":
//       obj = new TriangularPrism(canvas);
//       break;
//   }
//   const shadingElmt = document.getElementById("shading") as HTMLInputElement;
//   obj.setUseShading(shadingElmt.checked);
//   return obj;
// }
//
// // Init default shapes
// // change this to prism later
// const defaultObj = initShape("prism");
//
// // Init app
// const app = new App();
// app.setShape(defaultObj);
//
// // Pick hollow object buttons event handler
// const prismBtn = document.getElementById("prism") as HTMLElement;
// prismBtn.addEventListener("click", () => {
//   app.resetAll();
//   app.setShape(initShape("prism"));
// });
//
// const cubeBtn = document.getElementById("cube") as HTMLElement;
// cubeBtn.addEventListener("click", () => {
//   app.resetAll();
//   app.setShape(initShape("cube"));
// });
//
// const blockBtn = document.getElementById("block") as HTMLElement;
// blockBtn.addEventListener("click", () => {
//   app.resetAll();
//   app.setShape(initShape("block"));
// });
//
// // Perspective buttons event handler
// const orthographicBtn = document.getElementById("orthographic") as HTMLElement;
// orthographicBtn.addEventListener("click", () => {
//   app.setShapeProjection("orthographic");
// });
//
// const obliqueBtn = document.getElementById("oblique") as HTMLElement;
// obliqueBtn.addEventListener("click", () => {
//   app.setShapeProjection("oblique");
// });
//
// const perspectiveBtn = document.getElementById("perspective") as HTMLElement;
// perspectiveBtn.addEventListener("click", () => {
//   app.setShapeProjection("perspective");
// });
//
// // Reset button event handler
// const resetBtn = document.getElementById("reset") as HTMLElement;
// resetBtn.addEventListener("click", () => {
//   app.resetShape();
// });
//
// const camResetBtn = document.getElementById("cam-reset") as HTMLElement;
// camResetBtn.addEventListener("click", () => {
//   app.resetCamera();
// });
//
// const shadingToggle = document.getElementById("shading") as HTMLInputElement;
// shadingToggle.addEventListener("change", () => {
//   app.toggleShading(shadingToggle.checked);
// });
// // Start app
// app.start();
