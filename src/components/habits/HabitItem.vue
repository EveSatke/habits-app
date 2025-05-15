<script setup lang="ts">
import { computed, ref } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Checkbox from '@/components/ui/BaseCheckbox.vue';
import {
  PencilIcon,
  TrashIcon,
  StopCircleIcon,
  PlayCircleIcon,
} from '@heroicons/vue/24/solid';
import { formatDistanceToNow, isToday, format } from 'date-fns';
import { useRouter } from 'vue-router';
import ConfirmDialog from '../ui/ConfirmDialog.vue';
import type { Habit } from '@/stores/habits';

const habitsStore = useHabitsStore();
const router = useRouter();
const isDeleteDialogOpen = ref(false);
const habitToDelete = ref<Habit | null>(null);
const confirmDialogDescription = computed(() => {
  if (!habitToDelete.value) return '';
  return `Deleting "${habitToDelete.value.name}" will remove all tracking history. This can't be reversed.`;
});

interface Props {
  habit: Habit;
  date: string;
  isCompleted: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  habit: () => ({ id: '', name: '', created_at: '' }),
  date: () => '',
  isCompleted: false,
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

const isHabitMarkedAsStopped = computed(() => {
  return !!props.habit.stopped_at;
});

const isInactiveOnThisDate = computed(() => {
  return props.habit.stopped_at === props.date;
});

const formattedStopDate = computed(() => {
  if (props.habit.stopped_at) {
    const stopDate = new Date(props.habit.stopped_at);
    if (!isNaN(stopDate.getTime())) {
      return format(stopDate, 'MMM d, yyyy');
    }
  }
  return '';
});

const handleToggleStopStatus = () => {
  habitsStore.toggleHabitStatus(props.habit.id, props.date);
};

function handleToggleCompletion() {
  if (isInactiveOnThisDate.value) return;
  habitsStore.toggleHabitCompletion(props.habit.id, props.date);
}

function navigateToEdit() {
  if (isInactiveOnThisDate.value || isHabitMarkedAsStopped.value) return;
  router.push({ name: 'editHabit', params: { id: props.habit.id } });
}

function openDeleteDialog(habit: Habit) {
  if (!habit) return;
  habitToDelete.value = habit;
  isDeleteDialogOpen.value = true;
}

function cancelDelete() {
  isDeleteDialogOpen.value = false;
  habitToDelete.value = null;
}

function handleDelete() {
  try {
    if (!habitToDelete.value) return;
    habitsStore.removeHabit(habitToDelete.value.id);
    isDeleteDialogOpen.value = false;
    habitToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete habit:', error);
  }
}
</script>

<template>
  <div
    class="group relative flex flex-col sm:flex-row sm:items-center gap-3 p-4 mb-3 rounded-xl shadow-sm bg-white hover:bg-slate-50 transition-all duration-200"
    :class="{
      'bg-emerald-50 hover:bg-emerald-100/80':
        isCompleted && !isInactiveOnThisDate,
      'opacity-60': isInactiveOnThisDate,
    }"
  >
    <div class="flex items-center flex-1 min-w-0 gap-3">
      <Checkbox
        :checked="isCompleted"
        @update:checked="handleToggleCompletion"
        class="mt-1"
        :disabled="isInactiveOnThisDate"
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
            v-if="isHabitMarkedAsStopped"
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
          >
            Stopped {{ formattedStopDate ? 'on ' + formattedStopDate : '' }}
          </span>
        </div>
      </div>
    </div>

    <div
      class="flex items-center gap-1 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100"
    >
      <button
        @click="handleToggleStopStatus"
        type="button"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer transition-colors"
        :title="
          isInactiveOnThisDate
            ? 'Resume habit'
            : isHabitMarkedAsStopped
              ? 'Resume habit (was stopped later)'
              : 'Stop habit'
        "
      >
        <PlayCircleIcon
          v-if="
            isInactiveOnThisDate ||
            (isHabitMarkedAsStopped && !isInactiveOnThisDate)
          "
          class="w-5 h-5 text-green-500"
        />
        <StopCircleIcon
          v-else-if="!isHabitMarkedAsStopped"
          class="w-5 h-5 text-amber-500"
        />

        <span class="ml-2 text-sm font-medium text-slate-600 sm:hidden">
          {{
            isInactiveOnThisDate
              ? 'Resume'
              : isHabitMarkedAsStopped
                ? 'Resume'
                : 'Stop'
          }}
        </span>
      </button>

      <button
        @click="navigateToEdit"
        type="button"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 transition-colors hover:cursor-pointer"
        :class="{
          'opacity-50 cursor-not-allowed':
            isInactiveOnThisDate || isHabitMarkedAsStopped,
        }"
        :disabled="isInactiveOnThisDate || isHabitMarkedAsStopped"
      >
        <PencilIcon class="w-5 h-5 text-slate-500" />
        <span class="ml-2 text-sm font-medium text-slate-600 sm:hidden">
          Edit
        </span>
      </button>

      <button
        @click="openDeleteDialog(habit)"
        type="button"
        class="flex-1 sm:flex-initial inline-flex items-center justify-center p-2 rounded-lg hover:bg-red-50 hover:cursor-pointer text-red-600 transition-colors"
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
      @confirm="handleDelete"
    />
  </div>
</template>
