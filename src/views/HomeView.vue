<script setup>
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDateStore } from '@/stores/date';
import { onMounted } from 'vue';
import WeekNavigator from '@/components/WeekNavigator.vue';
import ProfilePicture from '@/components/header/ProfilePicture.vue';
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

function handAddHabitClick() {
  router.push('/add-habit');
}
</script>

<template>
  <main class="max-w-3xl mx-auto space-y-8 py-8">
    <header class="flex items-center justify-between mb-12">
      <ProfilePicture />
      <!-- Streak indicator -->
      <div
        class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100"
      >
        <span class="text-orange-500">🔥</span>
        <span class="text-sm font-medium text-slate-700">5 day streak</span>
      </div>
    </header>

    <WeekNavigator />

    <section class="space-y-6">
      <div class="flex items-center justify-between">
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
      <!-- Habits list will go here -->
    </section>
  </main>
</template>
