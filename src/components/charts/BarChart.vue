<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    labels: Array,
    data: Array,
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: this.data,
      },
      this.options,
    );
  },
};
</script>
