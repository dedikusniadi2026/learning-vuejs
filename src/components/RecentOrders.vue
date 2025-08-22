<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h4 class="font-semibold">Recent Orders</h4>
      <div class="flex items-center gap-3">
        <input type="text" placeholder="Search product, customer, etc" class="border rounded px-3 py-2 text-sm" v-model="q" />
        <button class="bg-orange-500 text-white px-3 py-2 rounded text-sm">All Categories</button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-orange-200 text-gray-600">
          <tr>
            <th class="px-4 py-3 text-left">No</th>
            <th class="px-4 py-3 text-left">Order ID</th>
            <th class="px-4 py-3 text-left">Customer</th>
            <th class="px-4 py-3 text-left">Product</th>
            <th class="px-4 py-3 text-left">Qty</th>
            <th class="px-4 py-3 text-left">Total</th>
            <th class="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, idx) in filtered" :key="o.id" class="border-b hover:bg-orange-50">
            <td class="px-4 py-3">{{ idx+1 }}</td>
            <td class="px-4 py-3">#{{ o.id }}</td>
            <td class="px-4 py-3">{{ o.customer }}</td>
            <td class="px-4 py-3 flex items-center gap-2">
              <img :src="o.image" class="w-8 h-8 object-contain rounded" /> {{ o.product }}
            </td>
            <td class="px-4 py-3">{{ o.qty }}</td>
            <td class="px-4 py-3">${{ o.total }}</td>
            <td class="px-4 py-3">
              <span :class="statusClass(o.status) + ' px-3 py-1 rounded-full text-xs font-medium'">{{ o.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const orders = ref([
  { id: 10234, customer: 'Amaya Weller', product: 'Wireless Headphones', image: 'https://placehold.co/40', qty:2, total:100, status:'Shipped'},
  { id: 10235, customer: 'Sebastian Adams', product: 'Running Shoes', image: 'https://placehold.co/40', qty:1, total:75, status:'Processing'},
  { id: 10236, customer: 'Suzanne Bright', product: 'Smartwatch', image: 'https://placehold.co/40', qty:1, total:150, status:'Delivered'},
  { id: 10237, customer: 'Peter Howl', product: 'Coffee Maker', image: 'https://placehold.co/40', qty:1, total:60, status:'Pending'},
  { id: 10238, customer: 'Anita Singh', product: 'Bluetooth Speaker', image: 'https://placehold.co/40', qty:3, total:90, status:'Shipped'}
])

const filtered = computed(()=> {
  if (!q.value) return orders.value
  return orders.value.filter(o => (o.product + o.customer + o.id).toString().toLowerCase().includes(q.value.toLowerCase()))
})

function statusClass(s){
  if(s==='Shipped') return 'bg-orange-100 text-orange-600'
  if(s==='Processing') return 'bg-yellow-100 text-yellow-600'
  if(s==='Delivered') return 'bg-green-100 text-green-600'
  if(s==='Pending') return 'bg-pink-100 text-pink-600'
  return 'bg-gray-100 text-gray-600'
}
</script>
