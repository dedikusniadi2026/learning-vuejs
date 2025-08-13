<template>
  <div class="p-4 rounded-lg shadow-sm bg-white">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500">{{ title }}</p>
        <div class="text-2xl font-semibold">{{ value }}</div>
      </div>
      <div class="w-10 h-10 rounded-md flex items-center justify-center"
           :class="color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-700'">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/></svg>
      </div>
    </div>
    <div class="text-xs text-gray-500 mt-2">{{ note }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: String,
  note: String,
  color: { type: String, default: 'gray' }
})
</script>
