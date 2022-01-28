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
      <h5 class="text-md font-bold mb-5">{{ text }}</h5>
    </div>
    <div v-if="this.dataset.length > 0" class="chart-info flex-1">
      <TrendChart
        :datasets="[
          {
            data: this.dataset,
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
  name: "DetailChart",
  props: {
    chartData: Array,
    text: String,
    deviceCount: String,
  },
  data() {
    return {
      dataset: [],
    };
  },
  watch: {
    chartData: {
      handler(val) {
        if (val) {
          val.forEach((item) => {
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
