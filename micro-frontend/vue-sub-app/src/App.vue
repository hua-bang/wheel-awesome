<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const title = ref<string>("Rspack + Vue");
const count = ref(0);
</script>

<template>
  <div>
    <span @click="count++">{{ title }} {{ count }}</span>
  </div>
  <!-- <HelloWorld :msg="title" /> -->
</template>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
