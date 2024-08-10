import { useEffect } from "react";
import miniMicroFrontend from "./mini-micro-frontend";
import { MiniMicroFrontendAppConfig } from "./mini-micro-frontend/typings";

const app1: MiniMicroFrontendAppConfig = {
  name: "app1",
  entry: "http://localhost:8086/main.js",
};

export const useInitMiniMicro = () => {
  useEffect(() => {
    miniMicroFrontend.run({
      domGetter: "#sub_app_container",
    });
  }, []);

  const loadApp = async (app: MiniMicroFrontendAppConfig) => {
    const subApp = await miniMicroFrontend.load(app);
    subApp.mount();
  };

  return {
    loadApp1: () => loadApp(app1),
  };
};

export default useInitMiniMicro;
