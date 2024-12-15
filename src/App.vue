<script setup lang="ts">
import { ref } from "vue";
import Grid from "./components/Grid.vue";
import Header from "./components/Header.vue";

const gridSize = ref(3);
</script>

<template>
  <Header v-model:grid-size="gridSize" />
  <h3 class="title">Pragmatic Reorder Grid</h3>
  <Grid :grid-size="gridSize" />
</template>

<style scoped>
.title {
  margin: 0;
  text-align: center;
  padding: 10px 0;
}
</style>
