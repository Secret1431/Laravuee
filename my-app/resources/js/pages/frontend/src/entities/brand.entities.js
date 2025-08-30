export class Brand {
    constructor({ id, name }) {
        this.id = id;
        this.name = name.trim();
    }

    get displayName() {
        return this.name.toUpperCase();
    }
}