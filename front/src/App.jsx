import { useEffect, useState } from "react";
const worker = new Worker(new URL("./computer/computer", import.meta.url), {
  type: "module",
});
function App() {
  const [screen, setScreen] = useState([]);
  useEffect(() => {
    console.log("post message");
    worker.postMessage({ type: "screen" });
  }, []);
  worker.onmessage = ({ data }) => {
    setScreen(data);
  };
  const reset = () => {
    worker.postMessage({ type: "reset" });
  };
  return (
    <div className="App">
      <h1>Compik</h1>
      <button onClick={reset}>Reset</button>
      <canvas id="canvas" />
      <div style={{ width: 300 }}>
        {screen.map((romEl) => (
          <p key={romEl}>{romEl}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
