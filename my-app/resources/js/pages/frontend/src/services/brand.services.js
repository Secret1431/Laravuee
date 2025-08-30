import { Brand } from '../entities/brand.entities';
import { BrandApi } from '../infra/brand.infra';

export const fetchAllBrands = (
    async () => {
        const res = await BrandApi.getAll()
        return res.data.data.map(item => new Brand(item));
    }
);

export const createBrands = (
    async (name) => {
        const res = await BrandApi.create({ name });
        return new Brand(res.data);
    }
);

export const updateBrands = (
    async (id, name) => {
        const res = await BrandApi.update(id, { name });
        return new Brand(res.data);
    }
);

export const deleteBrands = (
    async (id) => {
        const res = await BrandApi.delete(id);
        return res.data;
    }
)