<script setup>
import { computed, ref } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Checkbox from '@/components/ui/Checkbox.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { formatDistanceToNow, isToday } from 'date-fns';
import { useRouter } from 'vue-router';
import ConfirmDialog from '../ui/ConfirmDialog.vue';

const habitsStore = useHabitsStore();
const router = useRouter();
const isDeleteDialogOpen = ref(false);
const habitToDelete = ref(null);
const confirmDialogDescription = computed(() => {
  if (!habitToDelete.value) return '';
  return `Deleting "${habitToDelete.value.name}" will remove all tracking history. This can't be reversed.`;
});

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
  const date = new Date(props.habit.created_at);
  if (isToday(date)) {
    return 'today';
  } else {
    return formatDistanceToNow(date, {
      addSuffix: true,
    });
  }
});

function handleToggle() {
  habitsStore.toggleHabitCompletion(props.habit.id, props.date);
}

function navigateToEdit() {
  router.push({ name: 'editHabit', params: { id: props.habit.id } });
}

function openDeleteDialog(habit) {
  if (!habit) return;
  habitToDelete.value = habit;
  isDeleteDialogOpen.value = true;
}

function cancelDelete() {
  isDeleteDialogOpen.value = false;
  habitToDelete.value = null;
}

function confirmDelete() {
  if (habitToDelete.value) {
    habitsStore.removeHabit(props.habit.id);
    isDeleteDialogOpen.value = false;
    habitToDelete.value = null;
  }
}
</script>

<template>
  <div
    class="group relative flex items-center p-3 mb-4 rounded-lg shadow-xs transition-all duration-200"
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
        class="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-white/50 transition-colors hover:cursor-pointer"
        title="Edit habit"
      >
        <PencilIcon class="w-4 h-4" />
        <span class="sr-only">Edit habit</span>
      </button>
      <button
        @click="openDeleteDialog(habit)"
        type="button"
        class="p-1.5 text-slate-600 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors hover:cursor-pointer"
        title="Delete habit"
      >
        <TrashIcon class="w-4 h-4" />
        <span class="sr-only">Delete habit</span>
      </button>
      <ConfirmDialog
        :is-open="isDeleteDialogOpen"
        title="Delete Habit"
        :description="confirmDialogDescription"
        cancel-text="Cancel"
        confirm-text="Delete"
        @close="cancelDelete"
        @confirm="confirmDelete"
      />
    </div>
  </div>
</template>
