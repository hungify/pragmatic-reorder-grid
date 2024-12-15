<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

const fps = ref(0);
let frameCount = 0;
let lastTime = performance.now();
let animationFrameId: number;

const updateFPS = () => {
  const now = performance.now();
  frameCount++;

  if (now - lastTime >= 1000) {
    fps.value = Math.round((frameCount * 1000) / (now - lastTime));
    frameCount = 0;
    lastTime = now;
  }

  animationFrameId = requestAnimationFrame(updateFPS);
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(updateFPS);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <div class="fps-counter">FPS: {{ fps }}</div>
</template>

<style scoped>
.fps-counter {
  background-color: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  width: max-content;
}

@media (max-width: 768px) {
  .fps-counter {
    padding: 0.35rem 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .fps-counter {
    padding: 0.25rem 0.4rem;
  }
}
</style>
