import { AsyncParallelHook } from 'tapable';

const hook = new AsyncParallelHook(['arg1']);
console.time('AsyncParallelHook');

hook.tapPromise('event1', (...args: any[]): any => {
  console.log('event1', args);
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('测试');
    }, 2000);
  })
});

hook.tapPromise('event2', (...arg: any[]): any => {
  console.log('event2', arg);
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('测试1');
    }, 2000);
  })
});

hook.callAsync('test', (err, res) => {
  console.log('callAsync', res);
  console.timeEnd('AsyncParallelHook');
})