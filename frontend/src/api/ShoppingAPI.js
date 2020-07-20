
import ArticleBO from './ArticleBO';
import GroupBO from './GroupBO';
import ListEntryBO from './ListEntryBO';
import UserBO from './UserBO';
import RetailerBO from './RetailerBO';
import ShoppinglistBO from './ShoppinglistBO';

/**
 * @author [Niklas Denneler])(https://github.com/niklasden)
 * @author [Pascal Illg]) (https://github.com/pasillg)
 * 
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 * We wanted to use this Shopping Administration to handle every fetch request on the frontend, but were short on time.
 * 
 */

export default class ShoppingAPI {

    static #api = null;

    //PY Backend
    #baseServerURL = 'http://localhost:5000/shopping'; //was port 8081
   

    // Articles URLs
    #getArticlesURL = () => `${this.#baseServerURL}/Article`;

    //User URLs
    #getUsersURL = (groupid) => `${this.#baseServerURL}/membership/${groupid}`;
    #getUserNameURL = (id) => `${this.#baseServerURL}/membership/${id}`;
    #getUserURL = (id) => `${this.#baseServerURL}/User/${id}`;
    
    //Groups URLs
    #getGroupsforUserURL = (userid) => `${this.#baseServerURL}/Group/Usergroup/${userid}`;
    #deleteGroupURL = (id) => `${this.#baseServerURL}/Group/${id}`;
    #saveGroupURL = () => `${this.#baseServerURL}/Group`;
    #getitemssofGroupURL = (group_id, shoppinglist_id) => `${this.#baseServerURL}/Listentry/get_items_of_group?group_id=`+ group_id +`&shoppinglist_id=`+ shoppinglist_id; 
    
    
    //ListEntry URLs
    #insertListEntryURL = () => `${this.#baseServerURL}/Listentry/insert`;
    #updateListEntryURL = () => `${this.#baseServerURL}/Listentry/update`;
    #personalItemsURL = (user_id, group_id) => `${this.#baseServerURL}/Listentry/get_personal_items_of_group/?group_id=` + group_id + `&user_id=` + user_id;
        
    //Retailer URLs
    #getRetailersURL = () => `${this.#baseServerURL}/Retailer`;

    //Shoppinglist URLS
    #getShoppinglistsofGroupURL = (groupid) => `${this.#baseServerURL}/shoppinglist/?group_id=${groupid}`;


    /** 
     * Get the Singelton instance 
     * 
     * @public
     */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new ShoppingAPI();
        }
        return this.#api;
    }
    
    /**
     *  Returns a Promise which resolves to a json object. 
     *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
     *  fetchAdvanced throws an Error also an server status errors
     */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    );
    
    /**
     * Returns a Promise, which resolves to an Array of GroupBOs
     * This Array will be all Articles stored in the DB
     * @param  
     * @public
     */
    getArticles() {
        return this.#fetchAdvanced(this.#getArticlesURL()).then((responseJSON) => {
            let articleBOs = ArticleBO.fromJSON(responseJSON);
            // console.info(customerBOs);
            return new Promise(function (resolve) {
                resolve(articleBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of GroupBOs
     * This will be all Groups which a user is part of
     * @param {Number} id for which the the groups should be retrieved
     * @public
     */
    getGroupsforUser(id){
        return this.#fetchAdvanced(this.#getGroupsforUserURL(id)).then((responseJSON) => {
            let groupBOs = GroupBO.fromJSON(responseJSON);
            //console.info(groupBOs);
            return new Promise(function (resolve) {
                 resolve(groupBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an specific groupBO.
     * This promise will be the group that was deleted.
     * @param {Number} id for which group should be deleted
     * @public
     */
    deleteGroup(id) {
        return this.#fetchAdvanced(this.#deleteGroupURL(id), {
            method: 'DELETE'
        })
        .then((responseJSON) => {
            let groupBOs = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(groupBOs);
            })
        })
    }

    //not tested because of membership issue, current version works fine
    /*saveGroup(groupBO){
        return this.#fetchAdvanced(this.#saveGroupURL(groupBO), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(groupBO)
        })
        .then((responseJSON) => {
            let groupBO = GroupBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(groupBO);
            })
        })
    }
    */

     /**
     * Returns a Promise, which resolves to an Array of listentryBOs
     * This promise will be all listentries, which have not been assigend to a user to be bought yet.
     * @param {Number} group_id and @param {Number} shoppinglist_id for which group should be deleted
     * @public
     */
    getItemsofGroup(group_id, shoppinglist_id) {
        return this.#fetchAdvanced(this.#getitemssofGroupURL(group_id, shoppinglist_id), {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
        }).then((responseJSON) => {
            let listentryBOs = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(listentryBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a single listentryBO
     * This promise will be the listentry that was updated
     * @param {ListEntryBO} listentryBO for which the listentry should be updated
     * @public
     */
    insertListEntry(listentryBO) {
        console.log(listentryBO)
        return this.#fetchAdvanced(this.#insertListEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentryBO)
        }).then((responseJSON) => {
            let listentryBOs = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(listentryBOs);
            })
        })
    }

     /**
     * Returns a Promise, which resolves to a single listentryBO
     * This promise will be the listentry that was updated
     * @param {ListEntryBO} listentryBO for which the listentry should be updated
     * @public
     */
    updateListEntry(listentryBO) {
        return this.#fetchAdvanced(this.#updateListEntryURL(listentryBO), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listentryBO)
        })
        .then((responseJSON) => {
            let listentryBO = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(listentryBO);
            })
        })
    }

     /**
     * Returns a Promise, which resolves to a Array of listentryBOs.
     * This promise will be the all the listentries, which belong to a user / that group.
     * @param {Number} user_id and @param {Number} group_id for which personal items should be retrieved.
     * @public
     */
    personalItems(user_id, group_id) {
        return this.#fetchAdvanced(this.#personalItemsURL(user_id, group_id), {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
        })
        .then((responseJSON) => {
            let listentryBO = ListEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(listentryBO);
            })
        })
    }

     /**
     * Returns a Promise, which resolves to an Array of userBOs
     * This promise will be the Users which are part of a group.
     * @param {groupBO} groupBO for which Users should be retrieved.
     * @public
     */
    getUsers(groupBO){
        return this.#fetchAdvanced(this.#getUsersURL(groupBO)).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON);
            // console.info(userBOs);
            return new Promise(function (resolve)  {
                resolve(userBOs)
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of userBOs
     * This promise will be the User with that specific ID.
     * @param {number} id for which User should be retrieved.
     * @public
     */
    getUser(id){
        return this.#fetchAdvanced(this.#getUserURL(id)).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(userBOs)
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of retailerBOs
     * This promise will be the Retailers.
     * For now this is a global list and so there are no parameters needed
     * @public
     */
    getRetailers(){
        return this.#fetchAdvanced(this.#getRetailersURL()).then((responseJSON) => {
            let retailerBOs = RetailerBO.fromJSON(responseJSON);
            // console.info(retailerBOs);
            return new Promise(function (resolve) {
                resolve(retailerBOs)
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of shoppinglistBOs
     * @param {number} group_id for which Group the lists should be retrieved
     * @public
     */
    getShoppinglistofGroup(group_id){
        return this.#fetchAdvanced(this.#getShoppinglistsofGroupURL(group_id)).then((responseJSON) => {
            let shoppinglistBOs = ShoppinglistBO.fromJSON(responseJSON);
            //console.info(shoppinglistBOs);
            return new Promise(function (resolve) {
                resolve(shoppinglistBOs)
            })
        })
    }


}

