import api from "./wasm.js";
export default function and(a, b) {
  return api.nand(api.nand(a, b), api.nand(a, b));
}
