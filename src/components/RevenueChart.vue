<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <div>
        <h3 class="text-lg font-semibold">Revenue Analytics</h3>
        <p class="text-xs text-gray-500">Last 12 months</p>
      </div>
      <div>
        <button class="bg-orange-50 text-orange-600 px-3 py-1 rounded text-sm">Last 8 Days</button>
      </div>
    </div>

    <div class="h-[260px]">
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler)

const canvas = ref(null)
let chart = null

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['10 Aug','11 Aug','12 Aug','13 Aug','14 Aug','15 Aug','16 Aug','17 Aug'],
      datasets: [
        {
          label: 'Revenue',
          data: [14000,15000,14200,14800,15200,14900,15500,16000],
          borderColor: '#fb923c',
          backgroundColor: 'rgba(251,146,60,0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 3
        },
        {
          label: 'Orders',
          data: [8000,8200,7800,8100,8300,8000,8400,8600],
          borderColor: '#fbbf24',
          backgroundColor: 'rgba(251,191,36,0.08)',
          borderDash: [6,4],
          fill: false,
          tension: 0.35,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#f3f4f6' } }
      }
    }
  })
})

onBeforeUnmount(() => {
  if (chart) chart.destroy()
})
</script>
