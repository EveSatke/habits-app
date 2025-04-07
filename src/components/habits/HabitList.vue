<script setup>
import { computed } from 'vue';
import HabitItem from '@/components/habits/HabitItem.vue';
import { useHabitsStore } from '@/stores/habits';
import { useDateStore } from '@/stores/date';
import { useRouter, useRoute } from 'vue-router';
import { ClockIcon } from '@heroicons/vue/24/outline';

const habitsStore = useHabitsStore();
const dateStore = useDateStore();
const router = useRouter();
const route = useRoute();
const currentHabits = computed(() => {
  return habitsStore.getHabitsForDate(dateStore.currentDate);
});

async function navigateToAddHabit() {
  try {
    const date = route.params.date;

    if (!date) {
      console.error('No date provided');
      return;
    }
    await router.push(`/habits/new?date=${date}`);
  } catch (error) {
    console.error('Navigation failed:', error);
  }
}
</script>

<template>
  <div
    v-if="currentHabits.length === 0"
    class="flex flex-col items-center justify-center text-center py-10"
  >
    <div class="text-slate-500 mb-4">
      <ClockIcon class="h-12 w-12 mx-auto mb-2" />
      <p class="text-lg font-medium">No habits for this date</p>
      <p class="text-sm">
        Start building a new routine
        <button
          @click="navigateToAddHabit"
          class="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1 hover:cursor-pointer"
        >
          by adding a habit
        </button>
      </p>
    </div>
  </div>
  <HabitItem
    v-if="currentHabits.length > 0"
    v-for="habit in currentHabits"
    :key="habit.id"
    :habit="habit"
    :date="dateStore.currentDate"
    :is-completed="
      habitsStore.isHabitCompleted(dateStore.currentDate, habit.id)
    "
  />
</template>
