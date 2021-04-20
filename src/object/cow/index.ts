import Cow from "./cow";

export const isCow = (obj: Cow | any): obj is Cow => {
  return obj && obj.constructor.name === "Cow";
};

export default Cow;
