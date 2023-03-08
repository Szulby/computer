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

let { data } = await axios.get("/src/assembly/output");

let preparedData = data.split("\n").filter((el) => el);

const rom = memory(preparedData.length);
// const rom = memory(10);
const ram = memory(1024 * 32);

preparedData.forEach((el, id) => {
  rom(
    el.split("").map((el) => parseInt(el)),
    id,
    1
  );
});

// `0000000000001010\n0000000001001010`
//   .split("\n")
//   .filter((el) => el)
//   .forEach((el, id) => {
//     ram(
//       el.split("").map((el) => parseInt(el)),
//       id,
//       1
//     );
//   });

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
  if (data.type === "screen") {
    self.postMessage(ram().slice(16384, 16384 + 8192));
  }
  if (data.type === "reset") {
    pc(Array(16).fill(0), 1, 1);
  }
  if (data.type === "ramFront") {
    console.log(ram().slice(0, 20));
  }
  if (data.type === "stack") {
    console.log(ram().slice(256, 260));
  }
};
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
    ram(aluResponse.out, parseInt(a().join(""), 2), romEl[12]);
    // jump
    jmp(romEl, aluResponse, pc, a);
  }
}
