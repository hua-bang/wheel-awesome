import { SyncHook } from "./syncHook";
import { LifeCycle, LifeCycleKey, MiniMicroFrontendPlugin } from "./typings";

class PluginSystem {
  public lifeCycle: LifeCycle = {
    bootstrap: new SyncHook("bootstrap"),
    beforeLoad: new SyncHook("beforeLoad"),
    afterLoad: new SyncHook("afterLoad"),
    beforeMount: new SyncHook("beforeMount"),
    afterMount: new SyncHook("afterMount"),
    beforeUnmount: new SyncHook("beforeUnmount"),
    afterUnmount: new SyncHook("afterUnmount"),
  };

  private plugins: MiniMicroFrontendPlugin[] = [];

  usePlugin(plugin: MiniMicroFrontendPlugin) {
    if (this.plugins.includes(plugin)) {
      throw new Error(`plugin ${plugin.name} has been used`);
    }
    this.plugins.push(plugin);
    for (let key in this.lifeCycle) {
      const callback = plugin[key as LifeCycleKey];
      if (callback) {
        this.lifeCycle[key as LifeCycleKey].on(callback);
      }
    }
  }
}

export default PluginSystem;
