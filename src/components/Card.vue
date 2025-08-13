<template>
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
    :class="customClass"
  >
    <!-- Header -->
    <div v-if="$slots.header" class="mb-3 font-semibold text-gray-800">
      <slot name="header"></slot>
    </div>

    <!-- Body -->
    <div class="text-gray-600">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-500">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
</script>
