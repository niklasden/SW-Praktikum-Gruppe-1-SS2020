import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from 'prop-types';
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box';
import MaterialIconButton from '@material-ui/core/IconButton';
import { Grid } from "@material-ui/core";

/**
 * Displays a list item in a specific group
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 * 
*/

const styles = theme => ({
  root: {
    backgroundColor: '#F2F2F2',
    width: 'auto',
    corderRadius: 10,
    border: 1
  },
});

class GroupListItem extends Component {
  render() {
    return (
    <Grid 
      container 
      direction='row'
      justify='space-between'
      alignItems='center'
      className={this.props.classes.root}
       >
        <Grid item xs={3}>
          <img style={{height:'25px', width: '25px'}} src={this.props.imgsrc}></img>
        </Grid>

        <Grid item xs={6}>
          <p style={{color: '#000000', fontSize: 18}}>{this.props.Listname}</p>
        </Grid>

        
    </Grid>
    );
  }
}

GroupListItem.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  Listname: PropTypes.string.isRequired,
}

export default withStyles(styles)(GroupListItem);