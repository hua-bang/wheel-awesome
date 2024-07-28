import { track, trigger } from "./effect";

const SUPPORT_PROXY = false;

const reactivityByProxy = (target: Record<string, any>): any => {
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

function reactivityByDefineProperty(target: Record<string, any>): any {
  const handles = {
    get(target: Record<string, any>, key: string | symbol) {
      track(target, key);
      const result = target[key as any];

      if (typeof result === "object" && result !== null) {
        return reactivityByDefineProperty(result);
      }

      return result;
    },
    set(target: Record<string, any>, key: string | symbol, value: any) {
      target[key as any] = value;
      trigger(target, key);
      return true;
    },
  };

  const reactivityObject = {};

  Object.keys(target).forEach((key) => {
    Object.defineProperty(reactivityObject, key, {
      get() {
        return handles.get(target, key);
      },
      set(value) {
        return handles.set(target, key, value);
      },
    });
  });

  return reactivityObject;
}

export const reactivity = SUPPORT_PROXY
  ? reactivityByProxy
  : reactivityByDefineProperty;
