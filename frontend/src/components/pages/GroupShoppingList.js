import React, {Component} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ListItem from '../layout/ListItem'
import Heading from '../layout/Heading'
import EditListItem from '../layout/EditListItem'
import Popover from '@material-ui/core/Popover'
import { checkPropTypes } from 'prop-types';
import DropDownGSL from '../layout/DropDownGSL'
import TextInputBar from '../layout/TextInputBar'
import PopUp from '../layout/PopUp'

/**
 * 
 * 
 * @author [Pascalv Illg](https://github.com/pasillg)
 */

export default class GroupShoppingList extends Component {

  state={
    anchorEl: null,
    items: [
      {id: 1, name: "Apfel", category: "fruits", amount: "5", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: false, retailer: 'Aldi'},
      {id: 2, name: "Birne", category: "fruits", amount: "2", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: false, retailer: 'Edeka' },
      {id: 3, name: "Erdbeerkäse", category: "vegetables", amount: "2", unit: "Stk.", person: 'Herbert', userID: 2, checkbox: false, retailer: 'Lidl' },
      {id: 4, name: "Mango", category: "vegetables", amount: "2", unit: "g", person: 'Manfred', userID: 1, checkbox: true, retailer: 'Aldi' },
      {id: 5, name: "Lyoner", category: "vegetables", amount: "2", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: true, retailer: 'Edeka' },
  ],
  }

  getUserItems(){
    const Useritems = this.state.items.filter(item =>{
      if (item.userID === 1) {
        return item
      }
    });
    return Useritems
  }

  getCategorys(){
    let ArrCategory = []
    let Useritems = this.getUserItems()
    Useritems.map(item => {
      if(!ArrCategory.includes(item.category)){
        ArrCategory.push(item.category)
      }
    });
    return ArrCategory
  }  

  renderCategoryArticles(){
    let renderdArticles = []
    let Useritems = this.getUserItems();
    let ArrCategory = this.getCategorys();
    console.log('ArrCategory  ' + ArrCategory)
    for (let item in ArrCategory){
      renderdArticles.push( 
        <DropDownGSL onClick={this.handleClick} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></DropDownGSL>
      )}
    return renderdArticles
  };

  handleClick(){
    return <PopUp></PopUp>
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
      direction='row'
      justify='center'
      alignItems="stretch"
      xs={12}   
      >
      <Grid>
        <TextInputBar placeholder="search..." icon="search"></TextInputBar>
      </Grid>
          
      <Grid xs={12}
      >{this.renderCategoryArticles()}</Grid>
    
    </Grid>
    ) 
  }
}


/* 
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
      return <Grid item xs={12} onClick={this.handleClick}>
      
      <ListItem itemname={item.name} amount={item.amount} unit={item.unit}></ListItem>
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
  })} */