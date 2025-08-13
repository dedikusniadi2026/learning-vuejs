<template>
  <div class="flex min-h-screen">
    <aside class="w-72 bg-white border-r border-gray-200 flex flex-col">
      <div class="px-6 py-5 flex items-center gap-3">
        <div class="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">E</div>
        <div class="text-lg font-semibold">Admin</div>
      </div>

      <nav class="px-3 py-4 space-y-1 flex-1">
        <SidebarItem v-for="i in menu" :key="i.name" :item="i" :active="routeName === i.routeName" @go="go"/>
      </nav>

    </aside>

    <div class="flex-1 flex flex-col">
      <header class="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200">
        <div class="flex items-center gap-4">
          <h2 class="text-xl font-semibold">Dashboard</h2>
          <div class="text-sm text-gray-500">Overview</div>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative">
            <input type="text" placeholder="Search stock, order, etc"
              class="w-80 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
          </div>

          <button class="p-2 rounded-full hover:bg-gray-100">
            <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"/></svg>
          </button>

        
           <div class="relative" @click.away="isOpen = false">
            <div
              class="flex items-center gap-2 cursor-pointer"
              @click="toggleDropdown"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                class="w-8 h-8 rounded-full"
              />
              <div>
                <p class="font-semibold">{{ auth.user?.username }}</p>
                <p class="text-xs text-gray-500">UX Designer</p>
              </div>
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <transition
              enter-active-class="transition ease-out duration-300 delay-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-200"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <ul class="py-1 text-gray-700">
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <button
                      @click="logout"
                      class="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <main class="p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SidebarItem from '../components/SidebarItem.vue'

import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const isOpen = ref(false);
let dropdownTimeout = null;

const toggleDropdown = () => {
  clearTimeout(dropdownTimeout);
  if (!isOpen.value) {
    dropdownTimeout = setTimeout(() => {
      isOpen.value = true;
    }, 150); 
  } else {
    isOpen.value = false;
  }
};


const currentMenu = ref('dashboard');

const setActive = (menu) => {
  currentMenu.value = menu;
};

const products = () => {
  router.push("/products");
};

const dashboard = () => {
  router.push("/dashboard");
};

const logout = () => {
  auth.logout();
  router.push("/");
};

const router = useRouter()
const route = useRoute()
const routeName = computed(()=> route.name)

const menu = [
  { name: 'Dashboard', icon: 'grid', routeName: 'Dashboard', path: '/dashboard' },
  { name: 'Products', icon: 'box', routeName: 'Products', path: '/products' },
  {name:'Users', icon:'box', routeName:'Users', path: '/users'}
]

function go(item) {
  router.push(item.path)
}
</script>
