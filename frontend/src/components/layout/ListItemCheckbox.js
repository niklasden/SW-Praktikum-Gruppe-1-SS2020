import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Icon from "@material-ui/core/Icon";
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

/**
 * Displays an list item with a checkbox as designed in figma
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    width: 'auto',
    marginLeft: 5,
    height: 35,
    marginRight: 8,
  },
});

class ListItemCheckbox extends Component {

  render() {
    return (
    <Grid 
      container 
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
    >
        <Grid item xs={2}>
          <Icon style={{marginLeft:10, color: '#00BCD4', marginTop: 3}}>fastfood</Icon>
        </Grid>

        <Grid item xs={6}>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.itemname}</t>
        </Grid>

         <Grid item xs={2}>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.amount}</t>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.unit}</t>
        </Grid>

        <Grid item xs={2}>
          <Checkbox defaultChecked={this.props.Checked} onChange={this.props.handleChange} checked={this.props.checked} style={{padding:0, marginLeft: 15}}></Checkbox>
        </Grid>
      
    </Grid>
    );
  }
}

ListItemCheckbox.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  itemname: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  Checked: PropTypes.bool.isRequired,
}

export default withStyles(styles)(ListItemCheckbox);