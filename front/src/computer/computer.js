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
// min length of ram is biggest 16bit number because sometimes in register a is minus number and this provides issue with trying to read out of memory
const ram = memory(1024 * 64);

preparedData.forEach((el, id) => {
  rom(
    el.split("").map((el) => parseInt(el)),
    id,
    1
  );
});

const pc = programCounter();

const a = sixteenBitRegister();
const d = sixteenBitRegister();

let infinity = true;
let nextStep = false;
self.onmessage = ({ data }) => {
  if (data.type === "click" || infinity) {
    nextStep = true;
  }
  if (data.type === "screen") {
    self.postMessage(ram().slice(16384, 16384 + 8192));
  }
  if (data.type === "reset") {
    pc(Array(16).fill(0), 1, 1);
  }
  if (data.type === "ramFront") {
    console.log(
      "ramFront",
      ram()
        .slice(0, 40)
        .map((el) => parseRamValue(el))
    );
  }
  if (data.type === "stack") {
    console.log(
      "stack",
      ram()
        .slice(256, 290)
        .map((el) => parseRamValue(el))
    );
  }
  if (data.type === "local") {
    console.log(
      "local",
      ram()
        .slice(300, 310)
        .map((el) => parseRamValue(el))
    );
  }
  if (data.type === "argument") {
    console.log(
      "argument",
      ram()
        .slice(400, 410)
        .map((el) => parseRamValue(el))
    );
  }
};
setInterval(() => {
  if (nextStep || infinity) {
    computer();
    nextStep = false;
  }
}, 0);

function computer() {
  const actualPc = parseRamValue(pc());
  // await new Promise((resolve) => setTimeout(resolve, 1));

  const romEl = rom()[actualPc];

  console.log(actualPc, preparedData[actualPc]);

  if (!romEl) {
    infinity = false;
    return;
  }

  if (!romEl[0]) {
    a(romEl, 1);
  } else {
    const aluResponse = alu(
      d(),
      mux16(a(), ram()[parseInt(a().join(""), 2)], romEl[3]),
      [romEl[4], romEl[5], romEl[6], romEl[7], romEl[8], romEl[9]]
    );
    // store to ram
    ram(aluResponse.out, parseInt(a().join(""), 2), romEl[12]);

    // then store to registers
    a(aluResponse.out, romEl[10]);
    d(aluResponse.out, romEl[11]);

    // jump
    jmp(romEl, aluResponse, pc, a);
  }
}

function parseRamValue(input) {
  return parseInt(input.join(""), 2) - (input[0] ? Math.pow(2, 16) : 0);
}
