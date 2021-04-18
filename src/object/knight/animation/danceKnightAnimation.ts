import KnightAnimation from "./knightAnimation";

const animation = {
  keyframes: [
    // intro
    {
      index: 0,
      position: {
        // Left hand
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Leg
        lulX: 0,
        lulZ: 0,
        rulX: 0,
        lllBend: 0,
        rllBend: 0,
        // Main part
        hip: 0,
        translateHipY: 0,
        shieldX: 0,
      }
    },
    {
      index: 5,
      position: {
        // Left hand
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Leg
        lulX: -25,
        lulZ: 0,
        rulX: -25,
        lllBend: 45,
        rllBend: 45,
        // Main part
        hip: 0,
        translateHipY: -0.05,
        shieldX: 0,
      }
    },
    {
      index: 10,
      position: {
        // Left hand
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Leg
        lulX: -15,
        lulZ: 0,
        rulX: 0,
        lllBend: 30,
        rllBend: 0,
        // Main part
        hip: 0,
        translateHipY: 0,
        shieldX: 0,
      }
    },
    // 0 - 90
    {
      index: 15,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 22.5,
        translateHipY: 0.1,
        shieldX: 90,
      }
    },
    {
      index: 20,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: 0,
        lulZ: -10,
        rulX: -80,
        lllBend: 0,
        rllBend: 80,
        // Main part
        hip: 45,
        translateHipY: 0.2,
        shieldX: 180,
      }
    },
    {
      index: 25,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 67.5,
        translateHipY: 0.1,
        shieldX: 270,
      }
    },
    {
      index: 30,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -15,
        lulZ: -10,
        rulX: -80,
        lllBend: 30,
        rllBend: 80,
        // Main part
        hip: 90,
        translateHipY: 0,
        shieldX: 360,
      }
    },
    {
      index: 30.001,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -15,
        lulZ: -10,
        rulX: -80,
        lllBend: 30,
        rllBend: 80,
        // Main part
        hip: 90,
        translateHipY: 0,
        shieldX: 0,
      }
    },
    // 90 - 180
    {
      index: 35,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 112.5,
        translateHipY: 0.1,
        shieldX: 90,
      }
    },
    {
      index: 40,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: 0,
        lulZ: -10,
        rulX: -80,
        lllBend: 0,
        rllBend: 80,
        // Main part
        hip: 135,
        translateHipY: 0.2,
        shieldX: 180,
      }
    },
    {
      index: 45,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 157.5,
        translateHipY: 0.1,
        shieldX: 270,
      }
    },
    {
      index: 50,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -15,
        lulZ: -10,
        rulX: -80,
        lllBend: 30,
        rllBend: 80,
        // Main part
        hip: 180,
        translateHipY: 0,
        shieldX: 360,
      }
    },
    {
      index: 50.001,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -15,
        lulZ: -10,
        rulX: -80,
        lllBend: 30,
        rllBend: 80,
        // Main part
        hip: 180,
        translateHipY: 0,
        shieldX: 0,
      }
    },
    // 180 - 270
    {
      index: 55,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 202.5,
        translateHipY: 0.1,
        shieldX: 90,
      }
    },
    {
      index: 60,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: 0,
        lulZ: -10,
        rulX: -80,
        lllBend: 0,
        rllBend: 80,
        // Main part
        hip: 225,
        translateHipY: 0.2,
        shieldX: 180,
      }
    },
    {
      index: 65,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 247.5,
        translateHipY: 0.1,
        shieldX: 270,
      }
    },
    {
      index: 70,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -15,
        lulZ: -10,
        rulX: -80,
        lllBend: 30,
        rllBend: 80,
        // Main part
        hip: 270,
        translateHipY: 0,
        shieldX: 360,
      }
    },
    {
      index: 70.001,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -15,
        lulZ: -10,
        rulX: -80,
        lllBend: 30,
        rllBend: 80,
        // Main part
        hip: 270,
        translateHipY: 0,
        shieldX: 0,
      }
    },
    // 270 - 360
    {
      index: 75,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 292.5,
        translateHipY: 0.1,
        shieldX: 90,
      }
    },
    {
      index: 80,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: 0,
        lulZ: -10,
        rulX: -80,
        lllBend: 0,
        rllBend: 80,
        // Main part
        hip: 315,
        translateHipY: 0.2,
        shieldX: 180,
      }
    },
    {
      index: 85,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: -102,
        ruaZ: -8,
        rlaBend: -46,
        rlaTwist: -20,
        // Leg
        lulX: -7.5,
        lulZ: -10,
        rulX: -80,
        lllBend: 15,
        rllBend: 0,
        // Main part
        hip: 337.5,
        translateHipY: 0.1,
        shieldX: 270,
      }
    },
    {
      index: 90,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Leg
        lulX: -15,
        lulZ: 0,
        rulX: 0,
        lllBend: 30,
        rllBend: 0,
        // Main part
        hip: 360,
        translateHipY: 0,
        shieldX: 360,
      }
    },
    {
      index: 90.001,
      position: {
        // Left hand
        luaX: -40,
        luaY: -45,
        luaZ: 90,
        llaBend: -70,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Leg
        lulX: -15,
        lulZ: 0,
        rulX: 0,
        lllBend: 30,
        rllBend: 0,
        // Main part
        hip: 360,
        translateHipY: 0,
        shieldX: 0,
      }
    },
    // outro
    {
      index: 95,
      position: {
        // Left hand
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Leg
        lulX: -25,
        lulZ: 0,
        rulX: -25,
        lllBend: 45,
        rllBend: 45,
        // Main part
        hip: 360,
        translateHipY: -0.05,
        shieldX: 0,
      }
    },
    {
      index: 100,
      position: {
        // Left hand
        luaX: 0,
        luaY: -65,
        luaZ: 90,
        llaBend: -95,
        llaTwist: 90,
        // Right hand
        ruaX: 0,
        ruaZ: 0,
        rlaBend: 0,
        rlaTwist: 0,
        // Lower hand
        lulX: 0,
        rulX: 0,
        lllBend: 0,
        rllBend: 0,
        // Main part
        hip: 360,
        translateHipY: 0,
        shieldX: 0,
      }
    },
  ],
  duration: 5
}

class DanceKnightAnimation extends KnightAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default DanceKnightAnimation;
