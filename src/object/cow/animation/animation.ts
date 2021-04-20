import Cow from "../cow";

export default interface ICowAnimation {
  doAnimation(delta: number, obj: Cow): void;
}
