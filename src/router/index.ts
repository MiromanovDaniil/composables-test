import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MyForm from '../components/MyForm.vue';
import DataFetcher from '../components/DataFetcher.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MyForm },
  { path: '/data', component: DataFetcher }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
