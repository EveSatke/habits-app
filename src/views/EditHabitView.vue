<script setup>
import { useRoute } from 'vue-router';
import { useHabitsStore } from '@/stores/habits';
import HabitForm from '@/components/habits/HabitForm.vue';

const route = useRoute();
const habitStore = useHabitsStore();
const habitId = route.params.id;
const habit = habitStore.habits.find(h => h.id === habitId);
</script>

<template>
  <main class="min-h-screen bg-slate-50">
    <div class="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div
        class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8"
      >
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <router-link to="/" class="text-slate-500 hover:text-slate-700"
                >Home</router-link
              >
            </li>
            <li class="text-slate-400">/</li>
            <li class="text-slate-900 font-medium">Edit Habit</li>
          </ol>
        </nav>
        <header class="mb-8">
          <h1 class="text-2xl font-semibold text-slate-900">
            Modify your habit details
          </h1>
        </header>
        <HabitForm mode="edit" :habit="habit" />
      </div>
    </div>
  </main>
</template>
