import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CustomIcon from "../layout/CustomIcon";
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    borderColor: '#BDBDBD',
    borderStyle: 'solid',
    marginLeft: 5,
    maxWidth: '100vh',
    height: 35,
    marginRight: 8,
    marginTop: '2px',
    marginBottom: '4px',
  },
});

/**
 * Displays an list item with a checkbox as designed in figma
 * 
 * @author [Pascal Illg](https://github.com/pasillg)
 * 
*/
class ListItemCheckbox extends Component {
  render() {
    return (
    <Grid 
      container 
      direction='row'
      justify='center'
      alignItems='center'
      className={this.props.classes.root}
      style={{minWidth:'300px'}}
      xs={12}
    >
        <Grid item xs={2}>
          <CustomIcon category={this.props.category} iconName={this.props.iconname} style={{alignItem: 'center', marginLeft:10, marginTop:5, color: '#00BCD4'}}></CustomIcon>
        </Grid>

        <Grid item xs={6}>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.itemname}</t>
        </Grid>

         <Grid item xs={2}>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.amount}</t>
          <t style={{color: '#000000', fontSize: 18}}>{this.props.unit}</t>
        </Grid>

        <Grid item xs={2}>
          <Checkbox checked={this.props.Checked} onChange={this.props.handleChange} style={{padding:0, marginLeft: 15}}></Checkbox>
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
  handleChange: PropTypes.string.isRequired,
  Checked: PropTypes.bool.isRequired,
  iconname: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}

export default withStyles(styles)(ListItemCheckbox);