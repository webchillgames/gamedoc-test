<script lang="ts" setup>
import ValidationErrorsMessages from './ValidationErrorsMessages.vue'

const props = defineProps(['modelValue', 'errors', 'label'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-input" :class="{ 'error-visible': props.errors.length > 0 }">
    <label>{{ label }}</label>
    <input
      type="text"
      placeholder="Введите пароль"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <ValidationErrorsMessages :errorsMessages="props.errors" />
  </div>
</template>
<style src="@/styles/inputs.css"></style>
