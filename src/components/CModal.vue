<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { defineEmits } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
defineEmits(['close'])
</script>

<template>
  <VueFinalModal class="modal">
    <div @click="$emit('close')" class="modal__overlay"></div>

    <div class="modal__content">
      <h2>
        <slot name="title"></slot>
      </h2>

      <AppButton @click="$emit('close')" class="modal__closer"></AppButton>

      <slot name="form"></slot>
    </div>
  </VueFinalModal>
</template>

<style lang="css">
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal__overlay {
  background: var(--dark);
  opacity: 0.7;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.modal__closer {
  border-radius: 32px;
  padding: 0px 24px;
  width: 56px;
  height: 56px;
  background-color: var(--green-light);
  display: block;
  background-image: url('@/assets/cross-icon.svg');
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: center;
  position: absolute;
  top: 20px;
  right: 20px;
}

.modal__content {
  background-color: var(--dark-middle);
  padding: 80px;
  border-radius: 40px;
  position: relative;
}

.modal h2 {
  font-weight: 600;
  font-size: 48px;
  line-height: 150%;
  margin: 0;
  margin-bottom: 40px;
}

.modal input {
  height: 72px;
}

.modal input,
.modal textarea {
  border-radius: 36px;
  padding: 24px 16px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-top: 8px;
  margin-bottom: 24px;
}

.modal input:last-child {
  margin-bottom: 40px;
}

.modal label {
  color: var(--gray);
  padding-left: 24px;
}
</style>
