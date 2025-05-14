import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useDateStore } from '@/stores/date';
import ErrorView from '../views/errorView.vue';
import EditHabitView from '../views/EditHabitView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/day/:date',
    name: 'day',
    component: HomeView,
    beforeEnter: to => {
      const dateStore = useDateStore();
      const requestedDate = to.params.date as string;

      if (!/^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) {
        return {
          name: 'error',
          query: { type: 'not-found' },
        };
      }

      if (!dateStore.isDateSelectable(requestedDate)) {
        return {
          name: 'error',
          query: { type: 'future-date' },
        };
      }
    },
  },
  {
    path: '/add/:date',
    name: 'addHabit',
    component: () => import('../views/AddHabitView.vue'),
    beforeEnter: to => {
      const dateStore = useDateStore();
      if (!dateStore.isDateSelectable(to.params.date as string)) {
        return {
          name: 'error',
          query: { type: 'future-date' },
        };
      }
    },
  },
  {
    path: '/edit-habit/:id',
    name: 'editHabit',
    component: EditHabitView,
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      return {
        name: 'error',
        query: { type: 'not-found' },
      };
    },
  },
  {
    path: '/',
    redirect: () => {
      const today = new Date().toISOString().split('T')[0];
      return { name: 'day', params: { date: today } };
    },
  },
  {
    path: '/day',
    redirect: () => {
      const today = new Date().toISOString().split('T')[0];
      return { name: 'day', params: { date: today } };
    },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
