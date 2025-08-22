<script setup>
import { ref, computed, onMounted } from "vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import Card from '../components/Card.vue';
import { toast } from 'vue3-toastify'; 
import Adduser from "./Adduser.vue";

const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref("");
const sortKey = ref("");
const sortOrder = ref("asc");
const loading = ref(false);

const selectedItems = ref([]);
const selectAll = ref(false);

const showModal = ref(false);
const showDialog = ref(false);
const selectedProduct = ref(null);
const showDeleteAllDialog = ref(false);

const fetchData = async () => {
  loading.value = true; 
  try {
    const res = await fetch("https://fakestoreapi.com/users");
    items.value = await res.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const filteredItems = computed(() => {
  return items.value.filter((item) =>
    `${item.username} ${item.email}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sortedItems = computed(() => {
  let sorted = [...filteredItems.value];
  if (sortKey.value) {
    sorted.sort((a, b) => {
      let valA = a[sortKey.value];
      let valB = b[sortKey.value];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder.value === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  }
  return sorted;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return sortedItems.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(sortedItems.value.length / itemsPerPage)
);

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
};

function openConfirm(product) {
  selectedProduct.value = product;
  showDialog.value = true;
}

async function deleteItem(item) {
  try {
    const res = await fetch(`https://fakestoreapi.com/users/${item.id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Gagal hapus data');

    await res.json();

    toast.success('Data deleted successfully!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    items.value = items.value.filter(i => i.id !== item.id);
  } catch (error) {
    alert('Error hapus item: ' + error.message);
  }
}

async function deleteSelectedItems() {
  try {
    for (const id of selectedItems.value) {
      await fetch(`https://fakestoreapi.com/users/${id}`, { method: 'DELETE' });
    }

    items.value = items.value.filter(i => !selectedItems.value.includes(i.id));
    toast.success('Selected users deleted!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });

    selectedItems.value = [];
    selectAll.value = false;
    showDeleteAllDialog.value = false;
  } catch (error) {
    alert('Error delete selected: ' + error.message);
  }
}

async function handleConfirm() {
  if (!selectedProduct.value) {
    alert('Tidak ada data yang dipilih untuk dihapus');
    return;
  }
  await deleteItem(selectedProduct.value);
  showDialog.value = false;
  selectedProduct.value = null;
}

function handleCancel() {
  showDialog.value = false;
}

function toggleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = paginatedItems.value.map(i => i.id);
  } else {
    selectedItems.value = [];
  }
}

function toggleSelect(id) {
  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter(i => i !== id);
  } else {
    selectedItems.value.push(id);
  }
}
</script>

<template>
  <Card customClass="hover:shadow-md transition-shadow">
    <div class="p-4">
      <div class="mb-4 flex justify-between items-center space-x-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search username or email"
          class="border px-3 py-2 rounded w-64 focus:outline-none focus:ring focus:border-orange-300"
        />

        <div class="flex items-center space-x-2">
          <Adduser @close="showModal = false" />

          <button
            v-if="selectedItems.length"
            class="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition"
            @click="showDeleteAllDialog = true"
          >
            Delete All ({{ selectedItems.length }})
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-10">
        <div role="status">
          <svg class="w-8 h-8 animate-spin text-gray-300 fill-orange-400" viewBox="0 0 100 101">
            <path d="M100 50.59C100 78.2 77.61 100.59 50 100.59 22.38 100.59 0 78.2 0 50.59 0 22.97 22.38 0.59 50 0.59 77.61 0.59 100 22.97 100 50.59Z" fill="currentColor"/>
            <path d="M93.96 39.04C96.39 38.40 97.86 35.91 97.00 33.55 95.29 28.82 92.87 24.36 89.81 20.34 85.84 15.11 80.88 10.72 75.21 7.41 69.54 4.10 63.27 1.94 56.76 1.05 51.76 0.36 46.69 0.44 41.73 1.27 39.26 1.69 37.81 4.19 38.45 6.62 39.08 9.04 41.56 10.47 44.05 10.10 47.85 9.54 51.71 9.52 55.54 10.04 60.86 10.77 65.99 12.54 70.63 15.25 75.27 17.96 79.33 21.56 82.58 25.84 84.91 28.91 86.79 32.29 88.18 35.87 89.08 38.21 91.54 39.67 93.96 39.04Z" fill="currentFill"/>
          </svg>
        </div>
      </div>

      <div v-else class="overflow-x-auto rounded-lg shadow border">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-orange-200 text-gray-700">
            <tr class="bg-gradient-to-r from-orange-300 to-orange-500 text-white">
              <th class="px-4 py-3">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"/>
              </th>
              <th class="px-4 py-3 text-left cursor-pointer" @click="sortBy('id')">
                ID <span v-if="sortKey === 'id'">({{ sortOrder }})</span>
              </th>
              <th class="px-4 py-3 text-left">Username</th>
              <th class="px-4 py-3 text-left">Email</th>
              <th class="px-4 py-3 text-left">Name</th>
              <th class="px-4 py-3 text-left">Address</th>
              <th class="px-4 py-3 text-left">Phone</th>
              <th class="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in paginatedItems" :key="item.id" class="hover:bg-orange-50">
              <td class="px-4 py-3">
                <input type="checkbox" :checked="selectedItems.includes(item.id)" @change="toggleSelect(item.id)" />
              </td>
              <td class="px-4 py-3">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="px-4 py-3">{{ item.username }}</td>
              <td class="px-4 py-3">{{ item.email }}</td>
              <td class="px-4 py-3">{{ item.name.firstname }} {{ item.name.lastname }}</td>
              <td class="px-4 py-3">{{ item.address.street }} {{ item.address.number }}, {{ item.address.city }}, {{ item.address.zipcode }}</td>
              <td class="px-4 py-3">{{ item.phone }}</td>
              <td class="px-4 py-3">
              <button class="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium hover:bg-red-600 transition"  @click="openConfirm(item)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center mt-4 space-x-2">
        <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" :disabled="currentPage===1" @click="goToPage(currentPage-1)">Prev</button>
        <button v-for="page in totalPages" :key="page" class="px-3 py-1 rounded" :class="page===currentPage ? 'bg-orange-500 text-white' : 'bg-gray-200 hover:bg-gray-300'" @click="goToPage(page)">
          {{ page }}
        </button>
        <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" :disabled="currentPage===totalPages" @click="goToPage(currentPage+1)">Next</button>
      </div>

      <ConfirmDialog
        :show="showDialog"
        title="Delete User"
        message="Are you sure you want to delete this user?"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />

      <ConfirmDialog
        :show="showDeleteAllDialog"
        title="Delete Selected Users"
        message="Are you sure you want to delete all selected users?"
        @confirm="deleteSelectedItems"
        @cancel="() => showDeleteAllDialog=false"
      />
    </div>
  </Card>
</template>
