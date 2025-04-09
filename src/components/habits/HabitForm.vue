<script setup>
import { ref, computed } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Button from '@/components/ui/Button.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const habitStore = useHabitsStore();
const errors = ref({});

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: value => ['add', 'edit'].includes(value),
  },
  habit: {
    type: Object,
    default: () => ({ name: '' }),
  },
});

const habitName = ref(props.habit.name);

const isEditMode = computed(() => props.mode === 'edit');

const date = computed(() => {
  return route.params.date || new Date().toISOString().split('T')[0];
});

async function handleSubmit() {
  try {
    if (habitName.value.trim().length < 3) {
      errors.value.name = 'Habit name must be at least 3 characters long';
      return;
    }
    if (isEditMode.value) {
      const success = habitStore.editHabit(props.habit.id, habitName.value);
      if (!success) {
        throw new Error('Failed to edit habit');
      }
    } else {
      habitStore.addHabit(habitName.value, date.value);
    }
    await router.push(`/day/${date.value}`);
  } catch (error) {
    console.error('Failed to save habit. Please try again.', error);
    errors.value.submit = 'Failed to process habit. Please try again.';
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
          autofocus
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
        {{ isEditMode ? 'Save Changes' : 'Create Habit' }}
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
