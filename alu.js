import adder16bit from './adder16bit.js'
import not from './not.js'
import or from './or.js'
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

	// function
	let o
	if (f[4]) {
		o = adder16bit(x, y)
	}
	if (f) console.log(x, y, o)
}

alu(
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 0, 0, 1, 0]
)
