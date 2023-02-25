import sixteenBitRegister from "./sixteenBitRegister.js";
export default function memory(length) {
  const state = Array(length)
    .fill(sixteenBitRegister)
    .map((sixteen) => sixteen());
  return (input = [], addr, load) => {
    //debug
    if (typeof addr !== "number") {
      return state.map((el) => el());
    }
    return state[addr](input, load);
  };
}
