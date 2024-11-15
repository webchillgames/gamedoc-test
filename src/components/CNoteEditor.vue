<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { notes } from '@/services/notes'

import AppButton from '@/elements/AppButton.vue'
import CModal from './CModal.vue'
import useVuelidate from '@vuelidate/core'
import { validations } from '@/utils/validations'
import CErrors from './CErrors.vue'
import { useAuth } from '@/composables/auth'

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

onUnmounted(clearFields)

async function onSubmit() {
  if (v$.value.$invalid) {
    return
  }

  try {
    await notes.create(_title.value, _content.value)
    await notes.get()
    emit('updateNotes')
    clearFields()
  } catch (error) {
    _error_messages.value = getErrorMsg(error)
  }
}

function clearFields() {
  _title.value = ''
  _content.value = ''
}
</script>

<template>
  <CModal class="note-editor">
    <template v-slot:title>Добавление заметки</template>

    <template v-slot:form>
      <form @submit.prevent="onSubmit">
        <div :class="{ 'error-visible': v$.title.$error }">
          <label>Название заметки</label>
          <input
            v-model="v$.title.$model"
            type="text"
            placeholder="Введите название"
            :maxlength="TITLE_MAX_LENGTH"
          />
          <div class="error-message">
            <p v-for="(er, i) in v$.title.$errors" :key="i">{{ er.$message }}</p>
          </div>

          <div class="note-editor__wrapper note-editor__wrapper--counter">
            <p>{{ _title.length }} / {{ TITLE_MAX_LENGTH }}</p>
          </div>
        </div>

        <div :class="{ 'error-visible': v$.content.$error }">
          <label>Текст заметки</label>
          <!-- @vue-expect-error конфликт vuelidate и vue-ts -->
          <textarea
            v-model="v$.content.$model"
            placeholder="Введите текст"
            rows="7"
            maxlength="CONTENT_MAX_LENGTH"
          ></textarea>
          <div class="error-message">
            <p v-for="(er, i) in v$.content.$errors" :key="i">{{ er.$message }}</p>
          </div>
          <div class="note-editor__wrapper note-editor__wrapper--counter">
            <p>{{ _content.length }} / {{ CONTENT_MAX_LENGTH }}</p>
          </div>
        </div>
        <div class="note-editor__wrapper">
          <AppButton :disabled="v$.$invalid" class="accent-button" type="submit"
            >Добавить</AppButton
          >
        </div>
      </form>

      <CErrors :errors-messages="_error_messages" />
    </template>
  </CModal>
</template>

<style lang="css">
.note-editor__wrapper {
  display: flex;
  justify-content: flex-end;
}

.note-editor__wrapper--counter p {
  color: var(--grey);
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 156%;
}

.note-editor__wrapper--counter {
  margin-bottom: 24px;
  padding: 0 24px;
}

.note-editor textarea,
.note-editor input {
  border: 0;
  margin-bottom: 8px;
}
</style>
