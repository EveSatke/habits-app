<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDateStore } from '@/stores/date';
import { onMounted } from 'vue';
import WeekNavigator from '@/components/navigation/WeekNavigator.vue';
import ProfilePicture from '@/components/header/ProfilePicture.vue';
import HabitList from '@/components/habits/HabitList.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { useHabitNavigation } from '@/composables/useHabitNavigation';
import CalendarPicker from '@/components/navigation/CalendarPicker.vue';

const dateStore = useDateStore();
const route = useRoute();
const { navigateToAddHabit } = useHabitNavigation();

onMounted(() => {
  dateStore.setDateFromRouter(route.params.date as string);
});

watch(
  () => route.params.date,
  newDate => {
    dateStore.setDateFromRouter(newDate as string);
  }
);
</script>

<template>
  <div class="relative min-h-screen pb-20 sm:pb-0">
    <main class="max-w-3xl mx-auto space-y-8 py-8">
      <header class="flex items-center justify-between mb-12 relative">
        <ProfilePicture />
        <div class="absolute right-0">
          <CalendarPicker />
        </div>
      </header>

      <WeekNavigator />

      <section>
        <div class="flex items-center justify-between pb-6">
          <h2 class="text-xl font-semibold text-slate-900">
            <span v-if="dateStore.isToday">Today's habits</span>
            <span v-else-if="dateStore.isYesterday">Yesterday's habits</span>
            <span v-else>Habits for {{ dateStore.formattedDate }}</span>
          </h2>
          <button
            @click="navigateToAddHabit"
            class="hidden sm:inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg shadow-sm hover:bg-primary-600 transition-colors duration-200 hover:cursor-pointer"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Add habit
          </button>
        </div>
        <HabitList />
      </section>
    </main>

    <button
      @click="navigateToAddHabit"
      class="fixed right-4 bottom-4 sm:hidden inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 active:scale-95 transition-all duration-200"
      aria-label="Add habit"
    >
      <PlusIcon class="w-6 h-6" />
    </button>
  </div>
</template>
