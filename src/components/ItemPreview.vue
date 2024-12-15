<script lang="ts" setup>
import { TItem } from "../types";

interface Props {
  item: TItem;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="grid-item">
    {{ props.item.title }}
  </div>
</template>

<style scoped>
.grid-item {
  color: white;
  text-align: center;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  border-width: 2px;
  border-color: #6b4ce6;
  border-style: solid;
  background-color: transparent;
  border-radius: 6px;
  transition: all 150ms ease-in-out;
  padding: 4px;
  color: #ff5630;
  transform: rotate(4deg);
  width: 100%;
}
</style>
