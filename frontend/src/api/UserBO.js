import BusinessObject from './BusinessObject';

// By Niklas - not finished not tested
export default class UserBO extends BusinessObject {

   constructor(n, i, e, fid) {
        super();
        this.name = n;
        this.id = i
        this.email = e;
        this.firebase_id = fid
      
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

    setEmail(e) {
        this.email = e
    }

    getEmail() {
        return this.email
    }

    setFirebaseid(fid) {
        this.firebase_id = fid
    }

    getFirebaseid() {
        return this.firebase_id
    }

    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(groups) {
        let result = [];

        if (Array.isArray(groups)) {
            groups.forEach((group) => {
                Object.setPrototypeOf(group, UserBO.prototype)
                result.push(group)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let group = groups;
            Object.setPrototypeOf(group, UserBO.prototype)
            result.push(group)
        }
        return result;
    }

}