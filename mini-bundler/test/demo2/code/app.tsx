import React, { useState } from "react";
import { add } from "./add";
import { useEffect } from "react/cjs/react.production.min";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <div onClick={() => setCount((prev) => add(prev, 2))}>count: {count}</div>
  );
};

export default App;
