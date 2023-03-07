import and from './and.js'
import xor from './xor.js'

export default function halfAdder(a, b) {
	let s = xor(a, b)
	let c = and(a, b)
	return [s, c]
}

// console.log(halfAdder(0, 0))
// console.log(halfAdder(1, 0))
// console.log(halfAdder(0, 1))
// console.log(halfAdder(1, 1))
