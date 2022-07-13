import mux16 from './mux16.js'

export default function mux8Way16(a, b, c, d, e, f, g, h, s) {
	let ab = mux16(a, b, s[0])
	let cd = mux16(c, d, s[0])
	let ef = mux16(e, f, s[0])
	let gh = mux16(g, h, s[0])

	let x = mux16(ab, cd, s[1])
	let y = mux16(ef, gh, s[1])

	return mux16(x, y, s[2])
}

// console.log(
// 	mux8Way16(
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1], //
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[0, 1, 1]
// 	)
// )