<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { ref, defineEmits } from 'vue'
import { auth } from '../services/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

defineEmits(['showRegForm'])

const _email = ref('')
const _password = ref('')

const state = ref({
  email: _email.value,
  password: _password.value,
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(4) },
}
const v$ = useVuelidate(rules, state)

function onSubmit() {
  if (v$.value.$invalid) {
    return
  }
  auth.login(_email.value, _password.value)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>Email</label>
    <input type="email" placeholder="Введите значение" v-model="v$.email.$model" />

    <label>Пароль</label>
    <input type="text" placeholder="Введите пароль" v-model="v$.password.$model" />

    <div class="auth__controls">
      <div class="auth__form-changer">
        <span> У вас нет аккаунта?</span>
        <AppButton @click="$emit('showRegForm')">Зарегистрируйтесь</AppButton>
      </div>
      <AppButton type="submit" class="accent-button" :disabled="v$.$invalid">Войти</AppButton>
    </div>
    <!-- <div class="auth__error-msg">Пользователь с таким логином не найден</div> -->
  </form>
</template>

<style lang="css"></style>
