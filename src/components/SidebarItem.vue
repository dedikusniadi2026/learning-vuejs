<template>
  <button 
    @click="$emit('go', item)" 
    class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
    :class="active 
      ? 'bg-orange-500 text-white' 
      : 'text-gray-500 hover:bg-orange-100 hover:text-orange-600'"
  >
    <span v-html="iconSvg" class="w-5 h-5"></span>
    <span>{{ item.name }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  item: Object,
  active: Boolean
})

const icons = {
  grid: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zM2 20c0-2.5 2.5-4 6-4s6 1.5 6 4v1H2v-1z"/></svg>`,
  report: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 2h6v6H9zM3 8h18v12H3z"/></svg>`,
  percent: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 7A1.5 1.5 0 1114.5 4a1.5 1.5 0 010 3zM9.5 20A1.5 1.5 0 119.5 17a1.5 1.5 0 010 3zM20 4L4 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>`
}

const iconSvg = icons[props.item.icon] || icons.grid
</script>
