<script lang="ts" setup>
import FPSCounter from "./FPSCounter.vue";
import GridControls from "./GridControls.vue";

defineProps<{
  gridSize: number;
}>();

const emit = defineEmits<{
  (e: "update:gridSize", value: number): void;
}>();

const size = defineModel("gridSize", {
  default: 3,
});
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="controls-wrapper">
        <GridControls
          :size="size"
          @update:size="(size) => emit('update:gridSize', size)"
        />
      </div>
      <FPSCounter />
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.controls-wrapper {
  display: flex;
  justify-content: center;
}
</style>
