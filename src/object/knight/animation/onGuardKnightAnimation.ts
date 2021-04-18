import KnightAnimation from "./knightAnimation";

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        // Raise shield
        luaY: 0,
        luaZ: 0,
        llaBend: 0,
        llaTwist: 0,
        // Raise sword
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Ready leg stance
        lulX: 0,
        rulX: 0,
        lllBend: 0,
        rllBend: 0,
        // Search around
        head: 0,
        chest: 0,
      }
    },
    {
      index: 10,
      position: {
        // Raise shield
        luaY: -25,
        luaZ: 45,
        llaBend: -60,
        llaTwist: 45,
        // Raise sword
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Ready leg stance
        lulX: -3,
        rulX: -3,
        lllBend: 6,
        rllBend: 6,
        // Search around
        head: 0,
        chest: 0,
      }
    },
    {
      index: 20,
      position: {
        // Raise shield
        luaY: -40,
        luaZ: 80,
        llaBend: -100,
        llaTwist: 80,
        // Raise sword
        ruaX: 0,
        ruaZ: -24,
        rlaBend: -24,
        rlaTwist: 15,
        // Ready leg stance
        lulX: -6,
        rulX: -6,
        lllBend: 12,
        rllBend: 12,
        // Search around
        head: 0,
        chest: 0,
      }
    },
    {
      index: 30,
      position: {
        // Raise shield
        luaY: -45,
        luaZ: 90,
        llaBend: -117,
        llaTwist: 90,
        // Raise sword
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: 15,
        // Ready leg stance
        lulX: -10,
        rulX: -10,
        lllBend: 20,
        rllBend: 20,
        // Search around
        head: 0,
        chest: 0,
      }
    },
    {
      index: 40,
      position: {
        // Raise shield
        luaY: -45,
        luaZ: 90,
        llaBend: -117,
        llaTwist: 90,
        // Raise sword
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: 15,
        // Ready leg stance
        lulX: -10,
        rulX: -10,
        lllBend: 20,
        rllBend: 20,
        // Search around
        head: 30,
        chest: 30,
      }
    },
    {
      index: 60,
      position: {
        // Raise shield
        luaY: -45,
        luaZ: 90,
        llaBend: -117,
        llaTwist: 90,
        // Raise sword
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: 15,
        // Ready leg stance
        lulX: -10,
        rulX: -10,
        lllBend: 20,
        rllBend: 20,
        // Search around
        head: -30,
        chest: -30,
      }
    },
    {
      index: 70,
      position: {
        // Raise shield
        luaY: -45.001,
        luaZ: 90,
        llaBend: -117,
        llaTwist: 90,
        // Raise sword
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: 15,
        // Ready leg stance
        lulX: -10,
        rulX: -10,
        lllBend: 20,
        rllBend: 20,
        // Search around
        head: 0,
        chest: 0,
      }
    },
    {
      index: 100,
      position: {
        // Raise shield
        luaY: 0,
        luaZ: 0,
        llaBend: 0,
        llaTwist: 0,
        // Raise sword
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Ready leg stance
        lulX: 0,
        rulX: 0,
        lllBend: 0,
        rllBend: 0,
        // Search around
        head: 0,
        chest: 0,
      }
    },
  ],
  duration: 4
}

class OnGuardKnightAnimation extends KnightAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default OnGuardKnightAnimation;
