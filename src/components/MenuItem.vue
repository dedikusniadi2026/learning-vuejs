<template>
  <a
    :class="['flex items-center px-3 py-2 rounded-lg transition', active
      ? 'bg-orange-500 text-white'
      : 'text-gray-700 hover:bg-gray-100']"
    href="#"
  >
    <component :is="Icon" class="h-6 w-6 mr-3" />
    {{ label }}
  </a>
</template>

<script setup>
const props = defineProps({
  icon: { type: Object, required: true },
  label: String,
  active: Boolean
});

const Icon = props.icon;
</script>
