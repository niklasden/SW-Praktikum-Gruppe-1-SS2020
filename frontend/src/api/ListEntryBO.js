import BusinessObject from './BusinessObject';

/**
 * @author [Niklas Denneler](https://github.com/niklasden): 
 * 
 * Implementation of the ListEntry BusinessObject for the frontend.
 * Basic methods to set class variables, like in the backend
 * 
 * 
 */
export default class ListEntryBO extends BusinessObject {
   constructor(i, ai, rei, shi, uid, gid, a, u, b, n, c, r) {
        super();
        this.id = i
        this.article_id = ai
        this.retailer_id = rei
        this.shoppinglist_id = shi
        this.user_id = uid
        this.group_id = gid
        this.amount = a
        this.unit = u
        this.bought = b
        this.name = n
        this.category = c
        this.retailer = r
   }

    setId(i) {
        this.id = i
    }

    getId() {
        return this.id
    }

    setArticleid(ai) {
        this.article_id = ai
    }

    getArticleid() {
        return this.article_id
    }

    setRetailerid(rei) {
        this.retailer_id = rei
    }

    getRetailerid() {
        return this.retailer_id
    }

    setShoppinglistid(shi) {
        this.shoppinglist_id = shi
    }

    getShoppinglistid() {
        return this.shoppinglist_id 
    }

    setUserid(uid){
        this.user_id = uid
    }

    getUserid(){
        return this.user_id
    }

    setGroupid(gid) {
        this.group_id = gid
    }

    getGroupid(){
        return this.group_id
    }

    setAmount(a){
        this.amount = a
    }

    getAmount(){
        return this.amount
    }

    setUnit(u){
        this.unit = u
    }

    getUnit(){
        return this.unit
    }

    setBought(b){
        this.bought = b
    }

    getBought(){
        return this.bought
    }

    setName(n){
        this.name = n
    }

    getName(){
        return this.name
    }

    setCategory(c){
        this.category = c
    }
    
    getCategory(){
        return this.category
    }

    setRetailer(r){
        this.retailer = r 
    }

    getRetailer(){
        return this.retailer
    }
    
    // Returns an Array of ProductBOs from a given JSON structure
    static fromJSON(products) {
        let result = [];

        if (Array.isArray(products)) {
            products.forEach((p) => {
                Object.setPrototypeOf(p, ListEntryBO.prototype)
                result.push(p)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let p = products;
            Object.setPrototypeOf(p, ListEntryBO.prototype)
            result.push(p)
        }
        return result;
    }
}