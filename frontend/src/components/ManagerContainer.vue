<template>
  <div class="w-full min-h-screen flex flex-col">
    <AppHeader class="h-auto sm:h-[10vh]" />
    <ManagerPage class="flex-1 h-auto sm:h-[80vh]" />
    <AppFooter class="h-auto sm:h-[10vh]" />
  </div>
</template>

<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import ManagerPage from './ManagerPage.vue';
</script>
