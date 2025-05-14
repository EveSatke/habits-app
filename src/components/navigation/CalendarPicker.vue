<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CalendarIcon } from '@heroicons/vue/24/outline';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const router = useRouter();
const selectedDate = ref(new Date());

const handleDateSelect = (date: Date) => {
  const formattedDate = date.toISOString().split('T')[0];
  router.push(`/day/${formattedDate}`);
};
</script>

<template>
  <Datepicker
    v-model="selectedDate"
    :enable-time-picker="false"
    :max-date="new Date()"
    auto-apply
    class="calendar-picker"
    @update:model-value="handleDateSelect"
  >
    <template #trigger>
      <button
        class="flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 active:scale-95 bg-white shadow-sm border border-slate-100"
        title="Open calendar"
      >
        <CalendarIcon class="w-5 h-5" />
      </button>
    </template>
  </Datepicker>
</template>

<style>
.dp__theme_light {
  --dp-primary-color: #a855f7 !important; /* primary-500 */
  --dp-secondary-color: #c084fc !important; /* primary-400 */
  --dp-border-color: #e2e8f0 !important;
  --dp-bg-color: #fff !important;
  --dp-hover-color: #f8fafc !important;
  --dp-text-color: #475569 !important;
  --dp-border-radius: 1rem !important;
  --dp-selected-bg-color: #faf5ff !important; /* primary-50 */
  --dp-selected-text-color: #7e22ce !important; /* primary-700 */
}

/* Only keep absolute positioning for the dropdown menu */
.calendar-picker .dp__main {
  position: absolute !important;
  right: 0 !important;
  margin-top: 4px !important;
  z-index: 50 !important;
}

.dp__cell_disabled {
  color: #cbd5e1 !important;
  background: none !important;
}

.dp__active_date {
  background-color: #faf5ff !important; /* primary-50 */
  color: #7e22ce !important; /* primary-700 */
}

.dp__today {
  border: 1px solid #e9d5ff !important; /* primary-200 */
}

/* Fix input wrapper padding */
.dp__input_wrap {
  padding: 0 !important;
}
</style>
