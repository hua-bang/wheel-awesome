import React, { useEffect } from "react";
import miniMicroFrontend from "./mini-micro-frontend";
import { MiniMicroFrontendAppConfig } from "./mini-micro-frontend/typings";
import MiniMicroFrontendApp from "./mini-micro-frontend/instance";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const app1: MiniMicroFrontendAppConfig = {
  name: "app1",
  entry: "http://localhost:8086/main.js",
};

const app2: MiniMicroFrontendAppConfig = {
  name: "app2",
  entry: "http://localhost:8084/main.js",
};

export const useInitMiniMicro = () => {
  const app1Ref = React.useRef<MiniMicroFrontendApp>();
  const app2Ref = React.useRef<MiniMicroFrontendApp>();

  useEffect(() => {
    miniMicroFrontend.run({
      domGetter: "#sub_app_container",
    });
  }, []);

  const loadApp = async (app: MiniMicroFrontendAppConfig) => {
    return await miniMicroFrontend.load(app);
  };

  const loadApp1 = async () => {
    if (app2Ref.current) {
      app2Ref.current.unmount();
    }
    await sleep(500);
    const app = await loadApp(app1);
    app1Ref.current = app;
    app.mount();
  };

  const loadApp2 = async () => {
    if (app1Ref.current) {
      app1Ref.current.unmount();
    }
    await sleep(500);
    const app = await loadApp(app2);
    app2Ref.current = app;
    app.mount();
  };

  return {
    loadApp1,
    loadApp2,
  };
};

export default useInitMiniMicro;
