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
  padding: 23px 28px;
  display: flex;
  box-sizing: border-box;
  margin-top: 8px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 18px;
  line-height: 156%;
  color: var(--grey);
  max-width: 620px;
  width: 100%;
  border: 0;
  transition: all 0.2s;
}
.modal textarea {
  resize: none;
}

.modal input:hover,
.modal textarea:hover,
.modal input:active,
.modal textarea:active,
.modal input:focus,
.modal textarea:focus {
  outline: 2px solid var(--green-light);
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}

.modal__content {
  background-color: var(--dark-middle);
  padding: 80px;
  border-radius: 40px;
  width: 780px;
  margin: 16px auto;
  box-sizing: border-box;
  position: relative;
  margin: auto;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
  max-height: 90%;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.modal__content::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1366px) {
  .modal__content {
    width: 594px;
    padding: 56px;
  }
}

@media (max-width: 768px) {
  .modal__content {
    max-width: 688px;
    width: 100%;
  }

  .modal input,
  .modal textarea {
    margin-top: 8px;
    margin-bottom: 24px;
  }
}

@media (max-width: 360px) {
  .modal h2 {
    font-size: 32px;
    line-height: 112%;
    margin-bottom: 28px;
  }

  .modal__content {
    max-width: 100%;
    padding: 90px 16px;
    margin: 0;
  }

  .modal__closer {
    top: 16px;
    right: 16px;
  }

  .modal input,
  .modal textarea {
    margin-bottom: 16px;
  }
}
</style>
