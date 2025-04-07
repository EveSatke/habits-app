<script setup>
import { computed } from 'vue';
import { useDateStore } from '@/stores/date';
import { useRouter } from 'vue-router';

const dateStore = useDateStore();
const router = useRouter();

const formattedWeekDates = computed(() =>
  dateStore.weekDates.map(date => dateStore.formatDate(date))
);

function handleDateClick(date) {
  dateStore.setDate(date);
  router.push(`/day/${date}`);
}

function navigateWeek(direction) {
  const dates = dateStore.weekDates;
  const targetDate = direction === 'next' ? dates[dates.length - 1] : dates[0];
  dateStore.setDate(targetDate);
  router.push(`/day/${targetDate}`);
}
</script>

<template>
  <nav class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
    <div class="flex justify-between items-center gap-3">
      <button
        @click="navigateWeek('prev')"
        class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        title="Previous week"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        v-for="day in formattedWeekDates"
        :key="day.date"
        @click="handleDateClick(day.date)"
        class="flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:bg-slate-50 active:scale-95 cursor-pointer"
        :class="{
          'bg-gradient-to-b from-primary-50 to-primary-100 text-primary-700 shadow-sm':
            day.isSelected,
          'bg-primary-50/50 text-primary-600 font-medium': day.isToday,
          'text-slate-600': !day.isSelected && !day.isToday,
        }"
      >
        <span
          class="text-xs font-medium uppercase tracking-wider mb-1 opacity-80"
        >
          {{ day.dayName }}
        </span>
        <span class="text-2xl font-semibold">{{ day.dayNumber }}</span>
        <span class="text-xs mt-1 opacity-60">{{ day.monthName }}</span>
      </button>
      <button
        @click="navigateWeek('next')"
        class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        title="Next week"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>
