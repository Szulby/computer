import { useEffect, useState } from "react";
const worker = new Worker(new URL("./computer/computer", import.meta.url), {
  type: "module",
});
function App() {
  const [screen, setScreen] = useState([]);

  useEffect(() => {
    setInterval(() => {
      worker.postMessage({ type: "screen" });
      worker.postMessage({ type: "ramFront" });
      worker.postMessage({ type: "stack" });
      worker.postMessage({ type: "local" });
      worker.postMessage({ type: "argument" });
    }, 1000);
    // console.log("post message");
  }, []);
  worker.onmessage = ({ data }) => {
    setScreen(data);
  };
  const reset = () => {
    worker.postMessage({ type: "reset" });
  };
  const click = () => {
    worker.postMessage({ type: "click" });
  };
  return (
    <div className="App">
      <h1>Compik</h1>
      <button onClick={click}>Click</button>
      <button onClick={reset}>Reset</button>
      <canvas id="canvas" />
      <div style={{ width: 300 }}>
        {screen.length}
        {screen.map((romEl, id) => (
          <p key={id}>{romEl}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
