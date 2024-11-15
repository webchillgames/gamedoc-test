<script lang="ts" setup>
defineProps<{ errorsMessages: string[] }>()
</script>

<template>
  <Transition>
    <div v-show="errorsMessages.length" class="form-errors-msgs">
      <p v-for="(er, i) in errorsMessages" :key="i">{{ er }}</p>
    </div>
  </Transition>
</template>

<style lang="css">
.form-errors-msgs {
  margin-top: 20px;
  background-color: rgba(255, 116, 97, 0.1);
  color: var(--error);
  border-radius: 24px;
  padding: 8px 20px;
}

.form-errors-msgs p {
  margin: 0;
}
</style>
