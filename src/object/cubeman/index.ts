import MirrorMan from "./main";

export const isMirrorMan = (obj: MirrorMan | any): obj is MirrorMan => {
  return obj && obj.type == "obj1";
};
// prettier-ignore
export default MirrorMan;
