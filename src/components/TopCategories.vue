<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h4 class="font-semibold">Top Categories</h4>
      <button class="text-sm text-gray-400">See All</button>
    </div>
    <div class="flex items-center gap-4">
      <div class="w-28 h-28">
        <svg viewBox="0 0 36 36" class="w-full h-full">
          <!-- static donut segments for demo -->
          <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" stroke-width="4"></circle>
          <circle cx="18" cy="18" r="15" fill="none" stroke="#fb923c" stroke-width="4" stroke-dasharray="60 100" transform="rotate(-90 18 18)"></circle>
          <circle cx="18" cy="18" r="15" fill="none" stroke="#fcd34d" stroke-width="4" stroke-dasharray="20 100" transform="rotate(-30 18 18)"></circle>
        </svg>
      </div>
      <div>
        <div class="text-sm text-gray-500">Total Sales</div>
        <div class="text-lg font-bold">$3,400,000</div>
        <ul class="mt-3 space-y-2 text-sm text-gray-600">
          <li>• Electronics <span class="float-right text-gray-800">$1,200,000</span></li>
          <li>• Fashion <span class="float-right text-gray-800">$950,000</span></li>
          <li>• Home & Kitchen <span class="float-right text-gray-800">$750,000</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
