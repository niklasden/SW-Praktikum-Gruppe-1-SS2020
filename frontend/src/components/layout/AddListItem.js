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
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const settingsobj = ShoppingSettings.getSettings()

/**
 * Displays a PopUp. 
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
*/
class AddListItem extends Component {
  constructor(props) {
    super(props);

    // Inits the state    
    this.state = {
      selected_shoppinglist: null,
      selected_user_id: null, 
      selected_retailer_id: null,
      amount: "1", 
      unit: null,

      shoppinglists: [],
      users:[],
      retailers: [], 
      units: [
        {id: 'g', name: 'g'},
        {id: 'kg', name: 'kg'},
        {id: 'l', name: 'l'},
        {id: 'ml', name: 'ml'},
        {id: 'Stk.', name: 'Stk.'},
        {id: 'Pkg.', name: 'Pkg.'},
      ],

      isloading: false,
    }
      this.saveItem = this.saveItem.bind(this); 
  }

  /** Fetches ShoppinglistBOs for the current group */
  async fetchShoppinglists() {
    this.setState({isloading: true})
    let response = await fetch(Config.apiHost + '/shoppinglist/?group_id=' +settingsobj.getGroupID(), {credentials: 'include'})
    let data = await response.json()
    this.setState({shoppinglists: data, isloading:false})
  }; 

  /** Fetches RetailerBOs */
  async fetchRetailers(){
		this.setState({isloading: true})
		let response = await fetch(Config.apiHost+'/Retailer', {credentials: 'include'})
		let data = await response.json()
		this.setState({retailers:data, isloading:false})
  }

  /** Fetches UserBOs of the current group */
  fetchGroupMembers = () => {
    ShoppingAPI.getAPI().getUsers(settingsobj.getGroupID()).then(userBOs => {
      this.setState({
        users: userBOs
      })
    }).catch(e => 
			console.log(e)
		);
  }

  /** Sets the Unit of the ListEntry */
  setUnit(v) {
    this.setState({unit: v.target.value});
  }

  /** Sets the User of the ListEntry */
  setUser(v) {
    this.setState({selected_user_id: v.target.value});
  }

  /** Sets the amount of the ListEntry*/
  setAmount(v) {
    this.setState({amount: v.target.value})
  }
  
  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount(){
		this.fetchShoppinglists();
		this.fetchRetailers();
		this.fetchGroupMembers();
  }
 
  /** Insert a new ListentyBO */
  saveItem = () => {   
    let insertedItem = Object.assign(new ListEntryBO(), this.props.item);
    //Insert the parameters of the new ListEnty
    insertedItem.setArticleid(this.props.item.id);
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
    ShoppingAPI.getAPI().insertListEntry(insertedItem).then(() => {
      // console.log(insertedItem); 
      this.props.PressButtonConfirm()

      this.resetState()
    }).catch(e => console.log(e))
  }

  /** reset state after saving item */
  resetState(){
    this.setState({
      selected_shoppinglist: null,
      selected_user_id: null, 
      selected_retailer_id: null,
      amount: "1", 
      unit: null,
    })
  }

  /** Renders the component */
  render() {
    const  classes  = this.props.classes

    return (
    <Dialog open={this.props.open} aria-labelledby="alert title" aria-describedby="description"> 
      <DialogTitle id="alert title" style={{textAlign: "center"}}>{"add "+this.props.item.name}</DialogTitle>
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
								value={this.state.selected_shoppinglist}
							>
								{this.state.isloading ?
									<div style={{display: 'flex', justifyContent: 'center'}}>                 
										<CircularProgress size={25}/>               
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
									value={this.state.selected_retailer_id}
                >
                  {this.state.isloading ?
                    <div style={{display: 'flex', justifyContent: 'center'}}>                 
                      <CircularProgress size={25}/>               
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
                	value={this.state.selected_user_id}
                >
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
							<TextField 
								label="AMOUT"
								onChange={this.setAmount.bind(this)} 
								value={this.state.amount}>
							</TextField>
            </Grid>

						<Grid 
							item xs={6}
							style={{paddingRight:35}}
							justify='center'
							alignItems= 'center'
            >
              <FormControl style={{width: '100%'}}>
                <InputLabel>UNIT</InputLabel>
                <Select 
									onChange={(e) => this.setState({unit: e.target.value})}
									value = {this.state.unit}
								>
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
            CANCEL
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
    )
}}

/** Component specific styles */
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

/** PropTypes */
AddListItem.propTypes = {
  onChange: PropTypes.func,
  PressButtonBack: PropTypes.func,
  PressButtonConfirm: PropTypes.func, 
}

export default withStyles(styles)(AddListItem);