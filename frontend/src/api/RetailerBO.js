import BusinessObject from './BusinessObject';

/**
 * @author [Niklas Denneler](https://github.com/niklasden): 
 * 
 * Implementation of the Retailer BusinessObject for the frontend.
 * Basic methods to set class variables, like in the backend
 * 
 * 
 */
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
    static fromJSON(retailers) {
        let result = [];

        if (Array.isArray(retailers)) {
            retailers.forEach((retailer) => {
                Object.setPrototypeOf(retailer, RetailerBO.prototype)
                result.push(retailer)
            })
        } else {
            // Its a single object
            let retailer = retailers;
            Object.setPrototypeOf(retailer, RetailerBO.prototype)
            result.push(retailer)
        }
        return result;
    }

}