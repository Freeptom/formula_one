<template>
  <div>
    <h1>{{ driverId }}</h1>
    <p>{{ gridPlacement }}</p>
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
      for await (let key of this.allRaces.keys()) {
        await this.$store.dispatch('fetchRoundResults', key); // for each race, fetch the round result
        // for each Result, search through each driver
        this.allResults.Results.forEach(el => {
          if (el.Driver.driverId === this.driverId) {
            this.gridPlacement.push(el.grid);
          }
        });
      }
      // add grid and finish place to data arrays for each
    },
  },
};
</script>

<style scoped lang="scss"></style>
