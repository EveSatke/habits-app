import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useDateStore } from '@/stores/date';
import ErrorView from '../views/errorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/day/:date',
      name: 'day',
      component: HomeView,
      beforeEnter: to => {
        const dateStore = useDateStore();
        const requestedDate = to.params.date;
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
        if (!dateStore.isDateSelectable(to.params.date)) {
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
      component: () => import('@/views/EditHabitView.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: to => {
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
  ],
});

export default router;
