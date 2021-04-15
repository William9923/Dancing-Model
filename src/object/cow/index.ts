import Cow from './main';

export const isCow = (obj: Cow | any): obj is Cow => {
  return obj && obj.type == "obj1";
};

export default Cow;
