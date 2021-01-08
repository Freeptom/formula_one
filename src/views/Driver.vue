<template>
  <div>
    <h1>{{ driverId }}</h1>
    <div class="small">
      <LineChart v-if="loaded" :chart-data="chartData" :options="chartOptions"></LineChart>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from '../components/charts/LineChart.js';

export default {
  name: 'SingleDriver',
  components: {
    LineChart,
  },

  data() {
    return {
      loaded: false,
      driverId: this.$route.params.driver,
      gridPlacement: [],
      finishPlacement: [],
      chartData: {},
      chartOptions: {},
    };
  },

  computed: {
    ...mapGetters(['allResults', 'driver']),
  },

  created() {
    this.getPlacements();
    this.fetchDrivers(this.driverId);
    console.log();
  },

  mounted() {
    this.loaded = false;
    this.fillData();
  },

  methods: {
    ...mapActions(['fetchDrivers']),

    async getPlacements() {
      await this.$store.dispatch('fetchResults');
      // loop through each race
      for await (let value of this.allResults.values()) {
        for (let i = 0; i < value.Results.length; i++) {
          // get each driver
          if (value.Results[i].Driver.driverId === this.driverId) {
            // account for '0' equaling pit lane
            value.Results[i].grid != 0
              ? this.chartData.datasets[0].data.push(parseInt(value.Results[i].grid))
              : this.chartData.datasets[0].data.push('Pit Lane');
            this.chartData.datasets[1].data.push(parseInt(value.Results[i].position)); // push position
          }
        }
      }
      for (let i = 1; i < this.allResults.length + 1; i++) {
        this.chartOptions.scales.xAxes[0].labels.push(i);
      }
      this.loaded = true;
    },

    fillData() {
      (this.chartData = {
        datasets: [
          {
            label: 'Grid Positions',
            data: [],
            fill: 'origin',
            borderColor: ['rgba(126, 218, 220, 1)'],
            pointBackgroundColor: 'rgba(126, 218, 220, 1)',
            pointBorderColor: 'white',
            borderWidth: 2,
          },
          {
            label: 'Finishing Positions',
            data: [],
            fill: 'origin',
            borderColor: ['rgba(65, 110, 212 ,1)'],
            pointBackgroundColor: 'rgba(65, 110, 212 ,1)',
            pointBorderColor: 'white',
            borderWidth: 2,
          },
        ],
      }),
        (this.chartOptions = {
          scales: {
            xAxes: [
              {
                labels: [], // need to do this formulaically
                ticks: {
                  min: 1,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Round Number',
                },
              },
            ],
            yAxes: [
              {
                type: 'category',
                labels: [
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  'Pit Lane',
                ],
                ticks: {
                  min: 0,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Position',
                },
              },
            ],
          },
        });
    },
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 10px auto;
}
</style>
