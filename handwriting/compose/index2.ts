const compose = (...fns: Function[]) => {
  return (params: any) => {
    return fns.reduceRight((acc, fn) => fn(acc), params);
  };
};

const add2 = (x: number) => x + 2;
const multiply3 = (x: number) => x * 3;
const toString1 = (x: number) => x.toString();
const displayValue = (x: string) => `displayValue: ${x}`;

const composed = compose(displayValue, toString1, multiply3, add2);

console.log(composed(4)); // 输出: "18"

const composeRight = (...fns: Function[]) => {
  return (params: any) => {
    return fns.reduce((acc, fn) => fn(acc), params);
  };
};

const composed2 = composeRight(add2, multiply3, toString1, displayValue);

console.log(composed2(4)); // 输出: "18"
