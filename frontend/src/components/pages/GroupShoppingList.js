import React, {Component} from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import DropDownGSL from '../layout/DropDownGSL'
import ShoppingSettings from '../../../src/shoppingSettings';
import ShoppingAPI from '../../api/ShoppingAPI';
import CircularLoadingProgress from '../dialogs/CircularLoadingProgress';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';


const settingsobj = ShoppingSettings.getSettings()

// hier dann beim fetch der Gruppenliste einfach fetch(... groupid = settingsobj.getGroupID())
// vlt noch mit try und catch falls keine gesetzt ist und man dann keine daten bekommen kann, bitten auf der Homepage
// die Gruppe auszuwählen

/**
 * Renders the Shoppinglist of a specific group.
 * Allows the user to switch between shoppinglists.
 * You can also change parameters of the listentry such as amount, purchaser, retailer, unit.
 * @author [Pascal Illg](https://github.com/pasillg)
 * @author [Niklas Denneler](https://github.com/niklasden)
 */

export default class GroupShoppingList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        items: [],
        open: false,
        listentry: this.props.listentry,
        shoppinglists: [],
        selected_shoppinglist: [],
        loadingInProgress: false,
        loadingItemsError: null,
        loadingShoppinglistsError: null,
        currentGroupID: settingsobj.getGroupID(),
      }
    }
 
  /* feteches the exisiting shoppinglists of the group */
  fetchShoppinglists = () => {
    ShoppingAPI.getAPI().getShoppinglistofGroup(settingsobj.getGroupID()).then(shoppinglistBOs => {
      this.setState({
        shoppinglists: shoppinglistBOs,
        loadingInProgress: false,
        loadingShoppinglistsError: null, 
      })
    }).catch(e => 
      this.setState({
        shoppinglists: [],
        loadingInProgress: false,
        loadingShoppinglistsError: e 
      })  
    );
    
    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingShoppinglistsError: null
    });
    
  }

  /* feteches all items */
  fetchItems = () => {
    this.setState({items : []});
    ShoppingAPI.getAPI().getItemsofGroup(settingsobj.getGroupID(), settingsobj.getCurrentShoppinglist()).then(listentryBOs => {
      // Set new state when AccountBOs have been fetched
      this.setState({  
        items: listentryBOs, 
        loadingInProgress: false,
        loadingItemsError: null,  
      })
    }).catch(e => 
        this.setState({
          items: [],
          loadingInProgress: false,
          loadingItemsError: e,
        })
      );
      //set loading to true
      this.setState({
        loadingInProgress: true,
        loadingItemsError: null,
      });
    };
    
    componentDidMount() {
      this.fetchShoppinglists();
    }

   /*
   * returns all category in which an article is available
   */
  getCategorys(){
    let ArrCategory = [];
    this.state.items.map(item => {
      if(!ArrCategory.includes(item.category)){
        ArrCategory.push(item.category)
      }
      return null
    });
    return ArrCategory
  }  
 
  /*
  * renders all articles per category
  */ 
 renderCategoryArticles(){
  let renderdArticles = [];
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

  /*
  * renders all articles per category
  */ 
  onClickDelete(id){
    let Items = [...this.state.items]
    Items.map( item => {
      if(item.id === id){
        let newItem = {...item}
        for (let element in Items){
          if(Items[element].id === newItem.id){
            Items.splice(element, 1)
            this.setState({items : Items})

            ShoppingAPI.getAPI().deleteItem(id).catch(e => console.log(e))
          }
        }
      }
      return null
    })
  }

  /*
  * resets the retailer, user, amount, unit or purchaser
  */ 
  handleChangeShoppinglist(v){
    this.setState({selected_shoppinglist: v.target.value});
    settingsobj.setCurrentShoppinglist(v.target.value);
    this.fetchItems();
  }
  
  render(){
    const {loadingInProgress, loadingItemsError, loadingShoppinglistsError} = this.state;
    return (
  
      <Grid 
      container
      direction='column' 
      justify='center'
      alignItems='center'
      style={{width: '100%'}}
      >
       
       <Grid item xs={12}  style={{marginTop: 10, marginBottom: 10}}>
            <FormControl style={{width: '25ch', height: '10ch', marginBottom: 15, textAlign: 'center'}}>
              <InputLabel style={{left:'13%'}}>Select Shopping List</InputLabel>
              <Select value={this.state.selected_shoppinglist} onChange={this.handleChangeShoppinglist.bind(this)}>
                {this.state.shoppinglists.map((item, key) => 
                    <MenuItem value={item.id}>{item.name}</MenuItem> 
                )}
              </Select>
            </FormControl>
            <CircularLoadingProgress show={loadingInProgress} />
      <ContextErrorMessage error={loadingItemsError} contextErrorMsg={'Failed to fetch Items'} onReload={this.fetchItems}/>
      <ContextErrorMessage error={loadingShoppinglistsError} contextErrorMsg={'Failed to fetch Shoppinglists'} onReload={this.fetchShoppinglists}/>
      </Grid>
  
      <Grid item xs={12} style={{marginBottom: 75, width: '100%'}}>
      {(this.state.currentGroupID === 0) ? 
              <div style={{marginTop:'20px', textAlign: 'center', fontWeight: 'bold'}}>
                No group found!<br /> Switch to HomePage and select your active group!
                </div>
            : this.renderCategoryArticles()
      }
      </Grid>
    </Grid>
    ) 
  }
}

GroupShoppingList.propTypes = {
  
}