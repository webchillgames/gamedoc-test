<script lang="ts" setup>
import CNote from '@/components/CNote.vue'
import CNoteEditor from '@/components/CNoteEditor.vue'
import AppButton from '@/elements/AppButton.vue'
import { notes, type Note } from '@/services/notes'

import { onMounted, ref } from 'vue'

const modalIsVisible = ref(false)
const _notes = ref<Note[]>([])

onMounted(getNotes)

async function getNotes() {
  try {
    const r = await notes.get()
    _notes.value = r.data
  } catch (error) {
    console.log(error)
  }
}

async function updateNotes() {
  await getNotes()
  modalIsVisible.value = false
}
</script>

<template>
  <div class="profile">
    <div class="profile__notes-grid">
      <CNote v-for="n in _notes" :key="n.id" :note="n" @updateNotes="updateNotes" />
    </div>
    <AppButton @click="modalIsVisible = true" class="profile__opener-btn accent-button">
    </AppButton>
    <CNoteEditor
      v-model="modalIsVisible"
      @updateNotes="updateNotes"
      @close="modalIsVisible = false"
    />
  </div>
</template>

<style lang="css">
.profile {
  position: relative;
}

.profile__opener-btn {
  position: fixed;
  width: 56px;
  height: 56px;
  bottom: 40px;
  right: 40px;
  display: block;
  background-image: url('@/assets/plus-icon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-size: 16px 16px;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.profile__notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  margin-top: 40px;
}

@media (max-width: 1366px) {
  .profile__notes-grid {
    grid-gap: 20px;
  }
}

@media (max-width: 768px) {
  .profile__notes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 360px) {
  .profile__notes-grid {
    margin-top: 20px;
  }
}
</style>
