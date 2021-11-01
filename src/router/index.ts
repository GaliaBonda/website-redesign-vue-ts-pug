import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
// import Home from '../views/Home.vue';
import Activity from '../views/Activity.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Activity',
    component: Activity,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
