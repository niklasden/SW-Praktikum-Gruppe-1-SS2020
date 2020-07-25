import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, ButtonBase } from '@material-ui/core';
import FavoriteArticle from '../layout/FavoriteArticle';
import { withRouter } from "react-router-dom";

 /**
 * Renders a list of Favorite Articles
 * 
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */

 class FavoriteArticlesListEntry extends Component {
    onSave= () => {
         this.setState({id: this.props.id, name: this.props.name, category: this.props.category});
    }
  render(){
    const { classes } = this.props
      return (     
          <Grid item className={classes.article}>
            <Grid item xs={3} >
              <ButtonBase onClick={this.onSave}>
                <FavoriteArticle id={this.props.id} itemname={this.props.name} category = {this.props.category} iconName={this.props.iconName} />
              </ButtonBase>
            </Grid>
          </Grid>
      )
  }
}



const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  article: {
    padding: theme.spacing(0), 
  }
});

 export default withRouter(withStyles(styles)(FavoriteArticlesListEntry));