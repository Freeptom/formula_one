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
      for await (let value of this.allResults.values()) {
        for (let i = 0; i < value.Results.length; i++) {
          // get each driver
          if (value.Results[i].Driver.driverId === this.driverId) {
            this.gridPlacement.push(parseInt(value.Results[i].grid));
            this.finishPlacement.push(parseInt(value.Results[i].position));
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
