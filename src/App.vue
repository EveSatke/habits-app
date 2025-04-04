<script setup>
import { onMounted } from 'vue';
import { useHabitsStore } from '@/stores/habits';

const habitStore = useHabitsStore();

onMounted(() => {
  habitStore.loadFromLocalStorage();
});
</script>

<template>
  <RouterView />
</template>
