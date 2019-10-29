<template>
  <div id="app">
    <Nav></Nav>
    <main>
      <CurrentStandings></CurrentStandings>
      <Calendar></Calendar>
    </main>
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
}
main {
  padding: 0 1rem;
}
</style>
