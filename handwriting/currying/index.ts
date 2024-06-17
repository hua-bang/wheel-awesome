const currying = <T extends (...args: any[]) => any>(fn: T) => {
  const curryFn = (...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...args2: any[]) => {
      return curryFn(...args, ...args2);
    };
  };

  return curryFn;
};

const add = (a: number, b: number, c: number) => {
  return a + b + c;
};

const addCurry = currying(add);

const res = addCurry(1)(2)(3);

console.log("res", res);
