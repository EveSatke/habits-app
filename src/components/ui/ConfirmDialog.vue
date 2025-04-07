<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import Button from './Button.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Delete',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  variant: {
    type: String,
    default: 'danger',
    validator: value => ['danger', 'warning', 'primary'].includes(value),
  },
});

const emit = defineEmits(['close', 'confirm']);

function handleClose() {
  emit('close');
}

function handleConfirm() {
  emit('confirm');
}
</script>

<template>
  <Dialog as="div" class="relative z-10" :open="isOpen" @close="handleClose">
    <div class="fixed inset-0 bg-black/25">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
        >
          <button
            type="button"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors hover:cursor-pointer"
            @click="handleClose"
          >
            <XMarkIcon class="h-5 w-5" />
            <span class="sr-only">Close</span>
          </button>
          <DialogTitle
            as="h3"
            class="text-lg font-medium leading-6 text-slate-900 flex items-center gap-2"
          >
            <ExclamationTriangleIcon
              class="h-6 w-6 text-red-500"
              :class="{
                'text-red-500': variant === 'danger',
                'text-yellow-500': variant === 'warning',
                'text-primary-500': variant === 'primary',
              }"
            />
            {{ title }}
          </DialogTitle>
          <DialogDescription class="mt-2 text-sm text-slate-500">
            {{ description }}
          </DialogDescription>
          <div class="mt-6 flex justify-end gap-3">
            <Button variant="secondary" @click="handleClose">
              {{ cancelText }}
            </Button>
            <Button variant="danger" @click="handleConfirm">{{
              confirmText
            }}</Button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
