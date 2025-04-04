<script setup>
import { computed } from 'vue';
import { useDateStore } from '@/stores/date';
import { useRouter } from 'vue-router';

const dateStore = useDateStore();
const router = useRouter();
const weekDates = computed(() => dateStore.weekDates);

const formattedWeekDates = computed(() =>
  weekDates.value.map(date => dateStore.formatDate(date))
);

function handleDateClick(date) {
  dateStore.setDate(date);
  router.push(`/day/${date}`);
}
</script>

<template>
  <nav class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
    <div class="flex justify-between items-center gap-3">
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
    </div>
  </nav>
</template>
