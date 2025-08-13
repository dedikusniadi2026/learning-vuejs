import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import DashboardHome from "../views/DashboardHome.vue";
import { useAuthStore } from "../stores/auth";
import Products from "../views/Products.vue";
import Users from '../views/Users.vue';

const routes = [
  { path: "/", name: "Login", component: Login },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "DashboardHome", component: DashboardHome }
    ]
  },

  {
    path: "/products",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "Product", component: Products }
    ]
  },

  {
    path: "/users",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "Users", component: Users }
    ]
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) {
    return "/login";
  }
});

export default router;
