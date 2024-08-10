import "./App.css";
import useInitMiniMicro from "./use-init-mini-micro";
import { useEffect } from "react";

function App() {
  const { loadApp1, loadApp2 } = useInitMiniMicro();

  useEffect(() => {
    loadApp1();
  }, []);

  return (
    <div className="App">
      <h1>Mini Micro FrontEnd</h1>
      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={() => loadApp1()}>react app</button>
        <button onClick={() => loadApp2()}>vue app</button>
      </div>
      <div id="sub_app_container" style={{ height: 500, width: 800 }}></div>
    </div>
  );
}

export default App;
