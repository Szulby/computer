import fs from "fs";

let base = `
@256
d=a 
@sp
m=d
`;
const end = `
(end)
@end
0;jmp
`;

const input = `
push contant 17
push contant 15
pop local 1
`;

input
  .split("\n")
  .filter((el) => el)
  .forEach((line) => {
    const splitted = line.split(" ");
    if (splitted[0] === "push") {
      if (splitted[1] === "contant") {
        base += pushConstant(splitted[2]);
      }
    }
    if (splitted[0] === "pop") {
      if (splitted[1] === "local") {
        base += popLocal(splitted[2]);
      }
    }
  });

base += end;
fs.writeFile("asm.txt", base.trim(), (err) => {
  if (err) console.log(err);
});

function pushConstant(constant) {
  const push = `
@${constant}
D=A
@SP
A=M
M=D
@SP
M=M+1
`;
  return push;
}
function popLocal(offset) {
  const out = `
// create offset
@${offset}
d=a
@300
d=d+a
@r1
m=d
// get from stack
@sp
a=m-1
d=m
// set local address
@r1
a=m
// push local
m=d
// pop stack
@0
d=a
@sp
a=m-1
m=d
// decrement stack pointer
@sp
m=m-1
`;
  return out;
}
