import CowAnimation from './cowAnimation';

const animation = {
  keyframes: [
    {
      index: 0,
      position: {
        head: -25,
        lfl: 50,
        rfl: -50,
        lbl: -50,
        rbl: 50
      },
    },
    {
      index: 25,
      position: {
        head: 0,
        lfl: 0,
        rfl: 0,
        lbl: 0,
        rbl: 0
      },
    },
    {
      index: 50,
      position: {
        head: 25,
        lfl: -50,
        rfl: 50,
        lbl: 50,
        rbl: -50
      },
    },
    {
      index: 75,
      position: {
        head: 0,
        lfl: 0,
        rfl: 0,
        lbl: 0,
        rbl: 0
      },
    },
    {
      index: 100,
      position: {
        head: -25,
        lfl: 50,
        rfl: -50,
        lbl: -50,
        rbl:50
      },
    },
  ],
  duration: 5,
};

class WalkCowAnimation extends CowAnimation {
  constructor(speed: number = 1) {
    super(animation.keyframes, animation.duration / speed);
    console.log('a');
  }
}

export default WalkCowAnimation;
