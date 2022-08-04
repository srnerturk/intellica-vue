<!-- eslint-disable max-len -->
<template>
  <div class="wrapper w-full bg-gray-200 h-full flex flex-row fixed">
    <div class="side-bar w-70 h-full bg-mifiblue z-10 flex justify-between flex-col top-0">
      <nav class="pt-10 w-70 flex items-center justify-center">
        <ul class="w-30">
          <li class="w-30 mb-10">
            <router-link to="/">
              <img src="@/assets/icons/notification.svg" alt="notifications" />
            </router-link>
          </li>
        </ul>
      </nav>
      <nav class="pt-10 w-70 flex items-center justify-center">
        <ul class="w-30">
          <li class="w-30 mb-10">
            <router-link to="/">
              <img src="@/assets/icons/home_dashboard.svg" alt="dashboard" />
            </router-link>
          </li>
          <li class="w-30 mb-10">
            <router-link to="/testers">
              <img src="@/assets/icons/device_list.svg" alt="tester list" />
            </router-link>
          </li>
          <li class="w-30 mb-10">
            <router-link to="/projects">
              <img src="@/assets/icons/device_locations.svg" alt="locations" />
            </router-link>
          </li>
          <li class="w-30 mb-10">
            <router-link to="/">
              <img src="@/assets/icons/sketch_plan.svg" alt="settings" />
            </router-link>
          </li>
          <li class="w-30 mb-10">
            <router-link to="/">
              <img src="@/assets/icons/reports.svg" alt="reports" />
            </router-link>
          </li>
          <!-- <li>
              <router-link to="/">
                <img src="@/assets/icons/help.svg" alt="help" />
              </router-link>
            </li> -->
        </ul>
      </nav>
      <nav class="pt-10 mt-20 w-70 flex items-center justify-center">
        <ul class="w-30">
          <li class="w-30 mb-10">
            <a class="pointer" @click="signOut">
              <img src="@/assets/icons/logout.svg" alt="logout" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="page-content flex flex-col w-full">
      <div class="header h-80 w-full z-20">
        <div class="container flex justify-between ml-auto mr-auto">
          <div class="logo w-180 h-80 flex items-center">
            <router-link to="/"
              ><img class="w-full" src="@/assets/icons/logo.svg" alt="logo"
            /></router-link>
          </div>
          <div class="user-profile h-80 flex items-center">
            <div
              class="user-circle w-60 h-60 bg-mifiblue rounded-full border-2 border-mifired flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">SE</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content w-full flex justify-center p-5 overflow-auto">
        <div class="container">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "MainLayout",
  methods: {
    ...mapActions(["logout"]),
    signOut() {
      this.logout().then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
</style>
