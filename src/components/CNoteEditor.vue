<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import CModal from './CModal.vue'
import useVuelidate from '@vuelidate/core'
import { ref } from 'vue'
import { maxLength, minLength, required } from '@vuelidate/validators'
const _title = ref('')
const _content = ref('')

const state = ref({
  title: _title.value,
  content: _content.value,
})

const rules = {
  title: { required, minLength: minLength(1), maxLength: maxLength(100) },
  content: { required, minLength: minLength(1), maxLength: maxLength(500) },
}

const v$ = useVuelidate(rules, state)

function onSubmit() {
  if (v$.value.$invalid) {
    return
  }
}
</script>

<template>
  <CModal class="note-editor">
    <template v-slot:title>Добавление заметки</template>

    <template v-slot:form>
      <form @submit="onSubmit">
        <label>Название заметки</label>
        <input v-model="v$.$model.title" type="text" placeholder="Введите название" />

        <label>Текст заметки</label>
        <textarea v-model="v$.$model.content" placeholder="Введите текст" rows="13"></textarea>

        <div class="note-editor__bottom">
          <AppButton class="accent-button" type="submit">Добавить</AppButton>
        </div>
      </form>
    </template>
  </CModal>
</template>

<style lang="css">
.note-editor__bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
