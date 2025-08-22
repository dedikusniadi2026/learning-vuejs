<template>
  <div>
    <button
      @click="open = true"
      class="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg shadow hover:from-orange-500 hover:to-orange-700 transition">
      Add Product
    </button>

    <div
      v-if="open"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="bg-gradient-to-r from-orange-400 to-orange-600 p-4">
          <h2 class="text-xl font-bold text-white text-center">Add Product</h2>
        </div>

        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700">Title</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Enter product title"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Price</label>
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              placeholder="Enter price"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.price" class="text-red-600 text-sm mt-1">{{ errors.price }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Enter description"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            ></textarea>
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Category</label>
            <input
              v-model="form.category"
              type="text"
              placeholder="Enter category"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.category" class="text-red-600 text-sm mt-1">{{ errors.category }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Image URL</label>
            <input
              v-model="form.image"
              type="url"
              placeholder="Enter image URL"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.image" class="text-red-600 text-sm mt-1">{{ errors.image }}</p>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold shadow hover:from-orange-500 hover:to-orange-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { toast } from 'vue3-toastify';

const open = ref(false);

const form = reactive({
  title: "",
  price: null,
  description: "",
  category: "",
  image: "",
});

const errors = reactive({
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
});

const response = ref(null);
const error = ref(null);

function validate() {
  let isValid = true;
  for (const key in errors) errors[key] = "";

  if (!form.title.trim()) { errors.title = "Title wajib diisi."; isValid = false; }
  if (form.price === null || form.price <= 0) { errors.price = "Price harus lebih dari 0."; isValid = false; }
  if (!form.description.trim()) { errors.description = "Description wajib diisi."; isValid = false; }
  if (!form.category.trim()) { errors.category = "Category wajib diisi."; isValid = false; }
  if (!form.image.trim()) { errors.image = "Image URL wajib diisi."; isValid = false; }
  else {
    try { new URL(form.image); } catch { errors.image = "Format URL tidak valid."; isValid = false; }
  }

  return isValid;
}

async function submitForm() {
  if (!validate()) return;

  const product = { ...form };

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    response.value = await res.json();

    toast.success('Data saved successfully!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });

    // reset form
    Object.keys(form).forEach(key => form[key] = key === 'price' ? null : "");
    open.value = false;
  } catch (err) {
    error.value = err.message;
  }
}

function closeModal() {
  open.value = false;
  Object.keys(form).forEach(key => form[key] = key === 'price' ? null : "");
  Object.keys(errors).forEach(key => errors[key] = "");
  error.value = null;
  response.value = null;
}
</script>
