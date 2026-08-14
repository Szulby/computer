import xor from "./xor.js";
import or from "./or.js";
import and from "./and.js";

function fullAdder(a, b, c) {
  let s = xor(xor(a, b), c);
  let oc = or(and(xor(a, b), c), and(a, b));
  return [s, oc];
}

// console.time();
// fullAdder(1, 1, 1); // default: 0.131103515625 ms // default: 0.717041015625 ms
// console.timeEnd();

export default fullAdder;

// console.log('a=0 b=0 c=0 s=0 c=0', fullAdder(0, 0, 0))
// console.log('a=0 b=1 c=1 s=1 c=0', fullAdder(0, 0, 1))
// console.log('a=0 b=1 c=0 s=1 c=0', fullAdder(0, 1, 0))
// console.log('a=0 b=1 c=1 s=0 c=1', fullAdder(0, 1, 1))
// console.log('a=1 b=0 c=0 s=1 c=0', fullAdder(1, 0, 0))
// console.log('a=1 b=0 c=1 s=0 c=1', fullAdder(1, 0, 1))
// console.log('a=1 b=1 c=0 s=0 c=1', fullAdder(1, 1, 0))
// console.log('a=1 b=1 c=1 s=1 c=1', fullAdder(1, 1, 1))

// 0	0	0	0	0
// 0	0	1	0	1
// 0	1	0	0	1
// 0	1	1	1	0 //
// 1	0	0	0	1 //
// 1	0	1	1	0 //
// 1	1	0	1	0
// 1	1	1	1	1
