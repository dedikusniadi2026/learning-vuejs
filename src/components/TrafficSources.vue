<template>
  <div class="bg-white p-4 rounded-2xl shadow">
    <div class="flex justify-between items-center mb-4">
      <h4 class="font-semibold text-gray-800">Traffic Sources</h4>
      <button class="text-gray-400 hover:text-gray-600">
        <span class="text-xl font-bold">⋯</span>
      </button>
    </div>
    <div class="flex gap-1 mb-4">
      <div class="flex-1 h-4 rounded bg-orange-100"></div>
      <div class="flex-1 h-4 rounded bg-orange-200"></div>
      <div class="flex-1 h-4 rounded bg-orange-300"></div>
      <div class="flex-1 h-4 rounded bg-orange-400"></div>
      <div class="flex-1 h-4 rounded bg-orange-500"></div>
    </div>

    <ul class="text-sm text-gray-700 space-y-3">
      <li v-for="(item, index) in trafficSources" :key="index" class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span
            class="w-2.5 h-2.5 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></span>
          <span>{{ item.label }}</span>
        </div>
        <span class="font-semibold">{{ item.value }}%</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const trafficSources = [
  { label: "Direct Traffic", value: 40, color: "#FBBF24" },
  { label: "Organic Search", value: 30, color: "#FCD34D" },
  { label: "Social Media", value: 15, color: "#FDE68A" },
  { label: "Referral Traffic", value: 10, color: "#FEF3C7" },
  { label: "Email Campaigns", value: 5, color: "#EA580C" },
]
</script>
