// async function repeat(fn, args, count, delay = 1000) {
//   let res = [];
//   for (let i = 0; i < count; i++) {
//     res.push(fn(...args));
//     await sleep(delay);
//   }
//   return res;
// }

// function sleep(delay) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   })
// }

// repeat((a, b) => a + b, [1, 2], 4).then(res => {
//   console.log(res);
// })


function repeat(fn, count, delay) {
  return function (...args) {
    (async () => {
      for (let i = 0; i < count; i++) {
        fn(...args);
        await sleep(delay);
      }
    })();
  }
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

const repeatLog = repeat(console.log, 5, 1000);
repeatLog(1);