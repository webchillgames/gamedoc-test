<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
import { VueFinalModal } from 'vue-final-modal'
</script>

<template>
  <VueFinalModal
    class="modal"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    overlayClass="modal__overlay"
  >
    <!-- @vue-expect-error неправильные типы у библиотеки -->
    <template #default="{ close }">
      <div class="modal__wrapper">
        <AppButton @click="() => close()" class="modal__closer accent-button"></AppButton>

        <div class="modal__content">
          <h2>
            <slot name="title"></slot>
          </h2>

          <slot name="form"></slot>
        </div>
      </div>
    </template>
  </VueFinalModal>
</template>

<style lang="css">
.modal__overlay {
  background-color: rgba(10, 31, 56, 0.7);
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

.modal__wrapper {
  background-color: var(--dark-middle);
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
  max-height: 90%;
}

.modal__wrapper,
.modal__content {
  display: flex;
  flex-direction: column;
}

.modal__content {
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 80px;
}

.modal__content::-webkit-scrollbar {
  display: none;
}

@media (max-width: 1366px) {
  .modal__wrapper {
    width: 594px;
  }
  .modal__content {
    padding: 56px;
  }
}

@media (max-width: 768px) {
  .modal__wrapper {
    width: 100%;
  }

  .modal__content {
    max-width: 688px;
  }
}

@media (max-width: 360px) {
  .modal h2 {
    font-size: 32px;
    line-height: 112%;
    margin-bottom: 28px;
  }

  .modal__wrapper {
    max-width: 100%;
  }

  .modal__content {
    padding: 90px 16px;
    margin: 0;
  }

  .modal__closer {
    top: 16px;
    right: 16px;
  }
}
</style>
