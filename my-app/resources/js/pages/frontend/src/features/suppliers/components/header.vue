<template>
    <div class="relative -top-10 w-full p-2 shadow-md rounded bg-gradient-to-r from-cyan-400 to-indigo-600">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-4 text-white">
                <input 
                    v-model="searchQuery"
                    placeholder="Search..."
                    class="w-48 border-b"
                />

                <select v-model="selectedAddress" class="w-48 border-b">
                    <option value="">Select Supplier</option>
                    <option v-for="sup in suppliers">
                        {{ sup.name }}
                    </option>
                </select>
            </div>
            <div>
            <MDBBtn
                @click="openModal"
                color="secondary"
                class="py-2 px-3 shadow-md rounded-md text-black"
                >
                Add Supplier
            </MDBBtn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSupplierStore } from '../store';
import { useForm } from '../../../core/hooks/supplier/useForm';
import {MDBBtn } from 'mdb-vue-ui-kit';

const { searchQuery, selectedAddress } = useSupplierStore();
const { isOpen } = useForm();

const openModal = () => {
    isOpen.value = true;
};

</script>