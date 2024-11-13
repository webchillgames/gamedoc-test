<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { VueFinalModal } from 'vue-final-modal'
defineEmits(['close'])
</script>

<template>
  <VueFinalModal
    class="modal"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    overlayClass="modal__overlay"
  >
    <div class="modal__wrapper">
      <div class="modal__content">
        <h2>
          <slot name="title"></slot>
        </h2>

        <AppButton @click="$emit('close')" class="modal__closer"></AppButton>

        <slot name="form"></slot>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="css">
.modal__overlay {
  background: var(--dark);
  opacity: 0.7;
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
  color: var(--grey);
  padding-left: 24px;
}

.modal__wrapper {
  overflow: auto;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}

.modal__content {
  background-color: var(--dark-middle);
  padding: 80px;
  border-radius: 40px;
  max-width: 780px;
  margin: 130px auto;
  position: relative;
}

@media (max-width: 1366px) {
  .modal__content {
    max-width: 594px;
  }
}

@media (max-width: 768px) {
  .modal__content {
    max-width: 688px;
  }
}

@media (max-width: 360px) {
  .modal__content {
    max-width: 100%;
  }
}
</style>
