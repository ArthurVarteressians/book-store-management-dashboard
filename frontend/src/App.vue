<template>
  <div v-if="$route.path === '/'">
    <AppHeader class="h-auto sm:h-[10vh]" />
    <AppBodySection class="h-auto sm:h-[80vh]" />
    <AppFooter class="h-auto sm:h-[10vh]" />
  </div>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
  import AppBodySection from './components/AppBodySection.vue';
</script>
