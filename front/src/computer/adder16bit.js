import fullAdder from './fullAdder.js'
import halfAdder from './halfAdder.js'

export default function adder16bit(a, b) {
	let c
	let o = []
	for (let i = 15; i >= 0; i--) {
		if (i === 15) {
			;[o[i], c] = halfAdder(a[i], b[i])
		} else {
			;[o[i], c] = fullAdder(a[i], b[i], c)
		}
	}

	return o
}
// prettier-ignore
// adder16bit([0, 0, 1, 0, 1, 0, 0, 1]
// 		, [0, 0, 0, 1, 0, 0, 0, 1])
