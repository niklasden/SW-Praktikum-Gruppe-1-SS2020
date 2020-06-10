export default class BusinessObject {

    constructor() {
         this.id = 0;
    }
 
     setID(id) {
         this.id = id
     }
 
     getID() {
         return this.id
     }
 
     toString() {
         let result = ''
         for (var prop in this) {
             result += prop + ': ' + this[prop] + ' ';
         }
         return result;
     }
 
 }