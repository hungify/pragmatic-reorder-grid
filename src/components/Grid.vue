<script lang="ts" setup>
import { ref, useTemplateRef, onMounted, computed, watch } from "vue";
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

const items = ref<TItem[]>([]);
const itemsAtDragStart = ref<TItem[]>([]);
const scrollableRef = useTemplateRef("listRef");

const totalItems = computed(() => props.gridSize * props.gridSize);

const setupGridItems = () => {
  items.value = Array.from({ length: totalItems.value }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
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

  if (!scrollableRef.value) {
    return;
  }

  combine(
    autoScrollForElements({
      element: scrollableRef.value,
    }),
    autoScrollWindowForElements(),
    monitorForElements({
      onDragStart() {
        itemsAtDragStart.value = items.value;
      },
      onDropTargetChange({ location, source }) {
        const target = location.current.dropTargets[0];

        if (!target) return;
        const sourceItem = source.data.item as TItem;
        const destinationItem = target.data.item as TItem;

        if (sourceItem.id === destinationItem.id) return;

        const sourceIndex = items.value.findIndex(
          (item) => item.id === sourceItem.id
        );
        const destinationIndex = items.value.findIndex(
          (item) => item.id === destinationItem.id
        );

        const listClone = [...items.value];
        listClone.splice(sourceIndex, 1);
        listClone.splice(destinationIndex, 0, sourceItem);

        items.value = listClone;
      },
    })
  );
});
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <div class="grid-container" ref="listRef">
        <transition-group name="grid" tag="div" class="grid">
          <Item v-for="item in items" :key="item.id" :item="item" />
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
