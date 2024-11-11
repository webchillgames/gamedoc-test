<script lang="ts" setup>
import CModal from './CModal.vue'
</script>

<template>
  <CModal>
    <template v-slot:title>Добавление заметки</template>
    <template v-slot:form>
      <label>Название заметки</label>
      <input type="text" placeholder="Введите название" />

      <label>Текст заметки</label>
      <textarea placeholder="Введите текст"></textarea>
    </template>
  </CModal>
</template>

<style lang="css"></style>
