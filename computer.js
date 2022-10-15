import alu from './alu.js';
import dff from './dff.js';
import mux from './mux.js';

console.log(
	alu(
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 0, 0, 0, 1]
	)
);
