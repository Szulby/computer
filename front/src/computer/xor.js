import nand from './nand.js'
import api from './wasm.js'

// export default api.xor
 function xor(a, b) {
	return nand(
        nand(
            a, 
            nand(a, b)
            ),
        nand(
            b, 
            nand(a, b)
            )
        )
}

export default api.xor