import dmux from './dmux.js'

export default function dmux8Way(i, s) {
	let [ao, bo] = dmux(i, s[2])

	let [aoo, boo] = dmux(ao, s[1])
	let [coo, doo] = dmux(bo, s[1])
	return [
		...dmux(aoo, s[0]),
		...dmux(boo, s[0]),
		...dmux(coo, s[0]),
		...dmux(doo, s[0]),
	]
}

// console.log(dmux8Way(1, [1, 1, 0]))
