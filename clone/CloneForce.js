function clone(x) {
  const uniqueList = [];
  const uniqueMap = new Map();

  let root = x instanceof Array ? [] : {};
  let type = x instanceof Array ? "array" : "object";
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

    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      continue; // 中断本次循环
    }

    uniqueList.push({
      source: data,
      target: res,
    });

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          loopList.push({
            parent: res,
            key: k,
            data: data[key]
          })
        }
      } else {
        res[k] = data[k];
      }
    }
  }
  return root;
}

function find(arr, item) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }
  return null;
}

var b = {};
var a = {a1: b, a2: b};

console.log(a.a1 === a.a2);  // true

var c = clone(a);
console.log(c.a1 === c.a2); // true