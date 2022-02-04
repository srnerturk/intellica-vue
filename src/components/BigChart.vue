<template>
  <div
    class="
      info-chart
      flex
      bg-white
      p-2
      rounded-xl
      gap-5
      items-center
      justify-center
    "
  >
    <div class="text-info m-20 flex flex-col p-2">
      <h5 class="text-md font-bold mb-5">Today</h5>
      <h2 class="text-3xl font-bold leading-1 mb-3 text-mifiblue">
        {{ parseInt(summary) }}
      </h2>
      <div class="info">
        <div class="percent">
          <span
            v-if="!chartData.isPlus"
            class="text-md text-red-900 font-bold"
            >{{ chartData.percent }}</span
          >
          <span
            v-if="chartData.isPlus"
            class="text-xl text-green-900 font-bold"
            >{{ chartData.percent }}</span
          >
          <h5 class="text-md">{{ chartData.dayText }}</h5>
        </div>
      </div>
    </div>
    <div class="chart-info flex-1">
      <bar-chart :data="dataset" :labels="labels" />
    </div>
  </div>
</template>
<script>
import BarChart from "./charts/BarChart.vue";

export default {
  name: "BigChart",
  props: {
    chartData: Object,
  },
  watch: {
    chartData: {
      handler(val) {
        if (val.today) {
          const arr = [];
          val.today.forEach((item) => {
            // eslint-disable-next-line radix
            arr.push(parseInt(item));
            this.dataset[0].data.push(item);
          });
        }
        if (val.yesterday) {
          const arr = [];
          val.yesterday.forEach((item) => {
            // eslint-disable-next-line radix
            arr.push(parseInt(item));
            this.dataset[1].data.push(item);
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    summary() {
      // eslint-disable-next-line radix
      return this.dataset[0].data.reduce(
        // eslint-disable-next-line radix
        (partialSum, a) => Number(partialSum + parseInt(a), 0),
        0,
      );
    },
  },
  data() {
    return {
      dataset: [
        {
          label: "Today",
          backgroundColor: "#2ecc71",
          data: [],
        },
        {
          label: "Yesterday",
          backgroundColor: "#3498db",
          data: [],
        },
      ],
      labels: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
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
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
    };
  },
  components: {
    BarChart,
  },
};
</script>
