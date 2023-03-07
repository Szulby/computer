import nand from "./nand.js";
export default function mux(a, b, s) {
  return nand(nand(a, nand(s, s)), nand(b, s));
}
