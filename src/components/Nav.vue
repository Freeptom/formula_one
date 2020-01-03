<template>
  <nav class="app__nav">
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">Dashboard</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Foobars</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Plumbuses</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import styles from '../styles/styles.scss';

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
  @media screen and (max-width: 400px) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;
  }
  .menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;

    @media screen and (min-width: 400px) {
      display: block;
    }
    &__item {
      padding: 2rem 0;
      @media screen and (min-width: 400px) {
        border-bottom: 1px solid $gray2;
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
