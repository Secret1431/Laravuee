<template>
    <MDBModal size="lg" v-model="isOpen">
        <MDBModalHeader class="bg-gradient-to-r from-cyan-400 to-indigo-600">
            <MDBModalTitle class="text-white">Supplier Form</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <form @submit.prevent="isEditing ? handleUpdate() : handleSubmit()">
                <div class="grid md:grid-cols-2 gap-4">
                    <div v-for="item in items">
                        <label class="text-sm text-gray-700 font-medium">{{ item.label }}</label>
                        <MDBInput 
                            v-model="newSupplier[item.key]"
                            type="item.type"
                            class="w-full py-2 px-3 rounded focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                </div>
                <MDBModalFooter class="gap-3">
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
import { useSupplierStore } from '../store';
import { useForm } from '../../../core/hooks/supplier/useForm';
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

const { newSupplier, isEditing, isOpen } = useForm();
const store = useSupplierStore();
const toast = useToast();

const items = [
    { type: 'text', label: 'Name', key: 'name' },
    { type: 'text', label: 'Email', key: 'email' },
    { type: 'text', label: 'Phone', key: 'phone' },
    { type: 'text', label: 'Address', key: 'address' }
];

const handleSubmit = () => {
    store.SAVE(newSupplier.value) 
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

const handleUpdate = () => {
    store.UPDATE(newSupplier.id.value && newSupplier.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

</script>