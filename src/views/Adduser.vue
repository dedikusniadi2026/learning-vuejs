<template>
  <div>
    <button
      @click="open = true"
      class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
    >
      add users
    </button>

    <div
      v-if="open"
      class="fixed inset-0 flex bg-black/30 items-center justify-center"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add Users</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label class="block mb-1 font-medium">Username</label>
            <input
              v-model="form.username"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">
              {{ errors.username }}
            </p>
          </div>

          <div class="mb-3">
            <label class="block mb-1 font-medium">Email</label>
            <input
              v-model.number="form.email"
              type="email"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="mb-3">
            <label class="block mb-1 font-medium">Name</label>
            <textarea
              v-model="form.name"
              rows="3"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p v-if="errors.name" class="text-red-600 text-sm mt-1">
              {{ errors.name }}
            </p>
          </div>

          <div class="mb-3">
            <label class="block mb-1 font-medium">Address</label>
            <input
              v-model="form.address"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.address" class="text-red-600 text-sm mt-1">
              {{ errors.address }}
            </p>
          </div>

          <div class="mb-5">
            <label class="block mb-1 font-medium">Phone</label>
            <input
              v-model="form.phone"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.phone" class="text-red-600 text-sm mt-1">
              {{ errors.phone }}
            </p>
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

  if (!validate()) {
    return;
  }

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

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    response.value = data;

    toast.success('Data berhasil disimpan!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000
    });

    form.username = "";
    form.email = "";
    form.name = "";
    form.address = "";
    form.phone = "";
    open.value = false;
  } catch (err) {
    error.value = err.message;
  }
}

function closeModal() {
  open.value = false;
  error.value = null;
  response.value = null;

    form.username = "";
    form.email = "";
    form.name = "";
    form.address = "";
    form.phone = "";

  for (const key in errors) {
    errors[key] = "";
  }
}
</script>
