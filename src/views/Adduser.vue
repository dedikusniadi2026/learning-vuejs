<template>
  <div>
    <button
      @click="open = true"
      class="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg shadow hover:from-orange-500 hover:to-orange-700 transition"
    >
      Add Users
    </button>

    <!-- Modal -->
    <div
      v-if="open"
      class="fixed inset-0 flex bg-black/40 items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-orange-400 to-orange-600 p-4">
          <h2 class="text-xl font-bold text-white">Add User</h2>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700">Username</label>
            <input
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Name</label>
            <textarea
              v-model="form.name"
              rows="2"
              placeholder="Enter full name"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            ></textarea>
            <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Address</label>
            <input
              v-model="form.address"
              type="text"
              placeholder="Enter address"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.address" class="text-red-600 text-sm mt-1">{{ errors.address }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-700">Phone</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="Enter phone number"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3 pt-2">
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
  username: "",
  email: "",
  name: "",
  address: "",
  phone: "",
});

const errors = reactive({
  username: "",
  email: "",
  name: "",
  address: "",
  phone: "",
});

const response = ref(null);
const error = ref(null);

function validate() {
  let isValid = true;

  for (const key in errors) {
    errors[key] = "";
  }

  if (!form.username.trim()) {
    errors.username = "Username wajib diisi.";
    isValid = false;
  }
  if (!form.email.trim()) {
    errors.email = "Email wajib diisi.";
    isValid = false;
  }
  if (!form.name.trim()) {
    errors.name = "Name wajib diisi.";
    isValid = false;
  }
  if (!form.address.trim()) {
    errors.address = "Address wajib diisi.";
    isValid = false;
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone wajib diisi.";
    isValid = false;
  }

  return isValid;
}

async function submitForm() {
  error.value = null;
  response.value = null;

  if (!validate()) return;

  const product = {
    username: form.username,
    email: form.email,
    name: form.name,
    address: form.address,
    phone: form.phone,
  };

  try {
    const res = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    response.value = data;

    toast.success('Data saved successfully!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });

    // Reset form
    Object.keys(form).forEach(key => form[key] = "");
    open.value = false;
  } catch (err) {
    error.value = err.message;
  }
}

function closeModal() {
  open.value = false;
  error.value = null;
  response.value = null;
  Object.keys(form).forEach(key => form[key] = "");
  Object.keys(errors).forEach(key => errors[key] = "");
}
</script>
