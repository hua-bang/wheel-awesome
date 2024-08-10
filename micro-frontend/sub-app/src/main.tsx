import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>
// );

export const provider = () => ({
  render: () => {
    const dom = ReactDOM.createRoot(
      document.getElementById("sub_app_container") as HTMLElement
    );

    dom.render(<App />);
  },

  destroy: () => {
    console.log("sub-app destroy");
  },
});
