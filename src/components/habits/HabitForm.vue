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
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div class="space-y-2">
      <label for="habit-name" class="block text-sm font-medium text-slate-700"
        >Habit name</label
      >
      <div class="relative">
        <input
          type="text"
          id="habit-name"
          v-model="habitName"
          placeholder="e.g., Morning meditation, Daily reading"
          class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
          :class="{
            'border-red-300 focus:ring-red-500/20 focus:border-red-500':
              errors.name,
          }"
          required
          minlength="3"
          maxlength="50"
          autocomplete="off"
        />
      </div>

      <p
        v-if="errors.name"
        class="flex items-center gap-1.5 text-sm text-red-500 mt-1.5"
      >
        <span>⚠️</span>
        {{ errors.name }}
      </p>
      <div v-if="errors.submit" class="text-red-500 text-sm">
        {{ errors.submit }}
      </div>
    </div>
    <div class="flex flex-col gap-4 pt-4">
      <Button type="submit" :disabled="!habitName.trim()" class="w-full">
        Create Habit
      </Button>
      <button
        type="button"
        class="text-sm text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
        @click="router.back()"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
