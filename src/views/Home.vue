<template>
  <div class="home">
    <div class="grid lg:grid-cols-5 gap-5 sm:grid-cols-1">
      <info-chart
        class="col-span-2"
        v-if="getDashboardData.reported_devices"
        text="Today"
        :deviceCount="getDashboardData.reported_devices.today.device_count"
        :chartData="getDashboardData.reported_devices.today"
      />
      <info-chart
        class="col-span-2"
        v-if="getDashboardData.reported_devices"
        text="This Month"
        :chartData="getDashboardData.reported_devices.this_month"
        :deviceCount="getDashboardData.reported_devices.this_month.device_count"
      />
      <info-chart
        v-if="getDashboardData.reported_devices"
        text="Total"
        :deviceCount="getDashboardData.reported_devices.total"
        :chartData="{}"
      />
    </div>
    <div class="grid big-chart lg:grid-cols-1 mt-5 gap-5 sm:grid-cols-1">
      <big-chart
        v-if="getDashboardData.reported_devices"
        :chartData="getDashboardData.reported_devices.hourly_reporting_devices"
      ></big-chart>
    </div>
    <div class="grid lg:grid-cols-5 mt-5 gap-5 sm:grid-cols-1">
      <small-chart
        text="RSSI GSM"
        v-if="getDashboardData.averages"
        :chartData="getDashboardData.averages.rssi_gsm"
      />
      <small-chart
        text="RSRP"
        v-if="getDashboardData.averages"
        :chartData="getDashboardData.averages.rsrp"
      />
      <small-chart
        text="RSRQ"
        v-if="getDashboardData.averages"
        :chartData="getDashboardData.averages.rsrq"
      />
      <small-chart
        text="CQI"
        v-if="getDashboardData.averages"
        :chartData="getDashboardData.averages.cqi"
      />
      <small-chart
        text="RSSI WIFI"
        v-if="getDashboardData.averages"
        :chartData="getDashboardData.averages.rssi_wifi"
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
    ...mapActions(["fetchDashboardData"]),
  },
  mounted() {
    this.fetchDashboardData();
  },
  computed: {
    ...mapGetters(["getDashboardData"]),
  },
};
</script>
<style lang="scss" scoped>
@media (max-width: 640px) {
  .big-chart {
    display: none !important;
  }
}
</style>
