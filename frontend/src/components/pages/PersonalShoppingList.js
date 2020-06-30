import React, {Component} from 'react';
import { Grid,Button, FormControl, InputLabel, Select } from '@material-ui/core';
import IconButton from '../layout/IconButton'
import CategoryDropDown from '../layout/CategoryDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import PopUp from '../layout/PopUp';



/**
 * Displays the PersonalShoppingList as designed in Figa. All items to be purchased by a person are listed on the list and can be ticked off the list. Finally the user can complete the shopping. 
 * 
 * @author [Pascalv Illg](https://github.com/pasillg)
 */


export default class PersonalShoppingList extends Component {

  state={
    items: [
      {id: 1, name: "Apfel", category: "fruits", amount: "5", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: false, retailer: 'Aldi'},
      {id: 2, name: "Birne", category: "fruits", amount: "2", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: false, retailer: 'Edeka' },
      {id: 3, name: "Erdbeerkäse", category: "vegetables", amount: "2", unit: "Stk.", person: 'Herbert', userID: 2, checkbox: false, retailer: 'Lidl' },
      {id: 4, name: "Mango", category: "vegetables", amount: "2", unit: "g", person: 'Manfred', userID: 1, checkbox: true, retailer: 'Aldi' },
      {id: 5, name: "Lyoner", category: "vegetables", amount: "2", unit: "Stk.", person: 'Herbert', userID: 1, checkbox: true, retailer: 'Edeka' },
  ],
  selectedRetailer : null,
  market : null,
  flag : 'unclicked'
}

/* All UserItems with the ID 1 */
getUserItems(){
  const Useritems = this.state.items.filter(item =>{
    if (item.userID === 1) {
      return item
    }
  });
  return Useritems
};

getCategorys(){
  let ArrCategory = []
  let Useritems = this.getUserItems()
  Useritems.map(item => {
    if(!ArrCategory.includes(item.category)){
      ArrCategory.push(item.category)
    }
  });
  return ArrCategory
};

getUncheckedArticles(){
  let ArrUncheckedArticles = []
  let Useritems = this.getUserItems()
  Useritems.filter( item => {
    if(item.checkbox === false){
      ArrUncheckedArticles.push(item)
    }
  })
  return ArrUncheckedArticles
};

renderCategoryArticles(){
  let renderdArticles = []
  let ArrCategory = this.getUncheckedArticles();
  let Useritems = this.getUserItems();
  console.log('ArrCategory  ' + ArrCategory)
  for (let item in ArrCategory){
    renderdArticles.push( 
      <CategoryDropDown handleChange={this.handleChangeCheckbox.bind(this)} Useritems={Useritems} ArrCategory={ArrCategory} item={item}></CategoryDropDown>
    )}
  return renderdArticles
};

renderCheckedArticles(){
  let ArrCheckedArticles = []
  let Useritems = this.getUserItems()
  Useritems.filter( item => {
    if(item.checkbox === true){
      ArrCheckedArticles.push(item)
    }
  })
  return ArrCheckedArticles
};

renderCheckedArticlesCategory(){
  let ArrCheckedArticlesCategory = [];
  let ArrCheckedArticles = this.renderCheckedArticles();
  ArrCheckedArticles.map( item => {
    if(!ArrCheckedArticlesCategory.includes(item.category)){
      ArrCheckedArticlesCategory.push(item.category)
    }
  })
  return ArrCheckedArticlesCategory
};

renderCheckedCategoryArticles(){
  let renderdArticles = []
  let ArrCheckedArticles = this.renderCheckedArticles();
  let ArrCheckedArticlesCategory = this.renderCheckedArticlesCategory();
  for (let item in ArrCheckedArticlesCategory){
    renderdArticles.push( 
      <CategoryDropDown Useritems={ArrCheckedArticles} ArrCategory={ArrCheckedArticlesCategory} item={item}></CategoryDropDown>
    )}
    console.log('checked'   + ArrCheckedArticlesCategory)
    console.log('array'   + ArrCheckedArticles)
  return renderdArticles
};

renderMyShoppingList(){
  if (this.state.flag === 'unclicked'){
    return this.renderCategoryArticles()
  }

  if (this.state.flag === 'clicked'){
    return this.renderCheckedCategoryArticles()
  }
};





renderReatailer(){
  let retailer = []
  let Useritems = this.getUserItems()
  retailer.push('All')
  Useritems.map(item => {
    if(!retailer.includes(item.retailer)) {
      retailer.push(item.retailer)
    }
  })
return retailer
}




onClickList(){
  this.renderCheckedArticlesCategory()
}

getArticleOfRetailer(){
  let ArrSelectedRetailer = []
  let retailer = this.state.selectedRetailer
  let Useritems = this.getUseritems()
  Useritems.map( item => {
    if(item.retailer === retailer){
      ArrSelectedRetailer.push(item)
    }
  })
  console.log('ListeÄ ' + ArrSelectedRetailer)
  return ArrSelectedRetailer
}

handleChangeRetailer = e =>{
  this.setState({market: e.target.value})
}

NameRetailer=() =>{
  this.state.market()
}

handleChangeCheckbox(id){
  let Useritems = this.getUserItems()
  Useritems.map( item => {
    if(item.id === id){
      if(item.checkbox === true){
        item.checkbox = false
      }
      if(item.checkbox === false){
        item.checkbox = true
      }
    }
  })
  console.log(this.state.items)
  return 
}

render(){

  console.log(this.state.selectedRetailer)
  let shops = this.renderReatailer()
  let all = 'ALL'


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
                  value={'Hallo'}
                  onChange={this.handleChangeRetailer}
                >
                  <MenuItem value= "" disabled>Retailer</MenuItem>
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
            <IconButton style={{marginLeft: 10}} size='small' icon='euro' onclick={() => this.setState()({flag : 'clicked'})}></IconButton> 
            <IconButton style={{marginLeft: 10, marginRight: 10}} size='small' icon='done' onclick={() => <PopUp></PopUp>}
            ></IconButton> 
          </Grid>
      </Grid>
    </Grid>
    <Grid id='test'>
      {this.renderMyShoppingList()}
    </Grid>
    </Grid>
)}}
