import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import { Grid, FormControl } from '@material-ui/core';
import { withRouter } from "react-router";
import { Config } from '../../config';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';
import LoadingProgress from '../dialogs/LoadingProgress';
import Heading from '../layout/Heading';
import ProductListEntry from '../layout/ProductListEntry';

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
class CreateArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            favouriteArticles: [],
            loadingInProgress: false, 
            error: null, 
        }
    }
    async getArticles() {
        this.setState({
            loadingInProgress: true
        });
        try {
            const categoryList = [];
            const res = await fetch(Config.apiHost + '/Article')
            const json = await res.json()
            this.setState({
            loadingInProgress: false, 
            loadingArticleError: null, 
            favouriteArticles: json, 
            })
            json.forEach(article => {
                if(!categoryList.includes(article.category)) {
                    categoryList.push(article.category)
                }
            })
            this.setState({categories: categoryList})
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
    return (
        error ?
        <ContextErrorMessage error={error} contextErrorMsg={error.message} />
        :
        loadingInProgress ?
            <LoadingProgress />
        :
        <Grid container xs={12} className={classes.wrapper}>
            {this.state.categories.map(category => (
                <>
                <Grid item xs={12}>
                    <Heading>{category}</Heading>
                </Grid>
                <Grid container xs={12}>
                    {this.state.favouriteArticles.map(article => (
                        article.category === category ?
                            <ProductListEntry
                                id={article.id}
                                category={article.category}
                                name={article.name}
                                iconName={article.name.toLowerCase()}
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
export default withRouter(withStyles(styles)(CreateArticlePage)); 
