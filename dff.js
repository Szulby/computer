export default function dff() {
	let state = 0;
	function next(input) {
		let tmp = state;
		state = input;
		return tmp;
	}
	return next;
}
