interface Function {
  myCall(this: Function, context: any, ...args: any[]): any;
}

Function.prototype.myCall = function (context: any, ...args: any[]): any {
  if (typeof this !== "function") {
    throw new TypeError("Not a function");
  }

  context = context || globalThis;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);
  delete context[fnSymbol];

  return result;
};

function getName() {
  console.log(this.name);
}

const a = {
  name: "hua",
};

getName.myCall(a);
