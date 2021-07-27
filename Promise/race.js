function race(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(promise => {
      promise.then(res => {
        resolve(res);
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
    }, 2500);
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
    }, 100);
  })
}

race([p1(), p2(), p3()]).then(res => {
  console.log("res" + res);
}).catch(err => {
  console.log("err" + err);
})