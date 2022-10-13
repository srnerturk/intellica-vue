<template>
  <div class="page">
    <h1 class="page-title">Dashboard</h1>
    <div class="dashboard mt-5 grid grid-cols-3 gap-5">
      <div class="card bg-purple-400 p-5 border border-red-50 rounded-xl">
        <div class="title text-center">
          <h5 class="text-xl font-bold text-gray-100">Tester Count</h5>
        </div>
        <div class="body text-center">
          <h1 class="text-7xl text-white mt-5">
            {{ getDashboard.testerCount }}
          </h1>
        </div>
      </div>
      <div class="card bg-yellow-500 p-5 border border-red-50 rounded-xl">
        <div class="title text-center">
          <h5 class="text-xl font-bold text-gray-100">Project Count</h5>
        </div>
        <div class="body text-center">
          <h1 class="text-7xl text-white mt-5">
            {{ getDashboard.projectCount }}
          </h1>
        </div>
      </div>
      <div class="card bg-red-500 p-5 border border-red-50 rounded-xl">
        <div class="title text-center">
          <h5 class="text-xl font-bold text-gray-100">Floor Plan Count</h5>
        </div>
        <div class="body text-center">
          <h1 class="text-7xl text-white mt-5">
            {{ getDashboard.floorPlanCount }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  methods: {
    ...mapActions(["fetchDashboardData"]),
  },
  mounted() {
    this.fetchDashboardData();
  },
  computed: {
    ...mapGetters(["getDashboard"]),
  },
};
</script>
