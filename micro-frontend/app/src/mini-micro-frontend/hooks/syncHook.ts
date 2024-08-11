export type Callback<T, K> = (...args: ArgsType<T>) => K;
export type ArgsType<T> = T extends Array<any> ? T : Array<any>;

export class SyncHook<T = any, K = any> {
  public type: string = "";
  public listeners = new Set<Callback<T, K>>();

  constructor(type: string) {
    this.type = type;
  }

  on(callback: Callback<T, K>) {
    this.listeners.add(callback);
  }

  emit(...args: ArgsType<T>) {
    this.listeners.forEach((listener) => {
      return listener.apply(null, args);
    });
  }

  remove(callback: Callback<T, K>) {
    this.listeners.delete(callback);
  }

  removeAll() {
    this.listeners.clear();
  }
}
