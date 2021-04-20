import App from "./app";
import Scene from "./scene";
import MirrorMan, {isMirrorMan} from "./object/cubeman";
import {
  HeadMirrorManAnimation,
  BodyMirrorManAnimation,
  WalkMirrorManAnimation,
  JumpMirrorManAnimation,
} from "./object/cubeman/animation";
import Knight, {isKnight} from "./object/knight";
import {
  OnGuardKnightAnimation,
  SlashKnightAnimation,
  DanceKnightAnimation,
} from "./object/knight/animation";

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

const animObj1Section = document.getElementById("anim-obj1-section") as HTMLElement;
const animObj2Section = document.getElementById("anim-obj2-section") as HTMLElement;

// Default : Hide all
const resetDisplay = () => {
  obj1Section.style.display = "none";
  obj2Section.style.display = "none";
  obj3Section.style.display = "none";

  animObj1Section.style.display = "none";
  animObj2Section.style.display = "none";
};
resetDisplay();

// Object selector button event handler
const mirrorBtn = document.getElementById("mirror-man") as HTMLElement;
mirrorBtn.addEventListener("click", () => {
  resetDisplay();
  obj1Section.style.display = "block";
  animObj1Section.style.display = "block";

  // Empty scene first, notes can change logic
  if (scene.objects.length > 0) scene.objects = [];

  // Build mirror man
  scene.add(MirrorMan.build());
});

const knightBtn = document.getElementById("knight") as HTMLElement;
knightBtn.addEventListener("click", () => {
  resetDisplay();
  obj2Section.style.display = "block";
  animObj2Section.style.display = "block";

  // Build knight
  scene.add(Knight.build(), true);
});

const obj3Btn = document.getElementById("obj3") as HTMLElement;
obj3Btn.addEventListener("click", () => {
  resetDisplay();
  obj3Section.style.display = "block";
  // TODO : Build your model here
});

/**
 * Mirror Man Section Start
 */

const obj1ResetBtn = document.getElementById("reset-obj1") as HTMLElement;
obj1ResetBtn.addEventListener("click", () => {
  scene?.objects.forEach((object) => isMirrorMan(object) && object.reset());

  // Empty scene first, notes can change logic
  if (scene.objects.length > 0) scene.objects = [];

  // Build mirror man
  scene.add(MirrorMan.build());

});

/**
 * Slider DOM Listener
 */

const sliders = document.querySelectorAll(".slider-move") as NodeListOf<HTMLInputElement>;
const sliderUsage = (clickable: boolean) => {
  sliders.forEach((slider) => {
    slider.disabled = !clickable;
  });
};

/**
 * Attach Animation Listener
 */

const obj1HeadClipBtn = document.getElementById("animate-obj1-1") as HTMLElement;
obj1HeadClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isMirrorMan(object) && object.setAnimationClip(new HeadMirrorManAnimation(5)),
  );
});

const obj1WalkClipBtn = document.getElementById("animate-obj1-3") as HTMLElement;
obj1WalkClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isMirrorMan(object) && object.setAnimationClip(new WalkMirrorManAnimation(5)),
  );
});

const obj1JumpClipBtn = document.getElementById("animate-obj1-4") as HTMLElement;
obj1JumpClipBtn.addEventListener("click", () => {
  scene?.objects.forEach((object) => isMirrorMan(object) && object.reset());
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isMirrorMan(object) && object.setAnimationClip(new JumpMirrorManAnimation(3)),
  );
});

const obj1ResetClipBtn = document.getElementById("animate-reset-obj1") as HTMLElement;
obj1ResetClipBtn.addEventListener("click", () => {
  sliderUsage(true);
  scene.objects.forEach((object) => isMirrorMan(object) && object.setAnimationClip(null));
});

/**
 * Mirror Man Section End
 */

/**
 * Knight Section Start
 */

const obj2ResetBtn = document.getElementById("reset-obj2") as HTMLElement;
obj2ResetBtn.addEventListener("click", () => {
  scene?.objects.forEach((object) => isKnight(object) && object.reset());

  // Build knight
  scene.add(Knight.build(), true);
});

/**
 * Attach Animation Listener
 */

const obj2OnGuardClipBtn = document.getElementById("animate-obj2-1") as HTMLElement;
obj2OnGuardClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isKnight(object) && object.setAnimationClip(new OnGuardKnightAnimation(1)),
  );
});

const obj2SlashClipBtn = document.getElementById("animate-obj2-2") as HTMLElement;
obj2SlashClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isKnight(object) && object.setAnimationClip(new SlashKnightAnimation(1)),
  );
});

const obj2DanceClipBtn = document.getElementById("animate-obj2-3") as HTMLElement;
obj2DanceClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isKnight(object) && object.setAnimationClip(new DanceKnightAnimation(1)),
  );
});

const obj2ResetClipBtn = document.getElementById("animate-reset-obj2") as HTMLElement;
obj2ResetClipBtn.addEventListener("click", () => {
  sliderUsage(true);
  scene.objects.forEach((object) => isKnight(object) && object.setAnimationClip(null));
});

/**
 * Knight Section End
 */

/*
 * Camera Reset
 */
const camResetBtn = document.getElementById("cam-reset") as HTMLElement;
camResetBtn.addEventListener("click", () => {
  app.resetCamera();
});

/*
 * Start App
 */
app.start();

/**
 * Setup Save/Load Action Button
 */

 let file: File | null = null;
 const fileInput = document.getElementById("file") as HTMLInputElement;
 fileInput.onchange = () => {
   file = fileInput.files?.item(0) ?? null;
 };

 // Save Load Module
// const loadApp = (savedModel: SavedModel) => {
//   try {
//     let appObject: IAppObject;
//     switch (savedModel.type) {
//       case "cube-hollow":
//         appObject = new CubeHollow(canvas, gl, savedModel.data);
//         break;
//       case "prism-hollow":
//         appObject = new PrismHollow(canvas, gl, savedModel.data);
//         break;
//     }
//     app.setShape(appObject);
//     reset();
//   } catch (error) {
//     alert(error);
//   }
// };


 const loadButton = document.getElementById("load") as HTMLButtonElement;
 loadButton.onclick = () => {
   if (!file) {
     alert("Belum ada file yang dipilih");
     return;
   }
   const reader = new FileReader();
   reader.addEventListener("load", (event) => {
     const result = event.target?.result;
     if (typeof result === "string") {
       const [type, body] = result.split("\n");
       if (type == "Knight") {
         knightBtn.click();
         scene.add(Knight.build().load(result), true);
       } else {
         alert("Invalid save file");
       }
     }
   });
   reader.readAsText(file);
 };

 function download(filename: string, content: string) {
   var element = document.createElement("a");
   element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
   element.setAttribute("download", filename);

   element.style.display = "none";
   document.body.appendChild(element);

   element.click();

   document.body.removeChild(element);
 }

 const saveButton = document.getElementById("save") as HTMLButtonElement;
 saveButton.onclick = () => {
   const data = scene.objects[0].save();
   if (data) {
     download("articulate-model.json", data);
   } else {
     alert("No shape found.");
   }
 };


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
