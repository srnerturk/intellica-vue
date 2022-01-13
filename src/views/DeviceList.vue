<template>
  <div class="page">
    <h1 class="page-title">Device List</h1>
    <div class="device-list bg-white rounded-lg">
      <custom-table :tableData="tableData" />
    </div>
  </div>
</template>
<script>
import CustomTable from "@/components/Table.vue";

export default {
  name: "DeviceList",
  components: {
    CustomTable,
  },
  data() {
    return {
      tableData: [
        {
          id: 0,
          mac: "00:A3:10:5F:21:E3:A3",
          msi: "2344666444",
          ssid: "Devs",
          last_reported_date: "dd.mm.yyyy",
          last_reported_channel: "dev",
        },
        {
          id: 1,
          mac: "00:A3:10:5F:21:E3:A3",
          msi: "2344666444",
          ssid: "Devs",
          last_reported_date: "dd.mm.yyyy",
          last_reported_channel: "dev",
        },
        {
          id: 2,
          mac: "00:A3:10:5F:21:E3:A3",
          msi: "2344666444",
          ssid: "My house",
          last_reported_date: "dd.mm.yyyy",
          last_reported_channel: "prod",
        },
        {
          id: 3,
          mac: "00:A3:10:5F:21:E3:A3",
          msi: "2344666444",
          ssid: "Champ",
          last_reported_date: "dd.mm.yyyy",
          last_reported_channel: "dev",
        },
        {
          id: 4,
          mac: "00:A3:10:5F:21:E3:A3",
          msi: "2344666444",
          ssid: "Devs",
          last_reported_date: "dd.mm.yyyy",
          last_reported_channel: "dev",
        },
      ],
    };
  },
};
</script>
