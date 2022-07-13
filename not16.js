import not from './not.js'
export default function not16(i) {
	return i.map((i) => not(i))
}

// console.log(
// 	'not16 \n[\n 0, 0, 1, 0, 1, 0,\n 0, 0, 0, 0, 1, 0,\n 1, 0, 0, 0\n]\n',
// 	not16([0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0])
// )
