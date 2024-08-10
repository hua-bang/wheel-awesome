import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";

let app: any;

export const provider = () => ({
  render({ dom }) {
    app = createApp(App);
    app.mount(dom);
  },
  destroy() {
    app?.unmount();
  },
});
