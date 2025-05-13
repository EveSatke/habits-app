<script setup lang="ts">
import { computed } from 'vue';
import { useDateStore } from '@/stores/date';
import { useRouter } from 'vue-router';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';

const dateStore = useDateStore();
const router = useRouter();

const formattedWeekDates = computed(() => {
  const dates = dateStore.weekDates;
  const compactDates = dateStore.compactWeekDates;

  return {
    mobile: compactDates.map(date => dateStore.formatDate(date)),
    desktop: dates.map(date => dateStore.formatDate(date)),
  };
});

function handleDateClick(date: string) {
  dateStore.setDate(date);
  router.push(`/day/${date}`);
}

function navigateWeek(direction: 'prev' | 'next') {
  const dates = dateStore.weekDates;
  const targetDate = direction === 'next' ? dates[dates.length - 1] : dates[0];
  dateStore.setDate(targetDate);
  router.push(`/day/${targetDate}`);
}

const isDateDisabled = (date: string) => !dateStore.isDateSelectable(date);
</script>

<template>
  <nav
    class="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6"
  >
    <div class="flex justify-between items-center gap-2 sm:gap-3">
      <button
        @click="navigateWeek('prev')"
        class="flex items-center justify-center w-10 h-10 sm:w-6 sm:h-6 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        title="Previous week"
      >
        <ChevronLeftIcon class="w-6 h-6 sm:w-4 sm:h-4" />
      </button>

      <!-- Mobile View (5 days) -->
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          v-for="day in formattedWeekDates.mobile"
          :key="day.date"
          @click="handleDateClick(day.date)"
          class="flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-slate-50 active:scale-95 cursor-pointer"
          :class="{
            'bg-gradient-to-b from-primary-50 to-primary-100 text-primary-700 shadow-sm':
              day.isSelected,
            'bg-primary-50/50 text-primary-600 font-medium': day.isToday,
            'text-slate-600': !day.isSelected && !day.isToday,
            'opacity-50 hover:cursor-auto hover:bg-transparent': isDateDisabled(
              day.date
            ),
          }"
          :disabled="isDateDisabled(day.date)"
        >
          <span
            class="text-xs font-medium uppercase tracking-wider mb-1 opacity-80"
          >
            {{ day.dayName }}
          </span>
          <span class="text-2xl font-semibold">{{ day.dayNumber }}</span>
          <span class="text-xs mt-1 opacity-60">{{ day.monthName }}</span>
        </button>
      </div>

      <!-- Desktop View (7 days) -->
      <div class="hidden sm:flex flex-1 justify-between">
        <button
          v-for="day in formattedWeekDates.desktop"
          :key="day.date"
          @click="handleDateClick(day.date)"
          class="flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-slate-50 active:scale-95 cursor-pointer"
          :class="{
            'bg-gradient-to-b from-primary-50 to-primary-100 text-primary-700 shadow-sm':
              day.isSelected,
            'bg-primary-50/50 text-primary-600 font-medium': day.isToday,
            'text-slate-600': !day.isSelected && !day.isToday,
            'opacity-50 hover:cursor-auto hover:bg-transparent': isDateDisabled(
              day.date
            ),
          }"
          :disabled="isDateDisabled(day.date)"
        >
          <span
            class="text-xs font-medium uppercase tracking-wider mb-1 opacity-80"
          >
            {{ day.dayName }}
          </span>
          <span class="text-2xl font-semibold">{{ day.dayNumber }}</span>
          <span class="text-xs mt-1 opacity-60">{{ day.monthName }}</span>
        </button>
      </div>

      <button
        @click="navigateWeek('next')"
        class="flex items-center justify-center w-10 h-10 sm:w-6 sm:h-6 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        title="Next week"
      >
        <ChevronRightIcon class="w-6 h-6 sm:w-4 sm:h-4" />
      </button>
    </div>
  </nav>
</template>
