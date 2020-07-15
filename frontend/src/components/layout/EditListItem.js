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
/**
 * Displays an PopUp. 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

const styles = theme => ({
  formControl: {
    minWidth: '100%'

  },
  popover:{   
  }
});

class EditListItem extends Component {
  constructor(props) {
    super(props);
    /*
    let amt = '', unt = '', usr = '', rt = '', aid ='', sid = '';
    if(props.listentry) {
      amt = props.listentry.getAmount();
      unt = props.listentry.getUnit();
      usr = props.listentry.getUser();
      rt  = props.listentry.getRetailer();
      aid = props.listentry.getArticleid();
      sid = props.listentry.getShoppinglistid();
     }
     */
    this.state = {
      item: this.props.item,
      amount: this.props.item.amount,
      unit: this.props.item.unit,
      user: this.props.item.user_id,
      retailer_id: this.props.item.retailer_id,
      article_id: this.props.item.article_id,
      shoppinglist_id: this.props.item.shoppinglist_id,
      group_id: this.props.item.group_id,
      bought: this.props.item.bought,
      retailer: this.props.item.retailer,
      selected_user_id: "",
      selected_retailer_id: "",
      changed_amount: ""
    }
    
     this.saveItem = this.saveItem.bind(this); 
  }
  
  handleChangeUnit(v) {
    this.setState({unit: v.target.value});
  }

  handleChangeUser(v) {
    this.setState({selected_user_id: v.target.value});
  }

  handleChangeRetailer(v) {
    this.setState({selected_retailer_id: v.target.value});
  }

  handleChangeAmount(v) {
    this.setState({amount: v.target.value})
  }

  safeChanges() {
    this.props.handleChangeUnit(this.state.item.unit);
  }

  saveItem = () => {
    let updatedItem = Object.assign(new ListEntryBO(), this.props.listentry);
    //Sets the updated item with the properties of the current item
    updatedItem = this.state.item

    //Updates the parameters we want to change
    updatedItem.setAmount(this.state.amount);
    updatedItem.setUnit(this.state.unit);
    updatedItem.setRetailerid(this.state.selected_retailer_id);
    updatedItem.setUserid(this.state.selected_user_id);
    updatedItem.setGroupid(this.state.group_id);
    updatedItem.setBought(this.state.bought);
    updatedItem.setRetailer(this.state.selected_retailer)
    
    ShoppingAPI.getAPI().updateListEntry(updatedItem).catch(e => console.log(e))
  }


  render() {
    const { classes, listentry } = this.props;
    const { amount, unit, user, retailer, article_id, retailer_id} = this.state;
    return (
<Dialog
        open={this.props.open}
        aria-labelledby="alert title"
        aria-describedby="description" 
      >
      <DialogTitle id="alert title">{"Edit Item"}</DialogTitle>
      <DialogContent>
      </DialogContent>
      <Grid
        xs={12}
        container
        direction='row'
        justify='center'
        alignItems= 'center'
        spacing={4}
      >
      <Grid item xs={6}>
        <InputLabel>AMOUNT</InputLabel>
        <TextField defaultValue={this.state.item.amount} onChange={this.handleChangeAmount.bind(this)} value={this.state.amount}></TextField>
      </Grid>
      <Grid item xs={6}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>UNIT</InputLabel>
                <Select defaultValue={this.state.item.unit}
                  onChange={this.handleChangeUnit.bind(this)}
                  // value={this.state.item.unit}
                >
                <MenuItem value={'kg'}>Kg</MenuItem>
                <MenuItem value={'g'}>g</MenuItem>
                <MenuItem value={'l'}>l</MenuItem>
                <MenuItem value={'ml'}>ml</MenuItem>
                <MenuItem value={'Stk.'}>Stk.</MenuItem>
                <MenuItem value={'Pkg.'}>Pkg.</MenuItem>
                </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6} style={{marginTop: 10}}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>ASSIGN USER</InputLabel>
                <Select defaultValue={this.state.item.user}
                  value={this.state.item.user}
                  onChange={this.handleChangeUser.bind(this)}
                >
                  
                {this.props.user.map(item =>{
                    return <MenuItem value={item.id}>{item.name}</MenuItem>
                  })}
                </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6} style={{marginTop: 10}}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>ASSIGN RETAILER</InputLabel>
                <Select defaultValue={this.state.item.retailer} value={this.state.item.retailer.id} onChange={this.handleChangeRetailer.bind(this)}>
                  {this.props.retailer.map(item =>{
                    return <MenuItem value={item.id}>{item.name}</MenuItem>
                  })}
                </Select>
      </FormControl>
      </Grid>
      </Grid>

      <DialogActions>
        <Button color="primary" onClick={() => this.saveItem()}>
          SAVE
        </Button>
        <Button onClick={this.props.PressButtonBack} color="primary" autoFocus>
          BACK
        </Button>
      </DialogActions>
      
      
    </Dialog>
    )
}}

EditListItem.propTypes = {
  open: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  PressButtonBack: PropTypes.string.isRequired,
  PressButtonConfirm: PropTypes.string.isRequired,
  retailer: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
}

export default withStyles(styles)(EditListItem);