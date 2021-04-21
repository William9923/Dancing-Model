import MirrorManAnimation from "./mirrormanAnimation";

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        // Moving Head
        head: 0,
        // Moving Shoulder
        rs: 0,
        ls: 0,
        // Moving Hand
        ra: 0,
        la: 0,
        // Moving Leg
        rl: 0,
        ll: 0,
        // Moving Hip
        rh: 0,
        lh: 0,
      },
    },
    {
      index: 25,
      position: {
        // Moving Head
        head: 15,
        // Moving Shoulder
        rs: -15,
        ls: 15,
        // Moving Hand
        ra: -60,
        la: -30,
        // Moving Leg
        rl: 30,
        ll: 0,
        // Moving Hip
        rh: 30,
        lh: -30,
      },
    },
    {
      index: 50,
      position: {
        // Moving Head
        head: 0,
        // Moving Shoulder
        rs: 0,
        ls: 0,
        // Moving Hand
        ra: 0,
        la: 0,
        // Moving Leg
        rl: 0,
        ll: 0,
        // Moving Hip
        rh: 0,
        lh: 0,
      },
    },
    {
      index: 75,
      position: {
        // Moving Head
        head: -15,
        // Moving Shoulder
        rs: 15,
        ls: -15,
        // Moving Hand
        ra: -30,
        la: -60,
        // Moving Leg
        rl: 0,
        ll: 30,
        // Moving Hip
        rh: -30,
        lh: 30,
      },
    },
    {
      index: 100,
      position: {
        // Moving Head
        head: 0,
        // Moving Shoulder
        rs: 0,
        ls: 0,
        // Moving Hand
        ra: 0,
        la: 0,
        // Moving Leg
        rl: 0,
        ll: 0,
        // Moving Hip
        rh: 0,
        lh: 0,
      },
    },
  ],
  duration: 5,
};

class WalkMirrorManAnimation extends MirrorManAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default WalkMirrorManAnimation;
