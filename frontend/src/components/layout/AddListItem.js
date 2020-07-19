import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, TextField } from "@material-ui/core";
import PropTypes, { array } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import ShoppingAPI from '../../api/ShoppingAPI';
import ListEntryBO from '../../api/ListEntryBO';
import ShoppingSettings from '../../../src/shoppingSettings';
import { Config } from '../../config';


/**
 * Displays an PopUp. 
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
*/

const settingsobj = ShoppingSettings.getSettings()


const styles = theme => ({
  formControl: {
    minWidth: '100%'
  }
});

class AddListItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        item: this.props.item, 
        article_id: this.props.item.id,
        //shoppinglist: this.props.item.shoppinglist_id,
        selected_list_id:"",
        shoppinglists: [],
        selected_shoppinglist:[], 
        selectedID: 0,
        
    }
     this.saveItem = this.saveItem.bind(this); 
  }

   async fetchShoppinglists() {
       let response = await fetch(Config.apiHost + '/shoppinglist/?group_id=' +settingsobj.getGroupID())
       let data = await response.json()
       //console.log(data)
       this.setState({shoppinglists: data})
  }; 

  componentDidMount(){
      this.fetchShoppinglists();
  }
    

  handleChangeList(v) {
    this.setState({selected_list_id: v.target.value});
    this.fetchShoppinglists();
}
  saveItem = () => {
    let insertedItem = Object.assign(new ListEntryBO(), this.state.item);
    //Updates the parameters we want to change
    insertedItem.setArticle(this.state.article_id);
    //insertedItem.setGroupid(this.state.group_id);
    insertedItem.setShoppinglistid(this.state.shoppinglist_id)
    
    //Sends updated ListEntry Object to the API, in case of Error it logs it
    ShoppingAPI.getAPI().insertListEntry(insertedItem).then(this.props.PressButtonConfirm).catch(e => console.log(e))
  }

  
  render() {
      console.log(settingsobj.getGroupID())
      console.log(this.state.shoppinglists)

    
    return (

    <Dialog open={this.props.open} aria-labelledby="alert title" aria-describedby="description">
      <DialogTitle id="alert title" style={{textAlign: "center"}}>{"Add "+this.state.item.name}</DialogTitle>
      <DialogContent>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems= 'center'
        spacing={4}
        style={{width: 'calc(100% + 15px)', fontSize: '15px'}}
      >
      <Grid item xs={12} >
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>SHOPPING LIST</InputLabel>
                <Select defaultValue={this.state.selected_shoppinglist} value={this.state.selected_shoppinglist} onChange={this.handleChangeList.bind(this)}>
                    {this.state.shoppinglists.map((item, key) => 
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )}
                </Select>

      </FormControl>
      </Grid>
      </Grid>

      <DialogActions style={{justifyContent: "center"}}>
        <Button color="primary" onClick={() => this.saveItem()}>
          SAVE
        </Button>
        <Button onClick={this.props.PressButtonBack} color="primary" autoFocus>
          BACK
        </Button>
      </DialogActions>
      </DialogContent>
    </Dialog>
    )
}}

AddListItem.propTypes = {
  amount: PropTypes.string,
  onChange: PropTypes.func,
  unit: PropTypes.string,
  handleChange: PropTypes.string,
  PressButtonBack: PropTypes.func,
  PressButtonConfirm: PropTypes.func,
  retailer: PropTypes.array,
  user: PropTypes.array,
  fetchItems: PropTypes.func
}

export default withStyles(styles)(AddListItem);