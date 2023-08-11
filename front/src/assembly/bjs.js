import fs from "fs";
const mult = `
function mult 2
  push argument 0
  push argument 1
  
  stop
  return
`;
const infinite = `
function infinite 0
  label end
  goto end
return
`;
const add = `
function add 2
  push argument 0
  push argument 1
  add
return
`;
const functions = {
  infinite,
  add,
  mult,
};

const input = `
import infinite
import add
import mult

let a = 123
add(3,42)

infinite()


// eq
// if-goto
// sub
`;

const output = [];

const model = {};

const regex = /^[a-zA-Z0-9]$/;

const serialized = input
  .split("\n")
  .filter((el) => el && !el.includes("//"))
  .join("\n")
  .split("");

const parsed = (() => {
  let out = [];
  let word = [];
  serialized.forEach((el) => {
    if (el.match(regex)) {
      word.push(el);
    } else {
      word = word.join("");
      out.push(word, el);
      word = [];
    }
  });
  return out.filter((el) => el && el !== "\n" && el !== " ");
})();

for (let i = 0; i < parsed.length; i++) {
  const findFunction = model;

  if (!parsed[i].split("").filter((el) => !el.match(regex)).length) {
    if (parsed[i] === "stop") {
      output.push("stop");
    } else if (parsed[i] === "import") {
      importFunction(parsed[i + 1]);
    } else if (parsed[i] === "let") {
      createVariable(parsed[i + 1], parsed[i + 3], output);
    } else if (findFunction && parsed[i + 1] === "(") {
      const args = Array.from(Array(model[parsed[i]].length)).map((_, id) => {
        let items = [2, 4, 6, 8];
        return parsed[i + items[id]];
      });

      functionCaller([parsed[i], args], output);
    }
  }
}

for (let key in model) {
  output.push(model[key].function);
}

fs.writeFile("./vm.txt", output.join("\n"), (err) => {
  if (err) console.log(err);
  else console.log("written correctly");
});

function importFunction(importName) {
  model[importName] = {
    function: functions[importName],
    length: parseInt(functions[importName].trim().split(" ")[2]),
  };
}

function functionCaller([name, args], output) {
  // check if function exists
  if (!model[name]) {
    throw Error("function is not declared");
  }

  let temp = args.map((el) => `push constant ${el}`);
  temp.push(`call ${name} ${args.length}`);
  output.push(...temp);
}

function createVariable(name, value, output) {
  const out = `
push constant ${value}
pop ${name}
  `;
  output.push(out);
}
