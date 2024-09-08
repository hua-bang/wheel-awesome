const deepClone1 = (obj: Record<string, any>): Record<string, any> => {
  const result: any = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    const val = obj[key];

    if (typeof val === "object") {
      result[key] = deepClone1(val);
    } else {
      result[key] = val;
    }
  }

  return result;
};

const objA: any = {
  name: "huahua",
  age: 18,
  school: {
    name: "hunan",
  },
};

const objB = {
  a: objA,
};

// objA.b = objB;

const objC = deepClone1(objA);
console.log("c", objC);
