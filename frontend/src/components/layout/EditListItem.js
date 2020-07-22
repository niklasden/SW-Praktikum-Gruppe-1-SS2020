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
import CircularLoadingProgress from '../dialogs/CircularLoadingProgress';
import ContextErrorMessage from '../dialogs/ContextErrorMessage';

/**
 * Displays an Dialog, which lets you edit ListEntry data.
 * Allows the user to save changes or cancel them. 
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * @author [Niklas Denneler](https://github.com/niklasden)
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
      user: this.props.item.user_id,
      group_id: this.props.item.group_id,
      bought: this.props.item.bought,
      retailer: this.props.retailer,
      selected_user_id: null,
      changed_amount: null,
      selected_unit: null,
      savingInProgress: false,
      savingItemError: null,
    }
     this.saveItem = this.saveItem.bind(this); 
     this.getRetailerbyProps = this.getRetailerbyProps.bind(this);
  }

  getRetailerbyProps = () => {
    var res = "";
    if (this.state.item.retailer !== null){
    this.props.retailer.forEach(item => {
        if (item.name.toLowerCase() === this.state.item.retailer.toLowerCase()) {
        res = item.id
        } 
      });
    } 
    return res
  };

  componentDidMount(){
    /*console.log(this.getRetailerbyProps())*/

    this.setState({
      selected_unit: this.state.item.unit,
      selected_amount: this.state.item.amount,
      selected_user_id: this.state.item.user_id,
      selected_retailer_id: this.getRetailerbyProps(),
    });

  }

  handleChangeUnit(v) {
    this.setState({ selected_unit: v.target.value});
    this.props.onUnitChange(v.target.value)
  }

  handleChangeUser(v) {
    this.setState({selected_user_id: v.target.value});
    this.props.onUserChange(v.target.value)
  }

  handleChangeRetailer(v) {
    this.setState({selected_retailer_id: v.target.value});
  }

  handleChangeAmount(v) {
    this.setState({selected_amount: v.target.value})
    this.props.onAmountChange(v.target.value)
  }

  saveItem = () => {
    this.setState({
      savingInProgress: true
    })
    
    let updatedItem = Object.assign(new ListEntryBO(), this.state.item);
    //Updates the parameters we want to change to a new ListEntryBO
    updatedItem.setAmount(this.state.selected_amount);
    updatedItem.setUnit(this.state.selected_unit);
    updatedItem.setRetailerid(this.state.selected_retailer_id);
    updatedItem.setUserid(this.state.selected_user_id);
    updatedItem.setGroupid(this.state.group_id);
    updatedItem.setBought(this.state.bought);
    updatedItem.setRetailer(this.state.selected_retailer);
 
    //Sends updated ListEntry Object to the API, in case of Error it logs it
    ShoppingAPI.getAPI().updateListEntry(updatedItem).then(() => {
          this.setState({
          savingItemError: null,
          savingInProgress: false
        })
         this.props.PressButtonConfirm()
    }).catch(e => 
      this.setState({
      savingItemError: e,
      savingInProgress: false,
    })
    )  
  };
  
  render() {
    const {savingInProgress, savingItemError} = this.state;
    return (

    <Dialog open={this.props.open} aria-labelledby="alert title" aria-describedby="description">
      <DialogTitle id="alert title" style={{textAlign: "center"}}>{"Edit "+this.state.item.name}</DialogTitle>
      <DialogContent>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems= 'center'
        spacing={4}
        style={{width: 'calc(100% + 15px)', fontSize: '15px'}}
      >
      <CircularLoadingProgress show={savingInProgress} />
      <ContextErrorMessage error={savingItemError} contextErrorMsg={'Failed to save Item'} onReload={this.saveItem}/>

      <Grid item xs={6} style={{paddingLeft: 25}}>
        <InputLabel>AMOUNT</InputLabel>
        <TextField onChange={this.handleChangeAmount.bind(this)} value={this.state.selected_amount}></TextField>
      </Grid>
      <Grid item xs={6}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>UNIT</InputLabel>
                <Select defaultValue={this.state.item.unit}
                  onChange={this.handleChangeUnit.bind(this)}
                 value={this.state.selected_unit}
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
                <Select defaultValue={this.state.selected_user_id} value={this.state.selected_user_id} onChange={this.handleChangeUser.bind(this)}>
                  <MenuItem key={null} value={null}>null</MenuItem>
                {this.props.user.map(item =>{
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  })}
                </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6} style={{marginTop: 10}}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
               <InputLabel>ASSIGN RETAILER</InputLabel>
               <Select defaultValue={this.state.selected_retailer_id} value={this.state.selected_retailer_id} onChange={this.handleChangeRetailer.bind(this)}> 
               <MenuItem key={null} value={null}>null</MenuItem>
               {this.props.retailer.map(item =>{
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
      </DialogContent>
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
  onAmountChange: PropTypes.func,
  onUnitChange: PropTypes.func,
  onUserChange: PropTypes.func,
  retailer: PropTypes.array,
  user: PropTypes.array,
  fetchItems: PropTypes.func
}

export default withStyles(styles)(EditListItem);