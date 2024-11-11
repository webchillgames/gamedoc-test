<script lang="ts" setup>
import CNote from '@/components/CNote.vue'
import AppButton from '@/elements/AppButton.vue'
</script>

<template>
  <div class="profile">
    <div class="profile__notes-grid">
      <CNote v-for="i in 5" :key="i" />
    </div>
    <AppButton class="profile__opener-btn accent-button"> </AppButton>
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
  background-image: url('@/assets/cross-icon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-size: 16px 16px;
  transform: rotate(45deg);
}

.profile__notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
}

@media (max-width: 768px) {
  .profile__notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
