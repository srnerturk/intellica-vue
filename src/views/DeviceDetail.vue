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
          v-for="item in midChartData"
          :key="item.id"
          :chartData="item"
        />
      </div>
      <div class="group">
        <h1 class="main-title">WIFI</h1>
        <info-chart
          class="mt-5"
          v-for="item in midChartData"
          :key="item.id"
          :chartData="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InfoChart from "@/components/InfoChart.vue";

export default {
  name: "DeviceDetail",
  components: {
    InfoChart,
  },
  data() {
    return {
      midChartData: [
        {
          id: 0,
          text: "Today",
          count: 36,
          percent: "-1.64%",
          dayText: "Yesterday",
          isPlus: false,
          datasets: [
            {
              data: [10, 50, 20, 100, 40, 60, 80],
              smooth: true,
              fill: true,
            },
          ],
          grid: {
            verticalLines: false,
            horizontalLines: false,
          },
          labels: null,
        },
        {
          id: 1,
          text: "This Month",
          count: 132,
          percent: "+4.07%",
          dayText: "Last month",
          isPlus: true,
          datasets: [
            {
              data: [15, 18, 31, 20, 32, 13, 80],
              smooth: true,
              fill: true,
            },
          ],
          grid: {
            verticalLines: false,
            horizontalLines: false,
          },
          labels: null,
        },
        {
          id: 2,
          text: "Total",
          count: 1400,
          percent: "+2.07%",
          dayText: "Last month",
          isPlus: true,
          datasets: [
            {
              data: [5, 14, 33, 44, 40, 8, 15],
              smooth: true,
              fill: true,
            },
          ],
          grid: {
            verticalLines: false,
            horizontalLines: false,
          },
          labels: null,
        },
      ],
    };
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
