type SliderId =
  | "head-slider"
  | "body-slider"
  | "la-slider"
  | "ra-slider"
  | "ll-slider"
  | "rl-slider"
  | "x"
  | "y"
  | "z"
  | "rotate-x"
  | "rotate-y"
  | "rotate-z"
  | "zoom"
  | "cam-radius"
  | "cam-theta"
  | "cam-phi";
const sliderIds: SliderId[] = [
  "head-slider",
  "body-slider",
  "la-slider",
  "ra-slider",
  "ll-slider",
  "rl-slider",
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
  "body-slider": 0,
  "la-slider": 0,
  "ra-slider": 0,
  "ll-slider": 0,
  "rl-slider": 0
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
    })
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
