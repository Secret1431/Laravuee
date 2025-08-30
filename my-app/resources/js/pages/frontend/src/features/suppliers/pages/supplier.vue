<template>
    <div class="flex min-h-screen bg-gradient-to-r from-gray-300 to-gray-300">
        <SidebarMenu />
        <div class="flex-1 flex justify-center items-center w-full py-25 px-4">
            <div class="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl">
                <Modal />
                <div class="md:w-2/2 p-4 bg-white shadow-md rounded-md">
                    <Header />
                    <Body />
                    <Footer />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SidebarMenu from '../../../layout/sidebarMenu.vue/sidebar.vue';
import Header from '../components/header.vue';
import Footer from '../components/footer.vue';
import Modal from '../components/modal.vue';
import Body from '../components/body.vue';

</script>
