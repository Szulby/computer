import fs from "fs";
const infinite = `
function infinite
  label end
  goto end
return
`;
const add = `
function add 
  push argument 0
  push argument 1
  add
return
`;
const functions = {
  infinite,
  add,
};

const input = `
import infinite
import add

push constant 2

add(3,42)

infinite()


// eq
// if-goto
// sub
`;
const output = [];
const functionsDefs = [];

input
  .split("\n")
  .filter((el) => el && !el.includes("//"))
  .map((el) => el.trim())
  .forEach((el) => {
    const functionCallPattern = /\w+\((?:\w+(?:,\s*\w+)*)?\)/;

    if (el.match(functionCallPattern)) {
      functionCaller(el, output);
      return;
    }

    if (el.includes("import")) {
      functionsDefs.push(el.split(" ")[1]);
    } else {
      output.push(el);
    }
  });
functionsDefs.forEach((def) => {
  output.push(functions[def]);
});
fs.writeFile("./vm.txt", output.join("\n"), (err) => {
  if (err) console.log(err);
  else console.log("written correctly");
});

function functionCaller(el, output) {
  // get function name and args
  const [name, args] = el.split("(").map((el, id) => {
    if (id === 1) {
      return el.replace(")", "").split(",").filter(Boolean);
    }
    return el;
  });

  // check if function exists
  if (!functionsDefs.includes(name)) {
    const error = `asd ${name}`;
    throw Error("function is not declared");
  }

  let temp = args.map((el) => `push constant ${el}`);
  temp.push(`call ${name} ${args.length}`);
  output.push(...temp);
}
