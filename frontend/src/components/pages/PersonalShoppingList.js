import React, {Component} from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import IconButton from '../layout/IconButton'
import CategoryDropDown from '../layout/CategoryDropDown';
import PopUp from '../layout/PopUp';
import ShoppingSettings from '../../shoppingSettings'
import ListEntryBO from '../../api/ListEntryBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { timeout } from '../../timeout';

/**
 * Displays the PersonalShoppingList as designed in Figma. All items to be purchased by a person are listed on the list and can be ticked off the list. * Finally the user can complete the shopping. 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
 */


const settings = ShoppingSettings.getSettings()

export default class PersonalShoppingList extends Component {

  state={
    /* In the array items are all list items stored which assigned to the specific user  */
    items: [],

    /* In the array checkedItems the IDs of the list items are stored as soon as the checkbox is checked  */
    checkedItems:[],
    selectedRetailer : 'All',
    market : null,
    flag : 'unclicked',
    solved: false,
    loaded: true,
    loadingInProgress: false,
    currentUserID: settings.getCurrentUserID(),
    groupID: settings.getGroupID(),
}

/* 
* Fetchs the items.As long as the fetch is made, the spinner is executed. But only the first time. 
* After this the fetch is made, without executing the spinner. 
*/
getNewItem = () => {
  if (this.state.loaded === true){
    this.setState({loadingInProgress : true})
      ShoppingAPI.getAPI().personalItems(this.state.currentUserID, this.state.groupID)
      .then(items => {
        console.log(items)
        this.setState({items : items, loadingInProgress : false})
      })
      .catch(e => {
        console.log(e) 
        this.setState({loadingInProgress : false})
      })
  }
  else {
    ShoppingAPI.getAPI().personalItems(this.state.currentUserID, this.state.groupID)
      .catch(e => {
        console.log(e)
      })
  }
}

componentDidMount(){
  this.setTimeout()
}

/* 
*set Timeout of 30000ms. Every 30000ms the function newItem() is executed. 
*/
async setTimeout(){
  while(true){
    this.getNewItem()
    this.getItemsFromLocalStorage() 
    await timeout(30000)
  }
}

/* 
*returns the checkeditems array from the localStorage
*/
async getItemsFromLocalStorage(){

  try {
    let itemsunparsed = localStorage.getItem('checkeditems')
    let items = await JSON.parse(itemsunparsed)
    if (items.length > 0){
      this.setState({checkedItems : items})
    }
  }
  catch{}
}

/* 
*Returns an UserItem 
*/
createUserItem(){
  let items = this.state.items
  return items
}

/* 
*Returns an array with all Useritems that are unchecked (checkbox is unchecked)  
*/
getUncheckedArticles(){
  let ArrUncheckedArticles = [];
  let Useritems = this.createUserItem();
  Useritems.forEach(item => {
    if(this.state.checkedItems.includes(item.id) === false && (this.state.selectedRetailer === item.retailer || this.state.selectedRetailer === 'All')){
      ArrUncheckedArticles.push(item)
    };
  })
  return ArrUncheckedArticles;
};

/* 
*Returns an array with the categorys of all Useritems that are unchecked (checkbox is unchecked)  
*/
getCategorys(){
  let ArrCategory = [];
  let Useritems = this.getUncheckedArticles();
  Useritems.forEach(item => {
    if(!ArrCategory.includes(item.category)){
      ArrCategory.push(item.category);
    }
  });
  return ArrCategory;
};

/* 
*Renders an array with all categories and the containend unchecked Useritems (checkbox is unchecked)  
*/
renderUncheckedArticles(){
  let renderdArticles = [];
  let ArrCategory = this.getCategorys();
  let Useritems = this.getUncheckedArticles();
  for (let item in ArrCategory){
    renderdArticles.push( 
      <CategoryDropDown checkeditems={this.state.checkedItems} handleChange={this.handleChangeCheckbox.bind(this)} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></CategoryDropDown>
    )};
  return renderdArticles;
};

/* 
*Returns an array with all Useritems that are checked (checkbox is checked)  
*/
getCheckedArticles(){
  let ArrCheckedArticles = [];
  let Useritems = this.createUserItem();
  Useritems.forEach( item => {
    if(this.state.checkedItems.includes(item.id) === true && (this.state.selectedRetailer === item.retailer || this.state.selectedRetailer === 'All')){
      ArrCheckedArticles.push(item);
    }
  })
  return ArrCheckedArticles;
};

/* 
*Returns an array with the categorys of all Useritems that are checked (checkbox is checked)  
*/
getCheckedArticlesCategory(){
  let ArrCheckedArticlesCategory = [];
  let ArrCheckedArticles = this.getCheckedArticles();
  ArrCheckedArticles.forEach( item => {
    if(!ArrCheckedArticlesCategory.includes(item.category)){
      ArrCheckedArticlesCategory.push(item.category);
    }
  })
  return ArrCheckedArticlesCategory;
};

/* 
*Renders an array with all categories and the containend checked Useritems (checkbox is checked)  
*/
renderCheckedCategoryArticles(){
  let renderdArticles = [];
  let ArrCheckedArticles = this.getCheckedArticles();
  let ArrCheckedArticlesCategory = this.getCheckedArticlesCategory();
  for (let item in ArrCheckedArticlesCategory){
    renderdArticles.push( 
      <CategoryDropDown checkeditems={this.state.checkedItems} handleChange={this.handleChangeCheckbox.bind(this)} Useritems={ArrCheckedArticles} ArrCategory={ArrCheckedArticlesCategory} item={item}></CategoryDropDown>
    )}
    /* console.log('checked'   + ArrCheckedArticlesCategory);
    console.log('array'   + ArrCheckedArticles); */
  return renderdArticles;
};

/* 
*Renders the Array of unchecked or checked Useritems 
*/
renderMyShoppingList(){
  if (this.state.flag === 'unclicked'){
    return this.renderUncheckedArticles()
  }

  if (this.state.flag === 'clicked'){
    return this.renderCheckedCategoryArticles()
  }
};

/* 
*Renders an Array of unchecked or checked Useritems 
*/
renderReatailer(){
  let retailer = []
  let Useritems = this.state.items
  retailer.push('All')
  Useritems.forEach(item => {
    if(!retailer.includes(item.retailer)) {
      retailer.push(item.retailer)
    }
  /*   console.log(retailer) */
  })
  return retailer
}

onClickList(){
  this.renderCheckedArticlesCategory()
}

/* 
*returns an array with the retailers
*/
getArticleOfRetailer(){
  let ArrSelectedRetailer = []
  let retailer = this.state.selectedRetailer
  let Useritems = this.createUserItem()
  Useritems.forEach( item => {
    if(item.retailer === retailer){
      ArrSelectedRetailer.push(item)
    }
  })
  /* console.log('ListeÄ ' + ArrSelectedRetailer) */
  return ArrSelectedRetailer
}

/* 
* If the retailer is reset in the drop-down, this function is called and the state selectedRetailer is reset 
*/
handleChangeRetailer = e =>{
  this.setState({selectedRetailer : e.target.value})
}

/* 
* If the checkbox will be set from unchecked to checked or from checked to unchecked, this function is called.
*/
handleChangeCheckbox(id){
  let Items = this.createUserItem()
  /* console.log(Items) */
  let checkedItems = this.state.checkedItems

  /* 
  * If the ID of the ListItem is in the array CheckedItems, the ID is deleted from the array Checkeditems.  
  */
  if(checkedItems.includes(id)){
    checkedItems.forEach( (l,i) => {
      if (l === id){
        checkedItems.splice(i, 1)
        /* console.log("drin") */
      }
    }
  )}

  /* 
  *If the ID of the ListItem in which the status of the checkbox was reset is not in the array CheckedItems the ID is added to the array Checkeditems 
  * The Array CheckedItems will be stored in the localStorage
  */
  else {
    checkedItems.push(id)
  }
  localStorage.setItem('checkeditems', JSON.stringify(this.state.checkedItems))
  this.setState({checkedItems : checkedItems})
}

/* 
* The PopUp is opened in this function. If you click YES the function PurchaseCompleted() is executed. 
*/
handlePopUp(){
  if(this.state.solved === true){
    return <PopUp name={'Do you really want to finish the shopping?'} title={"Complete your purchse?"} open={true} 
    clickNo={() => 
      this.setState({ solved : false})
    }
    clickYes={() => 
      this.PurchaseCompleted()
    }></PopUp> 
  }
}

/* 
* If you click Yes in the popup, this function is executed. A new ListEntryBO is created and the purchasing date is set. Checkeditem is "emptied" and 
* the state is reset 
*/
async PurchaseCompleted(){
  let Arr = this.getCheckedArticles()
  
  Arr.forEach( async (item) => {
    let updatedItem = Object.assign(new ListEntryBO(), item);
    updatedItem.setBought("tbs");
    updatedItem.setRetailerid(null)

    /* console.log(updatedItem) */

    try {
      await ShoppingAPI.getAPI().updateListEntry(updatedItem)  
    } catch (e){
      console.log(e) 
    } 
  })

  Arr = []
  this.setState({checkedItems : Arr})
  this.setState({solved : false, loaded: true, loadingInProgress: true})
  await timeout(1000)
  this.getNewItem()    
  // this.renderMyShoppingList()

}


render(){

  let shops = this.renderReatailer()

  return (
    <Grid 
      container
      direction='column'
      justify='space-between'
      alignItems="stretch"
      xs={12}
      spacing={1}
      style={{marginBottom:50}}        
    >
    
    <Grid 
      containers
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
            <IconButton style={{marginLeft: 10}} size='small' icon='shopping_cart' onclick={() => this.setState({flag : 'clicked'})}></IconButton> 
            <IconButton style={{marginLeft: 10, marginRight: 10}} size='small' icon='done' onclick={() => this.setState({ solved : true })}></IconButton> 
          </Grid>
      </Grid>
    </Grid>
    <Grid>
      {this.state.loadingInProgress ?
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={25} />
      </div> : 
      this.renderMyShoppingList()}
      {this.handlePopUp()}
    </Grid>
    </Grid>
)}}
