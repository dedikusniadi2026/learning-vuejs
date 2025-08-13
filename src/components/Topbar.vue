<template>
  <header class="flex items-center justify-between p-4 bg-white shadow-sm">
    <input type="text" placeholder="Search stock, order, etc" class="px-4 py-2 border rounded-lg w-1/3" />
    <div class="flex items-center gap-4">
      <button><BellIcon class="w-6 h-6 text-gray-500" /></button>
      <img src="https://via.placeholder.com/40" class="w-10 h-10 rounded-full" alt="user" />
    </div>
  </header>
</template>

<script setup>
import { BellIcon } from '@heroicons/vue/24/outline'
</script>
