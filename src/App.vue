<template>
  <div id="app">
    <CurrentStandings></CurrentStandings>
    <Calendar></Calendar>
  </div>
</template>

<script>
import CurrentStandings from "./components/CurrentStandings.vue";
import Calendar from "./components/Calendar.vue";

export default {
  name: "app",
  components: {
    CurrentStandings,
    Calendar
  }
};
</script>

<style>
#app {
}
</style>