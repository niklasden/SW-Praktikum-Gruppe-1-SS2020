import React, {Component} from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import DropDownGSL from '../layout/DropDownGSL'
import ShoppingSettings from '../../../src/shoppingSettings';
import ShoppingAPI from '../../api/ShoppingAPI';

const settingsobj = ShoppingSettings.getSettings()

// hier dann beim fetch der Gruppenliste einfach fetch(... groupid = settingsobj.getGroupID())
// vlt noch mit try und catch falls keine gesetzt ist und man dann keine daten bekommen kann, bitten auf der Homepage
// die Gruppe auszuwählen

/**
 * 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 */

export default class GroupShoppingList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        items: [],
        open: false,
        amount: "1",
        unit: '',
        selectedID: 0,
        listentry: this.props.listentry,
        shoppinglists: [],
        selected_shoppinglist: []
      }

    }
 

    fetchShoppinglists = () => {
      ShoppingAPI.getAPI().getShoppinglistofGroup(settingsobj.getGroupID()).then(shoppinglistBOs => {
        this.setState({
          shoppinglists: shoppinglistBOs,
        })
      }).catch(e => {
        this.setState({
          shoppinglists: [],
        })  
      }
      );
    };

    fetchItems = () => {
      this.setState({items : []})
      ShoppingAPI.getAPI().getItemsofGroup(settingsobj.getGroupID(), settingsobj.getCurrentShoppinglist()).then(listentryBOs => {
        // Set new state when AccountBOs have been fetched
        this.setState({  
          items: listentryBOs, 
        })
        console.log(listentryBOs);
      }).catch(e => 
          this.setState({
            items: [],
          })
        );
      };
  
  componentDidMount() {
    this.fetchShoppinglists();
  }

  getCategorys(){
    let ArrCategory = []
    this.state.items.map(item => {
      if(!ArrCategory.includes(item.category)){
        ArrCategory.push(item.category)
      }
      return null
    });
    return ArrCategory
  }  
  /*
  renderCategoryArticles(){
    let renderdArticles = []
    let Useritems = this.state.items;
    let ArrCategory = this.getCategorys();
    for (let item in ArrCategory){
      renderdArticles.push(
        <DropDownGSL 
        key={ArrCategory[0]}
          onClickDeleteButton={this.onClickDelete.bind(this)} 
          Useritems={Useritems} 
          ArrCategory={ArrCategory} 
          item={item}
          fetchItems={this.fetchItems}
          />
      )}
    return renderdArticles
  };
  */

 renderCategoryArticles(){
  let renderdArticles = []
  
  let ArrCategory = this.getCategorys();
  for (let item in ArrCategory){
    renderdArticles.push(
      <DropDownGSL 
      key={ArrCategory[0]}
        onClickDeleteButton={this.onClickDelete.bind(this)} 
        ArrCategory={ArrCategory} 
        item={item}
        fetchItems={this.fetchItems}
        {...this.state}
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
      return null
    })
  }
  
  handleChangeShoppinglist(v){
    this.setState({selected_shoppinglist: v.target.value});
    settingsobj.setCurrentShoppinglist(v.target.value);
    this.fetchItems();
  }
  
  render(){
    return (
      <Grid 
      container
      direction='column' //was row
      justify='center'
      // alignItems='center'
      style={{width: '100%'}}
      /*alignItems="stretch"*/
      >
      {/* <Grid item xs={12}> 
        <TextInputBar key={"search"}placeholder="search..." icon="search" />
      </Grid>
      */}
       <Grid item xs={6} style={{marginTop: 10, marginBottom: 10}}>
            <FormControl style={{width: '25ch', height: 35, marginBottom: 15, textAlign: 'center'}}>
              <InputLabel style={{left:'13%'}}>Select Shopping List</InputLabel>
              
              <Select value={this.state.selected_shoppinglist} onChange={this.handleChangeShoppinglist.bind(this)}>
                {this.state.shoppinglists.map((item, key) => 
                    <MenuItem value={item.id}>{item.name}</MenuItem> 
                )}
                
              </Select>
            </FormControl>
      </Grid>
      <Grid item xs={12} style={{marginBottom: 75}}>
        {this.renderCategoryArticles()}
      </Grid>
    </Grid>
    ) 
  }
}

GroupShoppingList.propTypes = {
  
}