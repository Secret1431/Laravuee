<script setup>
import { useCustomerStore } from '../store';
import { useForm } from '../../../core/hooks/customer/useForm';
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

const { newCustomer, isEditing, isOpen } = useForm();
const store = useCustomerStore();
const toast = useToast();

const items = [
    { type: 'text', label: 'Name', value: 'name' },
    { type: 'text', label: 'Email', value: 'email' },
    { type: 'text', label: 'Phone', value: 'phone' },
    { type: 'text', label: 'Address', value: 'address' },
    { type: 'number', label: 'Loyalty Points', value: 'loyaltyPoint' }
];

const handleSubmit = () => {
    store.SAVE(newCustomer.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

const handleUpdate = () => {
    store.UPDATE(newCustomer.value.id, newCustomer.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

</script>

<template>
    <MDBModal size="lg" v-model="isOpen">
        <MDBModalHeader class="bg-gradient-to-r from-cyan-400 to-indigo-500  text-white">
            <MDBModalTitle class="text-center">Customer Form</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <form @submit.prevent="isEditing ? handleUpdate() : handleSubmit()">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="item in items">
                        <label class="text-sm text-gray-700 font-medium">{{ item.label }}:</label>
                        <MDBInput 
                        v-model="newCustomer[item.value]"
                        :type="item.type"
                        class="w-full border-gray-300 p-2 rounded-md"
                        />
                    </div>
                </div>
                <MDBModalFooter class="gap-4">
                    <MDBBtn
                        type="submit"
                        color="primary"
                        class="py-2 px-3 shadow-md rounded-sm"
                        >
                        {{ isEditing ? 'Save Changes' : 'Submit' }}
                    </MDBBtn>
                    <MDBBtn
                        @click="isOpen = false"
                        color="secondary"
                        class="py-2 px-3 shadow-md rounded-sm"
                        >
                        Cancel
                    </MDBBtn>
                </MDBModalFooter>
            </form>
        </MDBModalBody>
    </MDBModal>
</template>