import fs from "fs";

let base = `
@256
d=a 
@sp
m=d
@300
d=a
@r1
m=d
`;
const end = `
(end)
@end
0;jmp
`;

const input = `
push contant 300
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
        base += pop("@r1", splitted[2]);
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
function pop(type, offset) {
  const out = `
// create offset
@SP
m=m-1
a=m
d=m
${type}
d=d+m
@${offset}
d=d+a
@sp
a=m
a=m
a=d-a
m=d-a
`;
  return out;
}
