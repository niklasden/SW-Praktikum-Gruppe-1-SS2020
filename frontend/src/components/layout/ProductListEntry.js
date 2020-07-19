import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, ButtonBase } from '@material-ui/core';
import Article from '../layout/Article';
import { Link } from 'react-router-dom';
import { push } from "react-router";
import GroupShoppingList from '../pages/GroupShoppingList';
import { withRouter } from "react-router-dom";
import ListEntryBO from '../../api/ListEntryBO';
import PropTypes, { array } from 'prop-types';
import ShoppingAPI from '../../api/ShoppingAPI';
import AddListItem from './AddListItem';

const styles = theme => ({
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
   
  constructor(props) {
    super(props);
   
    this.state = {
     //item: this.props.item, 
     item : this.props.item,
     name: this.props.item.name, 
     anchorEl: null, 
     open: false
    }

    this.handleClick = this.onClickItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.PressButtonBack = this.PressButtonBack.bind(this);
    this.PressButtonConfirm = this.PressButtonConfirm.bind(this);
  }

  onClickItem(name) {
    this.setState({open : true})
    console.log(this.state.name)
  }
  onCloseItem() {
    this.setState({open: false})
  }
  handleClose(){
    this.setState({anchorEl:null});
  };
  PressButtonBack(){
    this.setState({open : false})
  }
  PressButtonConfirm(){
    this.setState({open : false})
    console.log(this.props.fetchItems());
  }



    /**
     
     shoppinglist_id: this.props.item.shoppinglist_id, 
   }
   this.onSave = this.onSave.bind(this);*/
  


 /** onSave= () => {
    let insertedItem = Object.assign(new ListEntryBO(), this.state.item);
    insertedItem = setArticle(this.state.article);
    insertedItem = setShoppingList(this.state.shoppinglist_id);

    ShoppingAPI.getAPI().insertListEntry(insertedItem).then(this.props.PressButton).catch(e => console.log(e))

    } */

  
     

  render(){
      const { classes } = this.props
      const open = Boolean(this.state.anchorEl)
      //console.log(this.state.article_id)

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
                >
                </Article>
              </ButtonBase>
              <AddListItem
               open={this.state.open}
               item={this.state.item}
               //shoppinglist={this.props.shoppinglist}
               PressButtonBack={() => this.PressButtonBack()}
               PressButtonConfirm={() => this.PressButtonConfirm()}
              />
            </Grid>
          </Grid>
      )
  }
}

ProductListEntry.propTypes = {
  itemname: PropTypes.string,
  amount: PropTypes.string,
  unit: PropTypes.string,
  handleChange: PropTypes.string,
  onClick: PropTypes.func,
  onClickListItem: PropTypes.func,
}

 export default withRouter(withStyles(styles)(ProductListEntry));