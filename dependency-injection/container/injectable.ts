import container from "./container";

export function Injectable<T>() {
  return (target: new (...args: any[]) => T) => {
    container.register(target.name, target);
  };
}
