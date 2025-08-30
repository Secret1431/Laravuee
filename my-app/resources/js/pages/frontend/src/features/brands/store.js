import { defineStore } from 'pinia';
import * as brandsServices from './api';

export const useBrandsStore = defineStore('brands', {
    state: () => ({
        brands: [],
        loading: false,
        error: null,
        page: 1,
        itemperPage: 5
    }),

    actions: {
        async FETCH() {
            this.loading = true;
            this.error = null;
            try {
                const res = await brandsServices.fetchAllBrands();
                this.brands = res.data;
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
                const newBrands = await brandsServices.createBrands(data);
                this.brands.unshift(newBrands);
                return newBrands;
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
                const updatedBrands = await brandsServices.updateBrands(id, update);
                const index = this.brands.findIndex(c => c.id === id);
                if(index !== - 1) {
                    this.brands[index] = updatedBrands;
                };
                return updatedBrands;
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
                this.brands = this.brands.filter(c => c.id !== id);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        setPage(NewPage) {
            const maxPage = Math.ceil(this.brands.length / this.itemperPage);
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

        paginated: (state) => {
            const startIndex = (state.page) * state.itemperPage;
            const endIndex = startIndex + state.itemperPage;
            return state.filter.slice(startIndex, endIndex);
        }
    }
})