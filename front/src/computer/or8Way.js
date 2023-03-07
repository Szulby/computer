import or from './or.js'

export default function or8Way(i) {
	return i.reduce((pre, cur) => {
		return or(pre, cur)
	})
}

// console.log(Or8Way([0, 1, 0, 0, 0, 0, 0, 0]))
