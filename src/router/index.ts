import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import AppContentTasks from '../views/AppContentTasks.vue';
import NotFound from '../views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: AppContentTasks,
    beforeEnter: (to, from) => {
      // reject the navigation
      return {name: 'AppContentTasks'};
    },
  },
  {
    path: '/tasks',
    name: 'AppContentTasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/AppContentTasks.vue'),
  },
  {
    path: '/activity',
    name: 'AppContentActivity',
    component: () => import('../views/AppContentActivity.vue'),
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () => import('../views/AppContentKanban.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/ComingSoon.vue'),
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('../views/ComingSoon.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
