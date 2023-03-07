import nand from './nand.js'
export default function or(a, b) {
	return nand(nand(a, a), nand(b, b))
}
