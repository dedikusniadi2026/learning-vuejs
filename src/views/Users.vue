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

const fetchData = async () => {
  const res = await fetch("https://fakestoreapi.com/users");
  items.value = await res.json();
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

const showModal = ref(false);
const showDialog = ref(false);
const selectedProduct = ref(null);

function openConfirm(product) {
  selectedProduct.value = product;
  showDialog.value = true;
}

async function deleteItem(item) {
  try {
    const res = await fetch(`https://fakestoreapi.com/users/${item.id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Gagal hapus data');

    const data = await res.json();
    console.log('Deleted:', data);

    toast.success('Data berhasil dihapus!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000
  });

    items.value = items.value.filter(i => i.id !== item.id);
  } catch (error) {
    alert('Error hapus item: ' + error.message);
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
</script>


<template>
  <Card customClass="hover:shadow-md transition-shadow">    
    <div class="p-4">
      <div class="mb-4 flex justify-between items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search username or email"
          class="border px-3 py-2 rounded w-64 focus:outline-none focus:ring focus:border-orange-300"
        />

        <Adduser @close="showModal = false" />
      </div>

      <div class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full text-sm">
          <thead class="bg-orange-200 text-gray-700">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
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
          <tbody>
            <tr v-for="(item, index) in paginatedItems" :key="item.id" class="border-t hover:bg-orange-50">
              <td class="px-4 py-3">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="px-4 py-3">#{{ item.id }}</td>
              <td class="px-4 py-3">{{ item.username }}</td>
              <td class="px-4 py-3">{{ item.email }}</td>
              <td class="px-4 py-3">{{ item.name.firstname }} {{ item.name.lastname }}</td>
              <td class="px-4 py-3">
                {{ item.address.street }} {{ item.address.number }}, {{ item.address.city }}, {{ item.address.zipcode }}
              </td>
              <td class="px-4 py-3">{{ item.phone }}</td>
              <td class="px-4 py-3 flex gap-2">
                <button class="px-3 py-1 bg-red-500 text-white rounded" @click="openConfirm(item)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center mt-4 space-x-2">
        <button
          class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="px-3 py-1 text-sm rounded"
          :class="page === currentPage ? 'bg-orange-500 text-white' : 'bg-gray-200 hover:bg-gray-300'"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>

      <ConfirmDialog
        :show="showDialog"
        title="Delete User"
        message="Are you sure you want to delete this user?"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </div>
  </Card>
</template>
