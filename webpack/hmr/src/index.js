import getHello from "./hello.js";

getHello();

if(module.hot) {
  module.hot.accept(['./hello.js'], () => {
    getHello();
  })
}