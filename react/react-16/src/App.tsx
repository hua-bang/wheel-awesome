import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(() => {
    return 0;
  });
  const [count1, setCount1] = useState(1);

  console.log("render count", count);

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
            Promise.resolve().then(() => {
              console.log(`step: 第 ${count + 1} 次 promise`);
            });
            setCount((count) => {
              console.log(`step: 第 ${count + 1} 次 set value`);
              return count + 1;
            });

            setCount((count) => {
              console.log(`step: 第 ${count + 1} 次 set value 2`);
              return count + 1;
            });

            console.log(`step: 第 ${count + 1} 次 log`);
          }}
        >
          count is {count}
        </button>

        <button
          onClick={() => {
            setTimeout(() => {
              console.log("Step 1: setCount1 ");
              setCount1((count) => {
                debugger;
                return count + 1;
              });

              console.log("Step 2: setCount1 ");
              setCount1((count) => {
                debugger;
                return count + 1;
              });
            }, 200);
          }}
        >
          count is {count1}
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
