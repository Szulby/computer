import sixteenBitRegister from "./sixteenBitRegister.js";
export default function memory256() {
  const state = Array(4)
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
