import nand from './nand.js'

export default function dmux(i, s) {
	let s1 = nand(s, s)

	let a = nand(nand(i, s1), nand(i, s1))
	let b = nand(nand(s, i), nand(s, i))

	return [a, b]
}

// console.log('dmux i=0,s=0: ret 0,0', dmux(0, 0))
// console.log('dmux i=1,s=0: ret 1,0', dmux(1, 0))
// console.log('dmux i=0,s=1: ret 0,0', dmux(0, 1))
// console.log('dmux i=1,s=1: ret 0,1', dmux(1, 1))
