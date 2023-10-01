function SingleTon<T, Params extends any[]>(fn: (...args: Params) => T): (...args: Params) => T {
  let result: T;
  
  return function(this: any, ...args: Params) {
    const context = this as unknown;
    if(!result) {
      result = fn.call(context, ...args);
    }
    return result;
  }
}

const getAInstance = () => ({
  a: 1
});

const getSingleFn = SingleTon(getAInstance);

const a = getSingleFn();

const b = getSingleFn();

console.log(a === b);