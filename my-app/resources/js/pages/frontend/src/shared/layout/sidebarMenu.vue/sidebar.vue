<script setup>
import { User, User2,  } from 'lucide-vue-next';
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const isOpen = ref(true);
const page = usePage();

const items = [
    { label: 'Customer', path: '/customers', icon: User },
    { label: 'Suppliers', path: '/suppliers', icon: User2 },
    { label: 'Brands', path: '/brands', icon: User2 }
];

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};

const getLink = (path) => page.url.startsWith(path);
</script>

<template>
    <div class="flex min-h-screen">
        <div :class="[
            'bg-white shadow-lg transition-transform duration-500 ease-in-out overflow-auto w-60',
            isOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
            >
            <div class="flex items-center py-2 px-4 gap-2 border-b text-black">
                <img 
                    src="../../assets/images/pos.png"
                    alt="Images"
                    class="w-12 h-12 object-cover rounded-full"
                />
                <div class="text-lg font-medium">Point Of Sales</div>
            </div>
            <div class="text-gray-700 mt-3 gap-2">
                <div
                    v-for="item in items"
                    :key="item.label"
                    :class="[
                        'flex items-center py-2 px-4 cursor-pointer',
                        getLink(item.path) 
                        ? 'bg-gray-200 text-teal-700 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-100'
                    ]"
                    >
                    <component :is="item.icon" size="25"/>
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
        <div class="flex-1 p-6"></div>
    </div>
</template>