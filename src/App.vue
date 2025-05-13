<script setup lang="ts">
import { onMounted } from 'vue';
import { useHabitsStore } from '@/stores/habits';

const habitStore = useHabitsStore();

onMounted(() => {
  try {
    habitStore.loadFromLocalStorage();
  } catch (error) {
    console.error('Failed to load habits from local storage:', error);
  }
});
</script>

<template>
  <RouterView />
</template>
