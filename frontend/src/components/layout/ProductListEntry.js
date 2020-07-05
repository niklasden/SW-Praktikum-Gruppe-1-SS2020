import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, ButtonBase } from '@material-ui/core';
import Article from '../layout/Article';
import { Link } from 'react-router-dom';
import { push } from "react-router";
import GroupShoppingList from '../pages/GroupShoppingList';
import { withRouter } from "react-router-dom";






const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    article: {
      padding: theme.spacing(0), 
    }
 });

 /**
 * Renders a list of ArticleEntry objects
 * 
 * @see ArticleEntry
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
 * @prop id: string with article id
 * @prop category: string with category name
 * @prop name: string with article name
 */

 class ProductListEntry extends Component {

  onSave= () => {
    this.state= {name: this.props.name, category: this.props.category}
    console.log(this.props.name, this.props.category)
    this.props.history.push({
      pathname: '/GroupShoppingList', 
      state: {item: this.props.name, ArrCategory: this.props.category}
    })
  }
     

  render(){
      const { classes } = this.props
      return (     
          <Grid item 
          className={classes.article}
          >
            <Grid item 
            xs={2.4}
            direction="row"
            >
              <ButtonBase
                onClick={this.onSave}
                /*to= 'create_article?query=hello'
                query='hello'
                to={{
                  pathname:'create_article', 
                  state:{name: this.props.name, category: this.props.category}
                }}*/>
                <Article itemname={this.props.name} category = {this.props.category} iconName={this.props.iconName}></Article>
              </ButtonBase>
            </Grid>
          </Grid>
      )
  }
}

 export default withRouter(withStyles(styles)(ProductListEntry));