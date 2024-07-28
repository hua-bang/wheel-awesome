import { track, trigger } from "./effect";

export const reactivity = (target: Record<string, any>): any => {
  return new Proxy(target, {
    get(target, key) {
      track(target, key);
      const result = target[key as any];

      if (typeof result === "object" && result !== null) {
        return reactivity(result);
      }

      return result;
    },
    set(target, key, value) {
      target[key as any] = value;
      trigger(target, key);
      return true;
    },
  });
};
