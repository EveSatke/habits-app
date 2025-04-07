<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: value => ['button', 'submit', 'reset'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'danger'].includes(value),
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
    class="px-4 py-2 rounded-lg font-medium transition-colors hover:cursor-pointer"
    :class="{
      'bg-primary-500 text-white hover:bg-primary-600': variant === 'primary',
      'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200':
        variant === 'secondary',
      'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>
