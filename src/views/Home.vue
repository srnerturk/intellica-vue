<template>
  <div class="home">
    <div class="grid grid-cols-3 gap-5">
      <info-chart
        v-for="item in midChartData"
        :key="item.id"
        :chartData="item"
      />
    </div>
    <div class="grid grid-cols-1 mt-5">
      <big-chart :chartData="bigChart"></big-chart>
    </div>
    <div class="grid grid-cols-5 mt-5 gap-5">
      <small-chart
        v-for="item in smallChartData"
        :key="item.id"
        :chartData="item"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
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
  data() {
    return {
      bigChart: {
        id: 0,
        text: "Today",
        count: 36,
        percent: "-1.65%",
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
      smallChartData: [
        {
          id: 0,
          text: "RSSI (GSM)",
          count: -49,
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
          text: "RSRP",
          count: -120,
          percent: "+4.07%",
          dayText: "Yesterday",
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
          text: "RSRQ",
          count: -17,
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
        {
          id: 2,
          text: "CQI",
          count: 132,
          percent: "+4.07%",
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
        {
          id: 2,
          text: "RSSI (WI-FI)",
          count: -45,
          percent: "+7.07%",
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
