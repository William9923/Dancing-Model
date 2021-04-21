import CowAnimation from './cowAnimation';

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        head: -5,
        lfl: 10,
        rfl: -10,
        lbl: -10,
        rbl: 10
      },
    },
    // {
    //   index: 25,
    //   position: {
    //     head: 0,
    //     lfl: 0,
    //     rfl: 0,
    //     lbl: 0,
    //     rbl: 0
    //   },
    // },
    {
      index: 50,
      position: {
        head: 5,
        lfl: -10,
        rfl: 10,
        lbl: 10,
        rbl: -10
      },
    },
    // {
    //   index: 75,
    //   position: {
    //     head: 0,
    //     lfl: 0,
    //     rfl: 0,
    //     lbl: 0,
    //     rbl: 0
    //   },
    // },
    {
      index: 100,
      position: {
        head: 0,
        lfl: 0,
        rfl: 0,
        lbl: 0,
        rbl: 0
      },
    },
  ],
  duration: 1.5,
};

class WalkCowAnimation extends CowAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
  }
}

export default WalkCowAnimation;
