import { LifeCycle, LifeCycleKey } from "./lifeCycle";

export type MiniMicroFrontendPlugin = {
  name: string;
} & {
  [k in LifeCycleKey]?: Parameters<LifeCycle[LifeCycleKey]["on"]>[0];
};
