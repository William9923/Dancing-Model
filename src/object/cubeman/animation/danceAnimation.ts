import MirrorManAnimation from "./mirrormanAnimation";

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        // Moving Head
        head: 0,
        // Dabbing Position
        rs: -60,
        ls: -60,
        // Moving Stomach
        stomach: 0,
        // Moving Hip
        rh: 0,
        lh: 0,
      },
    },
    {
      index: 25,
      position: {
        // Moving Head
        head: 30,
        // Dabbing Position
        rs: -30,
        ls: 30,
        // Moving Stomach
        stomach: 15,
        // Moving Hip
        rh: -60,
        lh: 0,
      },
    },
    {
      index: 50,
      position: {
        // Moving Head
        head: 0,
        // Dabbing Position
        rs: -60,
        ls: -60,
        // Moving Stomach
        stomach: 0,
        // Moving Hip
        rh: 0,
        lh: 0,
      },
    },
    {
      index: 75,
      position: {
        // Moving Head
        head: -30,
        // Dabbing Position
        rs: 30,
        ls: -30,
        // Moving Stomach
        stomach: -15,
        // Moving Hip
        rh: 0,
        lh: -60,
      },
    },
    {
      index: 100,
      position: {
        // Moving Head
        head: 0,
        // Dabbing Position
        rs: -60,
        ls: -60,
        // Moving Stomach
        stomach: 0,
        // Moving Hip
        rh: 0,
        lh: 0,
      },
    },
  ],
  duration: 5,
};

class DanceMirrorManAnimation extends MirrorManAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default DanceMirrorManAnimation;
