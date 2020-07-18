import BusinessObject from './BusinessObject';

// By Niklas - not finished not tested
export default class UserBO extends BusinessObject {

   constructor(n, i, e, fid, l) {
        super();
        this.name = n;
        this.id = i
        this.email = e;
        this.firebase_id = fid;
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

    setLocation(l) {
        this.location = l
    }

    getLocation() {
        return this.location 
    }
    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(users) {
        let result = [];

        if (Array.isArray(users)) {
            users.forEach((user) => {
                Object.setPrototypeOf(user, UserBO.prototype)
                result.push(user)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let user = users;
            Object.setPrototypeOf(user, UserBO.prototype)
            result.push(user)
        }
        return result;
    }

}