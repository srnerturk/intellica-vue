<template>
  <div class="page">
    <h1 class="page-title">Device List</h1>
    <div class="device-list bg-white rounded-lg">
      <custom-table :tableData="getDeviceList" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CustomTable from "@/components/Table.vue";

export default {
  name: "DeviceList",
  components: {
    CustomTable,
  },
  methods: {
    ...mapActions(["fetchDevices"]),
  },
  computed: {
    ...mapGetters(["getDeviceList"]),
  },
  mounted() {
    this.fetchDevices();
  },
};
</script>
