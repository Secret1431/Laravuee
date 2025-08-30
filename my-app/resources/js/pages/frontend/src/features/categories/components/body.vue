<template>
    <MDBTable class="relative -top-7">
        <thead>
            <tr>
                <th class="text-left text-gray-700 py-2 px-3">Name</th>
                <th class="text-left text-gray-700 py-2 px-3">Description</th>
                <th class="text-left text-gray-700 py-2 px-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cat, index) in categories" :key="index">
                <td class="text-left text-gray-700 py-2 px-3">{{ cat.name }}</td>
                <td class="text-left text-gray-700 py-2 px-3">{{ cat.description }}</td>
                <td>
                    <MDBBtn
                        @click="handleClick(cat)"
                        color="success"
                        class="py-2 px-3 shadow-md rounded-md"
                        >
                        Edit
                    </MDBBtn>
                    <MDBBtn
                        @click="handleDelete(cat.id)"
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
import { useCategories } from '../../../core/hooks/categories/useCategories';
import { useCategoriesStore } from '../store';
import { useForm } from '../../../core/hooks/categories/useForm';
import { useToast } from 'vue-toastification';
import { MDBTable, MDBBtn } from 'mdb-vue-ui-kit';

const { categories } = useCategories();
const { newCategories, isEditing } = useForm();
const store = useCategoriesStore();
const toast = useToast();

const handleClick = (categories) => {
    newCategories.value = { ...categories };
    isEditing.value = true;
};

const handleDelete = (id) => {
    if(window.confirm('Are you sure want to delete this categories')) {
        store.DELETE(id)
        .then((res) => toast.success(res.message || ''))
        .catch((err) => toast.error(err.message || ''))
    }
};

</script>