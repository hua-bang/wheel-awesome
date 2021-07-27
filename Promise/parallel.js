let createPromise = (i) => {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(i);
      }, Math.random() * 1000 % 1000 + 1000);
    })
  }
}

let arr = new Array(100).fill(0);
let promiseArr = arr.map((v, k) => createPromise(k + 1));

async function parallel(promiseArr, limit = 10) {
  return new Promise(resolve => {
    
    let count = 0; //计数
    let length = promiseArr.length;
    let res = new Array(length).fill(false);
    limit = limit > length ? length : limit;
    for (let i = 0; i < limit; i++) {
      parall();
    }

    function parall() {
      if (count >= length) {
        return;
      }
      const current = count++;
      const promise = promiseArr[current];
      promise().then(result => {
        res[current] = result;
      }).catch(error => {
        res[current] = error;
      }).finally(() => {
        if (current <= length) {
          parall();
        }
        if (res.every(v => v != false)) {
          resolve(res);
        }
      })
    }
  });
}

parallel(promiseArr).then(res => {
  console.log(res);
})

