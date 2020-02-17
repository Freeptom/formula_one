<template>
  <div>
    <h1>{{ driverId }}</h1>
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
    ...mapGetters(['driver', 'racesCount', 'allRaces', 'allResults']),
  },

  created() {
    this.fetchDrivers(this.driverId); // get driver info
    this.fetchRaces(); // fetch races to get count
    this.getPlacements();
  },

  methods: {
    ...mapActions(['fetchDrivers', 'fetchRaces', 'fetchRoundResults']),
    async getPlacements() {
      // forEach race entry
      for await (let [key, val] of this.allRaces.entries()) {
        console.log(`element${key}, index ${val}`);
        await this.$store.dispatch('fetchRoundResults', key); // for each race, fetch the round result
        console.log(this.allResults.Results); // need to search for driver in here!
      }
      // add grid and finish place to data arrays for each
    },
  },
};
</script>

<style scoped lang="scss"></style>
