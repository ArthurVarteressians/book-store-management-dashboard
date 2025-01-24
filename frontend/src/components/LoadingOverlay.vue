<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <!-- Conditionally render icons based on the iconType prop -->
      <component :is="currentIcon" class="mb-4" v-if="currentIcon" />
      <p class="text-gray-700 text-lg">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import SuccessIcon from '@/components/SuccessIcon.vue';
  import WarningIcon from '@/components/WarningIcon.vue';
  import ErrorIcon from '@/components/ErrorIcon.vue';

  const props = defineProps<{
    show: boolean;
    message: string;
    iconType: 'success' | 'warning' | 'error';
  }>();

  // Compute the icon component based on iconType
  const currentIcon = computed(() => {
    switch (props.iconType) {
      case 'success':
        return SuccessIcon;
      case 'warning':
        return WarningIcon;
      case 'error':
        return ErrorIcon;
      default:
        return null;
    }
  });
</script>

<style scoped></style>
