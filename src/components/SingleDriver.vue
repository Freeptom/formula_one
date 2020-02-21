<template>
  <div>
    <h1>{{ driverId }}</h1>
    <div class="small">
      <LineChart :chart-data="chartData" :options="chartOptions"></LineChart>
    </div>
    <p>Starting Grid Placement {{ gridPlacement }}</p>
    <p>Finishing Placement {{ finishPlacement }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from './charts/LineChart.js';

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
      chartData: {},
      chartOptions: {},
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
    console.log(this.chartData);
    console.log(this.chartOptions);
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
      // console.log(this.gridPlacement);
    },
    fillData() {
      (this.chartData = {
        datasets: [
          {
            label: 'Grid Positions',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(255, 99, 132,0.2)'],
            fill: 'none',
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 2,
          },
          {
            label: 'Finishing Positions',
            data: [6, 2, 4, 5, 1, 10],
            backgroundColor: ['rgba(0, 178, 117, 0.5)'],
            fill: 'none',
            borderColor: ['rgba(0, 178, 132, 1)'],
            borderWidth: 2,
          },
        ],
      }),
        (this.chartOptions = {
          scales: {
            xAxes: [
              {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                ticks: {
                  min: 1,
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
