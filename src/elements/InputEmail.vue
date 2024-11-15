<script lang="ts" setup>
import ErrorsMessages from './ValidationErrorsMessages.vue'

const props = defineProps(['modelValue', 'errors'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-input" :class="{ 'error-visible': props.errors.length > 0 }">
    <label>Email</label>

    <input
      type="email"
      placeholder="Введите значение"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <ErrorsMessages :errorsMessages="props.errors" />
  </div>
</template>
<style src="@/styles/inputs.css"></style>
