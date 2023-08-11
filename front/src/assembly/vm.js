import fs from "fs";

let output = `
// load stos, local and arg into ram
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

const registerTypesEnum = {
  local: "@lcl",
  argument: "@arg",
};

fs.readFile("./vm.txt", "utf8", (err, data) => {
  data
    .split("\n")
    .filter((el) => el && !el.includes("//"))
    .map((el) => el.trim())
    .filter(Boolean)
    .forEach((line) => {
      const splitted = line.split(" ");
      if (splitted[0] === "stop") {
        output += stop();
        return;
      }
      if (splitted[0] === "push") {
        if (splitted[1] === "constant") {
          output += pushConstant(splitted[2]);
          return;
        }
        if (Object.keys(registerTypesEnum).find((el) => el === splitted[1])) {
          output += pushToStack(splitted[1], splitted[2]);
          return;
        }
        return (output += pushVariableToStack(splitted[1]));
      }
      if (splitted[0] === "pop") {
        if (splitted[1] === "local") {
          output += pop("@lcl", splitted[2]);
          return;
        }
        if (splitted[1] === "argument") {
          output += pop("@arg", splitted[2]);
          return;
        }
        output += popVariable(splitted[1]);
        return;
      }
      if (splitted[0] === "add") {
        output += add();
        return;
      }
      if (splitted[0] === "sub") {
        output += sub();
        return;
      }
      if (splitted[0] === "eq") {
        output += eq();
        return;
      }
      if (splitted[0] === "label") {
        output += label(splitted[1]);
        return;
      }
      if (splitted[0] === "goto") {
        output += goto(splitted[1]);
        return;
      }
      if (splitted[0] === "if-goto") {
        output += ifGoto(splitted[1]);
        return;
      }
      if (splitted[0] === "function") {
        output += functionCreator(splitted[1]);
        return;
      }
      if (splitted[0] === "call") {
        output += functionCaller(splitted[1], splitted[2]);
        return;
      }
      if (splitted[0] === "return") {
        output += returnFunction();
        return;
      }
      throw new Error(line);
    });

  fs.writeFile("asm.txt", output.trim(), (err) => {
    if (err) console.log(err);
    else console.log("written correctly");
  });
});

function stop() {
  const out = `
stop
`;
  return out;
}

function pushToStack(type, offset) {
  const out = `
// push ${type} ${offset}
${registerTypesEnum[type]}
d=m
@${offset}
a=d+a
d=m
${pushD()}
`;

  return out;
}

function pushConstant(constant) {
  const push = `
// push constant ${constant}
@${constant}
D=A
${pushD()}
`;
  return push;
}

function pushVariableToStack(name) {
  return `
// push variable ${name} to stack
@${name}
d=m
${pushD()}  
`;
}

function pushD() {
  return `
@sp
a=m
m=d
@sp
m=m+1  
`.trim();
}

function pop(type, offset) {
  const out = `
// pop ${type} offset ${offset}
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
// add
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
// sub
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
// eq 
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
// label ${symbol}
(${symbol})  
`;
  return out;
}

function goto(symbol) {
  const out = `
// go-to
@${symbol}
0;jmp  
`;
  return out;
}

function ifGoto(symbol) {
  const out = `
// if go-to
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
// function crete ${name}
(${name})

`;
  return out;
}

function functionCaller(name, argsLength) {
  const random = Math.random();
  const out = `
// function caller ${name}
// push return adress to stack
@${name}.ret.${random}
d=a
${pushD()}
// push local, arg, this, that offset to stack
@LCL
D=M
${pushD()}

@ARG
D=M
${pushD()}

@THIS
D=M
${pushD()}

@THAT
D=M
${pushD()}

// set new arg
@SP
D=M
@${parseInt(argsLength) + 5}
D=D-A
@ARG
M=D

// Ustawienie LCL na pozycję SP
@SP
D=M
@LCL
M=D

// jump to function
@${name}
0;jmp
// create alias for return flow
(${name}.ret.${random})
`;
  return out;
}

function returnFunction() {
  const out = `
// function return

// // Przywrócenie wartości wyniku do segmentu lokalnego 0
// @SP
// A=M-1
// D=M
// @LCL
// A=M 
// M=D

// local to r13
@LCL
D=M
@R13
M=D

// save return stack addres to r14
@lcl
d=m
@5
d=d-a
@r14
m=d

// set local 0 to arg 0
@SP
A=M-1
D=M
@ARG
A=M
M=D

// 4. SP = ARG + 1
@ARG
D=M+1
@SP
M=D

// 7. ARG 
@R13
D=M
@3
A=D-A
D=M
@ARG
M=D

// 8. LCL
@R13
D=M
@4
A=D-A
D=M
@LCL
M=D
//  goto RET
@R14
A=M
a=m
0;JMP
`;
  return out;
}

function popVariable(name) {
  return `
// pop to ${name}
@sp
am=m-1
d=m
@${name}
m=d
`;
}
