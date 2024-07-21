const PromiseAll = (promiseArr: Array<any | Promise<any>>) => {
  return new Promise((resolve, reject) => {
    const result: any[] = [];

    promiseArr.forEach((promise, index) => {
      promise
        .then((res: any) => {
          result[index] = res;
          if (result.length === promiseArr.length) {
            resolve(result);
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  });
};

const promise1 = Promise.resolve(2);

const promise2 = Promise.resolve(3);

const promise3 = Promise.resolve(4);

PromiseAll([promise1, promise2, promise3]).then((res) => {
  console.log(res);
});
