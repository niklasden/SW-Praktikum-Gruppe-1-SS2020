import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Grid, Popover, InputBase } from "@material-ui/core";
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

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
      <Popover 
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
}

EditListItem.propTypes = {
  amount: PropTypes.string.isRequired,
}

export default withStyles(styles)(EditListItem);