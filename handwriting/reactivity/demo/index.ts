import { effect, reactivity } from "../src";

const state = reactivity({
  count: 0,
  a: {
    name: "小明",
  },
});

effect(() => {
  console.log("name", state.a.name);
});

setTimeout(() => {
  console.log("change value");
  state.a.name = "小红";
}, 200);

setTimeout(() => {
  console.log("change value");
  state.a = {
    name: "小刚",
  };
}, 2000);
