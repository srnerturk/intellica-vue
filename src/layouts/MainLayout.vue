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
        <ul class="menu">
          <li>
            <router-link to="/">
              <img src="@/assets/icons/home_dashboard.svg" alt="dashboard" />
              <span class="text-white">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/testers?page=1">
              <img src="@/assets/icons/device_list.svg" alt="tester list" />
              <span class="text-white">Testers</span>
            </router-link>
          </li>
          <li>
            <router-link to="/projects?page=1">
              <img src="@/assets/icons/device_locations.svg" alt="locations" />
              <span class="text-white">Projects</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="@/assets/icons/sketch_plan.svg" alt="settings" />
              <span class="text-white">Results</span>
            </router-link>
          </li>
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
              class="user-circle bg-mifiblue rounded-lg cursor-pointer border-2 p-3 flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">{{ getEmail }}</span>
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
import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["getEmail"]),
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
.menu {
  width: 70px;
  li {
    width: 60px;
    margin-bottom: 42px;
    a {
      padding-left: 15px;
      width: 60px;
      display: flex;
      background: #1c2749;
      overflow: hidden;
      height: 42px;
      align-items: center;
      border-radius: 6px;
      img {
        width: 28px;
      }
      span {
        left: 45px;
        position: absolute;
        padding-left: 15px;
        display: none;
        border-radius: 6px;
      }
      &:hover {
        transition: all 0.2s;
        width: 160px;
      }
      &:hover span {
        font-weight: bold;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
