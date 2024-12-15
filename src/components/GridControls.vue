<script lang="ts" setup>
const emit = defineEmits<{
  (e: "update:size", value: number): void;
}>();

defineProps<{
  size: number;
}>();

const sizes = [2, 3, 4, 5, 6, 7, 8, 9, 10];
const selectedSize = defineModel("size", {
  default: 3,
});

const handleSizeChange = (size: number) => {
  selectedSize.value = size;
  emit("update:size", size);
};
</script>

<template>
  <div class="controls">
    <div class="size-buttons">
      <button
        v-for="size in sizes"
        :key="size"
        :class="{ active: selectedSize === size }"
        @click="handleSizeChange(size)"
      >
        {{ size }}x{{ size }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.size-buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  color: #333;
  cursor: pointer;
}

button.active {
  background: #333;
  color: #fafafa;
}

@media (max-width: 768px) {
  .controls {
    margin: 0.5rem;
    gap: 0.5rem;
  }

  .size-buttons {
    gap: 0.25rem;
  }

  button {
    padding: 0.35rem 0.7rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  button {
    min-width: 44px;
    padding: 0.25rem;
  }
}
</style>
