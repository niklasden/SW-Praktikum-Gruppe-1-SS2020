import React, {Component} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ListItem from '../layout/ListItem'
import Heading from '../layout/Heading'
import EditListItem from '../layout/EditListItem'
import Popover from '@material-ui/core/Popover'
import { checkPropTypes } from 'prop-types';

/**
 * 
 * 
 * @author [Pascalv Illg](https://github.com/pasillg)
 */

export default class GroupShoppingList extends Component {

  state={
    anchorEl: null,
    items: [
      {id: 1, name: "Apfel", category: "fruits", amount: "3", unit: "Stk."},
      {id: 2, name: "Birne", category: "fruits", amount: "2", unit: "Stk."},
      {id: 3, name: "Erdbeerkäse", category: "vegetables", amount: "2", unit: "Stk."},
    ]
  }

  handleClick(event){
    this.setState({anchorEl: event.currentTarget});

  };

  handleClose(){
    this.setState({anchorEl:null});
  };

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  
  render(){

    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
      <Grid 
        container
        direction='column'
        justify='space-between'
        alignItems="stretch"
        xs={12}
        spacing={1}        
      >
        <Grid container xs={12}>
        </Grid>
        <Grid item>
          <Heading>Fruits</Heading>
        </Grid>

        <Grid container xs={12} spacing={1}>
          {this.state.items.map(item => {
            if(item.category === "fruits") {
              return <Grid item xs={12} onClick={this.handleClick}><ListItem itemname={item.name} amount={item.amount} unit={item.unit}></ListItem>
              <EditListItem
              item={item}
              id={id}
              open={open}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
              >
            </EditListItem></Grid>
            }
          })}
        </Grid>

        <Grid item>
          <Heading>Vegetables</Heading>
        </Grid>

        <Grid container xs={12} spacing={1}>
          {this.state.items.map(item => {
            if(item.category === "vegetables") {
              return <Grid item xs={12} onClick={this.handleClick}><ListItem itemname={item.name} amount={item.amount} unit={item.unit}></ListItem></Grid>
            }
          })}
        </Grid>

        

      </Grid>
    ) 
  }
}