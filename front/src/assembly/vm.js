import fs from "fs";

let base = `
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

// const end = `
// // infinite loop in the end
// (end)
// @end
// 0;jmp
// `;

const input = `
push constant 2
push constant 3
push constant 4
// pop local 1
// pop local 2
// push local 1

call add 2
// stop
//end of program
call infinite 2

//function declaration
function add 2
  push argument 0
  push argument 1
  add
return


function infinite
  label end
  goto end
return




// call infinite
// return
// push constant 2
// eq
// if-goto push_constant
// eq
// sub
// pop argument 1
`;

const registerTypesEnum = {
  local: "@lcl",
  argument: "@arg",
};

input
  .split("\n")
  .filter((el) => el && !el.includes("//"))
  .map((el) => el.trim())
  .forEach((line) => {
    const splitted = line.split(" ");
    if (splitted[0] === "stop") {
      base += stop();
    }
    if (splitted[0] === "push") {
      if (splitted[1] === "constant") {
        base += pushConstant(splitted[2]);
      }
      if (Object.keys(registerTypesEnum).find((el) => el === splitted[1])) {
        base += pushToStack(splitted[1], splitted[2]);
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
      base += functionCaller(splitted[1], splitted[2]);
    }
    if (splitted[0] === "return") {
      base += returnFunction();
    }
  });

// base += end;
fs.writeFile("asm.txt", base.trim(), (err) => {
  if (err) console.log(err);
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
function pushD() {
  return `
@sp
a=m
m=d
@sp
m=m+1  
`.trim();
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
function pop(type, offset) {
  const out = `
// pop {to register} offset ${offset}
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
