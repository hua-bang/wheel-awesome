Promise.race([Promise.reject("2"), Promise.resolve(3)])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("err", err);
  });

const PromiseRace = (promiseArr: Array<any | Promise<any>>) => {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((promise) => {
      if (!(promise instanceof Promise)) {
        resolve(promise);
        return;
      }

      promise.then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

PromiseRace([Promise.reject("2"), Promise.resolve(3)])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("err", err);
  });
