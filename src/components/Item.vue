<script lang="ts" setup>
import { computed, ref } from "vue";
import { useDraggable } from "../composables/useDraggable";
import { TItem } from "../types";

interface Props {
  item: TItem;
  swapState: {
    source: { item: TItem; x: number; y: number } | null;
    target: { item: TItem; x: number; y: number } | null;
  };
}

const props = defineProps<Props>();

const itemRef = ref<HTMLElement | null>(null);

const { state, TeleportedPreview } = useDraggable({
  element: itemRef,
  getInitialData: () => ({ item: props.item }),
  getData: () => ({ item: props.item }),
});

const itemStyle = computed(() => {
  if (!props.swapState.source || !props.swapState.target) return {};

  if (props.swapState.source.item.id === props.item.id) {
    const dx = props.swapState.target.x - props.swapState.source.x;
    const dy = props.swapState.target.y - props.swapState.source.y;
    return {
      transform: `translate(${dx}px, ${120}px)`,
      transition: "transform 0.3s ease",
    };
  } else if (props.swapState.target.item.id === props.item.id) {
    const dx = props.swapState.source.x - props.swapState.target.x;
    const dy = props.swapState.source.y - props.swapState.target.y;
    return {
      transform: `translate(${dx}px, ${120}px)`,
      transition: "transform 0.3s ease",
    };
  }
});
</script>

<template>
  <div
    class="grid-item"
    ref="itemRef"
    :class="{
      'item-idle': state === 'idle',
      'item-dragging': state === 'dragging',
      'item-over': state === 'over',
    }"
    :style="itemStyle"
  >
    {{ props.item.title }}
    <TeleportedPreview />
  </div>
</template>

<style>
.grid-item {
  background: #4caf50;
  color: white;
  text-align: center;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}

.item-idle:hover {
  background: #fcde70;
}

.item-dragging {
  opacity: 0;
}

.item-over {
  transform: scale(1.1) rotate(8deg);
  filter: brightness(1.15);
  box-shadow: 0px 8px 12px #091e4226, 0px 0px 1px #091e424f;
  background: #73ec8b;
}
</style>
