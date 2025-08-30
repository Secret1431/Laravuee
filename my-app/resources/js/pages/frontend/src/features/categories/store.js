import { defineStore } from 'pinia';
import * as categoriesServices from './api';

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: [],
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
                const res = await categoriesServices.fetchAllCategories();
                this.categories = res.data;
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
                const newCategories = await categoriesServices.createCategories(data);
                this.categories.unshift(newCategories);
                return newCategories;
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
                const updatedCategories = await categoriesServices.updateCategories(id, update);
                const index = this.categories.findIndex(c => c.id === id);
                if(index !== - 1) {
                    this.categories[index] = updatedCategories;
                };
                return updatedCategories;
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
                this.categories = this.categories.filter(c => c.id !== id);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        setPage(NewPage) {
            const maxPage = Math.ceil(this.categories.length / this.itemperPage);
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
            let result = state.categories;

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