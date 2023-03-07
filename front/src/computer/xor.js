import nand from './nand.js'

export default function xor(a, b) {
	return nand(
        nand(
            a, 
            nand(a, b)
            ),
        nand(
            b, 
            nand(a, b)
            )
        )
}
