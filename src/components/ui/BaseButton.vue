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
    class="px-4 py-2 rounded-lg font-medium transition-colors"
    :class="{
      'bg-primary-500 text-white hover:bg-primary-600':
        variant === 'primary' && !disabled,
      'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200':
        variant === 'secondary' && !disabled,
      'bg-red-500 text-white hover:bg-red-600':
        variant === 'danger' && !disabled,
      'opacity-60 ': disabled,
      'bg-primary-300': disabled && variant === 'primary',
      'bg-slate-100': disabled && variant === 'secondary',
      'bg-red-300': disabled && variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>
