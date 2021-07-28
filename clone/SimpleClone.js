function clone(x) {
  if (!isObject(x)) {
    return;
  }
  const instance = x instanceof Array ? [] : {};
  for (let key in x) {
    instance[key] = isObject(x[key]) ? clone(x[key]) : x[key];
  }
  return instance;
}

let a = {
  a: 3,
  b: {
    c: [1, 2, 3]
  }
};

let b = clone(a);
b.a = 2;
b.b.c.push(4);
console.log(b);
console.log(a);


function isObject(x) {

  return typeof x === "object";
}