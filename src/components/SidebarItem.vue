<template>
  <div
    @click="$emit('go', item)"
    :class="[
      'flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer',
      active ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'
    ]"
  >
    <!-- Icon -->
    <component :is="item.icon" class="w-5 h-5" />
    <span>{{ item.name }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import { HomeIcon, CubeIcon, UsersIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  item: Object,
  active: Boolean
})

// Map nama icon dari menu ke komponen
const icons = {
  grid: HomeIcon,
  box: CubeIcon,
  users: UsersIcon
}

// Set icon yang sesuai
props.item.icon = icons[props.item.icon] || HomeIcon
</script>
