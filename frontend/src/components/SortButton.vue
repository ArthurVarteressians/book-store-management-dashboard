<script setup lang="ts">
  import { ref, watch, defineEmits } from 'vue';

  const sortOrder = ref<'desc' | 'asc'>('desc'); // Default sort order

  // Emit events to parent
  const emits = defineEmits<{
    (e: 'sort-changed', order: 'desc' | 'asc'): void;
  }>();

  // Watch for changes in sortOrder and emit to parent
  watch(sortOrder, (newOrder) => {
    emits('sort-changed', newOrder);
  });
</script>

<template>
  <div class="relative inline-block text-left">
    <button
      @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Sort: <span>{{ sortOrder === 'desc' ? 'Latest' : 'Oldest' }}</span>
    </button>
  </div>
</template>

<style scoped>
  button {
    cursor: pointer;
  }
</style>
