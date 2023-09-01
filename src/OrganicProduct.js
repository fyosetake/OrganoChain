class OrganicProduct {
    constructor(id, name, gtin, category, origin, stages = []) {
        this.id = id;
        this.name = name;
        this.gtin = gtin;
        this.category = category;
        this.origin = origin;
        this.stages = stages;
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

    addStage(stage) {
      this.stages.push(stage);
    }
}

module.exports = OrganicProduct;