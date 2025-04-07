<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDateStore } from '@/stores/date';
import { onMounted } from 'vue';
import WeekNavigator from '@/components/WeekNavigator.vue';
import ProfilePicture from '@/components/header/ProfilePicture.vue';
import HabitList from '@/components/habits/HabitList.vue';

const dateStore = useDateStore();
const route = useRoute();
const router = useRouter();

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
          class="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          + Add habit
        </router-link>
      </div>
      <HabitList />
    </section>
  </main>
</template>
