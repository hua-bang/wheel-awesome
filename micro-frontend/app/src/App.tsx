import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useInitMiniMicro from "./use-init-mini-micro";

function App() {
  const { loadApp1 } = useInitMiniMicro();

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Main App</h1>
      <div style={{ display: "flex", gap: 16 }}>
        <button onClick={() => loadApp1()}>loadApp1</button>

        <button onClick={() => loadApp1()}>loadApp2</button>
      </div>
      <div id="sub_app_container">Sub App</div>
    </div>
  );
}

export default App;
