const PromiseTry = (fn: () => Promise<any> | any) => {
  return Promise.resolve().then(fn);
}

PromiseTry(() => {
  return 1;
}).then((res) => {
  console.log(res);
});


console.log(0);