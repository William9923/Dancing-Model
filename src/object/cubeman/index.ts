import MirrorMan from "./main";

export const isMirrorMan = (obj: MirrorMan | any): obj is MirrorMan => {
  return obj && obj.constructor.name == "MirrorMan";
};
// prettier-ignore
export default MirrorMan;
