<template>
  <div>
    <h1>{{ driverId }}</h1>
    <div class="small">
      <LineChart :chart-data="datacollection"></LineChart>
      <button @click="fillData()">Randomize</button>
    </div>
    <p>Starting Grid Placement {{ gridPlacement }}</p>
    <p>Finishing Placement {{ finishPlacement }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from './charts/LineChart.js';
// import RandomChart from './charts/RandomChart.vue';

export default {
  name: 'SingleDriver',
  components: {
    LineChart,
  },

  data() {
    return {
      driverId: this.$route.params.driver,
      gridPlacement: [],
      finishPlacement: [],
      datacollection: null,
    };
  },

  computed: {
    ...mapGetters(['allResults']),
  },

  created() {
    this.getPlacements();
  },
  mounted() {
    this.fillData();
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
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
