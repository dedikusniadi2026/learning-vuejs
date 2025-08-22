<template>
  <div class="bg-white p-6 rounded-xl shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h4 class="font-semibold text-gray-800">Conversion Rate</h4>
      <div class="bg-orange-500 text-white text-xs px-3 py-1 rounded-lg font-medium">
        This Week
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="(item, index) in stats"
        :key="index"
        class="flex flex-col items-center bg-orange-50 p-4 rounded-lg relative"
      >
        <!-- Label -->
        <span class="text-gray-500 text-sm text-center mb-2">
          {{ item.label }}
        </span>

        <!-- Value -->
        <span class="text-xl font-bold text-gray-900">{{ item.value }}</span>

        <!-- Change -->
        <span
          :class="item.change > 0 ? 'text-green-500' : 'text-red-500'"
          class="text-xs font-semibold mt-1"
        >
          {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
        </span>

        <!-- Progress Bar -->
        <div class="absolute bottom-0 left-0 w-full h-2 bg-orange-100 rounded-b-lg overflow-hidden">
          <div
            class="h-full bg-orange-400"
            :style="{ width: item.barWidth + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { label: 'Product Views', value: '25,000', change: 9, barWidth: 100 },
  { label: 'Add to Cart', value: '12,000', change: 6, barWidth: 60 },
  { label: 'Proceed to Checkout', value: '8,500', change: 14, barWidth: 45 },
  { label: 'Completed Purchases', value: '6,200', change: 7, barWidth: 35 },
  { label: 'Abandoned Carts', value: '3,000', change: -9, barWidth: 20 },
]
</script>
