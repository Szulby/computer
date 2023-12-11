fetch("./test.wasm").then((res) => {
  return res.arrayBuffer();
});
WebAssembly.instantiateStreaming(fetch("./api.wasm"), {}).then((wasm) => {
  const nand = wasm.instance.exports.nand;

  console.log(nand(1, 1));
});
// .then((obj) => {
//   console.log(obj.instance.exports.exported_func());
// });
