import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, ButtonBase } from '@material-ui/core';
import Article from '../layout/Article';
import { withRouter } from "react-router-dom";
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
     item : this.props.item,
     name: this.props.item.name,
     category: this.props.category, 
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
    console.log(this.state.category)
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
  }
    

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
                >
                </Article>
              </ButtonBase>
              <AddListItem
               open={this.state.open}
               item={this.state.item}
               PressButtonBack={() => this.PressButtonBack()}
               PressButtonConfirm={() => this.PressButtonConfirm()}
              />
            </Grid>
          </Grid>
      )
  }
}


 export default withRouter(withStyles(styles)(ProductListEntry));