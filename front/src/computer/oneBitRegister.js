import dff from './dff.js';
export default function oneBitRegister() {
	const state = dff();
	return function (input, load) {
		let tmp = state(input);
		if (load) {
			state(input);
		} else {
			state(tmp);
		}
		return tmp;
	};
}
// const first = oneBitRegister();
// console.log(first(0, 0));
// console.log(first(1, 1));
// console.log(first(1, 0));
// console.log(first(1, 0));
// console.log(first(0, 1));

// console.log(first(1, 0));
