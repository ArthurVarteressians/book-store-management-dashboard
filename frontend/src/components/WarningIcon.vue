<!-- WarningIcon.vue -->
<template>
  <div class="warning-icon">
    <div class="warning-circle"></div>
    <div class="warning-line warning-line-top"></div>
    <div class="warning-line warning-line-bottom"></div>
    <div class="warning-dot"></div>
  </div>
</template>

<style scoped>
  .warning-icon {
    position: relative;
    width: 64px;
    height: 64px;
    animation: shake 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  }

  .warning-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid #fbbf24; /* Warning yellow color */
    box-sizing: border-box;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .warning-line {
    position: absolute;
    background-color: #fbbf24;
    width: 8px;
    height: 28px;
    left: calc(50% - 4px);
  }

  .warning-line-top {
    top: 12px;
  }

  .warning-line-bottom {
    top: 40px;
    height: 8px;
    border-radius: 50%;
  }

  .warning-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fbbf24;
    bottom: 14px;
    left: calc(50% - 5px);
  }

  /* Pulse Animation */
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }

  /* Shake Animation */
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-4px);
    }
    50% {
      transform: translateX(4px);
    }
    75% {
      transform: translateX(-4px);
    }
  }
</style>
