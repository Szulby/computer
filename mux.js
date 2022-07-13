import nand from './nand.js'
export default function mux(a, b, s) {
	return nand(nand(a, s), nand(b, nand(s, s)))
}
// mux test

console.log(mux(1, 1, 1))
