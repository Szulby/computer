import adder16bit from './adder16bit.js'
import not from './not.js'
import or from './or.js'
import and16 from './and16.js'

export default function alu(x, y, f) {
	// set x = 0
	if (f[0]) {
		x = x.map((el) => {
			return not(or(el, 1))
		})
	}
	// set !x
	if (f[1]) {
		x = x.map((el) => {
			return not(el)
		})
	}
	// set y = 0
	if (f[2]) {
		y = y.map((el) => {
			return not(or(el, 1))
		})
	}
	// set !y
	if (f[3]) {
		y = y.map((el) => {
			return not(el)
		})
	}

	// if function add else and
	let o, zr, ng
	if (f[4]) {
		o = adder16bit(x, y)
	} else {
		o = and16(x, y)
	}
	// negative output
	if (f[5]) {
		o = o.map((el) => {
			return not(el)
		})
	}
	return { out: o, zr, ng }
}

// console.log(
// 	alu(
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
// 		[1, 1, 0, 0, 0, 1]
// 	)
// )
