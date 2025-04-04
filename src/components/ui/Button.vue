<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: value => ['button', 'submit', 'reset'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 disabled:opacity-50 transition-colors hover:cursor-pointer"
  >
    <slot />
  </button>
</template>
