<script setup>
import { useForm } from '../../../core/hooks/customer/useForm';

const { isOpen } = useForm();

const openModal = () => {
    isOpen.value = true;
};

</script>

<template>
  <div class="relative -top-10 w-full p-2 shadow-md rounded bg-gradient-to-r from-cyan-500 to-indigo-700">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <input 
          v-bind="searchQuery"
          class="py-1 px-3 border-b text-white"
          placeholder="Search..."
        />

        <select v-bind="selectedName" class="py-1 px-3 border-b text-white ">
          <option value="">Select Customer</option>
          <option v-for="cus in customers" :key="cus.id">
            {{ cus.name }}
          </option>
        </select>
      </div>

      <div>
        <button
          @click="openModal"
          class="bg-blue-700 text-white py-1 px-3 shadow-md rounded-md"
        >
          Add Customer
        </button>
      </div>
    </div>
  </div>
</template>
