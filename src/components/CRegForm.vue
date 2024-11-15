<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { auth } from '@/services/auth'
import { ref } from 'vue'
import { required, email, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

defineEmits(['showLoginForm'])

const _email = ref('')
const _password = ref('')
const _password_repeat = ref('')

const state = ref({
  email: _email.value,
  password: _password.value,
  password_repeat: _password_repeat.value,
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(4) },
  password_repeat: { required, minLength: minLength(4) },
}

const v$ = useVuelidate(rules, state)

function onSubmit() {
  if (v$.value.$invalid || v$.value.password.$model !== v$.value.password_repeat.$model) {
    return
  }

  auth.register(v$.value.email.$model, v$.value.password.$model, v$.value.password_repeat.$model)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div :class="{ 'error-visible': v$.email.$error }">
      <label>Email</label>
      <input type="email" placeholder="Введите значение" v-model="v$.email.$model" />
      <div class="error-message">
        <span v-for="(er, i) in v$.email.$errors" :key="i">{{ er.$message }}</span>
      </div>
    </div>

    <div :class="{ 'error-visible': v$.password.$error }">
      <label>Пароль</label>
      <input type="text" placeholder="Введите пароль" v-model="v$.password.$model" />
      <div class="error-message">
        <span v-for="(er, i) in v$.password.$errors" :key="i">{{ er.$message }}</span>
      </div>
    </div>

    <div :class="{ 'error-visible': v$.password_repeat.$error }">
      <label>Пароль ещё раз</label>
      <input type="text" placeholder="Введите пароль" v-model="v$.password_repeat.$model" />
      <div class="error-message">
        <span v-for="(er, i) in v$.password_repeat.$errors" :key="i">{{ er.$message }}</span>
      </div>
    </div>

    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас есть аккаунт?</span>
        <AppButton @click="$emit('showLoginForm')">Войдите</AppButton>
      </div>
      <AppButton type="submit" class="accent-button">Зарегистрироваться</AppButton>
    </div>
  </form>
</template>

<style lang="css"></style>
