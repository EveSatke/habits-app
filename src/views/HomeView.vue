<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDateStore } from '@/stores/date';
import { onMounted } from 'vue';
import WeekNavigator from '@/components/WeekNavigator.vue';
import ProfilePicture from '@/components/header/ProfilePicture.vue';
import HabitList from '@/components/habits/HabitList.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
const dateStore = useDateStore();
const route = useRoute();

onMounted(() => {
  dateStore.setDateFromRouter(route.params.date);
});

watch(
  () => route.params.date,
  newDate => {
    dateStore.setDateFromRouter(newDate);
  }
);
</script>

<template>
  <main class="max-w-3xl mx-auto space-y-8 py-8">
    <header class="flex items-center justify-between mb-12">
      <ProfilePicture />
    </header>

    <WeekNavigator />

    <section>
      <div class="flex items-center justify-between pb-6">
        <h2 class="text-xl font-semibold text-slate-900">
          <span v-if="dateStore.isToday">Today's habits</span>
          <span v-else>Habits for {{ dateStore.formattedDate }}</span>
        </h2>
        <router-link
          :to="`/habits/new?date=${route.params.date}`"
          class="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg shadow-sm hover:bg-primary-600 transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add habit
        </router-link>
      </div>
      <HabitList />
    </section>
  </main>
</template>
