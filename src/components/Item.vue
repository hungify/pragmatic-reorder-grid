<script lang="ts" setup>
import { useTemplateRef } from "vue";
import { useDraggable } from "../composables/useDraggable";
import { TItem } from "../types";
import ItemPreview from "./ItemPreview.vue";

interface Props {
  item: TItem;
}

const props = defineProps<Props>();
const itemRef = useTemplateRef<HTMLElement>("itemRef");

const { state, previewElement, preview } = useDraggable({
  element: itemRef,
  getInitialData: () => ({ item: props.item }),
  getData: () => ({ item: props.item }),
  onDragLeave: ({ source }) => {
    if ((source.data.item as TItem).id === props.item.id) {
      state.value = "dragging";
    } else {
      state.value = "idle";
    }
  },
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
  >
    {{ props.item.title }}
    <teleport v-if="preview" to="body">
      <div
        ref="previewElement"
        :style="{
          position: 'fixed',
          width: `${preview.bounds.width}px`,
          height: `${preview.bounds.height}px`,
          pointerEvents: 'none',
          willChange: 'transform',
          zIndex: 1000,
          top: 0,
          left: 0,
          transform: `translate(${preview.bounds.left}px, ${preview.bounds.top}px)`,
        }"
      >
        <ItemPreview :item="props.item" />
      </div>
    </teleport>
  </div>
</template>

<style scoped>
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
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.item-idle:hover {
  background: #fcde70;
}

.item-dragging {
  visibility: hidden;
  opacity: 0;
}

.item-over {
  transform: scale(1.1) rotate(8deg);
  filter: brightness(1.15);
  box-shadow: 0px 8px 12px #091e4226, 0px 0px 1px #091e424f;
  background: #73ec8b;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}
</style>
