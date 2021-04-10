import MirrorMan from "../main";

export default interface IMirrorManAnimation {
  doAnimation(delta: number, obj: MirrorMan): void;
}