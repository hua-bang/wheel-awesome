function myNew(constructor: Function, ...args: any[]) {
  const obj = {};

  obj.__proto__ = constructor.prototype;

  const result = constructor.apply(obj, args);

  return result instanceof Object ? result : obj;
}
