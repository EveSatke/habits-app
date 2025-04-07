import { createRouter, createWebHistory } from 'vue-router';
import { format, isValid, parse } from 'date-fns';
import HomeView from '../views/HomeView.vue';
import EditHabitView from '@/views/EditHabitView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/day/:date',
      name: 'home',
      component: HomeView,
      beforeEnter: to => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const parsedDate = parse(to.params.date, 'yyyy-MM-dd', new Date());
        if (!isValid(parsedDate) || to.params.date === 'today') {
          return { path: `/day/${today}` };
        }
      },
    },
    {
      path: '/habits/new',
      name: 'add habit',
      component: () => import('../views/AddHabitView.vue'),
    },
    { path: '/edit-habit/:id', name: 'edit habit', component: EditHabitView },
    { path: '/', redirect: '/day/today' },
  ],
});

export default router;
