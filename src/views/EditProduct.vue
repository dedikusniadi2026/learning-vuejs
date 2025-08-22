<script setup>
import { reactive, ref } from "vue";
import { toast } from 'vue3-toastify'; 

const open = ref(false);
const currentId = ref(null);

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

  if (!form.title.trim()) {
    errors.title = "Title wajib diisi.";
    isValid = false;
  }
  if (form.price === null || form.price <= 0) {
    errors.price = "Price harus lebih dari 0.";
    isValid = false;
  }
  if (!form.description.trim()) {
    errors.description = "Description wajib diisi.";
    isValid = false;
  }
  if (!form.category.trim()) {
    errors.category = "Category wajib diisi.";
    isValid = false;
  }
  if (!form.image.trim()) {
    errors.image = "Image URL wajib diisi.";
    isValid = false;
  } else {
    try {
      new URL(form.image);
    } catch {
      errors.image = "Format URL tidak valid.";
      isValid = false;
    }
  }
  return isValid;
}

async function submitForm() {
  error.value = null;
  response.value = null;

  if (!validate()) return;

  const product = { ...form };

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${currentId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    response.value = data;

   

    resetForm();
    open.value = false;

      toast.success('data saved successfully!', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000
  });

  } catch (err) {
    error.value = err.message;
  }
}

function resetForm() {
  form.title = "";
  form.price = null;
  form.description = "";
  form.category = "";
  form.image = "";
  for (const key in errors) errors[key] = "";
}

function closeModal() {
  open.value = false;
  error.value = null;
  response.value = null;
  resetForm();
}

async function fetchProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error("Gagal mengambil data");
    const data = await res.json();

    form.title = data.title;
    form.price = data.price;
    form.description = data.description;
    form.category = data.category;
    form.image = data.image;

    currentId.value = id; 
  } catch (err) {
    console.error(err);
  }
}

async function openEditModal(id) {
  await fetchProduct(id);
  open.value = true;
}
</script>


 <template>
  <div>
    <button
      @click="openEditModal(1)"
      class="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 transition">
      Edit
    </button>

    <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">

        <div class="bg-gradient-to-r from-orange-400 to-orange-600 p-5">
          <h2 class="text-xl font-bold text-white text-center">Edit Product</h2>
        </div>

        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block mb-1 font-medium">Title</label>
            <input v-model="form.title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium">Price</label>
            <input v-model.number="form.price" type="number" step="0.01" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <p v-if="errors.price" class="text-red-600 text-sm mt-1">{{ errors.price }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">{{ errors.description }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium">Category</label>
            <input v-model="form.category" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <p v-if="errors.category" class="text-red-600 text-sm mt-1">{{ errors.category }}</p>
          </div>

          <div>
            <label class="block mb-1 font-medium">Image URL</label>
            <input v-model="form.image" type="url" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <p v-if="errors.image" class="text-red-600 text-sm mt-1">{{ errors.image }}</p>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold shadow hover:from-orange-500 hover:to-orange-700 transition">Submit</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>


