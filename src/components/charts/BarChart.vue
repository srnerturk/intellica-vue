<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#212C55",
          data: [10, 20, 30, 40, 44, 32, 24, 26],
        },
        {
          label: "Data Two",
          backgroundColor: "#DC6862",
          data: [15, 22, 37, 44, 32, 33, 13, 15],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
