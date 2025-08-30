<template>
    <div class="flex justify-between items-center mt-72 px-4">
        <div class="text-gray-700">
            Showing
            <span>{{ startIndex }} - {{ endIndex }}</span>
            Of
            <span>{{ totalPages }}</span>
            Entries
        </div>
        <div class="flex items-center space-x-4 text-white">
            <button
                @click="gotoPage(page - 1)"
                :disabled="page === 1"
                :class="[
                    'py-2 px-3 shadow-md rounded-md',
                    page === 1 ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600'
                ]"
                >
                Previous
            </button>

            <span class="mx-2 text-gray-700">
                <strong>Page {{ page }}</strong> Of <strong>{{ totalPages }}</strong>
            </span>

            <button
                @click="gotoPage(page + 1)"
                :disabled="page === totalPages"
                :class="[
                    'py-2 px-3 shadow-md rounded-md',
                    page === totalPages ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600'
                ]"
                >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { useSupplierStore } from '../store';

const { page, itemperPage, setPage } = useSupplierStore();
const totalItems = 50;

const totalPages = Math.ceil(totalItems / itemperPage);

const gotoPage = (NewPage) => {
    setPage(NewPage);
};

const startIndex = (page - 1) * itemperPage;
const endIndex = Math.min(page + itemperPage, totalItems);

</script>