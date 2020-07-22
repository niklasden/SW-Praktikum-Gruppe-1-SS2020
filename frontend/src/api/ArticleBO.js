import BusinessObject from './BusinessObject';

/**
 * @author [Niklas Denneler](https://github.com/niklasden): 
 * 
 * Implementation of the Article BusinessObject for the frontend.
 * Basic methods to set class variables, like in the backend.
 * 
 */
export default class ArticleBO extends BusinessObject {

   constructor(n, m, e, d) {
        super();
        this.name = n;
        this.menge = m;
        this.einheit = e;
        this.description = d;
   }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setMenge(m) {
        this.menge = m
    }

    getMenge() {
        return this.menge
    }

    setEinheit(e) {
        return this.einheit = e
    }

    getEinheit() {
        return this.einheit
    }

    setDescription(d) {
        return this.description = d
    }

    getDescription() {
        return this.description
    }

    // Returns an Array of ArticleBOs from a given JSON structure
    static fromJSON(articles) {
        let result = [];

        if (Array.isArray(articles)) {
            articles.forEach((article) => {
                Object.setPrototypeOf(article, ArticleBO.prototype)
                result.push(article)
            })
        } else {
            //it appears to be a singular object
            let article = articles;
            Object.setPrototypeOf(article, ArticleBO.prototype)
            result.push(article)
        }
        return result;
    }

}