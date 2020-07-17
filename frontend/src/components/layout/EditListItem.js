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
/**
 * Displays an PopUp. 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

const styles = theme => ({
  formControl: {
    minWidth: '100%'
  }
});

class EditListItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      item: this.props.item,
      amount: this.props.item.amount,
      unit: this.props.item.unit,
      user: this.props.item.user_id,
      article_id: this.props.item.article_id,
      shoppinglist_id: this.props.item.shoppinglist_id,
      group_id: this.props.item.group_id,
      bought: this.props.item.bought,
      retailer: this.props.retailer,
      selected_user_id: "",
      selected_retailer_id: "",
      changed_amount: "",
      current_retailer_id: ""
    }
     this.saveItem = this.saveItem.bind(this); 
     this.getRetailerbyProps = this.getRetailerbyProps.bind(this);
  }


  
  getRetailerbyProps = () => {
    var res = "";
    this.props.retailer.filter(item => {
      if (item.name.toLowerCase().includes(this.state.item.retailer.toLowerCase())) {
      res = item.id
      } 
    });
    return res
  };

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

  saveItem = () => {
    let updatedItem = Object.assign(new ListEntryBO(), this.state.item);
    //Updates the parameters we want to change
    updatedItem.setAmount(this.state.amount);
    updatedItem.setUnit(this.state.unit);
    updatedItem.setRetailerid(this.state.selected_retailer_id);
    updatedItem.setUserid(this.state.selected_user_id);
    updatedItem.setGroupid(this.state.group_id);
    updatedItem.setBought(this.state.bought);
    updatedItem.setRetailer(this.state.selected_retailer);
    
    //Sends updated ListEntry Object to the API, in case of Error it logs it
    ShoppingAPI.getAPI().updateListEntry(updatedItem).then(this.props.PressButtonConfirm).catch(e => console.log(e))
  }
  
  render() {
    
    return (
<Dialog 
        open={this.props.open}
        aria-labelledby="alert title"
        aria-describedby="description" 
      >
      <DialogTitle id="alert title" style={{textAlign: "center"}}>{"Edit "+this.state.item.name}</DialogTitle>
      <DialogContent>
      </DialogContent>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems= 'center'
        spacing={4}
        style={{width: 'calc(100% + 15px)'}}
      >
      <Grid item xs={6} style={{paddingLeft: 25}}>
        <InputLabel>AMOUNT</InputLabel>
        <TextField onChange={this.handleChangeAmount.bind(this)} value={this.state.amount}></TextField>
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
                <Select defaultValue={this.state.item.user} value={this.state.item.user} onChange={this.handleChangeUser.bind(this)}>
                {this.props.user.map(item =>{
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  })}
                </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6} style={{marginTop: 10}}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>ASSIGN RETAILER</InputLabel>
                <Select defaultValue={this.getRetailerbyProps()} value={this.state.item.retailer.id} onChange={this.handleChangeRetailer.bind(this)}>
                  {this.props.retailer && this.props.retailer.map(item =>{
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  })}
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
      
    </Dialog>
    )
}}

EditListItem.propTypes = {
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

export default withStyles(styles)(EditListItem);