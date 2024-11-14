<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { maxLength, minLength, required } from '@vuelidate/validators'
import { notes } from '@/services/notes'

import AppButton from '@/elements/AppButton.vue'
import CModal from './CModal.vue'
import useVuelidate from '@vuelidate/core'

const emit = defineEmits(['updateNotes'])

const TITLE_MAX_LENGTH = 100
const CONTENT_MAX_LENGTH = 500

const _title = ref('')
const _content = ref('')

const state = ref({
  title: _title.value,
  content: _content.value,
})

const rules = {
  title: { required, minLength: minLength(1), maxLength: maxLength(TITLE_MAX_LENGTH) },
  content: { required, minLength: minLength(1), maxLength: maxLength(CONTENT_MAX_LENGTH) },
}

const v$ = useVuelidate(rules, state)

onUnmounted(clearFields)

async function onSubmit() {
  if (v$.value.$invalid) {
    return
  }

  try {
    await notes.create(v$.value.title.$model, v$.value.content.$model)
    await notes.get()
    emit('updateNotes')
    clearFields()
  } catch (error) {
    console.log(error)
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
        <label>Название заметки</label>
        <input
          v-model="v$.title.$model"
          type="text"
          placeholder="Введите название"
          :maxlength="TITLE_MAX_LENGTH"
        />

        <div class="note-editor__wrapper note-editor__wrapper--counter">
          <p>{{ v$.title.$model.length }} / {{ TITLE_MAX_LENGTH }}</p>
        </div>

        <label>Текст заметки</label>
        <textarea
          v-model="v$.content.$model"
          placeholder="Введите текст"
          rows="7"
          maxlength="CONTENT_MAX_LENGTH"
        ></textarea>
        <div class="note-editor__wrapper note-editor__wrapper--counter">
          <p>{{ v$.content.$model.length }} / {{ CONTENT_MAX_LENGTH }}</p>
        </div>
        <div class="note-editor__wrapper">
          <AppButton :disabled="v$.$invalid" class="accent-button" type="submit"
            >Добавить</AppButton
          >
        </div>
      </form>
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
