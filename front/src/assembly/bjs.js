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
push constant 3
push constant 4

call add 2

call infinite 0


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
