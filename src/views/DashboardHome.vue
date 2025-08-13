<template>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Sales" value="$983,410" note="+3.3% vs last month" color="orange" />
        <StatCard title="Total Orders" value="58,375" note="-2.8% vs last month" color="gray" />
        <StatCard title="Total Visitors" value="237,782" note="+8.02% vs last month" color="gray" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="col-span-2 bg-white rounded-2xl p-5 shadow">
          <RevenueChart />
        </div>

        <div class="space-y-6">
          <div class="bg-white p-4 rounded-2xl shadow">
            <MonthlyTarget :progress="85" />
          </div>
          <div class="bg-white p-4 rounded-2xl shadow">
            <TopCategories />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-2xl shadow"><ActiveUser /></div>
        <div class="bg-white p-4 rounded-2xl shadow"><ConversionRate /></div>
        <div class="bg-white p-4 rounded-2xl shadow"><TrafficSources /></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="col-span-2 bg-white p-4 rounded-2xl shadow">
          <RecentOrders />
        </div>
        <div class="bg-white p-4 rounded-2xl shadow">
          <RecentActivity />
        </div>
      </div>
    </div>
</template>

<script setup>
import StatCard from '../components/StatCard.vue'
import RevenueChart from '../components/RevenueChart.vue'
import MonthlyTarget from '../components/MonthlyTarget.vue'
import TopCategories from '../components/TopCategories.vue'
import ActiveUser from '../components/ActiveUser.vue'
import ConversionRate from '../components/ConversionRate.vue'
import TrafficSources from '../components/TrafficSources.vue'
import RecentOrders from '../components/RecentOrders.vue'
import RecentActivity from '../components/RecentActivity.vue'
</script>
