import KnightAnimation from "./knightAnimation";

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        // Open shield
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Swing sword
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
      index: 40,
      position: {
        // Open shield
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Swing sword
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: 15,
        // Ready leg stance
        lulX: 0,
        rulX: 0,
        lllBend: 0,
        rllBend: 0,
        // Search around
        head: 0,
        chest: -30,
      }
    },
    {
      index: 48,
      position: {
        // Open shield
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Swing sword
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Ready leg stance
        lulX: 0,
        rulX: 0,
        lllBend: 0,
        rllBend: 0,
        // Search around
        head: 0,
        chest: -20,
      }
    },
    {
      index: 70,
      position: {
        // Open shield
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Swing sword
        ruaX: 0,
        ruaZ: -8,
        rlaBend: -10,
        rlaTwist: -20,
        // Ready leg stance
        lulX: -12,
        rulX: -12,
        lllBend: 24,
        rllBend: 24,
        // Search around
        head: 0,
        chest: 40,
      }
    },
    {
      index: 100,
      position: {
        // Open shield
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Swing sword
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
  duration: 1.5
}

class SlashKnightAnimation extends KnightAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default SlashKnightAnimation;
