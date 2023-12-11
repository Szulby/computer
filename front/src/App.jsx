import { useEffect, useState } from "react";
import Screen from "./screen";

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
      {/* {screen.map((romEl, id) => (
        <p key={id}>{romEl}</p>
      ))} */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Screen screen={screen} />
      </div>
    </div>
  );
}

export default App;
