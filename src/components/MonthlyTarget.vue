<template>
  <div class="flex items-center gap-4">
    <div class="w-28 h-28 relative">
      <svg viewBox="0 0 36 36" class="w-full h-full">
        <circle cx="18" cy="18" r="15" stroke="#f3f4f6" stroke-width="4" fill="none"/>
        <circle cx="18" cy="18" r="15" :stroke="strokeColor" stroke-width="4" stroke-linecap="round" fill="none"
                :stroke-dasharray="dashArray" stroke-dashoffset="25" transform="rotate(-90 18 18)"/>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="text-xl font-bold">{{ progress }}%</div>
        <div class="text-xs text-gray-500">of target</div>
      </div>
    </div>
    <div>
      <div class="text-sm font-medium">Monthly Target</div>
      <div class="mt-2 text-sm text-gray-600">Great Progress! Your achievement increased by <span class="text-green-500">+8.2%</span></div>
      <div class="mt-3 text-xs text-gray-400">Target: $600,000 • Revenue: $510,000</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ progress: { type: Number, default: 0 } })
const progress = props.progress
const strokeColor = '#fb923c'
const dashArray = `${(progress / 100) * (2 * Math.PI * 15)} ${(2 * Math.PI * 15)}`
</script>
