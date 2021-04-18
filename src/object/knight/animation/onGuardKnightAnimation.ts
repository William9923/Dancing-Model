import KnightAnimation from "./knightAnimation";

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        ruaX: 0
      }
    },
    {
      index: 33,
      position: {
        ruaX: 90,
        luaX: 0
      }
    },
    {
      index: 66,
      position: {
        ruaX: -90,
        luaX: 90
      }
    },
    {
      index: 100,
      position: {
        ruaX: 0,
        luaX: 0
      }
    },
  ],
  duration: 3
}

class OnGuardKnightAnimation extends KnightAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default OnGuardKnightAnimation;
