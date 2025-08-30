<template>
    <MDBTable class="relative -top-7">
        <thead>
            <tr>
                <th class="text-left text-gray-700 py-2 px-3">Name</th>
                <th class="text-left text-gray-700 py-2 px-3">Email</th>
                <th class="text-left text-gray-700 py-2 px-3">Phone</th>
                <th class="text-left text-gray-700 py-2 px-3">Address</th>
                <th class="text-left text-gray-700 py-2 px-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(sup, index) in suppliers" :key="index">
                <td class="text-left text-gray-700 py-2 px-3">{{ sup.name }}</td>
                <td class="text-left text-gray-700 py-2 px-3">{{ sup.email }}</td>
                <td class="text-left text-gray-700 py-2 px-3">{{ sup.phone }}</td>
                <td class="text-left text-gray-700 py-2 px-3">{{ sup.address }}</td>
                <td>
                    <MDBBtn
                        @click="handleClick(sup)"
                        color="success"
                        class="py-2 px-3 shadow-md rounded-md"
                        >
                        Edit
                    </MDBBtn>
                    <MDBBtn
                        @click="handleDelete(sup.id)"
                        color="danger"
                        class="py-2 px-3 shadow-md rounded-md"
                        >
                        Delete
                    </MDBBtn>
                </td>
            </tr>
        </tbody>
    </MDBTable>
</template>

<script setup>
import { useSupplierStore } from '../store';
import { useForm } from '../../../core/hooks/supplier/useForm';
import { useToast } from 'vue-toastification';
import { MDBTable, MDBBtn } from 'mdb-vue-ui-kit';

const { newSupplier, isEditing } = useForm();
const store = useSupplierStore();
const toast = useToast();

const handleClick = (suppliers) => {
    newSupplier.value = { ...suppliers };
    isEditing.value = true;
};

const handleDelete = (id) => {
    if(window.confirm('Are you sure want to delete this suppliers')) {
        store.DELETE(id)
        .then((res) => toast.success(res.message || ''))
        .catch((err) => toast.error(err.message || ''))
    }
};

</script>