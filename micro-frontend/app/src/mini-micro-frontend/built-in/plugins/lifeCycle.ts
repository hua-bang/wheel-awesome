import { MiniMicroFrontendPlugin } from "../../hooks";

export type LifeCyclePluginOptions = Partial<MiniMicroFrontendPlugin>;

export const getLifeCyclePlugin = (options: LifeCyclePluginOptions) => {
  return {
    name: "lifeCyclePlugin",
    ...options,
  };
};

export default getLifeCyclePlugin;
