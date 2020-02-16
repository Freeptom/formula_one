<template>
  <div>
    <h1>{{ driver }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line no-unused-vars
import styles from '../styles/styles.scss';

export default {
  name: 'SingleDriver',

  data() {
    return {
      driverId: this.$route.params.driver,
      gridPlacement: [],
      finishPlacement: [],
    };
  },

  computed: {
    ...mapGetters(['driver', 'racesCount', 'allResults']),
  },

  created() {
    this.fetchDrivers(this.driverId); // get driver info
    this.fetchRaces(); // fetch races to get count
    this.getPlacements();
  },

  methods: {
    ...mapActions(['fetchDrivers', 'fetchRaces', 'fetchRoundResults']),
    getPlacements() {
      for (let i = 0; i < this.racesCount; i++) {
        this.fetchRoundResults(i); // for each race, fetch the round result
      }

      // add grid and finish place to data arrays for each
    },
  },
};
</script>

<style scoped lang="scss"></style>
