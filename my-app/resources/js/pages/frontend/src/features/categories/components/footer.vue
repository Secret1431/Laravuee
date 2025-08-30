<template>
    <div class="flex justify-end mt-72 text-sm">
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <span>Row per page:</span>
                <select
                    v-model="itemperPage"
                    class="border border-gray-300 py-1 px-2 text-center focus:ring-1 focus:ring-blue-500"
                    >
                    <option v-for="option in [5, 10, 15, 20]" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
            </div>

            <span>
                {{ startIndex }}-{{ endIndex }} of {{ totalPage }}
            </span>

            <button
                @click="gotoPage(page - 1)"
                :disabled="page === 1"
                class="p-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                <svg class="w-5 h-5" fill="none" stroke="currentColor">
                    <path d="M15 19l-7-7 7-7"/>
                </svg>
            </button>

            <button
                @click="gotoPage(page + 1)"
                :disabled="page === totalPage"
                class="p-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                <svg class="w-5 h-5" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useCategoriesStore } from '../store';

const { page, itemperPage, setPage } = useCategoriesStore();
const totalItems = 50;

const totalPage = (totalItems / itemperPage);

const gotoPage = (NewPage) => {
    setPage(NewPage);
};

const startIndex = (page - 1) * itemperPage;
const endIndex = Math.min(page + itemperPage, totalItems);

</script>