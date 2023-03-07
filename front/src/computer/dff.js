export default function dff() {
	let state = 0;
	return (input) => {
		let tmp = state;
		state = input;
		return tmp;
	};
}
