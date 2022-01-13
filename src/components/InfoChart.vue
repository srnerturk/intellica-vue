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
    <div class="text-info flex-1 flex flex-col p-2">
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
            class="text-md text-green-900 font-bold"
            >{{ chartData.percent }}</span
          >
          <h5 class="text-md">{{ chartData.dayText }}</h5>
        </div>
      </div>
    </div>
    <div class="chart-info flex-1">
      <TrendChart
        :datasets="[
          {
            data: chartData.data,
            smooth: true,
            fill: true,
          },
        ]"
        :grid="{
          verticalLines: false,
          horizontalLines: false,
        }"
        :labels="null"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoChart",
  props: {
    chartData: Object,
  },
};
</script>
