import dmux from './dmux.js'
export default function dmux4Way(i, s) {
	let [ao, bo] = dmux(i, s[1])
	return [...dmux(ao, s[0]), ...dmux(bo, s[0])]
}

// console.log(dmux4Way(1, [0, 1]))
