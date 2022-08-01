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
    component: () => import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: {
      layout: "LoginLayout",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "login" */ "../views/auth/Register.vue"),
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
  {
    path: "/projects/edit",
    name: "ProjectEdit",
    component: () => import(/* webpackChunkName: "project add" */ "../views/ProjectManagement/edit.vue"),
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/projects/edit-floor-plan",
    name: "EditFloorPlan",
    component: () => import(/* webpackChunkName: "project add" */ "../views/ProjectManagement/edit-floorplan.vue"),
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
