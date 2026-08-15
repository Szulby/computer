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

let running = false; // free run, off until the ui asks for it
let halted = false; // program walked off the end of the rom
let stepsPending = 0; // single steps ordered from the ui
let logging = true;

self.onmessage = ({ data }) => {
  if (data.type === "click") {
    // stop the free run and advance by exactly one instruction
    running = false;
    stepsPending++;
  }
  if (data.type === "run") {
    running = !running;
    stepsPending = 0;
  }
  if (data.type === "reset") {
    pc(Array(16).fill(0), 1, 1);
    clearScreen();
    halted = false;
    stepsPending = 0;
    // push the blank screen right away, waiting for the next poll would look stuck
    self.postMessage({ type: "screen", screen: readRam(16384, 8192) });
  }
  if (data.type === "screen") {
    self.postMessage({ type: "screen", screen: readRam(16384, 8192) });
  }

  // every message can change the state, and the ui asks for it on mount anyway
  postState();

  if (!logging) return;

  if (data.type === "ramFront") {
    console.log("ramFront", readRam(0, 40).map(parseRamValue));
  }
  if (data.type === "stack") {
    console.log("stack", readRam(256, 34).map(parseRamValue));
  }
  if (data.type === "local") {
    console.log("local", readRam(300, 10).map(parseRamValue));
  }
  if (data.type === "argument") {
    console.log("argument", readRam(400, 10).map(parseRamValue));
  }
};
setInterval(() => {
  if (halted) return;
  if (stepsPending > 0) {
    computer();
    stepsPending--;
  } else if (running) {
    computer();
  }
  // the program can end in the middle of a tick, tell the ui once it happens
  if (halted) postState();
}, 0);

function computer() {
  const actualPc = parseRamValue(pc());
  // await new Promise((resolve) => setTimeout(resolve, 1));

  // out of range must give undefined because the halt check below relies on it
  // actualPc can be negative when an alu result lands in register a
  const romEl =
    actualPc >= 0 && actualPc < preparedData.length
      ? rom([], actualPc, 0)
      : undefined;

  // trace every instruction while stepping, it would flood the console on a free run
  if (logging && !running) {
    console.log(actualPc, preparedData[actualPc]);
  }

  if (!romEl) {
    halted = true;
    return;
  }

  if (!romEl[0]) {
    a(romEl, 1);
  } else {
    const addr = parseInt(a().join(""), 2);
    const aluResponse = alu(
      d(),
      mux16(a(), ram([], addr, 0), romEl[3]),
      [romEl[4], romEl[5], romEl[6], romEl[7], romEl[8], romEl[9]]
    );
    // store to ram
    ram(aluResponse.out, addr, romEl[12]);

    // then store to registers
    a(aluResponse.out, romEl[10]);
    d(aluResponse.out, romEl[11]);

    // jump
    jmp(romEl, aluResponse, pc, a);
  }
}

// blank the screen area of the ram. the rest of the ram is left alone, the
// program rebuilds its own variables when it runs again from the start
function clearScreen() {
  const zero = Array(16).fill(0);
  for (let i = 0; i < 8192; i++) {
    ram(zero, 16384 + i, 1);
  }
}

function postState() {
  self.postMessage({ type: "state", running, halted, stepsPending });
}

function parseRamValue(input) {
  return parseInt(input.join(""), 2) - (input[0] ? Math.pow(2, 16) : 0);
}

// read a range of ram word by word
// ram() without an address dumps all 64k registers, so never use it to read
function readRam(start, length) {
  const out = [];
  for (let i = 0; i < length; i++) {
    out.push(ram([], start + i, 0));
  }
  return out;
}
