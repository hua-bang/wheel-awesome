const currying = <T extends (...args: any[]) => any>(fn: T) => {
  const curried = (...args: any[]) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return (...args2: any[]) => {
      return curried(...args, ...args2);
    }
  }

  return curried;
}

const add = (a: number, b: number, c: number) => {
  return a + b + c;
};

const addCurry = currying(add);

const res = addCurry(1)(2)(3);

console.log("res", res);
