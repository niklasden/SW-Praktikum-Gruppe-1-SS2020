import BusinessObject from './BusinessObject';

/**
 * @author [Niklas Denneler](https://github.com/niklasden): 
 * 
 * Implementation of the Shoppinglist BusinessObject for the frontend.
 * Basic methods to set class variables, like in the backend
 * 
 * 
 */
export default class ShoppinglistBO extends BusinessObject {

   constructor(n, i, g, cd) {
        super();
        this.name = n;
        this.id = i
        this.groupid = g;   
        this.creationdate = cd
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

    setGroupId(g) {
        this.groupid = g
    }

    getGroupId() {
        return this.groupid
    }

    setCreationdate(cd) {
        this.creationdate = cd
    }

    getCreationdate(){
        return this.creationdate
    }

    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(shoppinglists) {
        let result = [];

        if (Array.isArray(shoppinglists)) {
            shoppinglists.forEach((shoppinglist) => {
                Object.setPrototypeOf(shoppinglist, ShoppinglistBO.prototype)
                result.push(shoppinglist)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let shoppinglist = shoppinglists;
            Object.setPrototypeOf(shoppinglist, ShoppinglistBO.prototype)
            result.push(shoppinglist)
        }
        return result;
    }

}