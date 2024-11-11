<script lang="ts" setup>
import AppButton from '@/elements/AppButton.vue'
</script>

<template>
  <div class="note">
    <h4>Пример заголовока заметки в две строчки</h4>
    <p>
      А также явные признаки победы институционализации могут быть объединены в целые кластеры себе
      подобных.
    </p>
    <div class="note__bottom">
      <AppButton class="note__button-closer">
        <span class="note__cross-icon"></span>
        Удалить
      </AppButton>
    </div>
  </div>
</template>

<style lang="css">
.note {
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  background-color: var(--green-light);
  padding: 20px 28px;
  padding-bottom: 8px;
  border-radius: 12px;
  position: relative;
}

.note::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  border-width: 0 40px 40px 0;
  border-style: solid;
  border-color: var(--dark) var(--dark) var(--green) var(--green);
  background: var(--green);
  border-bottom-left-radius: 8px;
}

.note h4 {
  font-weight: 600;
  font-size: 24px;
  line-height: 133%;
  margin: 0;
  padding-bottom: 20px;
  padding-right: 40px;
  border-bottom: 1px solid var(--green);
}

.note p {
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  padding: 20px 28px 28px 28px;
  margin: 0;
}

.note__button-closer {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  color: var(--white);
  padding: 12px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
}

.note__cross-icon {
  width: 16px;
  height: 16px;
  background-image: url('@/assets/cross-icon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-size: 16px 16px;
  margin-right: 12px;
}

.note__bottom {
  display: flex;
  justify-content: flex-end;
}
</style>
