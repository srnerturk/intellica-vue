import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      layout: "LoginLayout",
    },
  },
  {
    path: "/testers",
    name: "TesterList",
    component: () => import(/* webpackChunkName: "tester" */ "../views/TesterManagement/Index.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/testers/:method",
    name: "TestAddOrUpdate",
    component: () => import(/* webpackChunkName: "addorupdate" */ "../views/TesterManagement/AddorUpdate.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/projects",
    name: "ProjectList",
    component: () => import(/* webpackChunkName: "project" */ "../views/ProjectManagement/Index.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/projects/add",
    name: "ProjectAdd",
    component: () => import(/* webpackChunkName: "project add" */ "../views/ProjectManagement/add.vue"),
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
