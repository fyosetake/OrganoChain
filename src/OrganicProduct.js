class OrganicProduct {
    constructor(id, name, gtin, category, origin) {
        this.id = id;
        this.name = name;
        this.gtin = gtin;
        this.category = category;
        this.origin = origin;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getGtin() {
        return this.gtin;
    }

    getCategory() {
        return this.category;
    }

    getOrigin() {
        return this.origin;
    }
}

module.exports = OrganicProduct;