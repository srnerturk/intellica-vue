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
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: {
      layout: "LoginLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
    meta: {
      layout: "LoginLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/create-password",
    name: "CreatePassword",
    component: () => import(/* webpackChunkName: "create-password" */ "../views/auth/CreatePassword.vue"),
    meta: {
      layout: "LoginLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/testers",
    name: "TesterList",
    component: () => import(/* webpackChunkName: "tester" */ "../views/TesterManagement/Index.vue"),
    meta: {
      layout: "MainLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/testers/:method",
    name: "TestAddOrUpdate",
    component: () => import(/* webpackChunkName: "addorupdate" */ "../views/TesterManagement/AddorUpdate.vue"),
    meta: {
      layout: "MainLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/projects",
    name: "ProjectList",
    component: () => import(/* webpackChunkName: "project" */ "../views/ProjectManagement/Index.vue"),
    meta: {
      layout: "MainLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/projects/add",
    name: "ProjectAdd",
    component: () => import(/* webpackChunkName: "project add" */ "../views/ProjectManagement/add.vue"),
    meta: {
      layout: "MainLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/projects/edit",
    name: "ProjectEdit",
    component: () => import(/* webpackChunkName: "project edit" */ "../views/ProjectManagement/edit.vue"),
    meta: {
      layout: "MainLayout",
      requiresAuth: true,
    },
  },
  {
    path: "/projects/edit-floor-plan",
    name: "EditFloorPlan",
    component: () => import(/* webpackChunkName: "project floor" */ "../views/ProjectManagement/edit-floorplan.vue"),
    meta: {
      layout: "MainLayout",
      requiresAuth: true,
    },
  },
];

Vue.component("layout", Layout);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loginUrl = "Login";
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("mifi-token")) {
      next();
    } else {
      next({
        name: loginUrl,
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
