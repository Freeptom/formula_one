<template>
  <nav>
    <ul class="menu">
      <li class="menu__item">
        <a class="menu__link" href="#">Dashboard</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Sales</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Campagins</a>
      </li>
      <li class="menu__item">
        <a class="menu__link" href="#">Servers</a>
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
import styles from "../styles/styles.scss";

export default {
  name: "Nav",

  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables/colors.scss";

nav {
  background: white;
  margin: 0;
  width: 8rem;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid $gray2;
  height: 100%;

  .menu {
    list-style: none;
    margin: 0;
    padding: 0;
    &__item {
      padding: 2rem 0;
      border-bottom: 1px solid $gray2;
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
