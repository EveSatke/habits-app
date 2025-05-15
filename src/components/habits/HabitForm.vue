<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHabitsStore, type Habit } from '@/stores/habits';
import Button from '@/components/ui/BaseButton.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const habitStore = useHabitsStore();
const errors = ref<{
  name?: string;
  submit?: string;
}>({});

interface Props {
  mode: 'add' | 'edit';
  habit?: Habit;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'add',
  habit: () => ({
    id: '',
    name: '',
    created_at: new Date().toISOString().split('T')[0],
  }),
});

const habitName = ref(props.habit.name);

const isEditMode = computed(() => props.mode === 'edit');

const date = computed(() => {
  return route.params.date || new Date().toISOString().split('T')[0];
});

const isDirty = ref(false);

type ValidationResult = {
  isValid: boolean;
  message?: string;
};

const validateHabit = (value: string): ValidationResult => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      message: 'Please enter a habit name',
    };
  }

  if (trimmedValue.length < 3) {
    return {
      isValid: false,
      message: 'Habit name must be at least 3 characters long',
    };
  }

  if (
    props.mode === 'add' ||
    (props.mode === 'edit' &&
      trimmedValue.toLowerCase() !== props.habit?.name.toLowerCase())
  ) {
    if (habitStore.doesHabitExist(trimmedValue)) {
      return {
        isValid: false,
        message: 'This habit already exists',
      };
    }
  }

  return { isValid: true };
};

const validateInput = () => {
  isDirty.value = true;
  const result = validateHabit(habitName.value);
  errors.value.name = result.message;
};

const handleInput = () => {
  if (isDirty.value) {
    errors.value.name = validateHabit(habitName.value.trim()).message;
  }
};

const isButtonDisabled = computed(() => {
  const validationResult = validateHabit(habitName.value);
  return !validationResult.isValid;
});

async function handleSubmit() {
  isDirty.value = true;
  const validationResult = validateHabit(habitName.value);
  if (!validationResult.isValid) {
    errors.value.name = validationResult.message;
    return;
  }
  errors.value.name = undefined;

  try {
    const value = habitName.value.trim();
    if (isEditMode.value) {
      const success = habitStore.editHabit(props.habit.id, value);
      if (!success) {
        throw new Error('Failed to edit habit');
      }
    } else {
      habitStore.addHabit(value, date.value as string);
    }
    await router.push(`/day/${date.value as string}`);
  } catch (error) {
    console.error('Failed to save habit. Please try again.', error);
    errors.value.submit = 'Failed to process habit. Please try again.';
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit" novalidate>
    <div class="space-y-1">
      <label for="habit-name" class="block text-sm font-medium text-slate-700"
        >Habit name</label
      >
      <div class="relative">
        <input
          type="text"
          id="habit-name"
          v-model="habitName"
          @blur="validateInput"
          @input="handleInput"
          placeholder="e.g., Morning meditation, Daily reading"
          class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200"
          :class="{
            'border-red-300 focus:border-red-500 focus:ring-red-500/20':
              errors.name,
          }"
          required
          minlength="3"
          maxlength="50"
          autocomplete="off"
          aria-describedby="habit-name-error"
          :aria-invalid="!!errors.name"
        />
        <div class="relative h-5">
          <Transition name="fade">
            <div
              v-if="errors.name"
              id="habit-name-error"
              class="absolute inset-x-0 flex items-center gap-1 text-xs text-red-500 mt-0.5"
              role="alert"
            >
              <svg
                class="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ errors.name }}</span>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <Transition name="fade">
      <div
        v-if="errors.submit"
        class="text-sm text-red-500 text-center -mt-2 mb-2"
        role="alert"
      >
        {{ errors.submit }}
      </div>
    </Transition>
    <div class="flex flex-col gap-4 pt-0">
      <Button type="submit" :disabled="isButtonDisabled" class="w-full">
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
