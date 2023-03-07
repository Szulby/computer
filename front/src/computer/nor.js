import nand from './nand.js'
import not from './not.js'
export default function nor(a, b) {
	return not(nand(nand(a, a), nand(b, b)))
}
