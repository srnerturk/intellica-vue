<template>
  <div class="device-detail">
    <h1 class="page-title">Device Details</h1>
    <div class="grid grid-cols-3 bg-white rounded-lg p-5">
      <div class="left col">
        <div class="item">
          <label>MSISDN</label>
          <span>425-241-0055</span>
        </div>
        <div class="item">
          <label>IMSI</label>
          <span>784738726352</span>
        </div>
      </div>
      <div class="center col">
        <div class="item">
          <label>MAC</label>
          <span>AE:34:54:56:54D3:FF</span>
        </div>
        <div class="item">
          <label>ICCID</label>
          <span>89034238943567321F</span>
        </div>
      </div>
      <div class="right col">
        <div class="item">
          <label>IMEI</label>
          <span>43565434233211</span>
        </div>
        <div class="item">
          <label>LAST REPORTED</label>
          <span>12/25/2021 - 12:23:23</span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5 mt-10">
      <div class="group">
        <h1 class="main-title">GSM</h1>
        <info-chart
          class="mt-5"
          v-for="item in getDeviceInfoData"
          :key="item.id"
          :chartData="item"
        />
      </div>
      <div class="group">
        <h1 class="main-title">WIFI</h1>
        <info-chart
          class="mt-5"
          v-for="item in getDeviceInfoData"
          :key="item.id"
          :chartData="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InfoChart from "@/components/InfoChart.vue";

export default {
  name: "DeviceDetail",
  components: {
    InfoChart,
  },
  methods: {
    ...mapActions(["fetchDeviceInfoData"]),
  },
  mounted() {
    this.fetchDeviceInfoData();
  },
  computed: {
    ...mapGetters(["getDeviceInfoData"]),
  },
};
</script>
<style lang="scss">
.main-title {
  font-size: 24px;
  color: #d1264d;
  margin-left: 25px;
  font-weight: bold;
}
.device-detail {
  .col {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    label {
      font-weight: bold;
      margin-right: 5px;
      font-size: 14px;
    }
    span {
      font-size: 14px;
    }
  }
}
</style>
