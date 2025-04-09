<script setup>
import { computed } from 'vue';
import HabitItem from '@/components/habits/HabitItem.vue';
import { useHabitsStore } from '@/stores/habits';
import { useDateStore } from '@/stores/date';
import { useRouter, useRoute } from 'vue-router';
import { ClockIcon } from '@heroicons/vue/24/outline';
import { useHabitNavigation } from '@/composables/useHabitNavigation';

const habitsStore = useHabitsStore();
const dateStore = useDateStore();
const { navigateToAddHabit } = useHabitNavigation();
const currentHabits = computed(() => {
  return habitsStore.getHabitsForDate(dateStore.currentDate);
});
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div
      v-if="currentHabits.length === 0"
      class="flex flex-col items-center justify-center text-center py-10 px-4"
    >
      <div class="text-slate-500 mb-4">
        <ClockIcon class="h-12 w-12 mx-auto mb-3" />
        <p class="text-lg font-medium">No habits for this date</p>
        <p class="text-sm mt-2">
          Start building a new routine by
          <button
            @click="navigateToAddHabit"
            class="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1 hover:cursor-pointer"
          >
            adding a habit
          </button>
        </p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <HabitItem
        v-for="habit in currentHabits"
        :key="habit.id"
        :habit="habit"
        :date="dateStore.currentDate"
        :is-completed="
          habitsStore.isHabitCompleted(dateStore.currentDate, habit.id)
        "
      />
    </div>
  </div>
</template>
