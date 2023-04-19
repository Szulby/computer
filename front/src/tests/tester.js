import alu from "../computer/alu.js";

const res = alu(
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 1, 1] // 0010011
);
console.log(
  res.out,
  parseInt(res.out.join(""), 2) - (res.out[0] ? Math.pow(2, 16) : 0)
);
