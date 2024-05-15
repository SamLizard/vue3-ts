import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ComponentsView from "../views/ComponentsView.vue";
import DisplaySearchView from "../views/DisplaySearchView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/components",
    name: "components",
    component: ComponentsView,
  },
  {
    path: "/displaySearch",
    name: "displaySearch",
    component: DisplaySearchView,
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
