import BusinessObject from './BusinessObject';

/**
 * @author [Niklas Denneler](https://github.com/niklasden): 
 * 
 * Implementation of the Group BusinessObject for the frontend.
 * Basic methods to set class variables, like in the backend
 * 
 * 
 */
export default class GroupBO extends BusinessObject {

   constructor(n, d) {
        super();
        this.name = n;
        this.description = d;
        // needs shopping_lists & members?
      
   }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setDescription(d) {
        this.members = d
    }

    getDescription() {
        return this.description
    }

    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(groups) {
        let result = [];

        if (Array.isArray(groups)) {
            groups.forEach((group) => {
                Object.setPrototypeOf(group, GroupBO.prototype)
                result.push(group)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let group = groups;
            Object.setPrototypeOf(group, GroupBO.prototype)
            result.push(group)
        }
        return result;
    }

}