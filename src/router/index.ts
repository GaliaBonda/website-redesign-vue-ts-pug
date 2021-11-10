import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import AppContentActivity from '../views/AppContentActivity.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppContentActivity',
    component: AppContentActivity,
  },
  {
    path: '/tasks',
    name: 'AppContentTasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/AppContentTasks.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
