import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllCategoriess = (
    async () => {
        const res = await axios.get(BASE_URL);
        return res.data;
    }
);

export const createCategories = (
    async (data) => {
        const res = await axios.post(BASE_URL, data);
        return res.data;
    }
);

export const updateCategories = (
    async (id, update) => {
        const res = await axios.put(`${BASE_URL}/${id}`, update);
        return res.data;
    } 
);

export const deleteCategories = (
    async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        return id;
    }
)