import alu from './alu.js'
import dff from './dff.js'

let counter = 10
while (counter) {
	let rand = Math.round(Math.random(0, 1))
	console.log(rand, dff(rand))
	counter--
}
// console.log(
// 	alu(
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
// 		[1, 1, 0, 0, 0, 1]
// 	)
// )
