import alu from "./alu.js";
import mux16 from "./mux16.js";
import sixteenBitRegister from "./sixteenBitRegister.js";
import memory from "./memory.js";
import programCounter from "./programCounter.js";
import jmp from "./jmp.js";
import axios from "axios";

// import readline from "node:readline";

// readline.emitKeypressEvents(process.stdin);
// if (process.stdin.isTTY) process.stdin.setRawMode(true);
// process.exit();
const rom = memory(5);
const ram = memory(512);
let { data } = await axios.get("/src/assembly/output");

// `0000000000001010
// 1110110010010000
// 1110001100001000
// 0000000000000000
// 1110001100000001
// `
data
  .split("\n")
  .filter((el) => el)
  .forEach((el, id) => {
    rom(
      el.split("").map((el) => parseInt(el)),
      id,
      1
    );
  });
const pc = programCounter();

const a = sixteenBitRegister();
const d = sixteenBitRegister();
// process.stdin.on("data", (str) => {
//   // exit on esc
//   if (str.toString("hex") === "1b") process.exit();
//   //reset on ` press
//   if (str.toString("hex") === "60") pc(0, 0, 1);

//   console.log(
//     str,
//     parseInt(str.toString("hex"), 16).toString(2).padStart(16, "0")
//   );
// });
self.onmessage = ({ data }) => {
  // console.log(data);
  if (data.type === "screen") {
    self.postMessage(rom());
  }
  if (data.type === "reset") {
    computer();
  }
};
async function computer() {
  pc(Array(16).fill(0), 1, 1);
  while (true) {
    const actualPc = parseInt(pc().join(""), 2);
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.log(actualPc);

    const romEl = rom()[actualPc];
    if (!romEl[0]) {
      a(romEl, 1);
    } else {
      const aluResponse = alu(
        d(),
        mux16(a(), ram()[parseInt(a().join(""), 2)], romEl[3]),
        [romEl[4], romEl[5], romEl[6], romEl[7], romEl[8], romEl[9]]
      );
      a(aluResponse.out, romEl[10]);
      d(aluResponse.out, romEl[11]);
      // store to ram
      ram(d(), parseInt(a().join(""), 2), romEl[12]);
      // jump
      jmp(romEl, aluResponse, pc, a);
    }
  }
}
computer();
