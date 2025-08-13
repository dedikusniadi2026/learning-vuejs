<template>
  <div class="min-h-screen flex bg-gray-100">
    <div class="lg:flex lg:w-1/2 bg-linear-to-br from-orange-400 to-orange-600 p-12 text-white flex-col justify-center">
  <h1 class="text-4xl font-bold leading-snug mb-4">
    Simplify management <br /> With Our dashboard.
  </h1>
  <p class="text-white/80 max-w-md mb-8">
    Simplify your e-commerce management with our user-friendly admin dashboard.
  </p>
  <div class="flex gap-6">
      <img
      src="../assets/img/Delivery-removebg-preview.png"
      alt="Character 2"
      class="w-60 h-60 object-contain"
    />
    <img
      src="../assets/img/Couple-removebg-preview.png"
      alt="Character 1"
      class="w-60 h-60 object-contain"
    />
  </div>
</div>

  <div class="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
      <div class="max-w-md w-full space-y-6 bg-white lg:shadow-lg lg:rounded-2xl p-8">
        <div class="text-center">
         
          <h1 class="text-2xl font-bold text-gray-900">Please login to your account</h1>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              v-model="username"
              placeholder="Enter your email"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="password" class="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your password"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <span
              class="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 select-none"
              @click="togglePasswordVisibility"
              role="button"
              tabindex="0"
              @keyup.enter="togglePasswordVisibility"
            >
              {{ showPassword ? "🙈" : "👁" }}
            </span>
            </div>
            <div class="text-right mt-1">
              <a href="#" class="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
          </div>

          <button
            class="w-full bg-linear-to-br from-orange-400 to-orange-600 text-white font-semibold rounded-lg py-2 transition"
          >
            Login
          </button>

          <div class="flex items-center my-4">
            <hr class="flex-1 border-gray-300" />
            <span class="px-4 text-gray-500 text-sm">or sign in with</span>
            <hr class="flex-1 border-gray-300" />
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                class="w-5 h-5"
              />
              Google
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 w-full hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                alt="Facebook"
                class="w-5 h-5"
              />
              Facebook
            </button>
          </div>

          <p class="text-center text-sm text-gray-600">
            Don't have an account?
            <a href="#" class="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const username = ref("mor_2314");
const password = ref("83r5^_");
const error = ref("");
const auth = useAuthStore();
const router = useRouter();
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};


const handleLogin = async () => {
  error.value = "";
  try {
    await auth.login(username.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
  }
};
</script>
