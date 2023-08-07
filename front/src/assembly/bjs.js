import fs from "fs";

const input = `
push constant 2
push constant 3
push constant 4

call add 2

call infinite 0

function add 
  push argument 0
  push argument 1
  add
return

function infinite
  label end
  goto end
return



// eq
// if-goto
// sub
`;
const output = [];
input
  .split("\n")
  .filter((el) => el && !el.includes("//"))
  .map((el) => el.trim())
  .forEach((el) => {
    output.push(el);
  });

fs.writeFile("./vm.txt", output.join("\n"), (err) => {
  if (err) console.log(err);
  else console.log("written correctly");
});
