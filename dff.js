let dffStore

export default function dff(i) {
	let tmp = dffStore
	dffStore = i
	return tmp
}
