<template>
  <div class="device-detail">
    <h1 class="page-title">Device Details</h1>
    <div class="grid grid-cols-3 bg-white rounded-lg p-5">
      <div class="left col">
        <div class="item">
          <label>MSISDN</label>
          <span>{{getCurrentDevice.msisdn}}</span>
        </div>
        <div class="item">
          <label>MAC</label>
          <span>{{getCurrentDevice.mac}}</span>
        </div>
      </div>
      <div class="center col">
        <div class="item">
          <label>IMEI</label>
          <span>{{getCurrentDevice.imei}}</span>
        </div>
        <div class="item">
          <label>IMSI</label>
          <span>{{getCurrentDevice.imsi}}</span>
        </div>
      </div>
      <div class="right col">
        <div class="item">
          <label>iccid  </label>
          <span>{{getCurrentDevice.iccid}}</span>
        </div>
        <div class="item">
          <label>LAST REPORTED</label>
          <span>{{getCurrentDevice.last_reported}}</span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5 mt-10">
      <div class="group">
        <h1 class="main-title">GSM</h1>
        <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.gsm"
          :chartData="getCurrentDevice.gsm.rssi"
          text="RSSI"
        />
         <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.gsm"
          :chartData="getCurrentDevice.gsm.rsrp"
          text="RSRP"
        />
         <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.gsm"
          :chartData="getCurrentDevice.gsm.rsrq"
          text="RSRQ"
        />
         <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.gsm"
          :chartData="getCurrentDevice.gsm.cqi"
          text="CQI"
        />
      </div>
      <div class="group">
        <h1 class="main-title">WIFI</h1>
        <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.wifi"
          :chartData="getCurrentDevice.wifi.rssi"
          text="RSSI"
        />
         <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.wifi"
          :chartData="getCurrentDevice.wifi.channel"
          text="CHANNEL"
        />
         <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.wifi"
          :chartData="getCurrentDevice.wifi.frequency"
          text="FREQ"
        />
         <detail-chart
          class="mt-5"
          v-if="getCurrentDevice.wifi"
          :chartData="getCurrentDevice.wifi.snr"
          text="SNR"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DetailChart from "@/components/DetailChart.vue";

export default {
  name: "DeviceDetail",
  components: {
    DetailChart,
  },
  methods: {
    ...mapActions(["getDeviceDetail"]),
  },
  mounted() {
    this.getDeviceDetail(this.macAdress);
  },
  computed: {
    ...mapGetters(["getCurrentDevice"]),
    macAdress() {
      return this.$route.params.mac;
    },
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
