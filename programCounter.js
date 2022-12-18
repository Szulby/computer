import sixteenBitRegister from './sixteenBitRegister.js';
import inc16 from './inc16.js';

export default function programCounter() {
	const register = sixteenBitRegister();
	return function (inp, load, inc, reset) {
		if (reset) {
			return register([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1);
		}
		if (load) {
			return register(inp, load);
		}
		if (inc) {
			return register(inc16(inp), 1);
		}
		return register(inp, load);
	};
}

const pc = programCounter();

console.log(pc([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 1, 0, 0));
console.log(pc([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 0, 1, 0));
console.log(pc([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 0, 1, 0));
