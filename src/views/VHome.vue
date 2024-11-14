<script lang="ts" setup></script>

<template>
  <div class="home-view wrapper">
    <div class="home-view__promo">
      <div>
        <h1>
          Мои <br />
          заметки
        </h1>
        <h3>
          Не забывай о важном,<br />
          храни его в облаке.
        </h3>
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
  color: var(--grey);
  font-size: 32px;
  line-height: 150%;
  font-weight: 400;
  margin-bottom: 48px;
}

.home-view__promo-image {
  width: 898px;
  height: 864px;
}

.home-view__promo-image img {
  width: 100%;
  height: 100%;
}

@media (max-width: 1366px) {
  .home-view__promo-image {
    width: 627px;
    height: 604px;
  }
}

@media (max-width: 768px) {
  .home-view__promo {
    grid-template-columns: 1fr;
    text-align: center;
    margin-top: 40px;
  }

  .home-view__promo h3 {
    width: 100%;
    font-size: 32px;
    margin: 0;
    margin-top: 20px;
  }

  .home-view__promo h3 br {
    display: none;
  }

  .home-view__promo h1 {
    margin-bottom: 20px;
  }

  .home-view__promo-image {
    width: 560px;
    height: 540px;
    margin: 0 auto;
  }
}

@media (max-width: 360px) {
  .home-view__promo h3 {
    font-size: 24px;
    margin-bottom: 17px;
  }

  .home-view__promo h1 {
    font-size: 60px;
    line-height: 107%;
    margin-top: 20px;
  }
  .home-view__promo-image {
    width: 298px;
    height: 287px;
  }
}
</style>
