
import ArticleBO from './ArticleBO';
import GroupBO from './GroupBO';

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
    
    //Groups URLs
    #getGroupsforUserURL = (userid) => `${this.#baseServerURL}/Group/Usergroup/${userid}`;

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
            console.info(groupBOs);
            // return new Promise(function (resolve) {
            //     resolve(groupBOs);
            // })
        })
    }

    getURL(){
        return this.#fetchAdvanced(this.#getArticlesURL())
        .then((responseJSON) =>
        console.log(responseJSON))
    }
}

