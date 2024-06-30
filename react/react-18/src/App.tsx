import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(() => {
    debugger;
    return 0;
  });

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React + TypeScript</h1>
      <div className="card">
        <button
          onClick={() => {
            debugger;
            setCount((count) => {
              debugger;
              console.log(`step: 第 ${count + 1} 次 set value`);
              return count + 1;
            });

            debugger;

            console.log(`step: 第 ${count + 1} 次 log`);
            console.log("count", count);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Rspack and React logos to learn more
      </p>
    </div>
  );
}

export default App;
