<script lang="ts" setup></script>

<template>
  <span class="app-logo"></span>
</template>

<style lang="css">
.app-logo {
  height: 50px;
  width: 219px;
  display: block;
  background-color: var(--green-light);
  -webkit-mask-image: url('@/assets/logo.svg');
  mask-image: url('@/assets/logo.svg');
  mask-size: cover;
}

@media (max-width: 360px) {
  .app-logo {
    height: 36px;
    width: 160px; /* should be 154px */
  }
}
</style>
