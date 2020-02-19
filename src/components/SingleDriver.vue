<template>
  <div>
    <h1>{{ driverId }}</h1>
    <p>Starting Grid Placement {{ gridPlacement }}</p>
    <p>Finishing Placement {{ finishPlacement }}</p>
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
    ...mapGetters(['racesCount', 'allRaces', 'allResults']),
  },

  created() {
    this.fetchRaces(); // fetch races to get count
    this.getPlacements();
    console.log(this.allRaces);
  },

  methods: {
    ...mapActions(['fetchRaces', 'fetchRoundResults']),
    async getPlacements() {
      // forEach race entry
      for await (let key of this.allRaces.keys()) {
        await this.$store.dispatch('fetchRoundResults', key); // for each race, fetch the round result
        // for each Result, search through each driver
        this.allResults.Results.forEach(el => {
          // maybe use filter???
          if (el.Driver.driverId === this.driverId) {
            this.gridPlacement.push(el.grid);
            this.finishPlacement.push(el.position);
          }
        });
      }
      console.log(this.allResults);
    },
  },
};
</script>

<style scoped lang="scss"></style>
