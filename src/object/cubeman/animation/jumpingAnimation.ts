import MirrorManAnimation from "./mirrormanAnimation";

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        // Moving Shoulder
        ls: -15,
        rs: -15,
        // Moving Arm
        la: -60,
        ra: -60,
        // Moving Hips
        rh: 0,
        lh: 0,
        // Moving Leg
        ll: 0,
        rl: 0,
        // Body Translation
        translateBodyY: 0,
      },
    },
    {
      index: 10,
      position: {
        // Moving Shoulder
        ls: -12,
        rs: -12,
        // Moving Arm
        la: -54,
        ra: -54,
        // Moving Hips
        rh: 3,
        lh: 3,
        // Moving Leg
        ll: 6,
        rl: 6,
        // Body Translation
        translateBodyY: 0.01,
      },
    },
    {
      index: 20,
      position: {
        // Moving Shoulder
        ls: -9,
        rs: -9,
        // Moving Arm
        la: -48,
        ra: -48,
        // Moving Hips
        rh: 6,
        lh: 6,
        // Moving Leg
        ll: 12,
        rl: 12,
        // Body Translation
        translateBodyY: 0.03,
      },
    },
    {
      index: 30,
      position: {
        // Moving Shoulder
        ls: -6,
        rs: -6,
        // Moving Arm
        la: -42,
        ra: -42,
        // Moving Hips
        rh: 9,
        lh: 9,
        // Moving Leg
        ll: 18,
        rl: 18,
        // Body Translation
        translateBodyY: 0.05,
      },
    },
    {
      index: 40,
      position: {
        // Moving Shoulder
        ls: -3,
        rs: -3,
        // Moving Arm
        la: -36,
        ra: -36,
        // Moving Hips
        rh: 12,
        lh: 12,
        // Moving Leg
        ll: 24,
        rl: 24,
        // Body Translation
        translateBodyY: 0.08,
      },
    },
    {
      index: 50,
      position: {
        // Moving Shoulder
        ls: 0,
        rs: 0,
        // Moving Arm
        la: -30,
        ra: -30,
        // Moving Hips
        rh: 15,
        lh: 15,
        // Moving Leg
        ll: 30,
        rl: 30,
        // Body Translation
        translateBodyY: 0.1,
      },
    },
    {
      index: 60,
      position: {
        // Moving Shoulder
        ls: -3,
        rs: -3,
        // Moving Arm
        la: -36,
        ra: -36,
        // Moving Hips
        rh: 12,
        lh: 12,
        // Moving Leg
        ll: 24,
        rl: 24,
        // Body Translation
        translateBodyY: 0.08,
      },
    },
    {
      index: 70,
      position: {
        // Moving Shoulder
        ls: -6,
        rs: -6,
        // Moving Arm
        la: -42,
        ra: -42,
        // Moving Hips
        rh: 9,
        lh: 9,
        // Moving Leg
        ll: 18,
        rl: 18,
        // Body Translation
        translateBodyY: 0.05,
      },
    },
    {
      index: 80,
      position: {
        // Moving Shoulder
        ls: -9,
        rs: -9,
        // Moving Arm
        la: -48,
        ra: -48,
        // Moving Hips
        rh: 6,
        lh: 6,
        // Moving Leg
        ll: 12,
        rl: 12,
        // Body Translation
        translateBodyY: 0.03,
      },
    },
    {
      index: 90,
      position: {
        // Moving Shoulder
        ls: -12,
        rs: -12,
        // Moving Arm
        la: -54,
        ra: -54,
        // Moving Hips
        rh: 3,
        lh: 3,
        // Moving Leg
        ll: 6,
        rl: 6,
        // Body Translation
        translateBodyY: 0.01,
      },
    },
    {
      index: 100,
      position: {
        // Moving Shoulder
        ls: -15,
        rs: -15,
        // Moving Arm
        la: -60,
        ra: -60,
        // Moving Hips
        rh: 0,
        lh: 0,
        // Moving Leg
        ll: 0,
        rl: 0,
        // Body Translation
        translateBodyY: 0,
      },
    },
  ],
  duration: 2.5,
};

class JumpMirrorManAnimation extends MirrorManAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default JumpMirrorManAnimation;
