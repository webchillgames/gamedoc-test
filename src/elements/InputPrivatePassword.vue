<script lang="ts" setup>
import { ref } from 'vue'

import AppButton from './AppButton.vue'
import ValidationErrorsMessages from './ValidationErrorsMessages.vue'

defineEmits(['update:modelValue'])

const props = defineProps(['modelValue', 'errors'])
const _password_is_visible = ref(false)
</script>

<template>
  <div class="app-input" :class="{ 'error-visible': props.errors.length > 0 }">
    <label>Пароль</label>

    <div class="input-private-password" :class="{ visible: _password_is_visible }">
      <input
        :type="_password_is_visible ? 'text' : 'password'"
        placeholder="Введите пароль"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <AppButton @click="_password_is_visible = !_password_is_visible"></AppButton>
    </div>

    <ValidationErrorsMessages :errorsMessages="props.errors" />
  </div>
</template>
<style src="@/styles/inputs.css"></style>

<style lang="css">
.input-private-password {
  position: relative;
}

.input-private-password button {
  position: absolute;
  background-size: 18px 14px;
  background-position: center;
  height: 100%;
  background-repeat: no-repeat;
  top: 0;
  right: 0;
  z-index: 1;
  width: 80px;
  padding: 0;
  transition: all 0.2s;
  background-image: url('@/assets/closed-eye.svg');
}

.input-private-password.visible button {
  background-image: url('@/assets/opened-eye.svg');
}
</style>
