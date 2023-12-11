let api = await fetch("../../../wasm/api.wasm")
  .then((res) => {
    return res.arrayBuffer();
  })
  .then((api) => {
    return WebAssembly.instantiate(api);
  })
  .then((result) => {
    const nand = result.instance.exports.nand;
    return {
      nand,
    };
  });
export default { ...api };
