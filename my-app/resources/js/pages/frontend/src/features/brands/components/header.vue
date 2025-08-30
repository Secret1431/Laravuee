<template>
    <div class="relative -top-10 w-full p-2 shadow-md rounded bg-gradient-to-r from-cyan-400 to-indigo-600">
        <div class="flex justify-end text-white">
            <button
                @click="openModal"
                class="py-2 px-3 bg-blue-600 shadow-md rounded-md"
                >
                Add Brands
            </button>
        </div>
    </div>
</template>

<script setup>
import { useForm } from '../../../core/hooks/brand/useForm';

const { isOpen } = useForm();

const openModal = () => {
    isOpen.value = true;
}
</script>