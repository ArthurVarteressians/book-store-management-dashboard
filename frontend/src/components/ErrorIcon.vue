<template>
  <div class="icon-container">
    <svg class="error-svg" viewBox="0 0 100 100">
      <!-- Circle -->
      <circle class="error-circle" cx="50" cy="50" r="45"></circle>

      <!-- X Mark with shake animation -->
      <line
        x1="30"
        y1="30"
        x2="70"
        y2="70"
        class="error-line error-line-left"
      />
      <line
        x1="70"
        y1="30"
        x2="30"
        y2="70"
        class="error-line error-line-right"
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

  .error-svg {
    width: 100px;
    height: 100px;
  }

  .error-circle {
    fill: none;
    stroke: #e74c3c;
    stroke-width: 5;
    stroke-dasharray: 283; /* Circle circumference */
    stroke-dashoffset: 283;
    animation: drawErrorCircle 1s ease forwards;
  }

  .error-line {
    stroke: #e74c3c;
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 50; /* Adjusted length for the lines */
    stroke-dashoffset: 50;
    animation:
      drawErrorLine 0.6s ease forwards,
      shakeError 0.8s ease infinite;
  }

  .error-line-left {
    animation-delay: 0.2s; /* Delay to sync with right line */
  }

  .error-line-right {
    animation-delay: 0.2s;
  }

  /* Circle animation */
  @keyframes drawErrorCircle {
    0% {
      stroke-dashoffset: 283;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  /* X mark drawing animation */
  @keyframes drawErrorLine {
    0% {
      stroke-dashoffset: 50;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  /* Shake animation */
  @keyframes shakeError {
    0%,
    100% {
      transform: translate(0, 0);
    }
    20%,
    60% {
      transform: translate(-3px, 0);
    }
    40%,
    80% {
      transform: translate(3px, 0);
    }
  }
</style>
