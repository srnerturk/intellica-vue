<template>
  <div class="home">
    <div class="grid grid-cols-3 gap-5">
      <info-chart v-for="item in getDayData" :key="item.id" :chartData="item" />
    </div>
    <div class="grid grid-cols-2 mt-5 gap-5">
      <big-chart
        v-for="item in getBarData"
        :key="item.id"
        :chartData="item"
      ></big-chart>
    </div>
    <div class="grid grid-cols-5 mt-5 gap-5">
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
