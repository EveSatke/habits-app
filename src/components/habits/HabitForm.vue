<script setup>
import { ref } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Button from '@/components/ui/Button.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const habitName = ref('');
const habitStore = useHabitsStore();
const errors = ref({});

function handleSubmit() {
  try {
    if (habitName.value.trim().length < 3) {
      errors.value.name = 'Habit name must be at least 3 characters long';
      return;
    }
    const date = route.query.date;
    if (!date) {
      errors.value.submit = 'No date provided';
      return;
    }
    habitStore.addHabit(habitName.value, date);
    router.push(`/day/${date}`);
  } catch (error) {
    errors.value.submit = 'Failed to create habit. Please try again.';
    console.error('Failed to create habit: ', error);
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <button
      class="text-sm text-primary-500 hover:text-primary-600 font-medium cursor-pointer"
      @click.prevent="router.back"
    >
      &larr; Back
    </button>
    <div class="space-y-2">
      <label for="habit-name" class="block text-sm font-medium text-slate-700"
        >Habit name</label
      >
      <input
        type="text"
        id="habit-name"
        v-model="habitName"
        class="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        required
        minlength="3"
      />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      <div v-if="errors.submit" class="text-red-500 text-sm">
        {{ errors.submit }}
      </div>
    </div>
    <Button type="submit" :disabled="!habitName.trim()">Save</Button>
  </form>
</template>
