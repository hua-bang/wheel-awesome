const PromiseAll = <T extends readonly unknown[] | []>(
  promiseArr: T
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> => {
  return new Promise((resolve, reject) => {
    const result: any[] = [];

    promiseArr.forEach((originPromise, index) => {
      let promise = originPromise;
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
        return;
      }

      promise
        .then((res: any) => {
          result[index] = res;
          if (result.length === promiseArr.length) {
            resolve(
              result as unknown as Promise<{
                -readonly [P in keyof T]: Awaited<T[P]>;
              }>
            );
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

PromiseAll([promise1, promise2, promise3, 5, 6, "hello"]).then((res) => {
  console.log(res);
});

Promise.all([promise1, promise2, promise3, 8, 9, "hello"]).then((res) => {
  console.log(res);
});
