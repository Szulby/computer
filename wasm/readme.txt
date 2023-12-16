emcc api.c -o api.wasm -s EXPORTED_FUNCTIONS=_nand,_and,_xor,_or,_halfAdder,_fullAdder -sEXPORTED_RUNTIME_METHODS=ccall,cwrap --no-entry
