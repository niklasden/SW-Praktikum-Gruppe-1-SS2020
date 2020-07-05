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
    anchorEl: null,
    items: [],
    user:[{id: 1, name:'Niklas'},{id: 2, name:'Julius'},{id: 3, name:'Pia'},{id: 4, name:'Chris'},{id: 5, name:'Kevin'},{id: 6, name:'Pascal'}],
    retailer: [{id: 1, name:'Edeka'},{id: 2, name:'Lidl'},{id: 3, name:'Norma'},{id: 4, name:'BeateUhse'},{id: 5, name:'Rewe'},{id: 6, name:'Kaufland'}],
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
        <DropDownGSL onClick={this.onClickDelete.bind(this)} onClickListItem={this.onClickListItem.bind(this)} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></DropDownGSL>
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

  onClickListItem(id, unit, amount){
    this.setState({selectedID: id})
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

  handleChangeUnit(v) {
    this.setState({unit: v});
    var newList = [...this.state.items];
    newList.filter(item => item.id !== this.state.selectedID);
    var newObject = this.state.items.find(item => item.id === this.state.selectedID);
    if(v !== "null" || v !== "undefined") {
      newObject.unit = v;
    }
    this.setState({items: newList});
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
        <EditListItem open={this.state.open} unit={this.state.unit} amount={this.state.amount} PressButtonBack={this.PressButtonBack.bind(this)} handleChangeUnit={this.handleChangeUnit.bind(this)} user={this.state.user} retailer={this.state.retailer}></EditListItem>
      </Grid>
    
    </Grid>
    ) 
  }
}