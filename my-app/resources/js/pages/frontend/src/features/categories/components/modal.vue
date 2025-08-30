<template>
    <MDBModal size="lg" v-model="isOpen">
        <MDBModalHeader class="bg-gradient-to-r from-cyan-400 to-indigo-600">
            <MDBModalTitle>Categories Form</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <form @submit.prevent="isEditing ? handleUpdate() : handleSubmit()">
                <div class="grid md:grid-cols-2 gap-4">
                    <div v-for="item in items">
                        <label class="text-sm text-gray-700 font-medium">{{ item.label }}:</label>
                        <MDBInput 
                            :type="item.type"
                            v-model="newCategories[item.key]"
                            pattern="[A-Z+]"
                            required
                        />
                    </div>
                </div>
                <MDBModalFooter>
                    <MDBBtn
                        type="submit"
                        color="primary"
                        class="py-2 px-3 shadow-md rounded-md"
                        >
                        {{ isEditing ? 'Save Changes' : 'Submit' }}
                    </MDBBtn>

                    <MDBBtn
                        @click="isOpen = false"
                        color="secondary"
                        class="py-2 px-3 shadow-md rounded-md"
                        >
                        Cancel
                    </MDBBtn>
                </MDBModalFooter>
            </form>
        </MDBModalBody>
    </MDBModal>
</template>

<script setup>
import { useCategoriesStore } from '../store';
import  { useForm } from '../../../core/hooks/categories/useForm';
import { useToast } from 'vue-toastification';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBBtn
} from 'mdb-vue-ui-kit';

const { newCategories, isEditing, isOpen } = useForm();
const store = useCategoriesStore();
const toast = useToast();

const items = [
    { type: 'number', label: 'Name', key: 'phone' },
    { type: 'text', label: 'Description', key: 'description' }
];

const handleSubmit = () => {
    store.SAVE(newCategories.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

const handleUpdate = () => {
    store.UPDATE(newCategories.id.value && newCategories.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

</script> 