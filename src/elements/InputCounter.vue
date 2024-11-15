<script lang="ts" setup>
type Counter = {
  max: number
  currentLength: number
}
defineProps<{ data: Counter }>()
</script>

<template>
  <div class="input-counter">
    <div>
      <p>{{ data.currentLength }} / {{ data.max }}</p>
    </div>
  </div>
</template>
