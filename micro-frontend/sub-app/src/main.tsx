import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>
// );

export const provider = () => ({
  render: ({ dom }) => {
    const nextDom = ReactDOM.createRoot(dom);

    nextDom.render(<App />);
  },

  destroy: ({ dom }) => {
    ReactDOM.createRoot(dom).unmount();
  },
});
