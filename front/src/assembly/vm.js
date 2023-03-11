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
