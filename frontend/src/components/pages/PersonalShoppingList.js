import React, {Component} from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import IconButton from '../layout/IconButton'
import CategoryDropDown from '../layout/CategoryDropDown';
import PopUp from '../layout/PopUp';
import { Config } from '../../config'
import ShoppingSettings from '../../shoppingSettings'
import ListEntryBO from '../../api/ListEntryBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { timeout } from '../../timeout';

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
    loading: true, 
    currentUserID: settings.getCurrentUserID(),
    groupID: settings.getGroupID()
}

newItem = () => {
  this.setState({loadingInProgress : true})
  ShoppingAPI.getAPI().personalItems(this.state.currentUserID, this.state.groupID)
  .then(items => {
    this.setState({items : items, loadingInProgress : false})
  })
  .catch(e => {
    console.log(e) 
    this.setState({loadingInProgress : false})
  })
}

componentDidMount(){
 /*  while(loading === true){

    setTimeout(30000)
    await timeout(30000)



  } */
  this.newItem()
  this.getItemsFromLocalStorage() 
  localStorage.clear()
}

async getItemsFromLocalStorage(){

  try {
    let itemsunparsed = localStorage.getItem('checkeditems')
    console.log(itemsunparsed)
    let items = await JSON.parse(itemsunparsed)
    console.log(items)
    if (items.length > 0){
      this.setState({checkedItems : items})
    }
  }
  catch{}
}

createUserItem(){
  let items = this.state.items
 /*  console.log(this.state.checkedItems)
  console.log("items" + items)
  for (let index in items){
    let test = items[index]
    if (this.state.checkedItems.filter(elem => elem.id === test.id).length >0){
      test['checkbox'] = true
      console.log("checkbox true" + test.id)
    }
    else{
      test['checkbox'] = false 
      console.log("checkbox false" + test.id)
    }  
  }
  console.log("useritems" + items) */
  return items
}

/* Returns an array with all Useritems that are unchecked  */
getUncheckedArticles(){
  let ArrUncheckedArticles = []
  let Useritems = this.createUserItem()
  Useritems.filter( item => {
    if(this.state.checkedItems.includes(item.id) === false && (this.state.selectedRetailer === item.retailer || this.state.selectedRetailer === 'All')){
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
      <CategoryDropDown checkeditems={this.state.checkedItems} handleChange={this.handleChangeCheckbox.bind(this)} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></CategoryDropDown>
    )}
  return renderdArticles
};

/* Returns an array with all Useritems that are checked  */
getCheckedArticles(){
  let ArrCheckedArticles = []
  let Useritems = this.createUserItem()
  Useritems.filter( item => {
    if(this.state.checkedItems.includes(item.id) === true && (this.state.selectedRetailer === item.retailer || this.state.selectedRetailer === 'All')){
      ArrCheckedArticles.push(item)
    }
  })
  return ArrCheckedArticles
};

/* Returns an array with the categorys of all Useritems that are checked  */
getCheckedArticlesCategory(){
  let ArrCheckedArticlesCategory = [];
  let ArrCheckedArticles = this.getCheckedArticles();
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
  let ArrCheckedArticles = this.getCheckedArticles();
  let ArrCheckedArticlesCategory = this.getCheckedArticlesCategory();
  console.log(ArrCheckedArticles)
  for (let item in ArrCheckedArticlesCategory){
    renderdArticles.push( 
      <CategoryDropDown checkeditems={this.state.checkedItems} handleChange={this.handleChangeCheckbox.bind(this)} Useritems={ArrCheckedArticles} ArrCategory={ArrCheckedArticlesCategory} item={item}></CategoryDropDown>
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
  console.log(Items)
  let checkedItems = this.state.checkedItems

  if(checkedItems.includes(id)){
    checkedItems.forEach( (l,i) => {
      if (l === id){
        checkedItems.splice(i, 1)
        console.log("drin")
      }
    }
  )}
  else {
    checkedItems.push(id)
  }

  this.setState({checkedItems : checkedItems})


  

/*   if (Items.filter(elem =>(elem.id === id)).length > 0){
    console.log("Bin drinne in items") */
/*     let newItem = {}
    Items.forEach( (item, key) => {
      if(item.id === id){
        newItem = Object.assign({},item)
            console.log(newItem)
            newItem.checkbox = true
            console.log(newItem.checkbox)
            console.log(newItem)
            Items.splice(key, 1, newItem)
            console.log(Items)
            const wholeNewItems = [] 
              Items.forEach((el, key) => {   
                if (el.id == newItem.id){ 
                  console.log("bin in der if")
                  wholeNewItems.push({ ...newItem })   
                } 
                else {
                  wholeNewItems.push({...el})  
                } 
              }) 
              console.log(wholeNewItems)
              this.setState({items: wholeNewItems})   
      }
    })
} */
           /*  let elemFound = false;
            for (let elem in checkedItems){
              if (checkedItems[elem].id === id){
                this.state.checkedItems.splice(elem, 1,)
                elemFound = true
              }
             
            }
            if (elemFound === false) {
              this.state.checkedItems.push(id)
            }
      }
    })
    localStorage.setItem('checkeditems', JSON.stringify(this.state.checkedItems))
  } */
/* 
  Items.map( item => {
    if(item.id === id){
      let newItem = {...item}
      for (let element in Items){
        if(Items[element].id === newItem.id){
          console.log("bin drinn")
          newItem.checkbox = !newItem.checkbox
          Items.splice(element, 1, newItem)
          console.log(Items)
          this.setState({items : Items})
          console.log(Items)
        }
      }
    }
  }) */
 /*  localStorage.setItem('checkeditems', JSON.stringify(this.state.checkedItems)) */
}


handlePopUp(){
  if(this.state.solved === true){
    return <PopUp name={'Willst du den Einkauf wirklich abschließen?'} title={"Einkauf abschließen?"} open={true} clickNo={()=> this.setState({ solved : false})}
    clickYes={() => this.PurchaseCompleted()}></PopUp> 
  }
}

PurchaseCompleted(){
  let Arr = this.getCheckedArticles()
  
  Arr.map( item => {
    let updatedItem = Object.assign(new ListEntryBO(), item);
    updatedItem.setBought("date");
    updatedItem.setRetailerid(null)

    console.log(updatedItem)

    ShoppingAPI.getAPI().updateListEntry(updatedItem).catch(e => console.log(e))
  } )

  Arr = []
  this.setState({checkedItems : Arr})
  this.setState({solved : false})
}

render(){

  console.log(this.state.selectedRetailer)
  let shops = this.renderReatailer()
  let all = 'ALL'
  console.log(this.state.items)
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
            <IconButton style={{marginLeft: 10}} size='small' icon='euro' onclick={() => this.setState({flag : 'clicked'})}></IconButton> 
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
