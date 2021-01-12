<template>
  <div>
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
      <div class="dashboard__item">
        <div class="card">
          <TabContainer></TabContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentStandings from '../components/CurrentStandings.vue';
import Calendar from '../components/Calendar.vue';
import TabContainer from '../components/TabContainer.vue';

export default {
  name: 'App',
  components: {
    CurrentStandings,
    Calendar,
    TabContainer,
  },
};
</script>

<style scoped lang="scss">
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: var(--spacing);

  &__item {
    // By default, items span 2 columns
    flex: 1 1 50%;
    grid-column-end: span 2;
    padding: calc(var(--spacing) / 2);
    &:last-of-type {
      margin-bottom: 8vh;
    }
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
  @media screen and (min-width: 450px) {
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
</style>
