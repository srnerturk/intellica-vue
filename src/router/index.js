import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../layouts/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      layout: "LoginLayout",
    },
  },
  {
    path: "/device-list/:page",
    name: "DeviceList",
    component: () => import(/* webpackChunkName: "about" */ "../views/DeviceList.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/device-locations",
    name: "DeviceLocations",
    component: () => import(/* webpackChunkName: "about" */ "../views/DeviceLocations.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/plan-sketches/:device",
    name: "PlanSketches",
    component: () => import(/* webpackChunkName: "about" */ "../views/PlanSketches.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/device-detail/:mac",
    name: "DeviceDetail",
    component: () => import(/* webpackChunkName: "about" */ "../views/DeviceDetail.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
];

Vue.component("layout", Layout);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
