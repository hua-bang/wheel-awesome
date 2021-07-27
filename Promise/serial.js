async function serial(promiseArr) {
  let res = [];
  for (let i = 0; i < promiseArr.length; i++) {
    const promise = promiseArr[i];
    res.push(await promise());
  }
  return res;
}

let createPromise = (i) => {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(i);
        resolve(i);
      }, 100);
    })
  }
}

let arr = new Array(100).fill(0);
let promiseArr = arr.map((v, k) => createPromise(k + 1));

serial(promiseArr).then(res => {
  console.log(res);
})
