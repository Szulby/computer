import oneBitRegister from './oneBitRegister.js';
export default function sixteenBitRegister() {
	const state = Array(16)
		.fill(oneBitRegister)
		.map((bit) => bit());
	return function (input = [], load) {
		return state.map((dff, id) => dff(input[id], load));
	};
}

// const register = sixteenBitRegister();

// console.log(register([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 1));
// console.log(register([0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0));
// console.log(register([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0));
// console.log(register([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0));
