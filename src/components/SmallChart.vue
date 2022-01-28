<template>
  <div class="info-chart flex bg-white p-2 rounded-xl gap-5 flex-col">
    <div class="text-info flex-1 flex flex-col p-2">
      <h5 class="text-md font-bold mb-5">{{ text }}</h5>
      <h2 class="text-3xl font-bold leading-1 mb-3 text-mifiblue">
        {{ summary(chartData.last_5_days) }}
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
            data: dataset,
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
  name: "SmallChart",
  props: {
    chartData: Object,
    text: String,
  },
  data() {
    return {
      dataset: [],
    };
  },
  methods: {
    summary(val) {
      // eslint-disable-next-line radix
      return val.reduce(
        // eslint-disable-next-line radix
        (partialSum, a) => parseFloat(partialSum + a),
        0,
      );
    },
  },
  watch: {
    chartData: {
      handler(val) {
        if (val.last_5_days) {
          val.last_5_days.forEach((item) => {
            this.dataset.push(parseInt(item, 0));
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
