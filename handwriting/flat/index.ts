const flatArr = (arr: any[]): any[] => {
  return arr.reduce((result, curr) => {
    if (!Array.isArray(curr)) {
      return [...result, curr];
    }
    return [...result, ...flatArr(curr)];
  }, []);
};

let nestedArray = [1, [2, [3, [4]], 5]];
console.log(flatArr(nestedArray));
