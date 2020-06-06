import React, { Component } from 'react';
import ProductBO from './ProductBO';


class ShoppingAPI extends Component {
    static #api = null;
    #baseServerURL = 'localhost:8081';
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
    #getProductsURL = () => `${this.#baseServerURL}/products`;


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

    getProducts() {
        return this.#fetchAdvanced(this.#getProductsURL()).then((responseJSON) => {
            let productsBOs = ProductBO.fromJSON(responseJSON);
            // console.info(customerBOs);
            return new Promise(function (resolve) {
                resolve(productsBOs);
            })
        })
    }

}
export default ShoppingAPI;