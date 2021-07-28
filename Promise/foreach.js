const multi = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num) {
        resolve(num * num)
      } else {
        reject(new Error('num not specified'))
      }
    }, 1000)
  })
}

function test() {
  const nums = [1, 2, 3];
  nums.forEach(async num => {
    let res = await multi(num);
    console.log(res);
  })
}

// test();

Array.prototype.asyncForEach = async function (callback) {
  let context = this;
  for (let i = 0; i < context.length; i++) {
    await callback(context[i], i, context);
  }
}

function demo() {
  const nums = [1, 2, 3];
  nums.asyncForEach(async num => {
    let res = await multi(num);
    console.log(res);
  })
}

demo();