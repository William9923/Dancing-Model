import Cow from './main';

export const isCow = (obj: Cow | any): obj is Cow => {
  return obj && obj.type == "obj2";
};

export default Cow;
