import { defineStore } from 'pinia';
import * as supplierServices from './api';

export const useSupplierStore = defineStore('suppliers', {
    state: () => ({
        suppliers: [],
        loading: false,
        error: null,
        page: 1,
        itemperPage: 5,
        searchQuery: '',
        selectedAddress: ''
    }),

    actions: {
        async FETCH() {
            this.loading = true;
            this.error = null;
            try {
                const res = await supplierServices.fetchAllSuppliers();
                this.suppliers = res.data;
                return res;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async SAVE(data) {
            this.loading = true;
            this.error = null;
            try {
                const newSupplier = await supplierServices.createSuppliers(data);
                this.suppliers.unshift(newSupplier);
                return newSupplier;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async UPDATE(id, update) {
            this.loading = true;
            this.error = null;
            try {
                const updatedSupplier = await supplierServices.updateSuppliers(id, update);
                const index = this.suppliers.findIndex(s => s.id === id);
                if(index !== - 1) {
                    this.suppliers[index] = updatedSupplier;
                };
                return updatedSupplier;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async DELETE(id) {
            this.loading = true;
            this.error = null;
            try {
                this.suppliers = this.suppliers.filter(s => s.id !== id);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        setPage(NewPage) {
            const maxPage = Math.ceil(this.suppliers.length / this.itemperPage);
            if(NewPage >= 1 && NewPage <= maxPage) {
                this.page = maxPage;
            }
        },

        setItemPerPage(limit) {
            if(limit > 0) {
                this.itemperPage = limit;
                this.page = 1;
            }
        }
    },

    getters: {
        filtered: (state) => {
            let result = state.suppliers;

            if(state.searchQuery) {
                result = result.filter(s => 
                    s.address.toLowerCase().includes(state.searchQuery.toLowerCase())    
                )
            };

            if(state.selectedAddress) {
                result = result.filter(s => 
                    s.address === selectedAddress
                )
            }
        },

        paginated: (state) => {
            const startIndex = (state.page) * state.itemperPage;
            const endIndex = startIndex + state.itemperPage;
            return state.filtered.slice(startIndex, endIndex);
        }
    }
})