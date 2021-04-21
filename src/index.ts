import App from "./app";
import Scene from "./scene";
import MirrorMan, {isMirrorMan} from "./object/cubeman";
import {
  DanceMirrorManAnimation,
  WalkMirrorManAnimation,
  JumpMirrorManAnimation,
} from "./object/cubeman/animation";
import Knight, {isKnight} from "./object/knight";
import {
  OnGuardKnightAnimation,
  SlashKnightAnimation,
  DanceKnightAnimation,
} from "./object/knight/animation";
import Cow, {isCow} from "./object/cow";

import {ISaveableNode} from "./object/node";
import WalkCowAnimation from "./object/cow/animation/walkCowAnimation";

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
const animObj3Section = document.getElementById("anim-obj3-section") as HTMLElement;

// Default : Hide all
const resetDisplay = () => {
  obj1Section.style.display = "none";
  obj2Section.style.display = "none";
  obj3Section.style.display = "none";

  animObj1Section.style.display = "none";
  animObj2Section.style.display = "none";
  animObj3Section.style.display = "none";
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

const cowBtn = document.getElementById("cow") as HTMLElement;
cowBtn.addEventListener("click", () => {
  resetDisplay();
  obj3Section.style.display = "block";
  animObj3Section.style.display = "block";
  // TODO : Build your model here

  scene.add(Cow.build(), true);
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

const obj1DanceClipBtn = document.getElementById("animate-obj1-1") as HTMLElement;
obj1DanceClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => isMirrorMan(object) && object.setAnimationClip(new DanceMirrorManAnimation(5)),
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
    (object) => isMirrorMan(object) && object.setAnimationClip(new JumpMirrorManAnimation(2)),
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

/**
 * Cow Section Start
 */

const obj3ResetBtn = document.getElementById("reset-obj3") as HTMLElement;
obj3ResetBtn.addEventListener("click", () => {
  scene?.objects.forEach((object) => isCow(object) && object.reset());

  // Build cow
  scene.add(Cow.build(), true);
});

const obj3WalkClipBtn = document.getElementById("animate-obj3-1") as HTMLElement;
obj3WalkClipBtn.addEventListener("click", () => {
  sliderUsage(false);
  scene.objects.forEach(
    (object) => {
      isCow(object) && object.setAnimationClip(new WalkCowAnimation(1))
    },
  );
});

const obj3ResetClipBtn = document.getElementById("animate-reset-obj3") as HTMLElement;
obj3ResetClipBtn.addEventListener("click", () => {
  sliderUsage(true);
  scene.objects.forEach((object) => isCow(object) && object.setAnimationClip(null));
});

/**
 * Cow Section End
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
      const [type, ] = result.split("\n");
      switch (type) {
        case "Knight":
          knightBtn.click();
          scene.add(Knight.build().load(result), true);
          break;
        case "MirrorMan" :
          mirrorBtn.click();
          scene.add(MirrorMan.build().load(result), true)
          break;
        default:
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
  const obj: ISaveableNode = scene.objects[0] as unknown as ISaveableNode;
  const data = obj.save();
  if (data) {
    download(`articulate-model-${obj.constructor.name}.json`, data);
  } else {
    alert("No shape found.");
  }
};