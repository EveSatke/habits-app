<script setup>
import { computed } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Checkbox from '@/components/ui/Checkbox.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'vue-router';
const habitsStore = useHabitsStore();
const router = useRouter();

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

const timeAgo = computed(() => {
  return formatDistanceToNow(new Date(props.habit.created_at), {
    addSuffix: true,
  });
});

function handleToggle() {
  habitsStore.toggleHabitCompletion(props.habit.id, props.date);
}

function handleDelete() {
  habitsStore.removeHabit(props.habit.id);
}

function navigateToEdit() {
  router.push({ name: 'edit habit', params: { id: props.habit.id } });
}
</script>

<template>
  <div
    class="group relative flex items-center p-3 mb-4 rounded-lg transition-all duration-200"
    :class="{
      'bg-emerald-100 hover:bg-emerald-200/80': isCompleted,
      'bg-white hover:bg-slate-100': !isCompleted,
    }"
  >
    <div
      class="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-all duration-200"
      :class="isCompleted ? 'bg-emerald-500' : 'bg-transparent'"
    />

    <div class="flex items-center gap-3 flex-1 min-w-0">
      <Checkbox :checked="isCompleted" @update:checked="handleToggle" />

      <div class="flex flex-col gap-0.5 min-w-0">
        <h3
          class="font-medium truncate text-slate-900"
          :class="{ 'text-slate-700': isCompleted }"
        >
          {{ habit.name }}
        </h3>

        <span class="text-xs text-slate-400 font-medium">
          Started {{ timeAgo }}
        </span>
      </div>
    </div>

    <div
      class="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
    >
      <button
        @click="navigateToEdit"
        type="button"
        class="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-white/50 transition-colors"
        title="Edit habit"
      >
        <PencilIcon class="w-4 h-4" />
        <span class="sr-only">Edit habit</span>
      </button>
      <button
        @click="handleDelete"
        type="button"
        class="p-1.5 text-slate-600 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
        title="Delete habit"
      >
        <TrashIcon class="w-4 h-4" />
        <span class="sr-only">Delete habit</span>
      </button>
    </div>
  </div>
</template>
