<template>
    <div class="relative -top-10 left-0 w-full py-2 px-3 shadow-md rounded bg-gradient-to-r from-cyan-400 to-indigo-600">
        <div class="flex justify-between text-white">
            <div class="flex items-center gap-3">
                <input 
                    v-model="searchQuery"
                    placeholder="Search...."
                    class="w-48 py-1 px-2 border-b"
                />

                <select
                    v-model="selectedAddress"
                    class="w-48 py-1 px-2 border-b"
                    >
                    <option value="">Select Address</option>
                    <option v-for="add in addresses">
                        {{ add.address }}
                    </option>
                </select>
            </div>
            <div>
                <MDBBtn
                    @click="openModal"
                    color="secondary"
                    class="py-2 px-3 shadow-md rounded-md"
                    >
                    Add Categories
                </MDBBtn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSupplierStore } from '../../suppliers/store';
import { useForm } from '../../../core/hooks/categories/useForm';
import { MDBBtn } from 'mdb-vue-ui-kit';

const { isOpen } = useForm();
const { searchQuery, selectedAddress } = useSupplierStore();

const openModal = () => {
    isOpen.value = true;
}
</script>