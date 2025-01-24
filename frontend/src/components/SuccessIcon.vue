<template>
  <div class="icon-container">
    <svg class="success-svg" viewBox="0 0 100 100">
      <!-- Circle with animation -->
      <circle class="success-circle" cx="50" cy="50" r="45"></circle>

      <!-- Animated Checkmark -->
      <path
        class="checkmark"
        d="M25 50 L45 70 L80 30"
        fill="none"
        stroke="#28a745"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
  // No additional script logic is needed
</script>

<style scoped>
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .success-svg {
    width: 100px;
    height: 100px;
  }

  .success-circle {
    fill: none;
    stroke: #28a745;
    stroke-width: 5;
    stroke-dasharray: 283; /* Circle circumference */
    stroke-dashoffset: 283;
    animation: drawCircle 2s cubic-bezier(0.8, 0.15, 0.5, 0.55) infinite;
  }

  .checkmark {
    stroke-dasharray: 100; /* Adjusted length for extended checkmark */
    stroke-dashoffset: 100;
    animation: drawCheckmark 2s cubic-bezier(0.8, 0.15, 0.5, 0.55) infinite;
  }

  /* Circle animation */
  @keyframes drawCircle {
    0% {
      stroke-dashoffset: 283;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 283;
    }
  }

  /* Checkmark animation */
  @keyframes drawCheckmark {
    0% {
      stroke-dashoffset: 100;
      opacity: 0;
    }
    50% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    100% {
      stroke-dashoffset: 100;
      opacity: 0;
    }
  }
</style>
