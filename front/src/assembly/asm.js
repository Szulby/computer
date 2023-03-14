import fs from "fs";
const symbols = {
  r0: 0,
  r1: 1,
  r2: 2,
  r3: 3,
  r4: 4,
  r5: 5,
  r6: 6,
  r7: 7,
  r8: 8,
  r9: 9,
  r10: 10,
  r11: 11,
  r12: 12,
  r13: 13,
  r14: 14,
  r15: 15,
  screen: 16384,
  kbd: 24576,
  sp: 0,
  lcl: 1,
  arg: 2,
  this: 3,
  that: 4,
};
let symbolOffset = 16;
const parsed = [];

fs.readFile("./asm.txt", "utf8", (er, data) => {
  if (er) {
    console.log(er);
    return;
  }
  const input = data
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n")
    .split("\n")
    .map((el) => el.trim())
    .filter((el) => el && !el.includes("//"));

  createAlias(input).forEach((line) => {
    parse(line);
  });
  console.log(parsed);
  save(parsed);
});

function parse(line) {
  if (line.at(0) === "@") {
    if (!isNaN(parseInt(line.slice(1)))) {
      parsed.push((line.slice(1) >>> 0).toString(2).padStart(16, "0"));
    } else {
      const symbol = symbols[line.slice(1).toLowerCase()];
      if (!isNaN(symbol)) {
        parsed.push(symbol.toString(2).padStart(16, "0"));
      } else {
        symbols[line.slice(1).toLowerCase()] = symbolOffset;
        parsed.push(symbolOffset.toString(2).padStart(16, "0"));
        symbolOffset++;
      }
    }
  } else {
    let base = "111";
    const c = split(line);
    // controll instructions
    if (c[1].toLowerCase() === "0") base += "0101010";
    if (c[1].toLowerCase() === "-1") base += "0111010";
    if (c[1].toLowerCase() === "d") base += "0001100";
    if (c[1].toLowerCase() === "a") base += "0110000";
    if (c[1].toLowerCase() === "m") base += "1110000";
    if (c[1].toLowerCase() === "d+1") base += "0011111";
    if (c[1].toLowerCase() === "m+1") base += "1110111";
    if (c[1].toLowerCase() === "m-1") base += "1110010";
    if (c[1].toLowerCase() === "d+a") base += "0000010";
    if (c[1].toLowerCase() === "d+m") base += "1000010";
    if (c[1].toLowerCase() === "d-a") base += "0010011";
    if (c[1].toLowerCase() === "a-1") base += "0110010";
    if (c[1].toLowerCase() === "d-m") base += "1010011";
    // destination instructions
    if (!c[0]) base += "000";
    if (c[0].toLowerCase() === "m") base += "001";
    if (c[0].toLowerCase() === "d") base += "010";
    if (c[0].toLowerCase() === "md" || c[0].toLowerCase() === "dm")
      base += "011";
    if (c[0].toLowerCase() === "a") base += "100";
    // jump instructions
    if (!c[2]) base += "000";
    if (c[2].toLowerCase() === "jgt") base += "001";
    if (c[2].toLowerCase() === "jle") base += "110";
    if (c[2].toLowerCase() === "jmp") base += "111";
    // if correct save
    if (base.length === 16) parsed.push(base);
    else {
      // console.log(`incorrect parsed: ${line} to: ${base}`);
      // break program if error
      console.log(symbols);
      console.log(parsed);
      throw new Error(`incorrect parsed: ${line} to: ${base}\n`);
    }
  }
}
function save(output) {
  fs.writeFile("./output", output.join("\n"), (err) => {
    if (err) console.log(err);
    else console.log("written correctly");
  });
}
function split(line) {
  let tmp = line.split(/[\=;]+/);
  if (!line.includes("=")) tmp.unshift("");
  if (!line.includes(";")) tmp.push("");
  return tmp;
}
function createAlias(data) {
  let index = data.findIndex((line) => {
    return line.match(/\((.*?)\)/);
  });

  if (index !== -1) {
    symbols[data[index].replaceAll("(", "").replaceAll(")", "").toLowerCase()] =
      index;
    return createAlias(data.filter((line) => line !== data[index]));
  } else {
    return data;
  }
}
