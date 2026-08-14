import nand from './nand.js'

function xor(a, b) {
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

export default xor
