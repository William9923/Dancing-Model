type SliderId =
  // Default Slider
  | "x"
  | "y"
  | "z"
  | "rotate-x"
  | "rotate-y"
  | "rotate-z"

  // Camera Slider
  | "zoom"
  | "cam-radius"
  | "cam-theta"
  | "cam-phi"

  // Mirror Man Slider
  | "ls-slider"
  | "rs-slider"
  | "lh-slider"
  | "rh-slider"
  | "head-slider"
  | "la-slider"
  | "ra-slider"
  | "ll-slider"
  | "rl-slider"

  // Knight Slider
  | "k-head-slider"
  | "k-chest-slider"
  | "k-hip-slider"
  | "k-lua-x-slider"
  | "k-lua-y-slider"
  | "k-lua-z-slider"
  | "k-bend-lla-slider"
  | "k-twist-lla-slider"
  | "k-rua-x-slider"
  | "k-rua-y-slider"
  | "k-rua-z-slider"
  | "k-bend-rla-slider"
  | "k-twist-rla-slider"
  | "k-lul-x-slider"
  | "k-lul-z-slider"
  | "k-bend-lll-slider"
  | "k-rul-x-slider"
  | "k-rul-z-slider"
  | "k-bend-rll-slider"

  // Cow Slider
  | "cow-head-slider"
  | "cow-body-slider"
  | "cow-lfl-slider"
  | "cow-rfl-slider"
  | "cow-lbl-slider"
  | "cow-rbl-slider"
  ;

const sliderIds: SliderId[] = [
  "head-slider",
  "ls-slider",
  "rs-slider",
  "lh-slider",
  "rh-slider",
  "la-slider",
  "ra-slider",
  "ll-slider",
  "rl-slider",
  "k-head-slider",
  "k-chest-slider",
  "k-hip-slider",
  "k-lua-x-slider",
  "k-lua-y-slider",
  "k-lua-z-slider",
  "k-bend-lla-slider",
  "k-twist-lla-slider",
  "k-rua-x-slider",
  "k-rua-y-slider",
  "k-rua-z-slider",
  "k-bend-rla-slider",
  "k-twist-rla-slider",
  "k-lul-x-slider",
  "k-lul-z-slider",
  "k-bend-lll-slider",
  "k-rul-x-slider",
  "k-rul-z-slider",
  "k-bend-rll-slider",
  "cow-head-slider",
  "cow-body-slider",
  "cow-lfl-slider",
  "cow-rfl-slider",
  "cow-lbl-slider",
  "cow-rbl-slider",
  "cam-radius",
  "cam-theta",
  "cam-phi",
];

type Sliders = {
  [sliderId: string]: HTMLInputElement;
};
const sliders: Sliders = {};
type SliderIndicator = {
  [sliderId: string]: HTMLSpanElement;
};
const sliderIndicators: SliderIndicator = {};
type SliderDefaultValue = {
  [sliderId: string]: number;
};

const mmSliderDefaultValues: SliderDefaultValue = {
  "head-slider": 0,
  "ls-slider" : 0,
  "rs-slider" : 0,
  "lh-slider" : 0,
  "rh-slider": 0,
  "la-slider": 0,
  "ra-slider": 0,
  "ll-slider": 0,
  "rl-slider": 0,
};
const kSliderDefaultValues: SliderDefaultValue = {
  "k-head-slider": 0,
  "k-chest-slider": 0,
  "k-hip-slider": 0,
  "k-lua-x-slider": 0,
  "k-lua-y-slider": 0,
  "k-lua-z-slider": 0,
  "k-bend-lla-slider": 0,
  "k-twist-lla-slider": 0,
  "k-rua-x-slider": 0,
  "k-rua-y-slider": 0,
  "k-rua-z-slider": 0,
  "k-bend-rla-slider": 0,
  "k-twist-rla-slider": 0,
  "k-lul-x-slider": -8,
  "k-lul-z-slider": 0,
  "k-bend-lll-slider": 16,
  "k-rul-x-slider": -8,
  "k-rul-z-slider": 0,
  "k-bend-rll-slider": 16,

}
const cowSliderDefaultValues: SliderDefaultValue = {
  "cow-head-slider": 0,
  "cow-body-slider": 0,
  "cow-lfl-slider": 0,
  "cow-rfl-slider": 0,
  "cow-lbl-slider": 0,
  "cow-rbl-slider": 0
}
const cSliderDefaultValues: SliderDefaultValue = {
  "cam-radius": 1,
  "cam-theta": 0,
  "cam-phi": 0,
};

sliderIds.forEach((sliderId) => {
  sliders[sliderId] = document.getElementById(sliderId) as HTMLInputElement;
  sliderIndicators[`${sliderId}-value`] = document.getElementById(
    `${sliderId}-value`,
  ) as HTMLSpanElement;
  sliderIndicators[`${sliderId}-value`].innerText = sliders[sliderId].value;
});

const getSlider = (sliderId: SliderId) => sliders[sliderId];

class SliderManager {
  static assignInputEvent(sliderId: SliderId, callback: Function) {
    const elmt = getSlider(sliderId);
    elmt.oninput = function () {
      const value = this.value;
      sliderIndicators[`${elmt.id}-value`].innerText = value;
      callback(value);
    };
  }

  static resetMMSliderValue() {
    sliderIds.forEach((sliderId) => {
      if (mmSliderDefaultValues.hasOwnProperty(sliderId)) {
        sliders[sliderId].value = String(mmSliderDefaultValues[sliderId]);
        sliders[sliderId].dispatchEvent(new Event("input"));
      }
    });
  }

  static resetKSliderValue() {
    sliderIds.forEach((sliderId) => {
      if (kSliderDefaultValues.hasOwnProperty(sliderId)) {
        sliders[sliderId].value = String(kSliderDefaultValues[sliderId]);
        sliders[sliderId].dispatchEvent(new Event("input"));
      }
    });
  }

  static resetCowSliderValue() {
    sliderIds.forEach((sliderId) => {
      if (cowSliderDefaultValues.hasOwnProperty(sliderId)) {
        sliders[sliderId].value = String(cowSliderDefaultValues[sliderId]);
        sliders[sliderId].dispatchEvent(new Event("input"));
      }
    });
  }

  static resetCameraSliderValue() {
    sliderIds.forEach((sliderId) => {
      if (cSliderDefaultValues.hasOwnProperty(sliderId)) {
        sliders[sliderId].value = String(cSliderDefaultValues[sliderId]);
        sliders[sliderId].dispatchEvent(new Event("input"));
      }
    });
  }
}
export default SliderManager;
export {sliderIds};
