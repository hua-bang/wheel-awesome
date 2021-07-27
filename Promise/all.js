function all(promiseArr) {
  return new Promise((resolve, reject) => {
    const res = new Array(promiseArr.length).fill(false);

    promiseArr.forEach((promise, index) => {
      promise.then(result => {
        res[index] = result;
        if (res.every(v => v != false)) {
          resolve(res);
        }
      }).catch(err => {
        reject(err);
      })
    })
  })
}

let p1 = function () {
  return new Promise(resolve => {
    console.log("begin 1");
    setTimeout(() => {
      resolve(1);
    }, 1000);
  })
}

let p2 = function () {
  return new Promise(resolve => {
    console.log("begin 2");
    setTimeout(() => {
      resolve(2);
    }, 2000);
  })
}

let p3 = function () {
  return new Promise((resolve, reject) => {
    console.log("begin 3");
    setTimeout(() => {
      reject(2);
    }, 3000);
  })
}

all([p1(), p2()]).then(res => {
  console.log("res" + res);
}).catch(err => {
  console.log("err" + err);
})