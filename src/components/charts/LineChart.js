import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object

    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, 'rgba(126, 218, 220, 0.25)');
    this.gradient.addColorStop(1, 'rgba(126, 218, 220, 0)');

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, 'rgba(65,110,212, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(65,110,212, 0.0)');

    this.chartData.datasets[0].backgroundColor = this.gradient;
    this.chartData.datasets[1].backgroundColor = this.gradient2;

    this.renderChart(this.chartData, this.options);
  },
};
