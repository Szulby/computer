emcc nand.c -o api.wasm -s EXPORTED_FUNCTIONS=\_nand -sEXPORTED_RUNTIME_METHODS=ccall,cwrap --no-entry
