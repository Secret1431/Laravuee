<template>
    <MDBModal size="lg" v-model="isOpen">
        <MDBModalHeader class="bg-gradient-to-r from-cyan-400 to-indigo-600 text-white">
            <MDBModalTitle>Brands Form</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <form @submit.prevent="isEditing ? handleUpdate() : handleSubmit()">
                <div class="grid md:grid-cols-1 gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="text-sm text-gray-700 font-medium">Name:*</label>
                        <MDBInput 
                            type="text"
                            v-model="newBrands.name"
                            pattern="[A-Z]"
                            required
                            class="w-full border border-gray-300 py-2 px-3 rounded"
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
import { useBrandsStore } from '../store';
import { useForm } from '../../../core/hooks/brand/useForm';
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

const store = useBrandsStore();
const { newBrands, isEditing, isOpen } = useForm();
const toast = useToast();

const handleSubmit = () => {
    store.SAVE(newBrands.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};

const handleUpdate = () => {
    store.UPDATE(newBrands.id.value && newBrands.value)
    .then((res) => toast.success(res.message || ''))
    .catch((err) => toast.error(err.message || ''))
};
</script>