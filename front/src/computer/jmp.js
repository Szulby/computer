export default function (romEl, aluResponse, pc, a) {
  // if alu > 0 JGT
  if (
    !romEl[13] &&
    !romEl[14] &&
    romEl[15] &&
    !aluResponse.ng &&
    !aluResponse.zr
  ) {
    pc(a(), 1);
  }
  // if (ALU out = 0) jump JEQ
  if (!romEl[13] && romEl[14] && !romEl[15] && aluResponse.zr) {
    pc(a(), 1);
  }
  // if (ALU out ≥ 0) jump JGE
  if (!romEl[13] && romEl[14] && romEl[15] && !aluResponse.ng) {
    pc(a(), 1);
  }
  // if (ALU out < 0) jump JLT
  if (romEl[13] && !romEl[14] && !romEl[15] && aluResponse.ng) {
    pc(a(), 1);
  }
  //if (ALU out ≠ 0) jump JNE
  if (romEl[13] && !romEl[14] && romEl[15] && !aluResponse.zr) {
    pc(a(), 1);
  }
  //if (ALU out ≤ 0) jump JLE
  if (
    romEl[13] &&
    romEl[14] &&
    !romEl[15] &&
    (aluResponse.zr || aluResponse.ng)
  ) {
    pc(a(), 1);
  }
  // jmp uncondtional
  if (romEl[13] && romEl[14] && romEl[15]) {
    pc(a(), 1);
  }
}
