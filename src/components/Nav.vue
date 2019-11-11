<template>
  <nav class="main-nav">
    <ul>
      <li>test</li>
      <li>test</li>
      <li>test</li>
    </ul>
  </nav>
</template>

<script>

import styles from '../styles/styles.scss';

export default {
  name: 'Nav',

  data() {
    return {

    };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/variables/colors.scss";

.main-nav {
    background: white;
    margin: 0;
    width: 8rem;
    position:fixed;
    top: 0;
    left: 0;
    border-right: 1px solid $gray2;
    height: 100%;
     height: 100%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 2rem 0;
    border-bottom: 1px solid $gray2;
  }

}

</style>
