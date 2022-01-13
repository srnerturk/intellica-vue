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
      <h5 class="text-md font-bold mb-5">{{ chartData.text }}</h5>
      <h2 class="text-3xl font-bold leading-1 mb-3 text-mifiblue">
        {{ chartData.count }}
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
      <bar-chart :data="chartData.data" :labels="chartData.labels" />
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
  components: {
    BarChart,
  },
};
</script>
