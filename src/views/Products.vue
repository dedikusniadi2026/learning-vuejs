<script setup>
import { ref, computed, onMounted } from "vue";
import AddProduct from "./Addproduct.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import Card from "../components/Card.vue";
import { toast } from "vue3-toastify";
import EditProduct from "./EditProduct.vue";

const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const searchQuery = ref("");
const sortKey = ref("");
const sortOrder = ref("asc");
const loading = ref(false);

const selectedItems = ref([]);
const selectAll = ref(false);

const showImageModal = ref(false);
const selectedImage = ref("");

const showDeleteAllConfirm = ref(false);

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    items.value = await res.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const filteredItems = computed(() =>
  items.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

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
    const res = await fetch(`https://fakestoreapi.com/products/${item.id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Gagal hapus data");

    await res.json();

    toast.success("Data deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    items.value = items.value.filter((i) => i.id !== item.id);
  } catch (error) {
    alert("Error hapus item: " + error.message);
  }
}

async function deleteSelected() {
  showDeleteAllConfirm.value = true;
}

async function confirmDeleteAll() {
  try {
    for (const id of selectedItems.value) {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
    }

    items.value = items.value.filter(
      (i) => !selectedItems.value.includes(i.id)
    );

    toast.success("Selected products deleted!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    selectedItems.value = [];
    selectAll.value = false;
    showDeleteAllConfirm.value = false;
  } catch (err) {
    alert("Error delete multiple: " + err.message);
  }
}

function cancelDeleteAll() {
  showDeleteAllConfirm.value = false;
}

function toggleSelectAll() {
  if (selectAll.value) {
    selectedItems.value = paginatedItems.value.map((item) => item.id);
  } else {
    selectedItems.value = [];
  }
}

function toggleSelect(id) {
  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter((i) => i !== id);
  } else {
    selectedItems.value.push(id);
  }
}

async function handleConfirm() {
  if (!selectedProduct.value) return;
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
          placeholder="Search product, id, etc"
          class="border px-3 py-2 rounded w-64 focus:outline-none focus:ring focus:border-orange-300"
        />
        <div class="flex items-center gap-2">
          <AddProduct @close="showModal = false" />
          <button
            v-if="selectedItems.length"
            class="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition"
            @click="deleteSelected"
          >
            Delete Selected ({{ selectedItems.length }})
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-10">
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div
        v-else
        class="overflow-x-auto rounded-xl shadow-md border border-gray-200"
      >
        <table class="min-w-full border-separate border-spacing-0 text-sm">
          <thead class="bg-gradient-to-r from-orange-300 to-orange-500 text-white">
            <tr>
              <th class="px-4 py-3">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                />
              </th>
              <th class="px-4 py-3 text-left font-semibold">No</th>
              <th
                class="px-4 py-3 text-left cursor-pointer font-semibold"
                @click="sortBy('id')"
              >
                ID <span v-if="sortKey === 'id'">({{ sortOrder }})</span>
              </th>
              <th class="px-4 py-3 text-left font-semibold">Image</th>
              <th
                class="px-4 py-3 text-left cursor-pointer font-semibold"
                @click="sortBy('title')"
              >
                Product <span v-if="sortKey === 'title'">({{ sortOrder }})</span>
              </th>
              <th
                class="px-4 py-3 text-left cursor-pointer font-semibold"
                @click="sortBy('price')"
              >
                Price <span v-if="sortKey === 'price'">({{ sortOrder }})</span>
              </th>
              <th class="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in paginatedItems"
              :key="item.id"
              class="border-t hover:bg-orange-50 transition-colors duration-200"
            >
              <td class="px-4 py-3">
                <input
                  type="checkbox"
                  :checked="selectedItems.includes(item.id)"
                  @change="toggleSelect(item.id)"
                />
              </td>
              <td class="px-4 py-3">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-4 py-3 font-medium text-gray-700">#{{ item.id }}</td>
              <td class="px-4 py-3">
                <img
                  :src="item.image"
                  alt="Product image"
                  class="w-12 h-12 object-contain rounded-md border cursor-pointer"
                  @click="() => { showImageModal = true; selectedImage = item.image }"
                />
              </td>
              <td class="px-4 py-3 text-gray-800">{{ item.title }}</td>
              <td class="px-4 py-3 font-semibold text-green-600">
                ${{ item.price }}
              </td>
              <td class="px-4 py-3 flex gap-2">
                          <EditProduct @close="showModal = false" />

                <button
                  class="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium hover:bg-red-600 transition"
                  @click="openConfirm(item)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center mt-6 space-x-2">
        <button
          class="px-3 py-1 text-sm bg-gray-100 border rounded-md hover:bg-gray-200 disabled:opacity-50 transition"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Prev
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="px-3 py-1 text-sm font-medium rounded-md shadow-sm transition transform hover:scale-105"
          :class="page === currentPage
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <button
          class="px-3 py-1 text-sm bg-gray-100 border rounded-md hover:bg-gray-200 disabled:opacity-50 transition"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>

      <ConfirmDialog
        :show="showDialog"
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />

      <ConfirmDialog
        :show="showDeleteAllConfirm"
        title="Delete Selected Products"
        message="Are you sure you want to delete all selected products?"
        @confirm="confirmDeleteAll"
        @cancel="cancelDeleteAll"
      />

      <div
        v-if="showImageModal" class="fixed inset-0 bg-opacity-25 flex items-center justify-center z-50">
        <div class="bg-white p-4 rounded-lg shadow-lg relative">
          <button
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            @click="showImageModal = false"
          >
            ✖
          </button>
          <img
            :src="selectedImage"
            alt="Preview"
            class="max-w-md max-h-[80vh] object-contain rounded"
          />
        </div>
      </div>
    </div>
  </Card>
</template>
