<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

defineProps<{ errorsMessages: ErrorObject[] }>()
</script>

<template>
  <Transition>
    <div v-show="errorsMessages.length" class="errors-msgs">
      <p v-for="(er, i) in errorsMessages" :key="i">{{ er.$message }}</p>
    </div>
  </Transition>
</template>

<style lang="css">
.errors-msgs {
  padding: 8px 24px;
  margin-bottom: 16px;
  color: var(--error);
}

.errors-msgs p {
  margin: 0;
}
</style>
