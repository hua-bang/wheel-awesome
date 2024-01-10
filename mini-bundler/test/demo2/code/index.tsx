import React from "react";
import App from "./app";
import { createRoot } from "react-dom/client";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app"));
root.render(<App />);

const ws = new WebSocket("ws://localhost:3069");

ws.onmessage = function (event) {
  const message = JSON.parse(event.data);
  if (message.type === "update") {
    console.log("update!!!@@@@123123@21321@!!");
    window.location.reload();
  }
};
