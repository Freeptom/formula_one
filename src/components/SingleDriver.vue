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
    ...mapGetters(['allResults']),
  },

  created() {
    this.getPlacements();
  },

  methods: {
    ...mapActions(['fetchAllRoundResults']),
    async getPlacements() {
      await this.$store.dispatch('fetchAllRoundResults');
      // loop through each race
      for await (let [index, key] of this.allResults.entries()) {
        for (let i = 0; i < key.Results.length; i++) {
          // get each driver
          if (key.Results[i].Driver.driverId === this.driverId) {
            this.gridPlacement.push(key.Results[i].grid);
            this.finishPlacement.push(key.Results[i].position);
          }
        }
      }

      //  for await (let key of this.allRaces.keys()) {
      //   await this.$store.dispatch('fetchRoundResults', key); // for each race, fetch the round result
      //   // for each Result, search through each driver
      //   this.allResults.Results.forEach(el => {
      //     if (el.Driver.driverId === this.driverId) {
      //       this.gridPlacement.push(el.grid);
      //       this.finishPlacement.push(el.position);
      //     }
      //   });
      // }
    },
  },
};
</script>

<style scoped lang="scss"></style>
