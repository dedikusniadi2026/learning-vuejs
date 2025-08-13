<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <p class="mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button
          @click="cancel"
          class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  show: Boolean,
  title: { type: String, default: "Confirmation" },
  message: { type: String, default: "Are you sure?" },
});

const emit = defineEmits(["confirm", "cancel"]);

function confirm() {
  emit("confirm");
}

function cancel() {
  emit("cancel");
}
</script>
