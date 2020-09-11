<template>
  <div id="app">
    <div class="drive">
      <header class="drive__header">
        <router-link class="menu__link logo" to="/">
          <h1>Drive</h1>
        </router-link>
      </header>
      <Nav class="drive__nav"></Nav>
      <main class="drive__main">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </main>
      <!-- <footer class="drive__footer">
        <span>&copy; 2019 Drive Inc.</span>
      </footer>-->
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style scoped lang="scss">
// variables

.drive {
  --spacing: 1rem;
  --app-header-height: 70px;
  --app-footer-height: 70px;
  --app-nav-width: 100%;
  // flex fallback
  display: flex;
  flex-wrap: wrap;
  // Grid
  display: grid;
  grid-template-rows: var(--app-header-height) 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header'
    'nav'
    'main';
  @media screen and (min-width: 440px) {
    --app-nav-width: 8rem;
    grid-template-rows: var(--app-header-height) 1fr;
    grid-template-columns: var(--app-nav-width) 1fr;
    grid-template-areas:
      'header main'
      'nav    main';
  }

  &__header {
    display: flex;
    flex-basis: 100%;
    grid-area: header;
    height: var(--app-header-height);
    background-color: #fff;
    border-bottom: 1px solid $gray2;
    border-right: 1px solid $gray2;
    position: relative;
    width: var(--app-nav-width);
    a {
      color: #dc5a60;
      text-decoration: none;
    }
  }

  &__nav {
    flex: 0 0 var(--app-nav-width);
    grid-area: nav;
  }

  &__main {
    flex: 1;
    grid-area: main;
    padding: var(--spacing);
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__footer {
    display: flex;
    grid-area: footer;
    flex-basis: 100%;
    justify-content: space-between;
    align-items: center;
    height: var(--app-footer-height);
    padding: 0 var(--spacing);
    color: #4e5561;
    background-color: #1d2127;
  }

  @media screen and (min-width: 450px) {
    --spacing: 2rem;
  }

  .logo {
    display: flex;
    flex: 0 0 var(--app-nav-width);
    height: var(--app-header-height);
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0;
    color: $primary-color;
    font-size: 1rem;
    h1 {
      margin: 0;
    }
  }
}

// transitions

$transition-speed: 0.5s;

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-speed ease-in-out;
}

.fade-enter-active {
  transition-delay: $transition-speed;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
