import React, {Component} from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import ListItem from '../layout/ListItem'
import Heading from '../layout/Heading'
import Popover from '@material-ui/core/Popover'
import { checkPropTypes } from 'prop-types';
import DropDownGSL from '../layout/DropDownGSL'
import TextInputBar from '../layout/TextInputBar'
import PopUp from '../layout/PopUp'
import ShoppingSettings from '../../../src/shoppingSettings'

const settingsobj = ShoppingSettings.getSettings()

// hier dann beim fetch der Gruppenliste einfach fetch(... groupid = settingsobj.getGroupID())
// vlt noch mit try und catch falls keine gesetzt ist und man dann keine daten bekommen kann, bitten auf der Homepage
// die Gruppe auszuwählen

/**
 * 
 * 
 * @author [Pascalv Illg](https://github.com/pasillg)
 */

export default class GroupShoppingList extends Component {

  state={
    items: [],
    open: false,
    amount: "1",
    unit: '',
    selectedID: 0
  }
  async fetchItems() {
    var res = await fetch("http://localhost:8081/api/shoppa/listEntries");
    var json = await res.json();
    this.setState({items: json})
  }

  componentDidMount() {
    this.fetchItems();
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
    for (let item in ArrCategory){
      renderdArticles.push( 
        <DropDownGSL 
          onClickDeleteButton={this.onClickDelete.bind(this)} 
          Useritems={Useritems} 
          ArrCategory={ArrCategory} 
          item={item} 
          />
      )}
    return renderdArticles
  };
  onClickDelete(id){
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
  
  render(){
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
      </Grid>
    
    </Grid>
    ) 
  }
}