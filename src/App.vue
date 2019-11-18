<template>
  <div id="app">
    <Nav></Nav>
    <CurrentStandings></CurrentStandings>
    <Calendar></Calendar>
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

<style>
#app {
  height: 100%;
  margin: 0;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 8rem;
  grid-auto-flow: row;
  grid-auto-columns: min-content;
  grid-template-areas:
    "main-nav module module"
    "main-nav module module";
}
.main-nav {
  grid-area: main-nav;
}
.module {
  grid-area: module;
}
main {
  padding: 0 1rem;
}
</style>
