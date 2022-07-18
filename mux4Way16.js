import mux16 from './mux16.js'

export default function mux4Way16(a, b, c, d, s) {
	let ab = mux16(a, b, s[0])
	let cd = mux16(c, d, s[0])
	return mux16(ab, cd, s[1])
}

// console.log(
// 	mux4Way16(
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[0, 1]
// 	)
// )
