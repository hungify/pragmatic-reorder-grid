<script lang="ts" setup>
import { ref, useTemplateRef, onMounted, computed, watch, reactive } from "vue";

import Item from "./Item.vue";
import {
  autoScrollForElements,
  autoScrollWindowForElements,
} from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TItem } from "../types";

const props = defineProps<{
  gridSize: number;
}>();

const items = ref<TItem[]>(
  new Array(20).fill(0).map((_, index) => ({
    id: index,
    title: `Item ${index + 1}`,
  }))
);

const scrollableRef = useTemplateRef("scrollableRef");
const itemsAtDragStart = ref<TItem[]>([]);

const totalItems = computed(() => props.gridSize * props.gridSize);

const swapState = reactive<{
  source: { item: TItem; x: number; y: number } | null;
  target: { item: TItem; x: number; y: number } | null;
}>({
  source: null,
  target: null,
});
const setupGridItems = () => {
  items.value = Array.from({ length: totalItems.value }, (_, index) => ({
    id: index,
    title: `Item ${index}`,
  }));
};

watch(
  () => props.gridSize,
  () => {
    setupGridItems();
  }
);

onMounted(() => {
  setupGridItems();
  if (!scrollableRef.value) return;

  combine(
    autoScrollForElements({
      element: scrollableRef.value,
    }),
    autoScrollWindowForElements(),
    monitorForElements({
      onDragStart({ source }) {
        itemsAtDragStart.value = items.value;
        const sourceElement = source.element;
        const rect = sourceElement.getBoundingClientRect();
        swapState.source = {
          item: source.data.item as TItem,
          x: rect.left,
          y: rect.top,
        };
      },
      onDrop({ location }) {
        const target = location.current.dropTargets[0];

        if (!target) {
          items.value = itemsAtDragStart.value;
          return;
        }
      },
      onDropTargetChange({ location }) {
        const target = location.current.dropTargets[0];
        if (!target) return;
        console.log("### :: file: Grid.vue:90 :: target:", target);

        const targetElement = target.element;
        const rect = targetElement.getBoundingClientRect();
        swapState.target = {
          item: target.data.item as TItem,
          x: rect.left,
          y: rect.top,
        };
      },
    })
  );
});
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <div class="grid-container" ref="scrollableRef">
        <transition-group name="grid" tag="div" class="grid">
          <Item
            v-for="item in items"
            :key="item.id"
            :item="item"
            :swapState="swapState"
          />
        </transition-group>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  padding: 1rem;
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(v-bind(gridSize), 1fr);
  gap: 20px;
  width: 100%;
  max-width: v-bind(gridSize * 100 + "px");
}

.controls-container {
  position: sticky;
  top: 60px;
  background: #fff;
  z-index: 90;
  padding: 0.5rem 0;
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }

  .grid {
    gap: 8px;
    max-width: none;
    width: 100%;
  }

  .grid-container {
    padding: 0 0.5rem;
  }
}

@media (max-width: 480px) {
  .grid {
    gap: 6px;
  }
}
</style>
