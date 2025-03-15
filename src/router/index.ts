import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import DataFetcher from '../components/DataFetcher.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/data', component: DataFetcher }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
