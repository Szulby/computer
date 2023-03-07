import nand from './nand.js'
export default function not(a) {
	return nand(a, a)
}
