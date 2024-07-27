// Set
function uniqueArr<T = any>(arr: T[]) {
  return [...new Set(arr)];
}

// filter
function uniqueArr1<T = any>(arr: T[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// reduce
function uniqueArr2<T = any>(arr: T[]) {
  return arr.reduce((result, curr) => {
    if (result.includes(curr)) {
      return result;
    }

    return [...result, curr];
  }, [] as T[]);
}
