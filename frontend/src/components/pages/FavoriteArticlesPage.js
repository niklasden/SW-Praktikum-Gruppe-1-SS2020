import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { withRouter } from "react-router";
import { Config } from '../../config';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import Heading from '../layout/Heading';
import FavoriteArticlesListEntry from '../layout/FavoriteArticlesListEntry';
import shoppingSettings from '../../shoppingSettings';
import { Link } from 'react-router-dom';
import IconButton from '../layout/IconButton';


const settingsObject = shoppingSettings.getSettings();
  /**
 * Renders the page to create  a favourite article

 * 
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
const styles =  theme => ({
    wrapper: {
        padding: theme.spacing(2),
    }
});
class FavoriteArticlesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            categories: [],
            favArticles: [],
            loadingInProgress: false, 
            error: null,
            currentGroupID: 0
        }
    }
    async getFavArticles() {
        try {
            if(this.state.currentGroupID !== 0 || this.state.currentGroupID !== null) {
                var newFavArticles = [];
                const res = await fetch(Config.apiHost + '/favoriteArticle/groupid/' + this.state.currentGroupID);
                const json = await res.json()
                json.forEach(item => {
                    var matchingItem = this.state.articles.find(article => article.id === item.article_id);
                    var favArticle = {
                        id: item.id,
                        article_id: item.article_id,
                        article_name: matchingItem.name,
                        article_category: matchingItem.category,
                        amount: item.amount,
                        group_id: this.state.currentGroupID,
                        retailer_id: 4,
                        unit: item.unit
                    }
                    newFavArticles.push(favArticle);
                })
                this.setState({favArticles: newFavArticles});
            }
        }catch(e) {
            this.setState({error: e})
        }
    }
    async getArticles() {
        this.setState({
            loadingInProgress: true
        });
        try {
            const categoryList = [], articleMapping = [];
            const res = await fetch(Config.apiHost + '/Article')
            const json = await res.json()
            json.forEach(article => {
                if(!categoryList.includes(article.category)) {
                    categoryList.push(article.category)
                }
                if(articleMapping.filter(a => a.id === article.id).length === 0) {
                    articleMapping.push(article);
                }
            })
            this.setState({
                articles: articleMapping,
                categories: categoryList,
                currentGroupID: settingsObject.currentGroupID,
                loadingInProgress: false
                })
        this.getFavArticles();
        } catch (e){
            this.setState({
            loadingInProgress: false, 
            error: e
            })
        } 
    }
    componentDidMount() {
        this.getArticles();
    }
    render() {
    const {classes} = this.props;
    const {error, loadingInProgress} = this.state;
    const link = "/add_favorite_article/" + this.state.currentGroupID;
    return (
        error ?
        <ContextErrorMessage error={error} contextErrorMsg={error.message} />
        :
        loadingInProgress ?
            <LoadingProgress />
        :
        <Grid container xs={12} className={classes.wrapper}>
        <Grid item xs={10}>
            <Heading>Favorite Articles</Heading>
        </Grid>
        <Grid item xs={2}>
            <Link to={link}>
              <IconButton icon='add' />
            </Link>
        </Grid>
        {this.state.currentGroupID === 0 ? 
            <div>No group found!<br /> Switch to HomePage and select your active group!</div>
        :
            this.state.categories.map(category => (
                <>
                <Grid item xs={12}>
                    <Heading>{category}</Heading>
                </Grid>
                <Grid container xs={12}>
                    {this.state.favArticles.map(article => (
                        article.article_category === category ?
                            <FavoriteArticlesListEntry
                                id={article.id}
                                category={article.article_category}
                                name={article.article_name}
                                iconName={article.article_name.toLowerCase()}
                                style={{marginBottom:12}}
                            />
                        : null
                    ))}
                </Grid>
                </>
            ))}
        </Grid>
    )
    }
}
export default withRouter(withStyles(styles)(FavoriteArticlesPage)); 
