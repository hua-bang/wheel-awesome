function repeat(fn, count, delay) {
  return async (...args) => {
    const res = [];
    for (let i = 0; i < count; i++) {
      res.push(fn(...args));
      await sleep(delay);
    }
    return res;
  }
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

const repeatFunc = repeat((a, b) => a + b, 5, 1000);
repeatFunc(1, 5).then(res => {
  console.log(res);
})