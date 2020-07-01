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
  render() {
    return (
  /*     <Popover 
        style={{width: 400}}
        id={this.props.id}
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        onClose={this.props.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Grid container style={{flexDirection: 'row', width: '400px'}}>
        <Grid item xs={6}>
        <Input 
          defaultValue={this.props.item.amount} 
          type={Int16Array} 
          inputProps={{ 'aria-label' : 'description'}}
          style={{width:40}}>
        </Input>
        <FormHelperText>Menge</FormHelperText>
        </Grid>
        <Grid item xs={6}>
        <FormControl className={this.props.classes.formControl}>
        <Select
          onChange={this.props.handleChange}
          displayEmpty
          value={this.props.item.unit}
        >
          <MenuItem value="" disabled>
            Unit
          </MenuItem>
          <MenuItem value={'kg'}>Kg</MenuItem>
          <MenuItem value={'g'}>g</MenuItem>
          <MenuItem value={'l'}>l</MenuItem>
          <MenuItem value={'ml'}>ml</MenuItem>
          <MenuItem value={'Stk.'}>Stk.</MenuItem>
          <MenuItem value={'Pkg.'}>Pkg.</MenuItem>
        </Select>
        <FormHelperText>Unit</FormHelperText>
        </FormControl>
        </Grid>
        </Grid>
      </Popover>
    );
  }
} */

<Dialog
        open={this.props.open}
        aria-labelledby="alert title"
        aria-describedby="description" 
      >
      <DialogTitle id="alert title">{"Edit Item"}</DialogTitle>
      <DialogContent>
      </DialogContent>
      <Grid
        xs= {12}
        container
        direction='row'
        justify='center'
        alignItems= 'center'
      >
      <Grid>
        <InputLabel>AMOUNT</InputLabel>
        <TextField onChange={this.props.onChange} value={this.props.amount}></TextField>
      </Grid>
    
        
      <Grid xs={4}>
      <FormControl style={{width: '100px', height: 35, marginLeft: 10, marginBottom: 10}}>
                <InputLabel>UNIT</InputLabel>
                <Select
                  value={this.props.unit}
                  onChange={this.props.handleChange}
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
      </Grid>

      <DialogActions>
        <Button onClick={this.props.PressButtonConfirm} color="primary">
          Bestätigen
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
}

export default withStyles(styles)(EditListItem);