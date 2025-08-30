import api from '../shared/axios/api';

export const BrandApi = {
    getAll: () => api.get('/brands'),
    create: (data) => api.post('/brands', data),
    update: (id, update) => api.put(`/brands/${id}`, update),
    delete: (id) => api.delete(`/brands/${id}`)
}