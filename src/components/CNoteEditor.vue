<script lang="ts" setup>
import { ref } from 'vue'
import { notes } from '@/services/notes'
import { validations } from '@/utils/validations'

import { useAuth } from '@/composables/auth'

import AppButton from '@/elements/AppButton.vue'
import CModal from './CModal.vue'
import useVuelidate from '@vuelidate/core'

import FormErrorsMessages from '@/elements/FormErrorsMessages.vue'
import InputText from '@/elements/InputText.vue'
import AppTextarea from '@/elements/AppTextarea.vue'

const emit = defineEmits(['updateNotes'])
const { getErrorMsg } = useAuth()

const TITLE_MAX_LENGTH = 100
const CONTENT_MAX_LENGTH = 255
const MIN_LENGTH = 1

const _title = ref('')
const _content = ref('')
const _error_messages = ref<string[]>([])

const rules = {
  title: {
    required: validations.required,
    minLength: validations.minLength(MIN_LENGTH),
    maxLength: validations.maxLength(TITLE_MAX_LENGTH),
  },
  content: {
    required: validations.required,
    minLength: validations.minLength(MIN_LENGTH),
    maxLength: validations.maxLength(CONTENT_MAX_LENGTH),
  },
}

const v$ = useVuelidate(rules, {
  title: _title,
  content: _content,
})

async function onSubmit() {
  if (v$.value.$invalid) {
    return
  }

  try {
    await notes.create(_title.value, _content.value)
    await notes.get()
    emit('updateNotes')
  } catch (error) {
    _error_messages.value = getErrorMsg(error)
  }
}

function reset() {
  _title.value = ''
  _content.value = ''
  v$.value.$reset()
}
</script>

<template>
  <CModal class="note-editor" @closed="reset">
    <template v-slot:title>Добавление заметки</template>

    <template v-slot:form>
      <form @submit.prevent="onSubmit">
        <InputText
          v-model="v$.title.$model"
          :errors="v$.title.$errors"
          :data="{
            label: 'Название заметки',
            max: TITLE_MAX_LENGTH,
            placeholder: 'Введите название',
          }"
        />

        <AppTextarea
          v-model="v$.content.$model"
          :errors="v$.content.$errors"
          :data="{
            label: 'Текст заметки',
            max: CONTENT_MAX_LENGTH,
            placeholder: 'Введите текст',
          }"
        />
        <div class="note-editor__wrapper">
          <AppButton :disabled="v$.$invalid" class="accent-button" type="submit"
            >Добавить</AppButton
          >
        </div>
      </form>

      <FormErrorsMessages :errors-messages="_error_messages" />
    </template>
  </CModal>
</template>

<style lang="css">
.note-editor__wrapper {
  display: flex;
  justify-content: flex-end;
}

.note-editor textarea,
.note-editor input {
  border: 0;
  margin-bottom: 8px;
}
</style>
