import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import Heading from '../layout/Heading';
import Article from '../layout/Article';



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

 
     render(){
         const { classes } = this.props
         return (     
            <Grid item 
              className={classes.article}

              >
                <Grid item xs={12}>
                  <text>
                  <Heading>{this.props.category}</Heading>
                  </text>
                </Grid> 
                <Grid item 
                xs={2.4}
                direction="row">
                  <Article itemname={this.props.name} src={this.props.imgsrc}></Article>
                </Grid>
                </Grid>
            )
     }
 }

 export default withStyles(styles)(ProductListEntry);