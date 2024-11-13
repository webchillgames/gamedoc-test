<script lang="ts" setup></script>

<template>
  <button type="button" class="app-button">
    <slot></slot>
  </button>
</template>

<style lang="css">
.app-button {
  border: 0;
  background-color: transparent;
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  font-family: inherit;
}
</style>
