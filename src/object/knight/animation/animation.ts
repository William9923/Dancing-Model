import Knight from "../knight";

export default interface IKnightAnimation {
  doAnimation(delta: number, obj: Knight): void;
}
