const race = (promiseArr: Promise<any>[]) => {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(promise => {
      promise.then(resolve, reject);
    })
  });
}

race(
  [
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(2);
      }, 500);
    }),
  ]
).then(res => {
  console.log(res);
}).catch(err => {
  console.log('err', err);
});