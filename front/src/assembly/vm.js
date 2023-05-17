import fs from "fs";

let base = `
@256
d=a 
@sp
m=d
@300
d=a
@lcl
m=d
@400
d=a
@arg
m=d
`;
const end = `
(end)
@end
0;jmp
`;

const input = `
push constant 2
push constant 2
call mult 2
function mult
return
// push constant 2
// eq
// if-goto push_constant
//eq
// sub
// pop argument 1
`;

input
  .split("\n")
  .filter((el) => el)
  .filter((el) => !el.includes("//"))
  .forEach((line) => {
    const splitted = line.split(" ");
    if (splitted[0] === "push") {
      if (splitted[1] === "constant") {
        base += pushConstant(splitted[2]);
      }
    }
    if (splitted[0] === "pop") {
      if (splitted[1] === "local") {
        base += pop("@lcl", splitted[2]);
      }
      if (splitted[1] === "argument") {
        base += pop("@arg", splitted[2]);
      }
    }
    if (splitted[0] === "add") {
      base += add();
    }
    if (splitted[0] === "sub") {
      base += sub();
    }
    if (splitted[0] === "eq") {
      base += eq();
    }
    if (splitted[0] === "label") {
      base += label(splitted[1]);
    }
    if (splitted[0] === "goto") {
      base += goto(splitted[1]);
    }
    if (splitted[0] === "if-goto") {
      base += ifGoto(splitted[1]);
    }
    if (splitted[0] === "function") {
      base += functionCreator(splitted[1]);
    }
    if (splitted[0] === "call") {
      base += functionCaller(splitted[1]);
    }
    if (splitted[0] === "return") {
      base += returnFunction();
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
@SP
am=m-1
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

function add() {
  const out = `
@SP
am=m-1
d=m
@sp
am=m-1
d=d+m
@sp
a=m
m=d
@sp
m=m+1
`;
  return out;
}

function sub() {
  const out = `
@sp
am=m-1
d=m
@sp
am=m-1
d=d-m
@sp
a=m
m=d
@sp
m= m+1
`;
  return out;
}

function eq() {
  const out = `
@sp
am=m-1
d=m
@sp
am=m-1
d=d-m
d=!d
@sp
a=m
m=d
@sp
m=m+1
`;
  return out;
}

function label(symbol) {
  const out = `
(${symbol})  
`;
  return out;
}

function goto(symbol) {
  const out = `
@${symbol}
0;jmp  
`;
  return out;
}

function ifGoto(symbol) {
  const out = `
@sp
am=m-1
d=m
d=!d
@${symbol}
d;jeq
`;
  return out;
}
function functionCreator(name) {
  const out = `
(${name})
`;
  return out;
}

function functionCaller(name) {
  const out = `
@${name}.ret
d=a
@sp
a=m
m=d
@sp
m=m+1
@${name}
0;jmp
(${name}.ret)
`;
  return out;
}

function returnFunction() {
  const out = `
  @sp
  am=m-1
  a=m
  0;jmp
`;
  return out;
}
