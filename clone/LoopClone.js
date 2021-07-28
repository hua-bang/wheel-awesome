function clone(x) {
  if (typeof x !== "object") {
    return x;
  }
  
  const root = x instanceof Array ? [] : {};
  const type = x instanceof Array ? "array" : "object";
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
      type
    }
  ];

  while (loopList.length) {
    let node = loopList.pop();
    const { key, data, parent, type } = node;
    let res = parent;

    if (key !== undefined) {
      res = parent[key] = type === "array" ? [] : {};
    }

    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
            type: data[k] instanceof Array ? "array" : "object"
          })
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

let a = {
  a: 3,
  b: {
    c: [1, 2, 3]
  }
};

let b = clone(a);
b.a = 2;
b.b.c.push(3);
console.log(b);
console.log(a);

