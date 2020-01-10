<template>
  <nav class="app__nav">
    <ul class="menu">
      <router-link class="menu__link" to="/">
        <li class="menu__item">
          Dashboard
        </li>
      </router-link>
      <router-link class="menu__link" to="/drivers">
        <li class="menu__item">
          Drivers
        </li>
      </router-link>
      <li class="menu__item">
        <a class="menu__link" href="#">Plumbuses</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Nav',

  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/variables/colors.scss';

nav {
  background: white;
  border-right: 1px solid $gray2;
  @media screen and (max-width: 450px) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;
    border-top: 4px solid $gray2;
    height: 8vh;
  }
  .menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    height: 100%;
    align-items: center;
    @media screen and (min-width: 450px) {
      display: block;
    }
    &__item {
      text-align: center;
      padding: 0;
      @media screen and (min-width: 450px) {
        border-bottom: 1px solid $gray2;
        padding: 2rem 0;
      }
    }
    &__link {
      color: $gray4;
      text-decoration: none;

      &:hover,
      &:focus {
        color: $gray4;
      }
    }
  }
}
</style>
