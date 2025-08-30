import { defineStore } from 'pinia';
import * as customerServices from './api';

export const useCustomerStore = defineStore('customers', {
    state: () => ({
        customers: [],
        loading: false,
        error: null,
        page: 1,
        itemperPage: 5,
        searchQuery: '',
        selectedName: ''
    }),

    actions: {
        async FETCH() {
            this.loading = true;
            this.error = null;
            try {
                const res = await customerServices.fetchAllCustomers();
                this.customers = res.data;
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
                const newCustomer = await customerServices.createCustomers(data);
                this.customers.unshift(newCustomer);
                return newCustomer;
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
                const updatedCustomer = await customerServices.updateCustomers(id, update);
                const index = this.customers.findIndex(c => c.id === id);
                if(index !== - 1) {
                    this.customers[index] = updatedCustomer;
                };
                return updatedCustomer;
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
                this.customers = this.customers.filter(c => c.id !== id);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        setPage(NewPage) {
            const maxPage = Math.ceil(this.customers.length / this.itemperPage);
            if(NewPage >= 1 && NewPage <= maxPage) {
                this.page = maxPage;
            }
        },

        setItemPerPage(limit) {
            if(limit > 0) {
                this.itemperPage = limit;
                this.page = 1
            }
        }
    },

    getters: {
        filtered: (state) => {
            let result = state.customers;

            if(state.searchQuery) {
                result = result.filter(c => 
                    c.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            };

            if(state.selectedName) {
                result = result.filter(c => 
                    c.name === state.selectedName
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