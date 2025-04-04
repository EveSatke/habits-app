<script setup>
import { computed } from 'vue';
import HabitItem from '@/components/habits/HabitItem.vue';
import { useHabitsStore } from '@/stores/habits';
import { useDateStore } from '@/stores/date';

const habitsStore = useHabitsStore();
const dateStore = useDateStore();

const currentHabits = computed(() => {
  return habitsStore.getHabitsForDate(dateStore.currentDate);
});
</script>

<template>
  <habit-item
    v-for="habit in currentHabits"
    :key="habit.id"
    :habit="habit"
    :date="dateStore.currentDate"
    :is-completed="
      habitsStore.isHabitCompleted(dateStore.currentDate, habit.id)
    "
  />
</template>
