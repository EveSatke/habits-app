<script setup>
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/ui/BaseButton.vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();

const errorMessages = {
  'future-date': {
    title: 'Future Date Not Allowed',
    description: 'You cannot create or view habits for future dates.',
  },
  'not-found': {
    title: 'Page Not Found',
    description: `The page you're looking for doesn't exist.`,
  },
  default: {
    title: 'Oops! Something went wrong',
    description: 'An unexpected error occurred.',
  },
};

const error = errorMessages[route.query.type || 'default'];

const goHome = () => {
  const today = new Date().toISOString().split('T')[0];
  router.push(`/day/${today}`);
};
</script>

<template>
  <main class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-6">
      <div
        class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto"
      >
        <ExclamationTriangleIcon class="w-8 h-8 text-amber-600" />
      </div>
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-slate-900">
          {{ error.title }}
        </h1>
        <p class="text-slate-600">{{ error.description }}</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" @click="goHome">Go Home</Button>
      </div>
    </div>
  </main>
</template>
