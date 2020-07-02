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
    user:[{id: 1, name:'Niklas'},{id: 2, name:'Julius'},{id: 3, name:'Pia'},{id: 4, name:'Chris'},{id: 5, name:'Kevin'},{id: 6, name:'Pascal'}],
    retailer: [{id: 1, name:'Edeka'},{id: 2, name:'Lidl'},{id: 3, name:'Norma'},{id: 4, name:'BeateUhse'},{id: 5, name:'Rewe'},{id: 6, name:'Kaufland'}],
    open: false,
    amount: "1",
    unit: '',
  }

  getCategorys(){
    let ArrCategory = []
    let Useritems = this.state.items
    Useritems.map(item => {
      if(!ArrCategory.includes(item.category)){
        ArrCategory.push(item.category)
      }
    });
    return ArrCategory
  }  

  renderCategoryArticles(){
    let renderdArticles = []
    let Useritems = this.state.items;
    let ArrCategory = this.getCategorys();
    console.log('ArrCategory  ' + ArrCategory)
    for (let item in ArrCategory){
      renderdArticles.push( 
        <DropDownGSL onClick={this.onClickDelete.bind(this)} onClickListItem={this.onClickListItem.bind(this)} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></DropDownGSL>
      )}
    return renderdArticles
  };

  onClickDelete(id){
    console.log('Hi')
    let Items = [...this.state.items]
    Items.map( item => {
      if(item.id === id){
        let newItem = {...item}
        for (let element in Items){
          if(Items[element].id === newItem.id){
            Items.splice(element, 1)
            this.setState({items : Items})
          }
        }
      }
    })
  }

  onClickListItem(id, unit, amount){
    this.setState({open : true})
    this.setState({amount : amount})
    this.setState({unit : unit})
  }

  handleClick(event){
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose(){
    this.setState({anchorEl:null});
  };

  PressButtonBack(){
    this.setState({open : false})
  }

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
      <Grid item xs={12}>
        <TextInputBar placeholder="search..." icon="search"></TextInputBar>
      </Grid>
          
      <Grid item xs={12}>
        {this.renderCategoryArticles()}
        <EditListItem /* handleChange={this.props.onChangeEditItem.bind(this)} */ open={this.state.open} unit={this.state.unit} amount={this.state.amount}  PressButtonBack={this.PressButtonBack.bind(this)} user={this.state.user} user={this.state.retailer}></EditListItem>
  
      </Grid>
    
    </Grid>
    ) 
  }
}