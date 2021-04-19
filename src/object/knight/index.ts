import Knight from "./knight";

export const isKnight = (obj: Knight | any): obj is Knight => {
  return obj.constructor.name === "Knight";
};

export default Knight;
