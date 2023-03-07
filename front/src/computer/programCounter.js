import sixteenBitRegister from "./sixteenBitRegister.js";
import inc16 from "./inc16.js";

export default function programCounter() {
  const register = sixteenBitRegister();
  return function (inp = [], load, reset) {
    if (reset) {
      return register([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1);
    }
    if (load) {
      return register(inp, load);
    }
    return register(inc16(register()), 1);
  };
}

// const pc = programCounter();

// console.log(pc([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 1, 0));
// console.log(pc([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 1, 1));
// console.log(pc([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 1, 1));
