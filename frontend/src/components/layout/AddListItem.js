import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, TextField } from "@material-ui/core";
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
    height: 20, 
    marginLeft: 10, 
    marginRight:10, 
    marginBottom: 10
  },

  popUp: {
      width: '300px', 
      fontSize: '15px',      
  }
});

class AddListItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        item: this.props.item, 
        article_id: this.props.item.id,
        category: this.props.item.category,
        amount: null, 
        unit: null, 
        shoppinglists: [],
        selected_shoppinglist: null, 
        retailers: [], 
        selected_retailer_id: null,
        users:[],
        selected_user_id: null,
        isloading: false,


        units: [
          {id: 'g', name: 'g'},
          {id: 'l', name: 'l'},
          {id: 'ml', name: 'ml'},
          {id: 'Stk.', name: 'Stk.'},
          {id: 'Pkg.', name: 'Pkg.'},
        ]

        
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

  fetchGroupMembers = () => {
    ShoppingAPI.getAPI().getUsers(settingsobj.getGroupID()).then(userBOs => {
      this.setState({
        users: userBOs
      })
    }).catch(e => 
        console.log(e)
      );
  }

  setUnit(v) {
    this.setState({unit: v.target.value});
  }

  setUser(v) {
    this.setState({selected_user_id: v.target.value});
  }

  setAmount(v) {
    this.setState({amount: v.target.value})
  }
  componentDidMount(){
      this.fetchShoppinglists();
      this.fetchRetailers();
      this.fetchGroupMembers();
  }
    
  saveItem = () => {
    console.log(this.state.selected_shoppinglist)
    console.log(this.state.article_id)
    console.log(this.state.selected_retailer_id)
    console.log(this.state.amount)
    console.log(this.state.unit)


    let insertedItem = Object.assign(new ListEntryBO(), this.state.item);
    //Insert the parameters of the new ListEnty
    insertedItem.setArticleid(this.state.article_id);
    insertedItem.setShoppinglistid(this.state.selected_shoppinglist);
    insertedItem.setRetailer(null);
    insertedItem.setRetailerid(this.state.selected_retailer_id);
    insertedItem.setUserid(this.state.selected_user_id);
    insertedItem.setId(null);
    insertedItem.setGroupid(settingsobj.getGroupID());
    insertedItem.setAmount(this.state.amount);
    insertedItem.setUnit(this.state.unit);
    insertedItem.setBought(null);
    insertedItem.setName(null);
    insertedItem.setCategory(null);

    
    //Sends new ListEntry Object to the API, in case of Error it logs it
    ShoppingAPI.getAPI().insertListEntry(insertedItem).then(() => {console.log(insertedItem); this.props.PressButtonConfirm()}).catch(e => console.log(e))
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

      <Grid item xs={12} >
      <FormControl
      className={classes.formControl} 
      >
                <InputLabel>USER</InputLabel>
                <Select  
                onChange={(e) => this.setState({selected_user_id: e.target.value})}
                value={this.state.selected_user_id}>
                
                    {this.state.isloading ?
                        <div style={{display: 'flex', justifyContent: 'center'}}>                 
                            <CircularProgress size={25} />               
                        </div>
                        :
                        this.state.users.map((item, key) => 
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )}
                    </Select>
      </FormControl>
      </Grid>
      <Grid container xs={12}
      justify = 'center'
      alignItems= 'center'
      style={{paddingTop:10, paddingBottom:10}}
      spacing={4}

      >
        <Grid item xs={6} 
          style={{paddingLeft:25}}
          justify='center'
          alignItems= 'center'
        >
          <InputLabel>AMOUNT</InputLabel>
          <TextField onChange={this.setAmount.bind(this)} value={this.state.amount}>
          </TextField>
        </Grid>

        <Grid item xs={6}
        style={{paddingRight:35}}
        justify='center'
        alignItems= 'center'
        >
          {/**
          <FormControl style={{width: '100%'}}>
                    <InputLabel>UNIT</InputLabel>
                    <Select 
                      onChange={this.setUnit.bind(this)}
                      value = {this.state.unit}
                    >
                        <MenuItem value={'kg'}>Kg</MenuItem>
                        <MenuItem value={'g'}>g</MenuItem>
                        <MenuItem value={'l'}>l</MenuItem>
                        <MenuItem value={'ml'}>ml</MenuItem>
                        <MenuItem value={'Stk.'}>Stk.</MenuItem>
                        <MenuItem value={'Pkg.'}>Pkg.</MenuItem>
                    </Select>
          </FormControl>
        */}

          <FormControl style={{width: '100%'}}>
                    <InputLabel>UNIT</InputLabel>
                    <Select 
                      onChange={(e) => this.setState({unit: e.target.value})}
                      value = {this.state.unit}>
                        {
                          this.state.units.map((element) => {
                          return <MenuItem value = {element.id}>{element.name}</MenuItem>
                          })
                        }
                    </Select>
          </FormControl>

        </Grid>
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