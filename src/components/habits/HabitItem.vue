<script setup>
import { computed, ref } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Checkbox from '@/components/ui/Checkbox.vue';
import {
  PencilIcon,
  TrashIcon,
  PlayCircleIcon,
  PauseCircleIcon,
} from '@heroicons/vue/24/solid';
import { formatDistanceToNow, isToday } from 'date-fns';
import { useRouter, useRoute } from 'vue-router';
import ConfirmDialog from '../ui/ConfirmDialog.vue';

const habitsStore = useHabitsStore();
const router = useRouter();
const route = useRoute();
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

const isStopped = computed(() => {
  return props.habit.stopped_at && props.habit.stopped_at <= props.date;
});

const toggleHabitStatus = () => {
  habitsStore.toggleHabitStatus(props.habit.id, props.date);
};

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
    class="group relative flex flex-col sm:flex-row sm:items-center gap-3 p-4 mb-3 rounded-xl shadow-sm bg-white hover:bg-slate-50 transition-all duration-200"
    :class="{
      'bg-emerald-50 hover:bg-emerald-100/80': isCompleted,
      'opacity-70': isStopped,
    }"
  >
    <div class="flex items-center flex-1 min-w-0 gap-3">
      <Checkbox
        :checked="isCompleted"
        @update:checked="handleToggle"
        class="mt-1"
      />

      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-slate-900 truncate">
          {{ habit.name }}
        </h3>

        <div class="flex flex-wrap items-center gap-2 mt-1">
          <span class="text-xs text-slate-500 font-medium">
            Started {{ timeAgo }}
          </span>

          <span
            v-if="isStopped"
            class="inline-flex items-center px-2 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
          >
            Paused
          </span>
        </div>
      </div>
    </div>

    <div
      class="flex items-center gap-1 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100"
    >
      <button
        @click="toggleHabitStatus"
        type="button"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 transition-colors"
        :title="isStopped ? 'Resume habit' : 'Stop habit'"
      >
        <PlayCircleIcon v-if="isStopped" class="w-5 h-5 text-green-500" />
        <PauseCircleIcon v-else class="w-5 h-5 text-amber-500" />
        <span class="ml-2 text-sm font-medium text-slate-600 sm:hidden">
          {{ isStopped ? 'Resume' : 'Stop' }}
        </span>
      </button>

      <button
        @click="navigateToEdit"
        type="button"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <PencilIcon class="w-5 h-5 text-slate-500" />
        <span class="ml-2 text-sm font-medium text-slate-600 sm:hidden">
          Edit
        </span>
      </button>

      <button
        @click="openDeleteDialog(habit)"
        type="button"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
      >
        <TrashIcon class="w-5 h-5" />
        <span class="ml-2 text-sm font-medium sm:hidden"> Delete </span>
      </button>
    </div>

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
</template>
