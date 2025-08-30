<script setup>
import { defineProps } from 'vue';
import { useCustomerStore } from '../store';

import { useToast } from 'vue-toastification';
import { MDBTable, MDBBtn } from 'mdb-vue-ui-kit';

const props = defineProps({
    customers: {
        type: Object,
        required: true
    },
    isEditing: {
        type: Boolean,
        required: true
    },
    newCustomer: {
        type: Object,
        required: true
    }
});

const store = useCustomerStore();
const toast = useToast();

const handleEdit = (customers) => {
    newCustomer = { ...customers };
    isEditing = true;
};

const handleDelete = (id) => {
    if(window.confirm('Are you sure want to delete this customers')) {
        store.DELETE()
        .then((res) => toast.success(res.message || ''))
        .catch((err) => toast.error(err.message || ''))
    }
};

</script>

<template>
    <MDBTable class="relative -top-7">
        <thead>
            <tr>
                <th class="text-left text-gray-700 py-1 px-3">Name</th>
                <th class="text-left text-gray-700 py-1 px-3">Email</th>
                <th class="text-left text-gray-700 py-1 px-3">Phone</th>
                <th class="text-left text-gray-700 py-1 px-3">Address</th>
                <th class="text-left text-gray-700 py-1 px-3">Loyalty Points</th>
                <th class="text-left text-gray-700 py-1 px-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cus, index) in customers" :key="index">
                <td class="text-left text-gray-700 py-1 px-3">{{ cus.name }}</td>
                <td class="text-left text-gray-700 py-1 px-3">{{ cus.email }}</td>
                <td class="text-left text-gray-700 py-1 px-3">{{ cus.phone }}</td>
                <td class="text-left text-gray-700 py-1 px-3">{{ cus.address }}</td>
                <td class="text-left text-gray-700 py-1 px-3">{{ cus.loyaltyPoint }}</td>
                <td>
                    <MDBBtn 
                        @click="handleEdit(cus)"
                        color="success"
                        class="py-1 px-3 shadow-md rounded-md"
                        >
                        Edit
                    </MDBBtn>
                    <MDBBtn 
                        @click="handleDelete(cus.id)"
                        color="success"
                        class="py-1 px-3 shadow-md rounded-md"
                        >
                        Delete
                    </MDBBtn>
                </td>
            </tr>
        </tbody>
    </MDBTable>
</template>