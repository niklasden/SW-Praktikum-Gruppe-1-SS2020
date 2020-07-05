import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Popover, InputBase, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
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
    this.state = {
      amount: this.props.amount,
      unit: this.props.unit,
      user: this.props.user,
      retailer: this.props.retailer
    }
  }
  
  handleChangeUnit(v) {
    this.setState({unit: v.target.value});
  }

  safeChanges() {
    this.props.handleChangeUnit(this.state.unit);
  }
  render() {
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
        <TextField value={this.props.amount}></TextField>
      </Grid>
      <Grid item xs={6}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>UNIT</InputLabel>
                <Select
                  onChange={this.handleChangeUnit.bind(this)}
                  value={this.state.unit}
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
                <Select
                  /* value={this.props.unit}
                  onChange={this.props.handleChange} */
                >
                {this.props.user.map(item =>{
                    return <MenuItem value={item.name}>{item.name}</MenuItem>
                  })}
                </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6} style={{marginTop: 10}}>
      <FormControl style={{width: '100%', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>ASSIGN RETAILER</InputLabel>
                <Select
                  /* value={this.props.unit}
                  onChange={this.props.handleChange} */
                >
                  {this.props.retailer.map(item =>{
                    return <MenuItem value={item.name}>{item.name}</MenuItem>
                  })}
                </Select>
      </FormControl>
      </Grid>
      </Grid>

      <DialogActions>
        <Button onClick={this.props.PressButtonConfirm} color="primary">
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