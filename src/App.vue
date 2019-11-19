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

<style>
#app {
  height: 100%;
  margin: 0;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 8rem repeat( auto-fit, minmax(250px, 800px) );


}

.main-nav {
  grid-column: 1 ;
  grid-row: 1 / -1;
}

.standings-module {
  grid-column: 2;

}
.calendar-module {
  grid-column: 3;

}

main {
  padding: 0 1rem;
}
</style>
