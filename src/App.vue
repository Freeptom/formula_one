<template>
  <div id="app">
    <Nav></Nav>
    <CurrentStandings></CurrentStandings>
    <Calendar></Calendar>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
import CurrentStandings from './components/CurrentStandings.vue';
import Calendar from './components/Calendar.vue';

export default {
  name: 'app',
  components: {
    Nav,
    CurrentStandings,
    Calendar,
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  grid-gap: 2rem;
  
  
  @media screen and (min-width: 750px) {
 display: grid;
    grid-template-columns: 8rem repeat( auto-fit, minmax(350px, 650px) );
    grid-template-rows: 4rem auto;
    .main-nav {
    grid-column: 1 ;
    grid-row: 1 / -1;
   }
    .standings-module {
    grid-column: 2;
    grid-row: 2;
    }
    .calendar-module {
    grid-row: 2;
    grid-column: 3;

    }
  }
}


main {
  padding: 0 1rem;
}
</style>
