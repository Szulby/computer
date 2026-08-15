import { useEffect, useState } from "react";
import Screen from "./screen";

const worker = new Worker(new URL("./computer/computer", import.meta.url), {
  type: "module",
});

function App() {
  const [screen, setScreen] = useState([]);
  const [cpu, setCpu] = useState({ running: false, halted: false });

  useEffect(() => {
    // ask once on mount so the button is right before anything else happens
    worker.postMessage({ type: "state" });
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
    if (data.type === "screen") setScreen(data.screen);
    if (data.type === "state") setCpu(data);
  };
  const reset = () => {
    worker.postMessage({ type: "reset" });
  };
  const click = () => {
    worker.postMessage({ type: "click" });
  };
  const run = () => {
    worker.postMessage({ type: "run" });
  };
  return (
    <div className="App">
      <h1>Compik</h1>
      <button onClick={click}>Click</button>
      <button onClick={run}>
        Run / Pause &mdash; {cpu.halted ? "halted" : cpu.running ? "running" : "paused"}
      </button>
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
