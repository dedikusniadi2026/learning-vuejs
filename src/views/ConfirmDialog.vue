<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
        
        <div class="bg-red-600 text-white p-4">
          <h3 class="text-lg font-semibold text-center">{{ title }}</h3>
        </div>

        <div class="p-6 text-center">
          <p class="text-gray-700 mb-6">{{ message }}</p>

          <div class="flex justify-center space-x-4">
            <button
              @click="cancel"
              class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              @click="confirm"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
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

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
