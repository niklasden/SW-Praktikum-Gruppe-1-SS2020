import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, ButtonBase } from '@material-ui/core';
import Article from '../layout/Article';
import { withRouter } from "react-router-dom";

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
   
  constructor(props) {
    super(props);
    
    // Init the state
    this.state = {
      item : this.props.item,
      name: this.props.item.name,
      category: this.props.category, 
      open: false
    }

    this.handleClick = this.onClickItem.bind(this);
  }

  /** Handels the onClick event of the ButtonBase:
   * Opens the PopUP of the AddListItem.js when an article is clicked 
   */
  onClickItem(name) {
    this.props.changeCurrentItem(this.state.item)
    this.setState({open : true})
  }

  /** Closes the PopUP of the AddListItem.js when an article is clicked */
  onCloseItem() {
    this.setState({open: false})
  }
    
  /** Renders the component */
  render(){
      const { classes } = this.props

      return (     
          <Grid item 
            className={classes.article}
          >
            <Grid item 
              xs={3}
            >
              <ButtonBase
                onClick={() => {this.handleClick(this.state.item)}}
              >
                <Article 
                  id = {this.props.id}
                  itemname={this.props.name} 
                  category = {this.props.category} 
                  iconName={this.props.iconName}
                />
              </ButtonBase>
            </Grid>
          </Grid>
      )
  }
}

/** Component specific styles */
const styles = theme => ({
  article: {
    padding: theme.spacing(0), 
  }
});

export default withRouter(withStyles(styles)(ProductListEntry));