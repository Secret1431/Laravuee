<template>
    <MDBTable class="relative -top-7">
        <thead>
            <tr>
                <th class="text-left text-gray-700 py-2 px-3">Name</th>
                <th class="text-left text-gray-700 py-2 px-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(brand, index) in brands" :key="index">
                <td class="text-left text-gray-700 py-2 px-3">{{ brand.name }}</td>
                <td>
                    <MDBBtn
                        @click="handleEdit(brand)"
                        color="success"
                        class="py-2 px-3 shadow-md rounded-md"
                        >
                        Edit
                    </MDBBtn>
                    <MDBBtn
                        @click="handleDelete(brand.id)"
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
import { useBrand } from '../../../core/hooks/brand/useBrand';
import { useBrandsStore } from '../store';
import { useForm } from '../../../core/hooks/brand/useForm';
import { useToast } from 'vue-toastification';
import { MDBTable, MDBBtn } from 'mdb-vue-ui-kit';

const { brands } = useBrand();
const store = useBrandsStore();
const { newBrands, isEditing } = useForm();
const toast = useToast();

const handleEdit = (brands) => {
    newBrands.value = { ...brands };
    isEditing.value = true;
};

const handleDelete = (id) => {
    if(window.confirm('Are you sure want to delete this brands')) {
        store.DELETE(id)
        .then((res) => toast.success(res.message || ''))
        .catch((err) => toast.error(err.message || ''))
    }
};
</script>