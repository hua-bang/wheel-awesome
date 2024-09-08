type QueueItem = [Record<string, any>, Record<string, any>];

const deepClone3 = (obj: Record<string, any>): Record<string, any> => {
  const map = new WeakMap();

  const result = Array.isArray(obj) ? [] : {};

  const queue: QueueItem[] = [[obj, result]];

  while (queue.length) {
    const [source, target] = queue.shift()!;
    map.set(source, source);

    for (let key in target) {
      if (!source.hasOwnProperty(key)) {
        continue;
      }

      const val = source[key];

      if (typeof val !== "object") {
        target[key] = val;
      } else {
        if (map.get(val)) {
          target[key] = map.get(val);
        } else {
          const newTarget = Array.isArray(val) ? [] : {};
          target[key] = newTarget;
          queue.push([val, newTarget]);
        }
      }
    }
  }

  return map.get(obj);
};

const obj3A: any = {
  name: "huahua",
  age: 18,
  school: {
    name: "hunan",
  },
};

const obj3B = {
  a: obj3A,
};

obj3A.b = obj3B;

const obj3C = deepClone3(obj3A);
console.log("c", obj3C);
