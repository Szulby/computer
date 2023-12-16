import and from "./and.js";
import xor from "./xor.js";
import api from "./wasm.js";

function halfAdder(a, b) {
  //   let s = xor(a, b);
  const s = new Uint8Array(api.memory.buffer)[api.halfAdder(a, b)];
  //   let c = and(a, b);
  const c = new Uint8Array(api.memory.buffer)[api.halfAdder(a, b) + 4];
  return [s, c];
}

// console.time();
// halfAdder(1, 1);
// console.timeEnd();
export default halfAdder;

// console.log(halfAdder(0, 0))
// console.log(halfAdder(1, 0))
// console.log(halfAdder(0, 1))
// console.log(halfAdder(1, 1))
