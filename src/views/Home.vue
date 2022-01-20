<template>
  <div class="home">
    <div class="grid lg:grid-cols-3 gap-5 sm:grid-cols-1">
      <info-chart v-for="item in getDayData" :key="item.id" :chartData="item" />
    </div>
    <div class="grid big-chart lg:grid-cols-2 mt-5 gap-5 sm:grid-cols-1">
      <big-chart
        v-for="item in getBarData"
        :key="item.id"
        :chartData="item"
      ></big-chart>
    </div>
    <div class="grid lg:grid-cols-5 mt-5 gap-5 sm:grid-cols-1">
      <small-chart
        v-for="item in getDeviceInfoData"
        :key="item.id"
        :chartData="item"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InfoChart from "@/components/InfoChart.vue";
import BigChart from "@/components/BigChart.vue";
import SmallChart from "@/components/SmallChart.vue";

export default {
  name: "Home",
  components: {
    InfoChart,
    BigChart,
    SmallChart,
  },
  methods: {
    ...mapActions([
      "fetchByDayChartData",
      "fetchDeviceInfoData",
      "fetchBarData",
    ]),
  },
  mounted() {
    this.fetchByDayChartData();
    this.fetchDeviceInfoData();
    this.fetchBarData();
    console.log(this.getBarData);
  },
  computed: {
    ...mapGetters(["getDayData", "getDeviceInfoData", "getBarData"]),
  },
};
</script>
<style lang="scss" scoped>
@media (max-width: 640px) {
  .big-chart {
    display: none!important;
  }
}
</style>
