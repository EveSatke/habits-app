<script setup lang="ts">
interface Props {
  checked?: boolean;
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
});

const emit = defineEmits(['update:checked']);
</script>

<template>
  <button
    type="button"
    class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200"
    :class="[
      checked
        ? 'bg-primary-500 border-primary-500 text-white'
        : 'border-slate-200 hover:border-primary-300',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    @click="emit('update:checked', !checked)"
    :disabled="disabled"
    aria-label="checkbox"
  >
    <svg
      v-if="checked"
      class="w-4 h-4 transform scale-90"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
