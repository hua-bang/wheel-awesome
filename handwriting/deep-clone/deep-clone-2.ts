const deepClone2 = (
  obj: Record<string, any>,
  map = new WeakMap()
): Record<string, any> => {
  if (map.has(obj)) {
    return map.get(obj);
  }

  const result: any = Array.isArray(obj) ? [] : {};
  map.set(obj, result);

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    const val = obj[key];

    if (typeof val === "object") {
      result[key] = deepClone2(val, map);
    } else {
      result[key] = val;
    }
  }

  return result;
};

const obj2A: any = {
  name: "huahua",
  age: 18,
  school: {
    name: "hunan",
  },
};

const obj2B = {
  a: obj2A,
};

obj2A.b = obj2B;

const obj2C = deepClone2(obj2A);
console.log("c", obj2C);
