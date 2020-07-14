
import ArticleBO from './ArticleBO';
import GroupBO from './GroupBO';
import ListEntryBO from './ListEntryBO';
import UserBO from './UserBO';
import RetailerBO from './RetailerBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 * 
 * @author [Niklas Denneler])
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
    
    //Groups URLs
    #getGroupsforUserURL = (userid) => `${this.#baseServerURL}/Group/Usergroup/${userid}`;
    #deleteGroupURL = (id) => `${this.#baseServerURL}/Group/${id}`;
    #saveGroupURL = () => `${this.#baseServerURL}/Group/`;
    #getunassigneditemssofGroupURL = (group_id) => `${this.#baseServerURL}/Listentry/get_unassigned_items_of_group/${group_id}`; 
    
    
    //ListEntry URLs
    #updateListEntryURL = (listentry) => `${this.#baseServerURL}/Listentry/update/${listentry}`;


    //Retailer URLs
    #getRetailers = () => `${this.#baseServerURL}/Retailer`;


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
     * 
     * @param {Number} user_ID for which the the groups should be retrieved
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
     * Returns a Promise, which resolves to an Array of groupBOs
     * 
     * @param {Number} ud for which group should be deleted
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

    getunassignedItemsofGroup(id) {
        return this.#fetchAdvanced(this.#getunassigneditemssofGroupURL(id)).then((responseJSON) => {
            let listentryBOs = ListEntryBO.fromJSON(responseJSON);
            /*console.info(listentryBOs);*/
            return new Promise(function (resolve) {
                 resolve(listentryBOs);
            })
        })
    }


    insertListentry(listentryBO){

    }
    
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


    getUsers(groupBO){
        return this.#fetchAdvanced(this.#getUsersURL(groupBO)).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON);
            // console.info(userBOs);
            return new Promise(function (resolve)  {
                resolve(userBOs)
            })
        })
    }


    getRetailers(){
        return this.#fetchAdvanced(this.#getRetailers()).then((responseJSON) => {
            let retailerBOs = RetailerBO.fromJSON(responseJSON);
            // console.info(retailerBOs);
            return new Promise(function (resolve) {
                resolve(retailerBOs)
            })
        })
    }
}

