import and from './and.js'
export default function and16(a, b) {
	return a.map((a, id) => {
		return and(a, b[id])
	})
}

// console.log(
// 	`and16:\n [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
//     [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]\n`,
// 	and16(
// 		[0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
// 		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
// 	)
// )
