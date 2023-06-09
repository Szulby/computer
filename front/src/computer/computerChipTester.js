import nand from "./nand.js";
import not from "./not.js";
import and from "./and.js";
import or from "./or.js";
import nor from "./nor.js";
import xor from "./xor.js";
import mux from "./mux.js";
import dmux from "./dmux.js";
import not16 from "./not16.js";
import and16 from "./and16.js";
import or16 from "./or16.js";
import mux16 from "./mux16.js";
import or8Way from "./or8Way.js";
import mux4Way16 from "./mux4Way16.js";
import mux8Way16 from "./mux8Way16.js";
import dmux4Way from "./dmux4Way.js";
import dmux8Way from "./dmux8Way.js";
import halfAdder from "./halfAdder.js";
import fullAdder from "./fullAdder.js";
import adder16bit from "./adder16bit.js";
import inc16 from "./inc16.js";
// console.log = () => {}

console.log("not a=1 o=0:", not(1));
console.log("not 0:", not(0));

console.log("and 0,0:", and(0, 0));
console.log("and 0,1:", and(0, 1));
console.log("and 1,0:", and(1, 0));
console.log("and 1,1:", and(1, 1));

console.log("nand 1,1: ret 0", nand(1, 1));

console.log("or 0,0:", or(0, 0));
console.log("or 0,1:", or(0, 1));
console.log("or 1,0:", or(1, 0));
console.log("or 1,1:", or(1, 1));

console.log("nor 0,0:", nor(0, 0));
console.log("nor 0,1:", nor(0, 1));
console.log("nor 1,0:", nor(1, 0));
console.log("nor 1,1:", nor(1, 1));

console.log("xor 0,0:", xor(0, 0));
console.log("xor 0,1:", xor(0, 1));
console.log("xor 1,0:", xor(1, 0));
console.log("xor 1,1:", xor(1, 1));

console.log("mux 1,0,1 :ret 0", mux(1, 0, 1));
console.log("mux 0,1,1 :ret 1", mux(0, 1, 1));
console.log("mux 1,1,1 :ret 1", mux(1, 1, 1));
console.log("mux 0,0,0 :ret 0", mux(0, 0, 0));

console.log("dmux i=0,s=0: ret 0,0", dmux(0, 0));
console.log("dmux i=1,s=0: ret 1,0", dmux(1, 0));
console.log("dmux i=0,s=1: ret 0,0", dmux(0, 1));
console.log("dmux i=1,s=1: ret 0,1", dmux(1, 1));

console.log(
  "not16 \n[\n 0, 0, 1, 0, 1, 0,\n 0, 0, 0, 0, 1, 0,\n 1, 0, 0, 0\n]\n",
  not16([0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0])
);

console.log(
  `and16:\n [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]\n`,
  and16(
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
  )
);

console.log(
  `or16:\n [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]\n`,
  or16(
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
  )
);

console.log(
  `mux16:\n [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
	    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]\n`,
  mux16(
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    1
  )
);

console.log(
  "or8Way return 1 if at least 1 is 1 in: [0, 1, 0, 0, 0, 0, 0, 0] ret: 1",
  or8Way([0, 1, 0, 0, 0, 0, 0, 0])
);
console.log(
  "or8Way return 1 if at least 1 is 1 in: [0, 0, 0, 0, 0, 0, 0, 0] ret: 0",
  or8Way([0, 0, 0, 0, 0, 0, 0, 0])
);

console.log(
  "mux4Way16: if s = 1 ? a : b",
  mux4Way16(
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0], //
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1]
  )
);

console.log(
  "mux8Way16: if s = 1 ? a : b",
  mux8Way16(
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1], //
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1]
  )
);

console.log("dmux4Way: out [ 0, 0, 1, 0 ]", dmux4Way(1, [0, 1]));

console.log("dmux8Way out  [0, 0, 0, 1,0, 0, 0, 0] ,", dmux8Way(1, [1, 1, 0]));
console.log("weak tests of dmux8way");

console.log("half adder a=0 b=0 o=0 c=0 ", halfAdder(0, 0));
console.log("half adder a=1 b=0 o=1 c=0 ", halfAdder(1, 0));
console.log("half adder a=0 b=1 o=1 c=0 ", halfAdder(0, 1));
console.log("half adder a=1 b=1 o=0 c=1 ", halfAdder(1, 1));

console.log("full adder");
console.log("a=0 b=0 c=0 s=0 c=0", fullAdder(0, 0, 0));
console.log("a=0 b=0 c=1 s=1 c=0", fullAdder(0, 0, 1));
console.log("a=0 b=1 c=0 s=1 c=0", fullAdder(0, 1, 0));
console.log("a=0 b=1 c=1 s=0 c=1", fullAdder(0, 1, 1));
console.log("a=1 b=0 c=0 s=1 c=0", fullAdder(1, 0, 0));
console.log("a=1 b=0 c=1 s=0 c=1", fullAdder(1, 0, 1));
console.log("a=1 b=1 c=0 s=0 c=1", fullAdder(1, 1, 0));
console.log("a=1 b=1 c=1 s=1 c=1", fullAdder(1, 1, 1));

console.log(
  "adder16bit [0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]",
  adder16bit(
    // [0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1]
  )
);

console.log("inc16", inc16([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]));
