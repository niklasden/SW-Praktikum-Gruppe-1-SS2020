import React, {Component} from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import IconButton from '../layout/IconButton'
import CategoryDropDown from '../layout/CategoryDropDown';
import PopUp from '../layout/PopUp';
import { Config } from '../../config'
import ShoppingSettings from '../../shoppingSettings'
import ListEntryBO from '../../api/ListEntryBO';
import ShoppingAPI from '../../api/ShoppingAPI';

/**
 * Displays the PersonalShoppingList as designed in Figma. All items to be purchased by a person are listed on the list and can be ticked off the list. Finally the user can complete the shopping. 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
 */

const settings = ShoppingSettings.getSettings()

export default class PersonalShoppingList extends Component {

  state={
    items: [],
    checkedItems:[],
    selectedRetailer : 'All',
    market : null,
    flag : 'unclicked',
    solved: false,
    loadingInProgress: false, 
    loadingRetailersError: null, 
    addingRetailerError: null,
    currentUserID: settings.getCurrentUserID(),
    groupID: settings.getGroupID()
}

newItem = () => {
  ShoppingAPI.getAPI().personalItems(this.state.currentUserID, this.state.groupID).then(items => {this.setState({items : items})}).catch(e => console.log(e))
}

componentDidMount(){
  this.getListEntrys()
  this.newItem()
}

/** Fetches ListEntrysBOs for the current group */
async getListEntrys(){
  this.setState({
    loadingInProgress: true, 
    loadingRetailersError: null 
  })

  setTimeout(async () => {
    try {
      // TODO: change to real api
      const res = await fetch(Config.apiHost + '/Listentry/get_personal_items_of_group/')
      const json = await res.json()

      this.setState({
        loadingInProgress: false, 
        loadingRetailersError: null, 
        items: json, 
      })
    } catch (e){
      this.setState({
        loadingInProgress: false, 
        loadingRetailersError: '', 
      })
    } 
  }, 1000)
}

createUserItem(){
  let items = this.state.items
  console.log("items" + items)
  for (let index in items){
    let test = items[index]
    test['checkbox'] = false 
    }
  console.log("useritems" + items)
  return items
}

/* Returns an array with all Useritems that are unchecked  */
getUncheckedArticles(){
  let ArrUncheckedArticles = []
  let Useritems = this.createUserItem()
  Useritems.filter( item => {
    if(item.checkbox === false && (this.state.selectedRetailer === item.retailer || this.state.selectedRetailer === 'All')){
      ArrUncheckedArticles.push(item)
    }
  })
  return ArrUncheckedArticles
};

/* Returns an array with the categorys of all Useritems that are unchecked  */
getCategorys(){
  let ArrCategory = []
  let Useritems = this.getUncheckedArticles()
  Useritems.map(item => {
    if(!ArrCategory.includes(item.category)){
      ArrCategory.push(item.category)
    }
  });
  return ArrCategory
};

/* Renders an array with all categories and the containend unchecked Useritems */
renderUncheckedArticles(){
  let renderdArticles = []
  let ArrCategory = this.getCategorys();
  let Useritems = this.getUncheckedArticles();
  console.log('ArrCategory  ' + ArrCategory)
  for (let item in ArrCategory){
    renderdArticles.push( 
      <CategoryDropDown handleChange={this.handleChangeCheckbox.bind(this)} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></CategoryDropDown>
    )}
  return renderdArticles
};

/* Returns an array with all Useritems that are checked  */
/* getCheckedArticles(){
  let ArrCheckedArticles = []
  let Useritems = this.state.checkedItems()
  Useritems.filter( item => {
    if(item.checkbox === true && (this.state.selectedRetailer === item.retailer || this.state.selectedRetailer === 'All')){
      ArrCheckedArticles.push(item)
    }
  })
  return ArrCheckedArticles
}; */

/* Returns an array with the categorys of all Useritems that are checked  */
getCheckedArticlesCategory(){
  let ArrCheckedArticlesCategory = [];
  let ArrCheckedArticles = this.state.checkedItems
  ArrCheckedArticles.map( item => {
    if(!ArrCheckedArticlesCategory.includes(item.category)){
      ArrCheckedArticlesCategory.push(item.category)
    }
  })
  return ArrCheckedArticlesCategory
};

/* Renders an array with all categories and the containend checked Useritems */
renderCheckedCategoryArticles(){
  let renderdArticles = []
  let ArrCheckedArticles = this.state.checkedItems;
  let ArrCheckedArticlesCategory = this.getCheckedArticlesCategory();
  console.log(ArrCheckedArticles)
  for (let item in ArrCheckedArticlesCategory){
    renderdArticles.push( 
      <CategoryDropDown handleChange={this.handleChangeCheckbox.bind(this)} Useritems={ArrCheckedArticles} ArrCategory={ArrCheckedArticlesCategory} item={item}></CategoryDropDown>
    )}
    console.log('checked'   + ArrCheckedArticlesCategory)
    console.log('array'   + ArrCheckedArticles)
  return renderdArticles
};

/* Renders the list of unchecked or checked Useritems */
renderMyShoppingList(){
  if (this.state.flag === 'unclicked'){
    return this.renderUncheckedArticles()
  }

  if (this.state.flag === 'clicked'){
    return this.renderCheckedCategoryArticles()
  }
};

/* Renders the list of unchecked or checked Useritems */
renderReatailer(){
  let retailer = []
  let Useritems = this.state.items
  retailer.push('All')
  Useritems.map(item => {
    if(!retailer.includes(item.retailer)) {
      retailer.push(item.retailer)
    }
    console.log(retailer)
  })
return retailer
}

onClickList(){
  this.renderCheckedArticlesCategory()
}

getArticleOfRetailer(){
  let ArrSelectedRetailer = []
  let retailer = this.state.selectedRetailer
  let Useritems = this.createUserItem()
  Useritems.map( item => {
    if(item.retailer === retailer){
      ArrSelectedRetailer.push(item)
    }
  })
  console.log('ListeÄ ' + ArrSelectedRetailer)
  return ArrSelectedRetailer
}

handleChangeRetailer = e =>{
  this.setState({selectedRetailer : e.target.value})
}

handleChangeCheckbox(id){
  let Items = this.createUserItem()
  let checkedItems = this.state.checkedItems

  if (Items.filter(elem =>(elem.id === id)).length > 0){
    console.log("Bin drinne in items")
    Items.map( item => {
      if(item.id === id){
        let newItem = {...item}
        for (let element in Items){
          if(Items[element].id === newItem.id){
            newItem.checkbox = !newItem.checkbox
            Items.splice(element, 1,)
            this.setState({items : Items})
            this.state.checkedItems.push(newItem)
          }
        }
      }
    })
  }
  else {
  checkedItems.map( item => {
    if(item.id === id){
      let newItem = {...item}
      for (let element in checkedItems){
        if(checkedItems[element].id === newItem.id){
          console.log("bin drinn")
          newItem.checkbox = !newItem.checkbox
          checkedItems.splice(element, 1,)
          this.setState({checkedItems : checkedItems})
          Items.push(newItem)
        }
      }
    }
  })
 }
}

handlePopUp(){
  if(this.state.solved === true){
    return <PopUp open={true} handleChange={()=> this.setState({ solved : false})}></PopUp> 
  }
}

render(){

  console.log(this.state.selectedRetailer)
  let shops = this.renderReatailer()
  let all = 'ALL'
  console.log('Das ist Items:    ' + this.state.items)
  console.log(this.state.currentUserID)
  console.log("GroupID  " + this.state.groupID)

  return (
    <Grid 
      container
      direction='column'
      justify='space-between'
      alignItems="stretch"
      xs={12}
      spacing={1}        
    >
    
    <Grid 
      container
      direction= 'row'
      justify='flex-start'
      alignItems='flex-start'
      height= '20px'
      xs={12}
    >
      <Grid 
        container 
        xs={12}
        direction= 'row'
        alignItems='center'
        justify="space-between"
        >
        
          <Grid item xs={6} style={{marginTop: 10, marginBottom: 10}}>
            <FormControl style={{width: '170px', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>Retailer</InputLabel>
                <Select
                  value={this.state.selectedRetailer}
                  onChange={this.handleChangeRetailer}
                >
                  <MenuItem value= {this.state.selectedRetailer} disabled>Retailer</MenuItem>
                  {shops.map(element =>{
                    return <MenuItem value={element}>{element}</MenuItem>
                  })}
                </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}
          container
          justify= 'flex-end'
          > 
            <IconButton style={{marginLeft: 10}} size='small' icon='list' onclick={() => this.setState({flag : 'unclicked'})}></IconButton> 
            <IconButton style={{marginLeft: 10}} size='small' icon='euro' onclick={() => this.setState({flag : 'clicked'})}></IconButton> 
            <IconButton style={{marginLeft: 10, marginRight: 10}} size='small' icon='done' onclick={() => this.setState({ solved : true })}></IconButton> 
          </Grid>
      </Grid>
    </Grid>
    <Grid>
      {this.renderMyShoppingList()}
      {this.handlePopUp()}
    </Grid>
    </Grid>
)}}
