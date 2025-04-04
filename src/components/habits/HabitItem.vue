<script setup>
import { useHabitsStore } from '@/stores/habits';
import Checkbox from '@/components/ui/Checkbox.vue';
const habitsStore = useHabitsStore();

const props = defineProps({
  habit: {
    type: Object,
    required: true,
    validator: prop => {
      return ['id', 'name', 'created_at'].every(key => key in prop);
    },
  },
  date: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

function handleToggle() {
  habitsStore.toggleHabitCompletion(props.habit.id, props.date);
}

function handleDelete() {
  habitsStore.removeHabit(props.habit.id);
}
</script>

<template>
  <div
    class="group flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors"
  >
    <Checkbox :checked="isCompleted" @update:checked="handleToggle" />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-3">
        <h3
          class="font-medium truncate transition-colors"
          :class="isCompleted ? '!text-emerald-500' : 'text-slate-900'"
        >
          {{ habit.name }}
        </h3>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 whitespace-nowrap"
        >
          Created {{ habit.created_at }}
        </span>
      </div>
    </div>
    <div
      class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <button
        @click="handleDelete"
        class="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors"
        type="button"
      >
        <span class="sr-only">Delete habit</span>
        🗑️
      </button>
    </div>
  </div>
</template>
