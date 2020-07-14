import BusinessObject from './BusinessObject';

// By Niklas - not finished not tested
export default class RetailerBO extends BusinessObject {

   constructor(n, i, l) {
        super();
        this.name = n;
        this.id = i
        this.location = l;   
   }

    setName(n) {
        this.name = n
    }

    getName() {
        return this.name
    }

    setId(i) {
        this.id = i;
    }

    getId() {
        return this.id
    }

    setLocation(l) {
        this.location = l
    }

    getLocation() {
        return this.location
    }

    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(groups) {
        let result = [];

        if (Array.isArray(groups)) {
            groups.forEach((group) => {
                Object.setPrototypeOf(group, RetailerBO.prototype)
                result.push(group)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let group = groups;
            Object.setPrototypeOf(group, RetailerBO.prototype)
            result.push(group)
        }
        return result;
    }

}