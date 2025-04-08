import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDateStore } from '@/stores/date';

export function useHabitNavigation() {
  const route = useRoute();
  const router = useRouter();

  const navigateToAddHabit = async () => {
    try {
      const date = route.params.date;
      if (!date) {
        console.warn('No date parameter found');
        const today = new Date().toISOString().split('T')[0];
        await router.push({
          name: 'addHabit',
          params: { date: today },
        });
        return;
      }

      await router.push({
        name: 'addHabit',
        params: { date },
      });
    } catch (error) {
      console.error('Navigation failed', error);
    }
  };

  return { navigateToAddHabit };
}
