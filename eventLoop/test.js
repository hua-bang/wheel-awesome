console.log(1);
setImmediate(() => {
  console.log("setImmediate");
})

setTimeout(() => {
    console.log(1);
})

setTimeout(() => {
    console.log(2);
})