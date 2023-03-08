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
base += push() + end;
fs.writeFile("asm.txt", base.trim(), (err) => {
  if (err) console.log(err);
});

function push() {
  const push = `
@17
D=A
@SP
A=M
M=D
@SP
M=M+1
`;
  return push.trim();
}
