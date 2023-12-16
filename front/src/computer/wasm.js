const api = await fetch("../../../wasm/api.wasm")
  .then((res) => {
    return res.arrayBuffer();
  })
  .then((api) => {
    return WebAssembly.instantiate(api);
  })
  .then((result) => {
    const { nand, and, xor, halfAdder, fullAdder, memory } =
      result.instance.exports;
    // console.log(memory);
    // console.log(halfAdder() + 1);
    // console.log(new Uint8Array(memory.buffer)[halfAdder(1, 1)]);
    // console.time();
    // new Uint8Array(memory.buffer)[halfAdder(1, 1)];
    // console.timeEnd();
    return {
      xor,
      nand,
      and,
      halfAdder,
      fullAdder,
      memory,
    };
  });
export default api;
