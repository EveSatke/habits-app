<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { useHabitsStore } from '@/stores/habits';

const route = useRoute();
const currentDate = ref(route.params.date);
const formattedDate = computed(() => format(currentDate.value, 'yyyy-MM-dd'));
const formattedToday = format(new Date(), 'yyyy-MM-dd');

function isToday() {
  return formattedToday === formattedDate.value;
}

function isPastDate() {
  return (
    new Date(formattedDate.value).toISOString().split('T')[0] <
    new Date().toISOString().split('T')[0]
  );
}
</script>

<template>
  <main>
    <div>{{ formattedDate }}</div>
    <div>{{ formattedToday }}</div>
    <div>{{ isToday() }}</div>
    <div>{{ isPastDate() }}</div>
  </main>
</template>
