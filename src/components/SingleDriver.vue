<template>
  <div>
    <h1>{{ driver }}</h1>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
    ...mapState(['races']),
    ...mapGetters(['driver', 'allRaces', 'results']),
  },

  created() {
    this.fetchDrivers(this.driverId);
    this.fetchRaces();
    this.getPlacements();
  },

  methods: {
    ...mapActions(['fetchDrivers', 'fetchRaces', 'fetchRoundResults']),
    async getPlacements() {
      for await (let el of this.allRaces) {
        this.fetchRoundResults(el).then(() => console.log(this.results));
      }

      // request each race in allRaces?

      // add grid and finish place to data arrays for each
    },
  },
};
</script>

<style scoped lang="scss"></style>
