<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
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
