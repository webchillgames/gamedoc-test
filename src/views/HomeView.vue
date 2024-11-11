<script lang="ts" setup></script>

<template>
  <div class="home-view wrapper">
    <div class="home-view__promo">
      <div>
        <h1>
          Мои <br />
          заметки
        </h1>
        <h3>Не забывай о важном, храни его в облаке.</h3>
      </div>

      <div class="home-view__promo-image">
        <img src="@/assets/promo.png" />
      </div>
    </div>
  </div>
</template>

<style lang="css">
.home-view__promo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.home-view__promo h1 {
  font-size: 104px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 40px;
  font-weight: 900;
}

.home-view__promo h3 {
  color: var(--gray);
  font-size: 32px;
  line-height: 150%;
  width: 50%;
  font-weight: 400;
}

.home-view__promo-image img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .home-view__promo {
    grid-template-columns: 1fr;
    justify-content: center;
    text-align: center;
  }

  .home-view__promo h3 {
    width: 100%;
    font-size: 32px;
  }

  .home-view__promo h1 {
    margin-bottom: 20px;
  }

  .home-view__promo-image img {
    max-width: 560px;
  }
}

@media (max-width: 360px) {
  .home-view__promo h3 {
    font-size: 24px;
  }

  .home-view__promo h1 {
    font-size: 60px;
    line-height: 107%;
  }
}
</style>
