let activeEffect: Function | null = null;

export const effect = (fn: () => void) => {
  activeEffect = fn;
  fn();
  activeEffect = null;
};

const proxyMaps: WeakMap<
  Object,
  Map<string | symbol, Function[]>
> = new WeakMap();

export const track = (target: Record<string, any>, key: string | symbol) => {
  if (!activeEffect) {
    return;
  }

  const depsMap =
    proxyMaps.get(target) || new Map<string | symbol, Function[]>();
  const deps = depsMap.get(key) || ([] as Function[]);

  deps.push(activeEffect);

  depsMap.set(key, deps);
  proxyMaps.set(target, depsMap);
};

export const trigger = (target: Record<string, any>, key: string | symbol) => {
  const depsMap = proxyMaps.get(target);
  if (!depsMap) {
    return;
  }

  const deps = depsMap.get(key);

  deps?.forEach((dep) => dep());
};
