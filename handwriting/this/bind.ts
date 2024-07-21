interface Function {
  myBind(
    this: Function,
    context: any,
    args?: any[]
  ): (...otherArgs: any[]) => any;
}

Function.prototype.myBind = function (context: any, args?: any[]): any {
  if (typeof this !== "function") {
    throw new TypeError("Not a function");
  }

  context = context || globalThis;

  const fn = (...otherArgs: any[]) => {
    return this.apply(context, [...(args || []), ...otherArgs]);
  };

  return fn;
};

function getName() {
  console.log(this.name);
}

const c = {
  name: "hua",
};

getName.myBind(c)();
