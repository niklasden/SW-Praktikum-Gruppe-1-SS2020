import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';
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
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'


/**
 * Displays an PopUp. 
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
*/

const settingsobj = ShoppingSettings.getSettings()


const styles = theme => ({
  formControl: {
    width: '90%', 
    height: 35, 
    marginLeft: 10, 
    marginRight:10, 
    marginBottom: 10
  },

  popUp: {
      width: '300px', 
      fontSize: '15px'
  }
});

class AddListItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        item: this.props.item, 
        article_id: this.props.item.id,
        category: this.props.item.category,
        shoppinglists: [],
        selected_shoppinglist:"", 
        retailers: [], 
        selected_retailer_id:"",
        
        
        //shoppinglist_id:"",
        //selectedID: 0,
        isloading: false,

        
    }
     this.saveItem = this.saveItem.bind(this); 
  }

   async fetchShoppinglists() {
       this.setState({isloading: true})
       let response = await fetch(Config.apiHost + '/shoppinglist/?group_id=' +settingsobj.getGroupID())
       let data = await response.json()
       this.setState({shoppinglists: data, isloading:false})
  }; 

  async fetchRetailers(){
      this.setState({isloading: true})
      let response = await fetch(Config.apiHost+'/Retailer')
      let data = await response.json()
      this.setState({retailers:data, isloading:false})
  }

  componentDidMount(){
      this.fetchShoppinglists();
      this.fetchRetailers();
  }
    
  saveItem = () => {
    console.log(this.state.selected_shoppinglist)
    console.log(this.state.article_id)
    console.log(this.state.selected_retailer_id)

    let insertedItem = Object.assign(new ListEntryBO(), this.state.item);
    //Insert the parameters of the new ListEnty
    insertedItem.setArticleid(this.state.article_id);
    insertedItem.setShoppinglistid(this.state.selected_shoppinglist);
    insertedItem.setRetailer(this.state.selected_retailer_id);
    //insertedItem.setRetailerid(123456789);
    insertedItem.setUserid('123456789');
    insertedItem.setId(123456789);
    insertedItem.setGroupid(settingsobj.getGroupID());
    insertedItem.setAmount(123456789);
    insertedItem.setUnit('123456789');
    insertedItem.setBought('123456789');
    insertedItem.setName('123456789');
    insertedItem.setCategory('123456789');
    //insertedItem.setRetailer('123456789');

    
    //Sends new ListEntry Object to the API, in case of Error it logs it
    ShoppingAPI.getAPI().insertListEntry(insertedItem).then(() => {console.log('test'); this.props.PressButtonConfirm()}).catch(e => console.log(e))
  }

  
  render() {

    const  classes  = this.props.classes

    return (

    <Dialog open={this.props.open} aria-labelledby="alert title" aria-describedby="description"> 
      <DialogTitle id="alert title" style={{textAlign: "center"}}>{"add "+this.state.item.name}</DialogTitle>
      <DialogContent>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems= 'center'
        spacing={4}
        className={classes.popUp}
      >
      <Grid item xs={12} >
      <FormControl
      className={classes.formControl} 
      >
                <InputLabel>SHOPPING LIST</InputLabel>
                <Select  
                onChange={(e) => this.setState({selected_shoppinglist: e.target.value})}
                value={this.state.selected_shoppinglist}>
                
                    {this.state.isloading ?
                        <div style={{display: 'flex', justifyContent: 'center'}}>                 
                            <CircularProgress size={25} />               
                        </div>
                        :
                        this.state.shoppinglists.map((item, key) => 
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )}
                </Select>
      </FormControl>
      </Grid>

      <Grid item xs={12} >
      <FormControl
      className={classes.formControl} 
      >
                <InputLabel>RETAILER</InputLabel>
                {/**
                <Select defaultValue={this.getRetailerbyProps()} value={this.state.item.retailer.id} onChange={this.handleChangeRetailer.bind(this)}>
                  {this.props.retailer && this.props.retailer.map(item =>{
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  })}
                </Select> */}

                <Select  
                onChange={(e) => this.setState({selected_retailer_id: e.target.value})}
                value={this.state.selected_retailer_id}>
                
                    {this.state.isloading ?
                        <div style={{display: 'flex', justifyContent: 'center'}}>                 
                            <CircularProgress size={25} />               
                        </div>
                        :
                        this.state.retailers.map((item, key) => 
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
  onChange: PropTypes.func,
  PressButtonBack: PropTypes.func,
  PressButtonConfirm: PropTypes.func,
}

export default withStyles(styles)(AddListItem);