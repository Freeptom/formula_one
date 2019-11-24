<template>
  <div id="app">
    <div class="drive">
      <header class="drive__header">
        <a href="#" class="logo">
          <h1>Drive</h1>
        </a>
      </header>
      <Nav class="drive__nav"></Nav>
      <main class="drive__main">
        <h2>Dashboard</h2>
        <div class="dashboard">
          <div class="dashboard__item">
            <div class="card">
              <CurrentStandings></CurrentStandings>
            </div>
          </div>
          <div class="dashboard__item">
            <div class="card">
              <Calendar></Calendar>
            </div>
          </div>
        </div>
      </main>
      <!-- <footer class="drive__footer">
        <span>&copy; 2019 Drive Inc.</span>
      </footer>-->
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import CurrentStandings from "./components/CurrentStandings.vue";
import Calendar from "./components/Calendar.vue";

export default {
  name: "app",
  components: {
    Nav,
    CurrentStandings,
    Calendar
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables/colors.scss";
#app {
}

.drive {
  // variables
  $app-header-height: 70px;
  $app-footer-height: 70px;
  $app-nav-width: 8rem;

  --spacing: 1rem;

  // flex fallback
  display: flex;
  flex-wrap: wrap;
  // Grid
  display: grid;
  height: 100vh;
  grid-template-rows: $app-header-height 1fr;
  grid-template-columns: $app-nav-width 1fr;
  grid-template-areas:
    "header main"
    "nav    main";

  &__header {
    display: flex;
    flex-basis: 100%;
    grid-area: header;
    height: $app-header-height;
    background-color: #fff;
    border-bottom: 1px solid $gray2;
    border-right: 1px solid $gray2;
    position: relative;
    width: $app-nav-width;
  }

  &__nav {
    flex: 0 0 $app-nav-width;
    grid-area: nav;
  }

  &__main {
    flex: 1;
    grid-area: main;
    padding: var(--spacing);
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    display: flex;
    grid-area: footer;
    flex-basis: 100%;
    justify-content: space-between;
    align-items: center;
    height: $app-footer-height;
    padding: 0 var(--spacing);
    color: #4e5561;
    background-color: #1d2127;
  }

  @media screen and (min-width: 48rem) {
    --spacing: 2rem;
  }
}

// Dashboard Overview Grid

.dashboard {
  --column-count: 2;

  // Flexbox Fallback
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(var(--spacing) * -0.5);

  // Grid
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-gap: var(--spacing);

  &__item {
    // By default, items span 2 columns
    flex: 1 1 50%;
    grid-column-end: span 2;
    padding: calc(var(--spacing) / 2);

    // these span the full width
    &--full-width {
      flex-basis: 100%;
      grid-column: 1 / -1;
    }

    // these span only one column
    &--col {
      flex-basis: calc(100% / var(--column-count));
      grid-column-end: span 1;
    }
  }

  // Switch to 4-col grid on larger screens
  @media screen and (min-width: 48rem) {
    --column-count: 4;
  }

  // If we have grid support, reset the margins and paddings;
  // grid-gap handles the spacing for us.
  @supports (display: grid) {
    margin: 0;

    &__item {
      padding: 0;
    }
  }
}

main {
  padding: var(--spacing);
}
</style>
