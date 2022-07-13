import nand from './nand.js'
export default function mux(a, b, s) {
	return nand(nand(a, s), nand(b, nand(s, s)))
}
