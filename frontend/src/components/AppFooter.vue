<template>
  <footer
    class="bg-slate-400 p-4 flex flex-col md:flex-row items-center justify-around text-center md:text-left space-y-2 md:space-y-0"
  >
    <!-- Copyright Text -->
    <div class="text-sm sm:text-base md:text-lg font-semibold">
      © 2024 All Rights Reserved
    </div>

    <!-- Description Text -->
    <div class="text-sm sm:text-base md:text-lg font-semibold">
      Lorem ipsum dolor sit amet
    </div>

    <!-- Manager Login Button -->
    <button
      @click="redirectToManagerPage"
      class="text-sm sm:text-base md:text-lg font-light"
    >
      Manager login
    </button>
  </footer>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const redirectToManagerPage = () => {
    router.push('/manager');
  };
</script>
