import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EditHabitView from '@/views/EditHabitView.vue';
import { useDateStore } from '@/stores/date';

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
          const today = new Date().toISOString().split('T')[0];
          return { name: 'day', params: { date: today } };
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
            name: 'home',
            query: { error: 'Cannot add habits for future dates' },
          };
        }
      },
    },
    {
      path: '/edit-habit/:id',
      name: 'editHabit',
      component: () => import('@/views/EditHabitView.vue'),
    },
    { path: '/', redirect: '/day/today' },
    { path: '/day', redirect: '/day/today' },
  ],
});

export default router;
