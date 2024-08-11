import { SyncHook } from "..";

export interface LifeCycle {
  bootstrap: SyncHook;
  beforeLoad: SyncHook;
  afterLoad: SyncHook;
  beforeMount: SyncHook;
  afterMount: SyncHook;
  beforeUnmount: SyncHook;
  afterUnmount: SyncHook;
}

export type LifeCycleKey = keyof LifeCycle;
