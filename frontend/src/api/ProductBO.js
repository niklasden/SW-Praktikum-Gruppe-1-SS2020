import BusinessObject from './BusinessObject';

export default class ProductBO extends BusinessObject {

   constructor(n, m, e, d) {
        super();
        this.name = n;
        this.menge = m;
        this.einheit = e;
        this.description = d;
   }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setMenge(m) {
        this.menge = m
    }

    getMenge() {
        return this.menge
    }

    setEinheit(e) {
        return this.einheit = e
    }

    getEinheit() {
        return this.einheit
    }

    setDescription(d) {
        return this.description = d
    }

    getDescription() {
        return this.description
    }

    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(products) {
        let result = [];

        if (Array.isArray(products)) {
            products.forEach((p) => {
                Object.setPrototypeOf(p, ProductBO.prototype)
                result.push(p)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let p = products;
            Object.setPrototypeOf(p, ProductBO.prototype)
            result.push(p)
        }

        return result;
    }

}