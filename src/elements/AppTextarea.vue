<script lang="ts" setup>
import InputCounter from './InputCounter.vue'
import ValidationErrorsMessages from './ValidationErrorsMessages.vue'

const props = defineProps(['modelValue', 'errors', 'data'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="app-input" :class="{ 'error-visible': props.errors.length > 0 }">
    <label>{{ data.label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      rows="7"
      :placeholder="data.placeholder"
      :maxlength="data.max"
    ></textarea>
    <ValidationErrorsMessages :errorsMessages="props.errors" />
    <InputCounter :data="{ currentLength: modelValue.length, max: data.max }" />
  </div>
</template>
<style src="@/styles/inputs.css"></style>
