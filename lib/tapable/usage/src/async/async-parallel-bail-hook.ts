import { AsyncParallelBailHook } from 'tapable';
const hook = new AsyncParallelBailHook(['arg1']);

console.time('AsyncParallelBailHook');

hook.tapPromise('plugin1', () => {
  console.log('plugin1');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('plugin1');
    }, 1000);
  })
});

hook.tapPromise('plugin2', () => {
  console.log('plugin2');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('plugin2');
    }, 2000);
  })
});

hook.callAsync('测试', (err, res) => {
  console.log('res');
  console.timeEnd('AsyncParallelBailHook');
})
